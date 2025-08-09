import styled from 'styled-components';

export const PhotoAppContainer = styled.div`
    /* Forzar todos los estilos de fondo */
    background: 
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.12) 0%, transparent 30%),
        linear-gradient(135deg, #0d2520 0%, #091a16 25%, #0a1e1a 50%, #061611 75%, #041209 100%) !important;
    background-color: #041209 !important;
    background-image: none !important;
    background-attachment: local !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    justify-items: center;
    
    /* Layout y posicionamiento forzado */
    min-height: 100vh !important;
    height: 100vh !important;
    width: 100vw !important;
    color: white !important;
    /* padding: 20px !important; */
    margin: 0 !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 1000 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    
    /* Reset de propiedades que podrían interferir */
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    text-align: left !important;
    font-family: inherit !important;
    
    /* Efecto de textura sutil */
    &::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: 
            radial-gradient(circle at 15% 85%, rgba(26, 59, 52, 0.3) 0%, transparent 25%),
            radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.02) 0%, transparent 35%) !important;
        pointer-events: none !important;
        z-index: 1 !important;
    }
    
    /* Todos los elementos hijos deben estar por encima del overlay */
    > * {
        position: relative !important;
        z-index: 2 !important;
    }
    
    /* Forzar estilos en diferentes elementos internos */
    *, *::before, *::after {
        box-sizing: border-box !important;
    }
    
    /* En móviles, asegurar cobertura completa */
    @media (max-width: 768px) {
        background: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.04) 0%, transparent 35%),
            linear-gradient(135deg, #0d2520 0%, #091a16 30%, #061611 70%, #041209 100%) !important;
        min-height: 100vh;
        min-height: 100dvh;
        position: fixed;
        width: 100vw;
        height: 100vh;
        height: 100dvh;
        padding-bottom: 120px;
    }
`;

export const CloseButton = styled.button`
    top: 20px;
    left: 20px;
    background: rgba(185, 157, 121, 0.9);
    border: none;
    border-radius: 25px;
    min-width: 40px;
    height: 40px;
    padding: 0 15px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    white-space: nowrap;
    gap: 8px;
    margin-bottom: 10px;

    &:hover {
        background: rgba(185, 157, 121, 1);
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        top: 15px;
        right: 15px;
        min-width: 45px;
        height: 45px;
        font-size: 16px;
        
        &:hover {
            transform: scale(1.02);
        }
    }
`;

export const BackButton = styled.button`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 25px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const AlbumHeader = styled.div`
    text-align: center;
    margin-bottom: 10px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 15px;
    backdrop-filter: blur(10px);
`;

export const AlbumTitle = styled.h2`
    color: #b99d79;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
        font-size: 1.3rem;
        gap: 8px;
        margin-bottom: 6px;
    }
`;

export const AlbumDescription = styled.p`
    color: #f0eae3;
    opacity: 0.9;
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

export const HeaderSection = styled.div`
    display: flex !important;
    flex-direction: column !important;
    text-align: center !important;
    margin-bottom: 30px !important;
    width: 100% !important;
    position: relative !important;
    z-index: 10 !important;
`;

export const HeaderImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    opacity: 0.75;
    border-radius: 0;
    border: none;
    box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.15),
        0 4px 10px rgba(0, 0, 0, 0.1),
        inset 0 -30px 60px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        height: 180px;
        margin-bottom: 15px;
        
        &::after {
            height: 40px;
        }
    }
`;

export const HeaderTitle = styled.span`
    font-family: 'Great Vibes', cursive !important;
    font-size: 50px !important;
    color: #b99d79 !important;
    margin-bottom: 8px !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
    display: block !important;
    width: 100% !important;

    @media (max-width: 768px) {
        margin-bottom: 6px !important;
    }
`;

export const HeaderSubtitle = styled.span`
    color: #f0eae3 !important;
    opacity: 0.9 !important;
    line-height: 1.4;
    font-weight: 300;
`;

export const CategoriesContainer = styled.div`
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
    gap: 20px !important;
    margin-bottom: 30px !important;
    width: 100% !important;
    position: relative !important;
    z-index: 10 !important;
    padding: 20px ;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
        gap: 15px !important;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 12px !important;
    }
