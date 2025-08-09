import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weddingPhoto from '../../assets/images/Boda-001.jpg';
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

    // Hacer scroll al top cuando se monta el componente
    useEffect(() => {
        // Dar tiempo para que se renderice completamente
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 100);
    }, []);

    const handleCategoryClick = (category: typeof photoCategories[0]) => {
        // Navegar a la nueva ruta de la categoría usando el ID
        navigate(`/fotos/${category.id}`);
    };



    return (
        <PhotoAppContainer>
            <Flex column maxWidth={600}>
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
                            active={false}
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
                        <i className="fas fa-home" />  Volver a la invitación
                    </BackToAppButton>
                </Flex>
            </Flex>
        </PhotoAppContainer>
    );
};

