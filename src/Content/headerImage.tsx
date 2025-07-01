import styled from 'styled-components';
import headerGif from '../assets/images/header-gif.gif';

const HeaderContainer = styled.div<{ hidden: boolean }>`
    width: 100vw;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const HeaderImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
`;

export default function HeaderImage() {
    return (
        <HeaderContainer hidden={false}>
            <HeaderImg src={headerGif} alt="Encabezado animado" />
        </HeaderContainer>
    );
}
