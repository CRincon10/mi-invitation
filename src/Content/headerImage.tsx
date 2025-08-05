import styled from 'styled-components';
import headerGif from '../assets/images/hheader-image.jpg';

const HeaderContainer = styled.div<{ hidden: boolean }>`
    width: 100vw;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /* touch-action: none; //Evita zoom y scroll táctil */
`;

const HeaderImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    /* pointer-events: none;   evita interacción directa */
    /* user-select: none;      no se puede seleccionar */
    /* -webkit-user-drag: none;no se puede arrastrar */
`;

export default function HeaderImage() {
    return (
        <HeaderContainer hidden={false}>
            <HeaderImg src={headerGif} alt="Encabezado animado" />
        </HeaderContainer>
    );
}
