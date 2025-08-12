import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listImagesFromImageKitPaginated, photoCategories, uploadImageToImageKit } from '../../config/imagekitConfig';
import { showErrorAlert, showSuccessAlert } from '../../utils/alerts';
import { BackButton, CategoryContainer, Header, LoadingSpinner, LoadMoreButton, Modal, ModalButtons, ModalImage, PhotoCard, PhotoGrid, UploadSection } from './styled';
import { Flex } from '../styled';

interface Photo {
    fileId: string;
    name: string;
    url: string;
    uploadedBy?: string;
    customMetadata?: any;
    tags?: string[];
    fileType?: string; // 'image' o 'video'
    thumbnailUrl?: string;
}

export const CategoryView: React.FC = () => {
    const { categoria } = useParams<{ categoria: string }>();
    const navigate = useNavigate();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(-1);
    const [uploading, setUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    
    // Estados para "Cargar más"
    const [hasMorePhotos, setHasMorePhotos] = useState(true);
    const currentOffsetRef = useRef(0);
    const imagesPerPage = 10;
    
    // Referencias para el swipe en móvil
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    // Encontrar la categoría actual
    const currentCategory = photoCategories.find(cat => cat.id === categoria);

    // Función para detectar tipo de archivo por extensión (fallback)
    const detectFileType = (fileName: string, fileType?: string): 'image' | 'video' => {
        // Detectar por extensión siempre (más confiable)
        const extension = fileName.toLowerCase().split('.').pop();
        const videoExtensions = ['mp4', 'mov', 'avi', 'webm', 'mkv', 'flv', 'm4v', 'wmv', '3gp', 'ogv'];
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'ico'];
        
        if (videoExtensions.includes(extension || '')) {
            return 'video';
        }
        if (imageExtensions.includes(extension || '')) {
            return 'image';
        }
        
        // Fallback al fileType de ImageKit si no podemos determinar por extensión
        if (fileType === 'video' || fileType === 'image') {
            return fileType;
        }
        
        // Por defecto asumir que es imagen
        return 'image';
    };

    // Función para bloquear/desbloquear el scroll del body
    useEffect(() => {
        if (selectedPhoto) {
            // Bloquear scroll cuando el modal está abierto
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            // Restaurar scroll cuando el modal se cierra
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Cleanup al desmontar el componente
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [selectedPhoto]);

    // Funciones para navegación del modal
    const openPhotoModal = useCallback((photo: Photo, index: number) => {
        setSelectedPhoto(photo);
        setSelectedPhotoIndex(index);
    }, []);

    const closePhotoModal = useCallback(() => {
        setSelectedPhoto(null);
        setSelectedPhotoIndex(-1);
    }, []);

    // Función específica para el click en el fondo del modal
    const handleModalBackgroundClick = useCallback((e: React.MouseEvent) => {
        // Solo cerrar si se hace click en el fondo del modal (no en el contenido)
        if (e.target === e.currentTarget) {
            closePhotoModal();
        }
    }, [closePhotoModal]);

    // Función específica para el botón de cerrar
    const handleCloseButtonClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Resetear touch events para evitar que interfieran
        touchStartX.current = 0;
        touchEndX.current = 0;
        
        closePhotoModal();
    }, [closePhotoModal]);

    const goToNextPhoto = useCallback(() => {
        if (selectedPhotoIndex < photos.length - 1) {
            const nextIndex = selectedPhotoIndex + 1;
            setSelectedPhotoIndex(nextIndex);
            setSelectedPhoto(photos[nextIndex]);
        }
    }, [selectedPhotoIndex, photos]);

    const goToPreviousPhoto = useCallback(() => {
        if (selectedPhotoIndex > 0) {
            const prevIndex = selectedPhotoIndex - 1;
            setSelectedPhotoIndex(prevIndex);
            setSelectedPhoto(photos[prevIndex]);
        }
    }, [selectedPhotoIndex, photos]);

    // Funciones para swipe en móvil
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        // Verificar si el toque fue en un botón
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.closest('button')) {
            return; // No ejecutar navegación si se tocó un botón
        }
        
        if (!touchStartX.current || !touchEndX.current) return;
        
        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && selectedPhotoIndex < photos.length - 1) {
            goToNextPhoto();
        }
        if (isRightSwipe && selectedPhotoIndex > 0) {
            goToPreviousPhoto();
        }
    }, [selectedPhotoIndex, photos.length, goToNextPhoto, goToPreviousPhoto]);

    // Navegación con teclado
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!selectedPhoto) return;
            
            if (e.key === 'ArrowLeft') {
                goToPreviousPhoto();
            } else if (e.key === 'ArrowRight') {
                goToNextPhoto();
            } else if (e.key === 'Escape') {
                closePhotoModal();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [selectedPhoto, goToNextPhoto, goToPreviousPhoto, closePhotoModal]);

    const loadPhotos = useCallback(async (isLoadMore = false) => {
        if (!currentCategory) return;
        
        if (isLoadMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }
        
        const offset = isLoadMore ? currentOffsetRef.current : 0;

        try {
            const result = await listImagesFromImageKitPaginated(
                currentCategory.folder,
                offset,
                imagesPerPage
            );

            if (isLoadMore) {
                const processedImages = result.images
                    .map(img => ({
                        ...img,
                        fileType: detectFileType(img.name, img.fileType)
                    }))
                    .filter(img => img.fileType === 'image' || img.fileType === 'video');
                    
                setPhotos(prev => [...prev, ...processedImages]);
            } else {
                const processedImages = result.images
                    .map(img => ({
                        ...img,
                        fileType: detectFileType(img.name, img.fileType)
                    }))
                    .filter(img => img.fileType === 'image' || img.fileType === 'video');
                    
                setPhotos(processedImages);
            }
            
            setHasMorePhotos(result.hasMore);
            currentOffsetRef.current = offset + result.images.length;
            
        } catch (error) {
        } finally {
            if (isLoadMore) {
                setLoadingMore(false);
            } else {
                setLoading(false);
            }
        }
    }, [currentCategory]);

    useEffect(() => {
        if (currentCategory) {
            loadPhotos(false);
        }
    }, [currentCategory, loadPhotos]);

    useEffect(() => {
        // Reset todo cuando cambia la categoría
        setPhotos([]);
        currentOffsetRef.current = 0;
        setHasMorePhotos(true);
        setSelectedPhoto(null);
    }, [categoria]);

    const loadMorePhotos = () => {
        if (hasMorePhotos && !loadingMore) {
            loadPhotos(true);
        }
    };

    const downloadImage = useCallback(async () => {
        if (!selectedPhoto) return;
        
        try {
            const response = await fetch(selectedPhoto.url);
            if (!response.ok) throw new Error('Error al cargar la imagen');
            
            const blob = await response.blob();
            const file = new File([blob], selectedPhoto.name, { type: blob.type });
            
            // Usar Web Share API nativa para mostrar opciones del sistema
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Foto de la boda',
                    text: 'Mariana & Cristian'
                });
            }
            
        } catch (error) {
            showErrorAlert('Error al descargar', 'No se pudo descargar la imagen. Intenta de nuevo.');
        }
    }, [selectedPhoto]);

    // Función específica para el botón "cargar más" del modal
    const handleModalLoadMoreClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Resetear touch events para evitar que interfieran
        touchStartX.current = 0;
        touchEndX.current = 0;
        
        if (hasMorePhotos && !loadingMore) {
            loadPhotos(true);
        }
    }, [hasMorePhotos, loadingMore, loadPhotos]);

    // Función específica para el botón de descarga del modal
    const handleModalDownloadClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Resetear touch events para evitar que interfieran
        touchStartX.current = 0;
        touchEndX.current = 0;
        
        downloadImage();
    }, [downloadImage]);

    const handleFileSelect = (files: FileList | null) => {
        if (files && files.length > 0) {
            uploadImages(Array.from(files));
        }
    };

    // Función para validar archivos (imágenes y videos)
    const validateFiles = (files: File[]): { valid: File[], errors: string[] } => {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const validVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];
        const validTypes = [...validImageTypes, ...validVideoTypes];
        const maxImageSize = 10 * 1024 * 1024; // 10MB para imágenes
        const maxVideoSize = 100 * 1024 * 1024; // 100MB para videos
        const errors: string[] = [];
        const valid: File[] = [];

        files.forEach(file => {
            // Validar tipo de archivo
            if (!validTypes.includes(file.type)) {
                errors.push(`❌ ${file.name}: Solo se permiten imágenes (JPG, PNG, GIF, WEBP) y videos (MP4, MOV, AVI, WEBM)`);
                return;
            }

            // Validar tamaño según el tipo
            const isVideo = validVideoTypes.includes(file.type);
            const maxSize = isVideo ? maxVideoSize : maxImageSize;
            const maxSizeText = isVideo ? '100MB' : '10MB';
            
            if (file.size > maxSize) {
                const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
                errors.push(`❌ ${file.name}: Muy grande (${sizeMB}MB). Máximo ${maxSizeText} para ${isVideo ? 'videos' : 'imágenes'}`);
                return;
            }

            valid.push(file);
        });

        return { valid, errors };
    };

    const uploadImages = async (files: File[]) => {
        if (!currentCategory) return;
        
        // Validar archivos
        const { valid, errors } = validateFiles(files);
        
        // Mostrar errores si los hay
        if (errors.length > 0) {
            showErrorAlert(
                'Archivos no válidos', 
                errors.join('\n\n')
            );
            
            // Si no hay archivos válidos, salir
            if (valid.length === 0) return;
        }
        
        setUploading(true);
        try {
            const uploadedPhotos: Photo[] = [];
            
            // Solo procesar archivos válidos
            for (const file of valid) {
                const uploadResult = await uploadImageToImageKit(file, currentCategory.folder);
                
                // Determinar si es imagen o video
                const isVideo = file.type.startsWith('video/');
                
                // Transformar el resultado para que sea compatible con la interfaz Photo
                const newPhoto: Photo = {
                    fileId: uploadResult.fileId,
                    name: uploadResult.name,
                    url: uploadResult.url,
                    uploadedBy: uploadResult.uploadedBy,
                    customMetadata: uploadResult.customMetadata,
                    tags: uploadResult.tags,
                    fileType: isVideo ? 'video' : 'image',
                    thumbnailUrl: uploadResult.thumbnailUrl
                };
                
                uploadedPhotos.push(newPhoto);
            }
            
            // Agregar las nuevas fotos al principio del array existente (más recientes primero)
            setPhotos(prevPhotos => [...uploadedPhotos, ...prevPhotos]);
            
            // Forzar una recarga de la galería para asegurar sincronización
            setTimeout(() => {
                loadPhotos(false);
            }, 1000);
            
            // Mostrar mensaje de éxito
            showSuccessAlert(
                '¡Éxito!', 
                `${uploadedPhotos.length} archivo(s) subido(s) correctamente`
            );
            
        } catch (error) {
            showErrorAlert('Error al subir', 'No se pudieron subir las imágenes. Por favor, intenta de nuevo.');
        } finally {
            setUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            uploadImages(Array.from(files));
        }
    };

    if (!currentCategory) {
        return (
            <CategoryContainer>
                <BackButton onClick={() => navigate('/fotos')}>
                    <i className="fas fa-arrow-left"></i>
                    Volver
                </BackButton>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Categoría no encontrada</h2>
                    <p>La categoría que buscas no existe.</p>
                </div>
            </CategoryContainer>
        );
    }

    return (
        <CategoryContainer>
            <BackButton onClick={() => navigate('/fotos')}>
                <i className="fas fa-arrow-left"></i>
                Volver a Categorías
            </BackButton>
            
            <Header>
                <h1>{currentCategory.name}</h1>
            </Header>

            <UploadSection 
                className={isDragOver ? 'drag-over' : ''}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
                <label htmlFor="file-upload" className="upload-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Subir fotos y videos a {currentCategory.name}</p>
                </label>
            </UploadSection>

            {uploading && (
                <LoadingSpinner>
                    <div className="spinner"></div>
                </LoadingSpinner>
            )}

            {photos.length > 0 && (
                <PhotoGrid>
                    {photos.map((photo, index) => (
                        <PhotoCard key={photo.fileId} onClick={() => openPhotoModal(photo, index)}>
                            {detectFileType(photo.name, photo.fileType) === 'video' ? (
                                <div style={{ 
                                    position: 'relative', 
                                    width: '100%', 
                                    height: '100%',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}>
                                    {/* Fondo con patrón variado para diferentes videos */}
                                    <div 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            background: index % 4 === 0 
                                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                : index % 4 === 1 
                                                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                                : index % 4 === 2
                                                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                                                : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            padding: '20px',
                                            position: 'relative'
                                        }}
                                    >
                                        {/* Ícono de video más elegante */}
                                        <div style={{
                                            fontSize: '2.5rem',
                                            marginBottom: '8px',
                                            opacity: 0.9,
                                            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                        }}>
                                            <i className="fas fa-play-circle"></i>
                                        </div>
                                        
                                        {/* Texto "VIDEO" más sutil */}
                                        <div style={{
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            letterSpacing: '1px',
                                            opacity: 0.8,
                                            textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                                        }}>
                                            VIDEO
                                        </div>
                                        
                                        {/* Decoración de fondo sutil */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            fontSize: '0.8rem',
                                            opacity: 0.3
                                        }}>
                                            <i className="fas fa-video"></i>
                                        </div>
                                    </div>
                                    
                                    {/* Indicador de video en esquina */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '8px',
                                        left: '8px',
                                        background: 'rgba(0, 0, 0, 0.7)',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        <i className="fas fa-video" style={{ fontSize: '8px' }}></i>
                                        VID
                                    </div>
                                </div>
                            ) : (
                                <img 
                                    src={photo.url} 
                                    alt={`Foto ${index + 1}`}
                                    loading="lazy"
                                />
                            )}
                        </PhotoCard>
                    ))}
                </PhotoGrid>
            )}

            {/* Botón "Cargar más" solo si hay más fotos disponibles */}
            {hasMorePhotos && photos.length > 0 && (
                <LoadMoreButton 
                    onClick={loadMorePhotos} 
                    disabled={loadingMore}
                >
                    {loadingMore ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            &nbsp;Cargando...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-plus"></i>
                            &nbsp;Cargar más contenido
                        </>
                    )}
                </LoadMoreButton>
            )}

            {loading && photos.length === 0 && (
                <LoadingSpinner>
                    <div className="spinner"></div>
                </LoadingSpinner>
            )}

            {!loading && photos.length === 0 && (
                <Flex column style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <i className="fas fa-photo-video" style={{ fontSize: '3rem', opacity: 0.5, marginBottom: '20px' }}></i>
                    <span style={{ opacity: 0.7 }}>¡Sé el primero en compartir fotos y videos de este momento especial!</span>
                </Flex>
            )}

            {selectedPhoto && (
                <Modal 
                    id="photo-modal-background"
                    onClick={handleModalBackgroundClick}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <ModalButtons>
                        {/* Botón anterior */}
                        {selectedPhotoIndex > 0 && (
                            <button 
                                id="prev-photo-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Resetear touch events
                                    touchStartX.current = 0;
                                    touchEndX.current = 0;
                                    goToPreviousPhoto();
                                }} 
                                title="Foto anterior"
                                style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        )}
                        
                        {/* Botón siguiente */}
                        {selectedPhotoIndex < photos.length - 1 && (
                            <button 
                                id="next-photo-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Resetear touch events
                                    touchStartX.current = 0;
                                    touchEndX.current = 0;
                                    goToNextPhoto();
                                }} 
                                title="Foto siguiente"
                                style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        )}
                        
                        {/* Botones superiores */}
                        <div style={{ position: 'fixed', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                            <button 
                                id="download-button"
                                onClick={handleModalDownloadClick}
                                title="Descargar imagen"
                            >
                                <i className="fas fa-download"></i>
                            </button>
                            <button 
                                id="close-modal-button"
                                onClick={handleCloseButtonClick}
                                title="Cerrar"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </ModalButtons>
                    
                    {/* Contador de fotos y botón cargar más */}
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        {/* Contador */}
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            {selectedPhotoIndex + 1} / {photos.length}
                        </div>
                        
                        {/* Botón cargar más (solo si estamos en la última foto Y hay más fotos disponibles) */}
                        {hasMorePhotos && selectedPhotoIndex === photos.length - 1 && (
                            <button
                                id="modal-load-more-button"
                                onClick={handleModalLoadMoreClick}
                                disabled={loadingMore}
                                title="Cargar más fotos"
                                style={{
                                    background: loadingMore ? 'rgba(185, 157, 121, 0.5)' : 'rgba(185, 157, 121, 0.9)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    cursor: loadingMore ? 'not-allowed' : 'pointer',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                {loadingMore ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '10px' }}></i>
                                        <span>Cargando...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-plus" style={{ fontSize: '10px' }}></i>
                                        <span>Más</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    
                    {/* Contenido del modal: imagen o video */}
                    {detectFileType(selectedPhoto.name, selectedPhoto.fileType) === 'video' ? (
                        <video 
                            src={selectedPhoto.url}
                            controls
                            autoPlay
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '80vh',
                                objectFit: 'contain'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <ModalImage 
                            src={selectedPhoto.url} 
                            alt={selectedPhoto.name}
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                </Modal>
            )}
        </CategoryContainer>
    );
};

export default CategoryView;
