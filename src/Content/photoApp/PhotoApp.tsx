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
        // El botón de regresar siempre debe funcionar
        navigate('/');
    };

    const handleCategoryClick = (category: typeof photoCategories[0]) => {
        // Si está restringido, no permitir navegación
        if (isRestricted) return;
        
        // Navegar a la nueva ruta de la categoría usando el ID
        navigate(`/fotos/${category.id}`);
    };

    return (
        <PhotoAppContainer>
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

            {/* Botón para volver a la app principal - FUERA del efecto difuminado */}
            <Flex column maxWidth={600} padding={20}>
                <BackToAppButton onClick={handleBackClick}>
                    <i className="fas fa-home" />  Volver a la invitación
                </BackToAppButton>
            </Flex>
        </PhotoAppContainer>
    );
};

