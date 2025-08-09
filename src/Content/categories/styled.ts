import styled from "styled-components";


export const CategoryContainer = styled.div`
    /* Fondo oscuro ultra sutil con gradientes */
    background: 
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
        radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.06) 0%, transparent 30%),
        linear-gradient(135deg, #0d2520 0%, #091a16 25%, #0a1e1a 50%, #061611 75%, #041209 100%) !important;
    background-color: #041209 !important;
    background-attachment: local !important;
    background-size: cover !important;
    background-image: none !important;
    background-repeat: no-repeat !important;
    
    min-height: 100vh;
    color: white;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding-bottom: 120px; /* Espacio extra para los controles de paginación */
        background: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 35%),
            linear-gradient(135deg, #0d2520 0%, #091a16 30%, #061611 70%, #041209 100%) !important;
    }
    
    * {
        box-sizing: border-box;
    }
    
    body, html {
        overflow: auto !important;
    }
`;

export const BackButton = styled.button`
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-radius: 30px;
    padding: 12px 24px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

    &:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.20);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 14px;
    }
    
    i {
        margin-right: 8px;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 30px;
    
    h1 {
        font-family: 'Great Vibes', cursive;
        font-size: 50px;
        color: #b99d79;
        margin: 0;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        
        @media (max-width: 768px) {
            margin-bottom: 6px;
        }
    }
    
    p {
        font-size: 0.95rem;
        color: #f0eae3;
        opacity: 0.9;
        line-height: 1.4;
        font-weight: 300;
        margin: 10px 0 0 0;
        
        @media (max-width: 768px) {
            font-size: 0.85rem;
        }
    }
`;

export const UploadSection = styled.div`
    background: rgba(255, 255, 255, 0.04);
    border: 2px dashed rgba(255, 255, 255, 0.12);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 30px;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    &.drag-over {
        border-color: #b99d79;
        background: rgba(185, 157, 121, 0.08);
    }
    
    &:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.18);
    }
    
    input[type="file"] {
        display: none;
    }
    
    .upload-content {
        cursor: pointer;
        
        i {
            font-size: 2rem;
            color: #b99d79;
            margin-bottom: 10px;
            display: block;
        }
        
        p {
            margin: 5px 0;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .upload-hint {
            font-size: 0.9rem;
            opacity: 0.6;
        }
    }
`;

export const PhotoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
    padding: 0 10px;
`;

export const PhotoCard = styled.div`
    position: relative;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.15);
    }
    
    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
    }
    
    &:hover img {
        transform: scale(1.05);
    }
`;

export const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 30px 0px;
    
    button {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        
        &:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
        
        &:not(:disabled):hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.15);
        }
    }
    
    .page-info {
        font-size: 14px;
        opacity: 0.8;
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const ModalButtons = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    z-index: 10000;
    
    button {
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        padding: 12px;
        border-radius: 50%;
        cursor: pointer;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        
        &:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: scale(1.1);
            border-color: rgba(255, 255, 255, 0.25);
        }
        
        i {
            font-size: 16px;
        }
    }
`;

export const ModalImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
`;

export const LoadMoreButton = styled.button`
    background: linear-gradient(135deg, #b99d79 0%, #a78564 100%);
    border: none;
    border-radius: 25px;
    padding: 12px 24px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px auto;
    display: block;
    min-width: 160px;
    font-size: 16px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(185, 157, 121, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        background: rgba(185, 157, 121, 0.5);
    }

    @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 14px;
        min-width: 140px;
    }
`;