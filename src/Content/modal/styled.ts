import styled from "styled-components";
import texture from "../../assets/images/fondoMatrimonio.jpg";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: contain;
`;

export const ModalContent = styled.div`
    background-image: url(${texture});
    background-size: 400px 400px;
    background-repeat: repeat;
    background-position: center;
    background-color: #fffefdff;
    width: 100vw;
    height: 100vh;
    padding: 0;
    position: relative;
    overflow-y: auto;
    border-radius: 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    
    /* Mejorar scroll en móviles y prevenir scroll chaining */
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    touch-action: pan-y;
`;

export const CloseButton = styled.div`
    background: rgba(177, 176, 176, 0.8);
    border: none;
    font-size: 20px;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1002;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    
    &:hover {
        background: rgba(85, 85, 85, 0.9);
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    /* Transición suave */
    transition: all 0.2s ease;
`;

export const StandaloneCloseButton = styled(CloseButton)`
    position: fixed;
    top: 20px;
    right: 20px;
`;

export const ModalHeader = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-image: url(${texture});
    background-size: 400px 400px;
    background-repeat: repeat;
    background-position: center;
    background-color: transparent;
    border-bottom: 2px solid #e6d9c9ff;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1001;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h2`
    color: #b99d79;
    font-family: "Great Vibes", cursive;
    font-size: 38px;
    margin: 0;
    text-align: center;
    flex: 1;
    font-weight: 400;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
