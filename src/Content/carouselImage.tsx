import { useEffect, useState } from "react";
import imageHeader from "../assets/images/image-header.jpg";
import imageHeader2 from "../assets/images/image-header2.jpg";
import imageHeader3 from "../assets/images/image-header3.jpg";
import imageHeader5 from "../assets/images/image-header5.jpg";
import { SubTitleWrapper, TitleWrapper, Wrapper } from "./styled";

import HeartLineComponent from "./heartLine";
import { CarouselWrapper, Slide } from "./styled";
// Lista de imágenes
const images = [imageHeader, imageHeader2, imageHeader3, imageHeader5];

// Componente principal del carrusel
export const ImageCarousel = () => {
    const [index, setIndex] = useState(0);

    // Cambio automático cada 3 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3500); // Cambia a 10000 si quieres 10 segundos

        return () => clearInterval(timer);
    }, []);

    // Determina la posición de cada imagen
    const getPosition = (i: number): 'prev' | 'current' | 'next' | 'hidden' => {
        if (i === index) return 'current';
        if (i === (index - 1 + images.length) % images.length) return 'prev';
        if (i === (index + 1) % images.length) return 'next';
        return 'hidden';
    };

    return (
        <Wrapper>
            <HeartLineComponent />
            <SubTitleWrapper>Nuestros momentos</SubTitleWrapper>
            <CarouselWrapper>
                {images.map((img, i) => (
                    <Slide
                        key={i}
                        src={img}
                        alt={`slide-${i}`}
                        position={getPosition(i)}
                    />
                ))}
            </CarouselWrapper>
            <HeartLineComponent />
        </Wrapper>
    );
};
