import styled from 'styled-components';
import headerGif from '../assets/images/header-gif.gif';

const HeaderContainer = styled.div<{ hidden: boolean }>`
    display: flex;
    width: 100%; 
    height: 500px;
    align-items: center;
    justify-content: center;
`;

const HeaderImg = styled.img`
    width: 500px;
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
