import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import weddingPhoto from '../../assets/images/Boda-001.jpg';
import { listImagesFromImageKit, photoCategories, uploadImageToImageKit } from '../../config/imagekitConfig';
import { Flex } from '../styled';
import {
    ActionButton,
    AlbumDescription,
    AlbumHeader,
    AlbumTitle,
    BackToAppButton,
    CancelButton,
    CategoriesContainer,
    CategoryCard,
    CategoryDescription,
    CategoryIcon,
    CategoryName,
    CloseButton,
    ContentSection,
    EmptyIcon,
    EmptyState,
    EmptySubtext,
    EmptyText,
    HeaderImage,
    HeaderSection,
    HeaderSubtitle,
    HeaderTitle,
    ImageModal,
    ModalActionButton,
    ModalActions,
    ModalCloseButton,
    ModalImage,
    PaginationButton,
    PaginationContainer,
    PaginationInfo,
    PhotoActions,
    PhotoAppContainer,
    PhotoGrid,
    PhotoImage,
    PhotoItem,
    PhotoOverlay,
    PhotoSkeleton,
    ProgressBar,
    SkeletonGrid,
    UploadArea,
    UploadIcon,
    UploadProgress,
    UploadSubtext,
    UploadText
} from './styled';

interface Photo {
    id: string;
    url: string;
    name: string;
    uploadedAt: Date;
    category: string;
}

interface UploadTask {
    id: string;
    file: File;
    progress: number;
    cancelled: boolean;
}

