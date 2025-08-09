import ImageKit from 'imagekit-javascript';

// Credenciales de ImageKit
const IMAGEKIT_PUBLIC_KEY = "public_udv0iZs8xSTT32LVg2RfVieDh7I=";
const IMAGEKIT_PRIVATE_KEY = "private_yPFjdwSVO5Vvh71y0JgZH07UHc0=";
const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/hkc5xnsfo";

// Configuración de ImageKit para solo lectura
export const imagekit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
});

// Función para obtener token de autenticación (no utilizada actualmente)
// En producción, esto se manejaría desde el backend

// Categorías de fotos para la boda
export const photoCategories = [
    {
        id: 'ceremonia',
        name: 'Ceremonia',
        description: 'Momentos de la ceremonia religiosa',
        folder: '/boda/ceremonia',
        icon: 'fas fa-church'
    },
    {
        id: 'recepcion',
        name: 'Recepción',
        description: 'Celebración y fiesta',
        folder: '/boda/recepcion',
        icon: 'fas fa-glass-cheers'
    },
    {
        id: 'novios',
        name: 'Los Novios',
        description: 'Fotos de la pareja',
        folder: '/boda/novios',
        icon: 'fas fa-heart'
    },
    {
        id: 'familia',
        name: 'Familia',
        description: 'Momentos familiares',
        folder: '/boda/familia',
        icon: 'fas fa-users'
    },
    {
        id: 'amigos',
        name: 'Amigos',
        description: 'Diversión con amigos',
        folder: '/boda/amigos',
        icon: 'fas fa-user-friends'
    },
    {
        id: 'evento',
        name: 'Fotos con Gafas',
        description: 'Fotos divertidas con gafas para el video',
        folder: '/boda/detalles',
        icon: 'fas fa-glasses'
    }
];

