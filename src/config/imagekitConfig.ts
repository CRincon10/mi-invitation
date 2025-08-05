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
        icon: '⛪'
    },
    {
        id: 'recepcion',
        name: 'Recepción',
        description: 'Celebración y fiesta',
        folder: '/boda/recepcion',
        icon: '🎉'
    },
    {
        id: 'novios',
        name: 'Los Novios',
        description: 'Fotos de la pareja',
        folder: '/boda/novios',
        icon: '💑'
    },
    {
        id: 'familia',
        name: 'Familia',
        description: 'Momentos familiares',
        folder: '/boda/familia',
        icon: '👨‍👩‍👧‍👦'
    },
    {
        id: 'amigos',
        name: 'Amigos',
        description: 'Diversión con amigos',
        folder: '/boda/amigos',
        icon: '👥'
    },
    {
        id: 'detalles',
        name: 'Detalles',
        description: 'Decoración y detalles especiales',
        folder: '/boda/detalles',
        icon: '🌸'
    }
];

// Almacenamiento local temporal para imágenes (fallback)
let localImageStorage: { [key: string]: any[] } = {};

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
        
        // Guardar en almacenamiento local como backup
        if (!localImageStorage[folder]) {
            localImageStorage[folder] = [];
        }
        localImageStorage[folder].push(imageData);
        
        try {
            localStorage.setItem('weddingPhotos', JSON.stringify(localImageStorage));
            console.log('💾 Imagen guardada en localStorage como backup');
        } catch (storageError) {
            console.warn('⚠️ No se pudo guardar en localStorage:', storageError);
        }
        
        return imageData;
    }
};

// Función para listar imágenes de ImageKit con autenticación completa
export const listImagesFromImageKit = async (folder: string): Promise<any[]> => {
    try {
        console.log('📂 Listando imágenes de folder:', folder);
        
        // Cargar imágenes locales primero (backup)
        let localImages: any[] = [];
        try {
            const stored = localStorage.getItem('weddingPhotos');
            if (stored) {
                localImageStorage = JSON.parse(stored);
                localImages = localImageStorage[folder] || [];
                console.log(`💾 Encontradas ${localImages.length} imágenes locales en ${folder}`);
            }
        } catch (error) {
            console.warn('⚠️ Error cargando desde localStorage:', error);
        }
        
        // Listar desde ImageKit con autenticación completa
        let cloudImages: any[] = [];
        try {
            const authString = btoa(`${IMAGEKIT_PRIVATE_KEY}:`);
            const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}&limit=100`, {
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const files = await response.json();
                cloudImages = files
                    .filter((file: any) => file.fileType === 'image')
                    .map((file: any) => ({
                        fileId: file.fileId,
                        id: file.fileId,
                        url: file.url,
                        name: file.name,
                        uploadedAt: new Date(file.createdAt),
                        category: folder.split('/').pop(),
                        filePath: file.filePath,
                        size: file.size,
                        type: file.fileType,
                        thumbnailUrl: file.thumbnailUrl
                    }));
                console.log(`☁️ Encontradas ${cloudImages.length} imágenes en ImageKit`);
            } else {
                console.warn(`⚠️ Error ${response.status} listando desde ImageKit:`, await response.text());
            }
        } catch (error) {
            console.warn('⚠️ Error conectando con ImageKit:', error);
        }
        
        // Combinar imágenes (priorizar las de la nube, agregar locales que no estén)
        const allImages = [...cloudImages];
        localImages.forEach(localImg => {
            // Solo agregar locales si no están ya en la nube
            if (!allImages.find(cloudImg => cloudImg.name === localImg.name)) {
                allImages.push(localImg);
            }
        });
        
        console.log(`✅ Total de imágenes encontradas: ${allImages.length} (${cloudImages.length} nube + ${localImages.filter(local => !cloudImages.find(cloud => cloud.name === local.name)).length} locales)`);
        return allImages;
        
    } catch (error) {
        console.error('❌ Error general listing images:', error);
        return [];
    }
};