`;

export const CategoryCard = styled.div<{ active?: boolean }>`
    min-width: unset;
    width: 100%;
    height: 140px;
    background: ${({ active }) => active 
        ? 'linear-gradient(135deg, #b99d79 0%, #a78564 100%) !important'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%) !important'
    };
    border-radius: 15px !important;
    padding: 20px !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    backdrop-filter: blur(20px) !important;
    border: 1px solid ${({ active }) => active ? '#b99d79' : 'rgba(255, 255, 255, 0.08)'} !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    position: relative !important;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.03) !important;

    &::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.01) 100%) !important;
        border-radius: 15px !important;
        pointer-events: none !important;
    }

    &:hover {
        transform: translateY(-5px) !important;
        box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
        background: ${({ active }) => active 
            ? 'linear-gradient(135deg, #c9a885 0%, #b8966f 100%) !important'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%) !important'
        };
        border-color: ${({ active }) => active ? '#c9a885' : 'rgba(255, 255, 255, 0.15)'} !important;
    }

    &::after {
        content: '📸' !important;
        position: absolute !important;
        top: 12px !important;
        right: 12px !important;
        font-size: 1.2rem !important;
        opacity: 0.6 !important;
        transition: all 0.3s ease !important;
    }

    &:hover::after {
        opacity: 1;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        height: 120px;
        padding: 16px;
        border-radius: 12px;
        
        &:hover {
            transform: translateY(-2px);
        }

        &::after {
            font-size: 1rem;
            top: 10px;
            right: 10px;
        }
    }
`;

export const CategoryIcon = styled.div`
    font-size: 18px !important;
    margin-bottom: 6px !important;
    color: white !important;

    @media (max-width: 768px) {
        margin-bottom: 4px !important;
    }
`;

export const CategoryName = styled.div`
    font-weight: 600 !important;
    font-size: 12px !important;
    margin-bottom: 3px !important;
    line-height: 1.2 !important;
    color: white !important;

    @media (max-width: 768px) {
        margin-bottom: 2px !important;
    }
`;

export const CategoryDescription = styled.div`
    font-size: 12px !important;
    opacity: 0.8 !important;
    line-height: 1.2 !important;
    text-align: center !important;
    color: white !important;

    @media (max-width: 768px) {
        font-size: 14px !important;
    }
`;

export const ContentSection = styled.div`
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    padding-bottom: 50px; /* Más espacio en la parte inferior */
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 30px; /* Espacio adicional al final */
`;

export const UploadArea = styled.div<{ isDragOver?: boolean }>`
    border: 2px dashed ${({ isDragOver }) => isDragOver ? '#b99d79' : 'rgba(255, 255, 255, 0.12)'};
    border-radius: 15px;
    text-align: center;
    transition: all 0.3s ease;
    background: ${({ isDragOver }) => isDragOver ? 'rgba(185, 157, 121, 0.08)' : 'transparent'};
    cursor: pointer;
    padding-bottom: 10px;

    &:hover {
        border-color: #b99d79;
        background: rgba(185, 157, 121, 0.08);
    }
`;

export const UploadIcon = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UploadText = styled.p`
    font-size: 0.95rem;
    color: #f0eae3;
    margin-bottom: 8px;
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 0.85rem;
        margin-bottom: 6px;
    }
`;

export const UploadSubtext = styled.p`
    font-size: 0.75rem;
    color: rgba(240, 234, 227, 0.8);
    font-weight: 400;

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

export const PhotoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 20px;
    padding: 10px 0;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
    }
`;

export const PhotoItem = styled.div`
    position: relative;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        border-radius: 6px;
        
        &:hover {
            transform: scale(1.01);
        }
    }
`;

export const PhotoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const PhotoOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${PhotoItem}:hover & {
        opacity: 1;
    }

    @media (max-width: 768px) {
        /* En móvil, mostrar siempre una versión sutil */
        opacity: 0;
        background: rgba(0, 0, 0, 0.4);
        
        ${PhotoItem}:active & {
            opacity: 1;
        }
    }
`;

export const PhotoActions = styled.div`
    display: flex;
    gap: 8px;

    @media (max-width: 768px) {
        gap: 6px;
    }
`;

export const ActionButton = styled.button`
    background: rgba(185, 157, 121, 0.9);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
        background: rgba(185, 157, 121, 1);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
        font-size: 14px;
        
        &:hover {
            transform: scale(1.05);
        }
    }
`;

export const LoadingSpinner = styled.div`
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 3px solid #b99d79;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const StyledButton = styled.button`
    background: linear-gradient(135deg, #b99d79 0%, #a78564 100%);
    border: none;
    border-radius: 25px;
    padding: 12px 24px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(185, 157, 121, 0.4);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: rgba(240, 234, 227, 0.7);
`;

export const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
`;

export const EmptyText = styled.p`
    font-size: 1rem;
    margin-bottom: 8px;
    font-weight: 500;
    color: rgba(240, 234, 227, 0.8);

    @media (max-width: 768px) {
        font-size: 0.9rem;
        margin-bottom: 6px;
    }
`;

export const EmptySubtext = styled.p`
    font-size: 0.85rem;
    opacity: 0.8;
    line-height: 1.4;
    font-weight: 400;
    color: rgba(240, 234, 227, 0.7);

    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

export const UploadProgress = styled.div`
    background: rgba(255, 255, 255, 0.04);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    backdrop-filter: blur(10px);
`;

export const ProgressBar = styled.div<{ progress: number }>`
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
    margin: 10px 0;

    &::after {
        content: '';
        display: block;
        height: 100%;
        width: ${({ progress }) => progress}%;
        background: linear-gradient(90deg, #b99d79, #a78564);
        transition: width 0.3s ease;
    }
`;

export const CancelButton = styled.button`
    background: rgba(255, 107, 107, 0.8);
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 107, 107, 1);
    }