export const PhotoApp: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState(photoCategories[0]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [viewMode, setViewMode] = useState<'categories' | 'album'>('categories');
    const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalImages, setTotalImages] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    const IMAGES_PER_PAGE = 10;

    // Cargar fotos desde ImageKit cuando se selecciona una categoría
    useEffect(() => {
        const loadPhotosFromImageKit = async () => {
            try {
                setLoading(true);
                setCurrentPage(1); // Reset pagination
                const images = await listImagesFromImageKit(selectedCategory.folder);
                console.log(`Cargadas ${images.length} imágenes de ${selectedCategory.name}`);
                setPhotos(images);
                setTotalImages(images.length);
            } catch (error) {
                console.error('Error cargando fotos desde ImageKit:', error);
                setPhotos([]);
                setTotalImages(0);
            } finally {
                setLoading(false);
            }
        };

        if (viewMode === 'album') {
            loadPhotosFromImageKit();
        }
    }, [selectedCategory, viewMode]);

    const handleCategoryClick = (category: typeof photoCategories[0]) => {
        setSelectedCategory(category);
        setViewMode('album');
        setCurrentPage(1); // Reset pagination cuando cambia categoría
    };

    const handleCloseApp = () => {
        if (viewMode === 'album') {
            setViewMode('categories');
        }
        else {
            //si no hay historial de la misma aplicacion, regresar a la pagina ppal con el ncaigate
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate('/');
            }
        }
    };

    const cancelUpload = (taskId: string) => {
        setUploadTasks(prev => prev.map(task => 
            task.id === taskId ? { ...task, cancelled: true } : task
        ));
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
        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        handleFileUpload(files);
    };

    const handleFileUpload = async (files: File[]) => {
        if (files.length === 0) return;

        // Crear tareas de subida
        const newTasks: UploadTask[] = files.map(file => ({
            id: Date.now().toString() + Math.random(),
            file,
            progress: 0,
            cancelled: false
        }));

        setUploadTasks(prev => [...prev, ...newTasks]);
        setLoading(true);
        
        try {
            for (const task of newTasks) {
                if (task.cancelled) continue;
                
                if (task.file.type.startsWith('image/')) {
                    // Actualizar progreso
                    for (let progress = 0; progress <= 80; progress += 20) {
                        if (task.cancelled) break;
                        
                        setUploadTasks(prev => prev.map(t => 
                            t.id === task.id ? { ...t, progress } : t
                        ));
                        
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                    
                    if (!task.cancelled) {
                        try {
                            // Subir a ImageKit
                            const uploadResult = await uploadImageToImageKit(task.file, selectedCategory.folder);
                            
                            // Finalizar progreso
                            setUploadTasks(prev => prev.map(t => 
                                t.id === task.id ? { ...t, progress: 100 } : t
                            ));
                            
                            // Agregar foto al estado
                            const newPhoto: Photo = {
                                id: uploadResult.fileId || task.id,
                                url: uploadResult.url,
                                name: uploadResult.name || task.file.name,
                                uploadedAt: new Date(),
                                category: selectedCategory.id
                            };
                            
                            setPhotos(prev => [newPhoto, ...prev]); // Agregar al inicio
                            setTotalImages(prev => prev + 1); // Incrementar total
                        } catch (uploadError) {
                            console.error('Error subiendo imagen:', uploadError);
                            // En caso de error, usar URL local como fallback
                            const url = URL.createObjectURL(task.file);
                            const newPhoto: Photo = {
                                id: task.id,
                                url,
                                name: task.file.name,
                                uploadedAt: new Date(),
                                category: selectedCategory.id
                            };
                            
                            setPhotos(prev => [newPhoto, ...prev]); // Agregar al inicio también para fallback
                            setTotalImages(prev => prev + 1);
                        }
                    }
                }
            }
            
            // Limpiar tareas completadas después de un delay
            setTimeout(() => {
                setUploadTasks(prev => prev.filter(task => task.cancelled || task.progress < 100));
            }, 1000);
            
            if (newTasks.some(task => !task.cancelled)) {
                alert('¡Fotos subidas exitosamente!');
            }
        } catch (error) {
            console.error('Error al subir fotos:', error);
            alert('Error al subir las fotos. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (photo: Photo) => {
        try {
            const response = await fetch(photo.url);
            const blob = await response.blob();
            
            // Para dispositivos móviles, intentar usar la API de compartir/guardar nativo
            if (navigator.share && 'canShare' in navigator) {
                const file = new File([blob], photo.name, { type: blob.type });
                
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'Foto de boda - Mariana & Cristian',
                        text: `Guardando foto: ${photo.name}`
                    });
                    return;
                }
            }
            
            // Para dispositivos que soportan File System Access API (Chrome, Edge)
            if ('showSaveFilePicker' in window) {
                try {
                    const fileHandle = await (window as any).showSaveFilePicker({
                        suggestedName: photo.name,
                        types: [{
                            description: 'Imagen',
                            accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] }
                        }]
                    });
                    
                    const writable = await fileHandle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    
                    alert('¡Foto guardada exitosamente!');
                    return;
                } catch (fsError) {
                    console.log('File System Access no disponible, usando método tradicional');
                }
            }
            
            // Fallback tradicional para desktop
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = photo.name;
            a.setAttribute('style', 'display: none');
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
            
            // En móviles, mostrar mensaje para guardar manualmente
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                alert('La imagen se ha descargado. Revisa tu carpeta de Descargas o mantén presionada la imagen para guardarla en tu galería.');
            }
            
        } catch (error) {
            console.error('Error al descargar/compartir:', error);
            alert('Error al descargar la foto. Intenta nuevamente.');
        }
    };

    const handleViewPhoto = (photo: Photo) => {
        setSelectedImage(photo);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    // Funciones de paginación
    const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    const currentPhotos = photos.slice(startIndex, endIndex);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <>
            <PhotoAppContainer>
                {viewMode === 'album' && (
                    <Flex padding={10}>
                        <CloseButton onClick={handleCloseApp}>
                            <i className="fas fa-arrow-left"></i> Atrás
                        </CloseButton>
                    </Flex>
                )}

                {viewMode === 'categories' ? (
                    <>
                        <HeaderSection>
                            <HeaderImage src={weddingPhoto} alt="Mariana & Cristian" />
                            <HeaderTitle>Mariana & Cristian</HeaderTitle>
                            <HeaderSubtitle>
                                Comparte los momentos más especiales de nuestra boda
                            </HeaderSubtitle>
                        </HeaderSection>

                        <CategoriesContainer>
                            {photoCategories.map(category => (
                                <CategoryCard
                                    key={category.id}
                                    active={false} // No hay categoría activa en vista principal
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <CategoryIcon>{category.icon}</CategoryIcon>
                                    <CategoryName>{category.name}</CategoryName>
                                    <CategoryDescription>{category.description}</CategoryDescription>
                                </CategoryCard>
                            ))}
                        </CategoriesContainer>

                        {/* Botón para volver a la app principal */}
                        <Flex padding={20}>
                            <BackToAppButton onClick={() => navigate('/')}>
                                <i className="fas fa-home"></i> Volver a la invitación
                            </BackToAppButton>
                        </Flex>
                    </>
                ) : (
                    <>
                        <AlbumHeader>
                            <AlbumTitle>
                                <span>{selectedCategory.icon}</span>
                                {selectedCategory.name}
                            </AlbumTitle>
                            <AlbumDescription>{selectedCategory.description}</AlbumDescription>
                        </AlbumHeader>

                        <ContentSection>
                            <UploadArea
                                isDragOver={isDragOver}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <UploadIcon><i className="fas fa-camera" style={{fontSize: '3rem', color: '#b99d79'}}></i></UploadIcon>
                                <UploadText>
                                    Arrastra tus fotos aquí o haz clic para seleccionar
                                </UploadText>
                                <UploadSubtext>
                                    Categoría: {selectedCategory.name}
                                </UploadSubtext>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                            </UploadArea>

                            {/* Mostrar progreso de subidas */}
                            {uploadTasks.filter(task => !task.cancelled && task.progress < 100).map(task => (
                                <UploadProgress key={task.id}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center', 
                                        marginBottom: '10px' 
                                    }}>
                                        <span style={{ 
                                            fontSize: '13px', 
                                            color: '#f0eae3',
                                            fontWeight: '500'
                                        }}>
                                            {task.file.name}
                                        </span>
                                        <CancelButton onClick={() => cancelUpload(task.id)}>
                                            Cancelar
                                        </CancelButton>
                                    </div>
                                    <ProgressBar progress={task.progress} />
                                    <div style={{ 
                                        textAlign: 'center', 
                                        fontSize: '12px', 
                                        opacity: 0.8,
                                        color: '#f0eae3',
                                        marginTop: '5px'
                                    }}>
                                        {task.progress}%
                                    </div>
                                </UploadProgress>
                            ))}

                            {loading && uploadTasks.length === 0 && (
                                <SkeletonGrid>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <PhotoSkeleton key={`skeleton-${i}`} />
                                    ))}
                                </SkeletonGrid>
                            )}

                            {!loading && currentPhotos.length > 0 ? (
                                <PhotoGrid>
                                    {currentPhotos.map(photo => (
                                        <PhotoItem key={photo.id}>
                                            <PhotoImage src={photo.url} alt={photo.name} />
                                            <PhotoOverlay>
                                                <PhotoActions>
                                                    <ActionButton onClick={() => handleViewPhoto(photo)}>
                                                        <i className="fas fa-eye"></i>
                                                    </ActionButton>
                                                    <ActionButton onClick={() => handleDownload(photo)}>
                                                        <i className="fas fa-download"></i>
                                                    </ActionButton>
                                                </PhotoActions>
                                            </PhotoOverlay>
                                        </PhotoItem>
                                    ))}
                                </PhotoGrid>
                            ) : !loading && (
                                <EmptyState>
                                    <EmptyIcon>{selectedCategory.icon}</EmptyIcon>
                                    <EmptyText>El álbum "{selectedCategory.name}" está vacío</EmptyText>
                                    <EmptySubtext>
                                        Sé el primero en compartir momentos especiales de {selectedCategory.description.toLowerCase()}
                                    </EmptySubtext>
                                </EmptyState>
                            )}

                            {/* Paginación */}
                            {totalImages > IMAGES_PER_PAGE && (
                                <PaginationContainer>
                                    <PaginationButton 
                                        disabled={currentPage === 1} 
                                        onClick={goToPrevPage}
                                    >
                                        <i className="fas fa-chevron-left"></i> Anterior
                                    </PaginationButton>
                                    
                                    <PaginationInfo>
                                        Página {currentPage} de {totalPages} ({totalImages} fotos)
                                    </PaginationInfo>
                                    
                                    <PaginationButton 
                                        disabled={currentPage === totalPages} 
                                        onClick={goToNextPage}
                                    >
                                        Siguiente <i className="fas fa-chevron-right"></i>
                                    </PaginationButton>
                                </PaginationContainer>
                            )}
                        </ContentSection>
                    </>
                )}
            </PhotoAppContainer>

            {/* Modal para ver imagen en grande */}
            {selectedImage && (
                <ImageModal onClick={closeImageModal}>
                    <ModalCloseButton onClick={closeImageModal}>
                        <i className="fas fa-times"></i>
                    </ModalCloseButton>
                    <ModalImage 
                        src={selectedImage.url} 
                        alt={selectedImage.name}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <ModalActions onClick={(e) => e.stopPropagation()}>
                        <ModalActionButton onClick={() => handleDownload(selectedImage)}>
                            <i className="fas fa-download"></i> Guardar
                        </ModalActionButton>
                        <ModalActionButton onClick={closeImageModal}>
                            <i className="fas fa-arrow-left"></i> Volver
                        </ModalActionButton>
                    </ModalActions>
                </ImageModal>
            )}
        </>
    );
};