// Función para subir imagen a ImageKit con autenticación real
export const uploadImageToImageKit = async (file: File, folder: string): Promise<any> => {
    try {
        console.log('Iniciando subida real a ImageKit:', file.name, folder);
        
        // Crear FormData para la subida con autenticación
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', `${Date.now()}_${file.name}`);
        formData.append('folder', folder);
        formData.append('useUniqueFileName', 'true');
        formData.append('tags', 'boda,invitacion');
        
        // Crear autenticación básica con las credenciales
        const authString = btoa(`${IMAGEKIT_PRIVATE_KEY}:`);
        
        // Hacer la subida real a ImageKit
        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authString}`
            },
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Subida exitosa a ImageKit:', result);
            
            return {
                fileId: result.fileId,
                name: result.name,
                url: result.url,
                filePath: result.filePath,
                thumbnailUrl: result.thumbnailUrl,
                uploadedAt: new Date(result.createdAt),
                category: folder.split('/').pop(),
                size: result.size,
                type: result.fileType
            };
        } else {
            const errorText = await response.text();
            console.error('❌ Error en la respuesta de ImageKit:', response.status, errorText);
            throw new Error(`ImageKit upload failed: ${response.status} - ${errorText}`);
        }
        
    } catch (error) {
        console.error('❌ Error uploading to ImageKit:', error);
        
        // Fallback: usar almacenamiento local si falla ImageKit
        console.log('🔄 Usando fallback local para la imagen:', file.name);
        
        const imageId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const imageUrl = URL.createObjectURL(file);
        
        const imageData = {
            fileId: imageId,
            name: file.name,
            url: imageUrl,
            filePath: `${folder}/${file.name}`,
            uploadedAt: new Date(),
            category: folder.split('/').pop(),
            size: file.size,
            type: file.type
        };
        
        return imageData;
    }
};

// Función para listar imágenes de ImageKit con paginación
export const listImagesFromImageKitPaginated = async (
    folder: string, 
    skip: number = 0, 
    limit: number = 10
): Promise<{ images: any[], hasMore: boolean, total: number }> => {
    try {
        console.log(`📂 Listando imágenes de folder: ${folder}, skip: ${skip}, limit: ${limit}`);
        
        // Hacer llamada directa a ImageKit con timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout
        
        try {
            const authString = btoa(`${IMAGEKIT_PRIVATE_KEY}:`);
            
            // Si es la primera página, obtenemos el total primero con una consulta sin límite
            let totalFiles = 0;
            if (skip === 0) {
                const totalResponse = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}&limit=1000`, {
                    headers: {
                        'Authorization': `Basic ${authString}`,
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal
                });
                
                if (totalResponse.ok) {
                    const allFiles = await totalResponse.json();
                    totalFiles = allFiles.filter((file: any) => file.fileType === 'image').length;
                    console.log(`📊 Total de imágenes en ${folder}: ${totalFiles}`);
                } else {
                    console.warn('⚠️ No se pudo obtener el total, usando método de estimación');
                }
            }
            
            // Ahora obtenemos la página específica
            const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}&limit=${limit}&skip=${skip}`, {
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const files = await response.json();
                console.log(`📥 API Response: ${files.length} archivos en esta página (skip: ${skip})`);
                
                const images = files
                    .filter((file: any) => {
                        const isImage = file.fileType === 'image';
                        if (!isImage) {
                            console.log(`🚫 Filtrado archivo no imagen: ${file.name} (${file.fileType})`);
                        }
                        return isImage;
                    })
                    .map((file: any) => ({
                        id: file.fileId,
                        name: file.name,
                        url: file.url,
                        thumbnailUrl: `${file.url}?tr=w-300,h-300,c-at_max`,
                        uploadedAt: new Date(file.createdAt),
                        category: folder.split('/').pop(),
                        size: file.size
                    }));
                
                // Determinar si hay más páginas
                const hasMore = images.length === limit && (totalFiles === 0 || skip + images.length < totalFiles);
                
                // Si tenemos el total real, usarlo; si no, estimar
                const actualTotal = totalFiles > 0 ? totalFiles : skip + images.length + (hasMore ? limit : 0);
                
                console.log(`☁️ Cargadas ${images.length} imágenes desde ImageKit para ${folder}`);
                console.log(`📊 Paginación: skip=${skip}, limit=${limit}, hasMore=${hasMore}, total=${actualTotal}`);
                
                return { 
                    images, 
                    hasMore, 
                    total: actualTotal
                };
            } else {
                console.warn(`⚠️ Error ${response.status} desde ImageKit`);
                return { images: [], hasMore: false, total: 0 };
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn('⚠️ Timeout cargando desde ImageKit');
            } else {
                console.warn('⚠️ Error conectando con ImageKit:', error);
            }
            return { images: [], hasMore: false, total: 0 };
        }
        
    } catch (error) {
        console.error('❌ Error general listing images:', error);
        return { images: [], hasMore: false, total: 0 };
    }
};

// Función para listar imágenes de ImageKit con autenticación completa (versión original sin paginación)
export const listImagesFromImageKit = async (folder: string): Promise<any[]> => {
    try {
        console.log('📂 Listando imágenes de folder:', folder);
        
        // Hacer llamada directa a ImageKit con timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout
        
        try {
            const authString = btoa(`${IMAGEKIT_PRIVATE_KEY}:`);
            const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}&limit=100`, {
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const files = await response.json();
                console.log(`📥 API Response: ${files.length} archivos totales`);
                
                const images = files
                    .filter((file: any) => {
                        const isImage = file.fileType === 'image';
                        if (!isImage) {
                            console.log(`🚫 Filtrado archivo no imagen: ${file.name} (${file.fileType})`);
                        }
                        return isImage;
                    })
                    .map((file: any) => ({
                        id: file.fileId,
                        name: file.name,
                        url: file.url,
                        thumbnailUrl: `${file.url}?tr=w-300,h-300,c-at_max`,
                        uploadedAt: new Date(file.createdAt),
                        category: folder.split('/').pop(),
                        size: file.size
                    }));
                
                console.log(`☁️ Cargadas ${images.length} imágenes desde ImageKit para ${folder}`);
                return images;
            } else {
                console.warn(`⚠️ Error ${response.status} desde ImageKit`);
                return [];
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn('⚠️ Timeout cargando desde ImageKit');
            } else {
                console.warn('⚠️ Error conectando con ImageKit:', error);
            }
            return [];
        }
        
    } catch (error) {
        console.error('❌ Error general listing images:', error);
        return [];
    }
};
