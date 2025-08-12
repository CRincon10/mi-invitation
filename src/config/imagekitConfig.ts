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
            
            return {
                fileId: result.fileId,
                name: result.name,
                url: result.url,
                filePath: result.filePath,
                thumbnailUrl: `${result.url}?tr=w-300,h-300,c-at_max`,
                uploadedAt: new Date(result.createdAt),
                category: folder.split('/').pop(),
                size: result.size,
                // Propiedades adicionales para compatibilidad con la interfaz Photo
                id: result.fileId
            };
        } else {
            const errorText = await response.text();
            throw new Error(`ImageKit upload failed: ${response.status} - ${errorText}`);
        }
        
    } catch (error) {
        
        // Fallback: usar almacenamiento local si falla ImageKit
        
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
                    totalFiles = allFiles.filter((file: any) => file.fileType === 'image' || file.fileType === 'video').length;
                }
            }
            
            // Ahora obtenemos la página específica ordenada por fecha descendente (más recientes primero)
            const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}&limit=${limit}&skip=${skip}&sort=DESC_CREATED`, {
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const files = await response.json();
                
                const images = files
                    .map((file: any) => ({
                        fileId: file.fileId,
                        name: file.name,
                        url: file.url,
                        thumbnailUrl: `${file.url}?tr=w-300,h-300,c-at_max`,
                        uploadedAt: new Date(file.createdAt),
                        category: folder.split('/').pop(),
                        size: file.size,
                        customMetadata: file.customMetadata,
                        tags: file.tags,
                        fileType: file.fileType, // Conservamos el original
                        originalFileType: file.fileType // Para debug
                    }));
                
                // Determinar si hay más páginas (simplificado)
                // Si obtuvimos exactamente el límite solicitado, probablemente hay más
                const hasMore = images.length === limit;
                
                // Si tenemos el total real, usarlo; si no, estimar
                const actualTotal = totalFiles > 0 ? totalFiles : skip + images.length + (hasMore ? limit : 0);
                
                return { 
                    images, 
                    hasMore, 
                    total: actualTotal
                };
            } else {
                return { images: [], hasMore: false, total: 0 };
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
            } else {
            }
            return { images: [], hasMore: false, total: 0 };
        }
        
    } catch (error) {
        return { images: [], hasMore: false, total: 0 };
    }
};

// Función para listar imágenes de ImageKit con autenticación completa (versión original sin paginación)
export const listImagesFromImageKit = async (folder: string): Promise<any[]> => {
    try {
        
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
                
                const images = files
                    .filter((file: any) => {
                        const isMediaFile = file.fileType === 'image' || file.fileType === 'video';
                        return isMediaFile;
                    })
                    .map((file: any) => ({
                        id: file.fileId,
                        name: file.name,
                        url: file.url,
                        thumbnailUrl: `${file.url}?tr=w-300,h-300,c-at_max`,
                        uploadedAt: new Date(file.createdAt),
                        category: folder.split('/').pop(),
                        size: file.size,
                        fileType: file.fileType
                    }));
                
                return images;
            } else {
                return [];
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
            } else {
            }
            return [];
        }
        
    } catch (error) {
        return [];
    }
};
