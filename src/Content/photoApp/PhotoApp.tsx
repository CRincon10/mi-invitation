import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import weddingPhoto from '../../assets/images/fam5.jpg';
import { photoCategories } from '../../config/imagekitConfig';
import { Flex } from '../styled';
import {
    BackToAppButton,
    CategoriesContainer,
    CategoryCard,
    CategoryDescription,
    CategoryIcon,
    CategoryName,
    HeaderImage,
    HeaderSection,
    HeaderSubtitle,
    HeaderTitle,
    PhotoAppContainer
} from './styled';

export const PhotoApp: React.FC = () => {
    const navigate = useNavigate();
    const [isRestricted, setIsRestricted] = useState(false);

    // Fecha de desbloqueo: 1 de noviembre de 2025 a las 12:01 AM
    const unlockDate = useMemo(() => new Date('2025-11-01T00:01:00'), []);

    useEffect(() => {
        // Verificar si la fecha actual es anterior a la fecha de desbloqueo
        const currentDate = new Date();
        setIsRestricted(currentDate < unlockDate);
    }, [unlockDate]);

    // Hacer scroll al top cuando se monta el componente
    useEffect(() => {
        // Dar tiempo para que se renderice completamente
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 100);
    }, []);

    const handleBackClick = () => {
        // Navegar a la página principal y hacer scroll al botón de galería
        navigate('/');
        
        // Dar tiempo para que la página se cargue y luego hacer scroll
        setTimeout(() => {
            // Buscar el elemento que contiene el botón de "Abrir Galería"
            const galleryButton = document.querySelector('[data-gallery-button]') || 
                                 document.querySelector('#gallery-button') ||
                                 document.querySelector('.gallery-button') ||
                                 document.getElementById('gallery-section');
            
            if (galleryButton) {
                // Scroll más lento y suave
                const scrollToElement = (element: Element) => {
                    const rect = element.getBoundingClientRect();
                    const absoluteTop = window.pageYOffset + rect.top;
                    const targetPosition = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
                    
                    // Scroll personalizado más lento
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1500; // 1.5 segundos para un scroll más lento
                    let start: number;
                    
                    const step = (timestamp: number) => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        // Easing function para suavidad (easeInOutCubic)
                        const easing = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                        
                        window.scrollTo(0, startPosition + distance * easing);
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    
                    window.requestAnimationFrame(step);
                };
                
                scrollToElement(galleryButton);
            } else {
                // Fallback: buscar por texto del botón
                const buttons = Array.from(document.querySelectorAll('button'));
                const targetButton = buttons.find(button => {
                    const buttonText = button.textContent?.toLowerCase() || '';
                    return buttonText.includes('galería') || buttonText.includes('fotos') || buttonText.includes('abrir');
                });
                
                if (targetButton) {
                    // Usar la misma función de scroll personalizado
                    const scrollToElement = (element: Element) => {
                        const rect = element.getBoundingClientRect();
                        const absoluteTop = window.pageYOffset + rect.top;
                        const targetPosition = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
                        
                        const startPosition = window.pageYOffset;
                        const distance = targetPosition - startPosition;
                        const duration = 1500;
                        let start: number;
                        
                        const step = (timestamp: number) => {
                            if (!start) start = timestamp;
                            const progress = timestamp - start;
                            const percentage = Math.min(progress / duration, 1);
                            
                            const easing = percentage < 0.5 
                                ? 4 * percentage * percentage * percentage 
                                : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                            
                            window.scrollTo(0, startPosition + distance * easing);
                            
                            if (progress < duration) {
                                window.requestAnimationFrame(step);
                            }
                        };
                        
                        window.requestAnimationFrame(step);
                    };
                    
                    scrollToElement(targetButton);
                } else {
                    // Fallback final: scroll lento a posición aproximada
                    const targetPosition = window.innerHeight * 2;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1500;
                    let start: number;
                    
                    const step = (timestamp: number) => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        const easing = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                        
                        window.scrollTo(0, startPosition + distance * easing);
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    
                    window.requestAnimationFrame(step);
                }
            }
        }, 500);
    };

    const handleCategoryClick = (category: typeof photoCategories[0]) => {
        // Si está restringido, no permitir navegación
        if (isRestricted) return;
        
        // Navegar a la nueva ruta de la categoría usando el ID
        navigate(`/fotos/${category.id}`);
    };

    return (
        <PhotoAppContainer>
            {/* Botón prominente en la parte superior cuando está restringido */}
            {isRestricted && (
                <Flex 
                    column 
                    paddingTop={20} 
                    paddingBottom={10} 
                    paddingLeft={20} 
                    paddingRight={20} 
                    style={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 1000,
                    // backgroundColor: 'rgba(4, 18, 9, 0.9)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <BackToAppButton onClick={handleBackClick}>
                        <i className="fas fa-arrow-left" />  Volver a la invitación
                    </BackToAppButton>
                </Flex>
            )}

            <div style={{ 
                filter: isRestricted ? 'blur(1.5px) grayscale(30%)' : 'none',
                opacity: isRestricted ? 0.7 : 1
            }}>
                <Flex column maxWidth={600}>
                    <HeaderSection>
                        <HeaderImage 
                            src={weddingPhoto} 
                            alt="Mariana & Cristian"
                        />
                        <HeaderTitle>Mariana & Cristian</HeaderTitle>
                        <HeaderSubtitle>
                            Comparte los momentos más especiales de nuestra boda
                        </HeaderSubtitle>
                    </HeaderSection>

                    <CategoriesContainer style={{ 
                        pointerEvents: isRestricted ? 'none' : 'auto'
                    }}>
                        {photoCategories.map(category => (
                            <CategoryCard
                                key={category.id}
                                active={false}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <CategoryIcon>
                                    <i className={category.icon}></i>
                                </CategoryIcon>
                                <CategoryName>{category.name}</CategoryName>
                                <CategoryDescription>{category.description}</CategoryDescription>
                            </CategoryCard>
                        ))}
                    </CategoriesContainer>
                </Flex>
            </div>

            {/* Botón normal en la parte inferior cuando NO está restringido */}
            {!isRestricted && (
                <Flex column maxWidth={600} padding={20}>
                    <BackToAppButton onClick={handleBackClick}>
                        <i className="fas fa-home" />  Volver a la invitación
                    </BackToAppButton>
                </Flex>
            )}
        </PhotoAppContainer>
    );
};