`;

export const ImageModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    z-index: 20000;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
`;

export const ModalImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 90px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 20001;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.9);
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        top: 80px;
        width: 45px;
        height: 45px;
        font-size: 20px;
    }
`;

export const ModalActions = styled.div`
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
    z-index: 20002;
    
    @media (max-width: 768px) {
        top: 20px;
        gap: 10px;
    }
`;

export const ModalActionButton = styled.button`
    background: rgba(185, 157, 121, 1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    padding: 12px 20px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    min-width: 120px;
    justify-content: center;

    &:hover {
        background: rgba(195, 167, 131, 1);
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
        border-color: rgba(255, 255, 255, 0.4);
    }

    i {
        font-size: 14px;
        font-weight: 900;
    }
    
    @media (max-width: 768px) {
        padding: 10px 16px;
        font-size: 14px;
        min-width: 100px;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
    padding: 20px 0;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
    background: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0.04)' : 'rgba(185, 157, 121, 0.8)'};
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    color: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0.3)' : 'white'};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0.04)' : 'rgba(185, 157, 121, 1)'};
        transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-1px)'};
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 13px;
    }
`;

export const PaginationInfo = styled.span`
    color: #f0eae3;
    font-size: 14px;
    font-weight: 400;
    opacity: 0.8;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const BackToAppButton = styled.button`
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%) !important;
    border: 2px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 30px !important;
    padding: 12px 24px !important;
    color: white !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    backdrop-filter: blur(20px) !important;
    box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    text-align: center !important;
    justify-content: center !important;
    gap: 8px !important;
    position: relative !important;

    &::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            transparent 60%, 
            rgba(255, 255, 255, 0.02) 100%) !important;
        border-radius: 30px !important;
        pointer-events: none !important;
    }

    &:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 100%) !important;
        transform: translateY(-3px) !important;
        box-shadow: 
            0 12px 35px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.20) !important;
    }

    &:active {
        transform: translateY(-1px) !important;
    }

    @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 14px;
    }
`;

export const PhotoSkeleton = styled.div`
    position: relative;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;

    @keyframes skeleton-loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    @media (max-width: 768px) {
        border-radius: 6px;
    }
`;

export const SkeletonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 20px;
    padding: 10px 0;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
    }
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

// Componentes para el overlay de restricción
export const RestrictedOverlay = styled.div`
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.85) !important;
    backdrop-filter: blur(10px) !important;
    z-index: 9999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;
    padding: 20px !important;
`;

export const RestrictedContent = styled.div`
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%) !important;
    border: 2px solid rgba(185, 157, 121, 0.3) !important;
    border-radius: 20px !important;
    padding: 40px 30px !important;
    text-align: center !important;
    max-width: 500px !important;
    width: 100% !important;
    backdrop-filter: blur(20px) !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;

    @media (max-width: 768px) {
        padding: 30px 20px !important;
        max-width: 350px !important;
    }
`;

export const RestrictedIcon = styled.div`
    font-size: 4rem !important;
    color: #b99d79 !important;
    margin-bottom: 20px !important;
    opacity: 0.8 !important;

    @media (max-width: 768px) {
        font-size: 3rem !important;
        margin-bottom: 15px !important;
    }
`;

export const RestrictedTitle = styled.h2`
    color: #b99d79 !important;
    font-family: 'Great Vibes', cursive !important;
    font-size: 2.5rem !important;
    margin-bottom: 15px !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;

    @media (max-width: 768px) {
        font-size: 2rem !important;
        margin-bottom: 10px !important;
    }
`;

export const RestrictedSubtitle = styled.p`
    color: #f0eae3 !important;
    font-size: 1.1rem !important;
    line-height: 1.6 !important;
    margin-bottom: 20px !important;
    opacity: 0.9 !important;

    @media (max-width: 768px) {
        font-size: 1rem !important;
        margin-bottom: 15px !important;
    }
`;

export const RestrictedDate = styled.div`
    background: rgba(185, 157, 121, 0.2) !important;
    border: 1px solid rgba(185, 157, 121, 0.4) !important;
    border-radius: 15px !important;
    padding: 15px 20px !important;
    color: #b99d79 !important;
    font-weight: 600 !important;
    font-size: 1.1rem !important;
    margin-top: 20px !important;

    @media (max-width: 768px) {
        padding: 12px 15px !important;
        font-size: 1rem !important;
        margin-top: 15px !important;
    }
`;
