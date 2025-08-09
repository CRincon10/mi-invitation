import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listImagesFromImageKitPaginated, photoCategories, uploadImageToImageKit } from '../../config/imagekitConfig';
import { BackButton, CategoryContainer, Header, LoadingSpinner, Modal, ModalButtons, ModalImage, PhotoCard, PhotoGrid, LoadMoreButton, UploadSection } from './styled';

interface Photo {
    fileId: string;
    name: string;
    url: string;
}

export const CategoryView: React.FC = () => {
    const { categoria } = useParams<{ categoria: string }>();
    const navigate = useNavigate();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    
    // Estados para "Cargar más"
    const [hasMorePhotos, setHasMorePhotos] = useState(true);
    const currentOffsetRef = useRef(0);
    const imagesPerPage = 10;

    // Encontrar la categoría actual
    const currentCategory = photoCategories.find(cat => cat.id === categoria);

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
                setPhotos(prev => [...prev, ...result.images]);
            } else {
                setPhotos(result.images);
            }
            
            setHasMorePhotos(result.hasMore);
            currentOffsetRef.current = offset + result.images.length;
            
        } catch (error) {
            console.error('❌ [CategoryView] Error cargando fotos:', error);
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

    const downloadImage = async () => {
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
            } else {
                // Fallback: abrir la imagen para que el usuario pueda guardarla manualmente
                window.open(selectedPhoto.url, '_blank');
            }
            
        } catch (error) {
            console.error('Error:', error);
            // Si todo falla, abrir la imagen
            window.open(selectedPhoto.url, '_blank');
        }
    };

    const handleFileSelect = (files: FileList | null) => {
        if (files && files.length > 0) {
            uploadImages(Array.from(files));
        }
    };

    const uploadImages = async (files: File[]) => {
        if (!currentCategory) return;
        
        setUploading(true);
        try {
            for (const file of files) {
                await uploadImageToImageKit(file, currentCategory.folder);
            }
            
            // Recargar desde el inicio
            setPhotos([]);
            currentOffsetRef.current = 0;
            setHasMorePhotos(true);
            loadPhotos(false);
            
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error al subir las imágenes. Por favor, intenta de nuevo.');
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
                <p>Comparte tus mejores momentos de nuestra boda</p>
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
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
                <label htmlFor="file-upload" className="upload-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Subir fotos a {currentCategory.name}</p>
                    <p className="upload-hint">
                        Haz clic aquí o arrastra las imágenes para subirlas
                    </p>
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
                        <PhotoCard key={photo.fileId} onClick={() => setSelectedPhoto(photo)}>
                            <img 
                                src={photo.url} 
                                alt={`Foto ${index + 1}`}
                                loading="lazy"
                            />
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
                            &nbsp;Cargar más fotos
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
                <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <i className="fas fa-images" style={{ fontSize: '3rem', opacity: 0.5, marginBottom: '20px' }}></i>
                    <h3>Aún no hay fotos en esta categoría</h3>
                    <p style={{ opacity: 0.7 }}>¡Sé el primero en compartir un momento especial!</p>
                </div>
            )}

            {selectedPhoto && (
                <Modal onClick={() => setSelectedPhoto(null)}>
                    <ModalButtons>
                        <button onClick={downloadImage} title="Descargar imagen">
                            <i className="fas fa-download"></i>
                        </button>
                        <button onClick={() => setSelectedPhoto(null)} title="Cerrar">
                            <i className="fas fa-times"></i>
                        </button>
                    </ModalButtons>
                    <ModalImage 
                        src={selectedPhoto.url} 
                        alt={selectedPhoto.name}
                        onClick={(e) => e.stopPropagation()}
                    />
                </Modal>
            )}
        </CategoryContainer>
    );
};

export default CategoryView;
