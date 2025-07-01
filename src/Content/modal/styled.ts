import styled, { keyframes } from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: white;
    width: 100vw;
    height: 100vh;
    padding: 20px 20px 40px;
    position: relative;
    overflow-y: auto;
    border-radius: 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.div`
    background: transparent;
    border: none;
    font-size: 28px;
    color: #555;
    cursor: pointer;

    &:hover {
        color: #222;
    }
`;
