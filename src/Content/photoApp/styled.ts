import styled from 'styled-components';

export const PhotoAppContainer = styled.div`
    background: linear-gradient(135deg, #1a3b34 0%, #0d1b0f 100%);
    min-height: 100vh;
    height: 100vh;
    color: white;
    overflow-y: auto;
    position: relative;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling en iOS */

    @media (max-width: 768px) {
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
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

export const AlbumHeader = styled.div`
    text-align: center;
    margin-bottom: 10px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
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
    text-align: center;
    margin-bottom: 30px;
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
    font-family: 'Great Vibes', cursive;
    font-size: 40px;
    color: #b99d79;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        margin-bottom: 6px;
    }
`;

export const HeaderSubtitle = styled.p`
    font-size: 0.95rem;
    color: #f0eae3;
    opacity: 0.9;
    line-height: 1.4;
    font-weight: 300;

    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

export const CategoriesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    padding: 10px 0;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
`;

export const CategoryCard = styled.div<{ active?: boolean }>`
    min-width: unset;
    width: 100%;
    height: 140px;
    background: ${({ active }) => active 
        ? 'linear-gradient(135deg, #b99d79 0%, #a78564 100%)'
        : 'rgba(255, 255, 255, 0.08)'
    };
    border-radius: 15px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(15px);
    border: 1px solid ${({ active }) => active ? '#b99d79' : 'rgba(255, 255, 255, 0.15)'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
        background: ${({ active }) => active 
            ? 'linear-gradient(135deg, #c9a885 0%, #b8966f 100%)'
            : 'rgba(255, 255, 255, 0.12)'
        };
        border-color: ${({ active }) => active ? '#c9a885' : 'rgba(255, 255, 255, 0.25)'};
    }

    &::after {
        content: '📸';
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 1.2rem;
        opacity: 0.6;
        transition: all 0.3s ease;
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
    font-size: 1.5rem;
    margin-bottom: 6px;

    @media (max-width: 768px) {
        font-size: 1.3rem;
        margin-bottom: 4px;
    }
`;

export const CategoryName = styled.div`
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 3px;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 0.75rem;
        margin-bottom: 2px;
    }
`;

export const CategoryDescription = styled.div`
    font-size: 0.7rem;
    opacity: 0.8;
    line-height: 1.2;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.65rem;
    }
`;

export const ContentSection = styled.div`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const UploadArea = styled.div<{ isDragOver?: boolean }>`
    border: 2px dashed ${({ isDragOver }) => isDragOver ? '#b99d79' : 'rgba(255, 255, 255, 0.3)'};
    border-radius: 15px;
    text-align: center;
    transition: all 0.3s ease;
    background: ${({ isDragOver }) => isDragOver ? 'rgba(185, 157, 121, 0.1)' : 'transparent'};
    cursor: pointer;
    padding-bottom: 10px;

    &:hover {
        border-color: #b99d79;
        background: rgba(185, 157, 121, 0.1);
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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    backdrop-filter: blur(10px);
`;

export const ProgressBar = styled.div<{ progress: number }>`
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
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
    top: 20px;
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
`;

export const ModalActions = styled.div`
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
`;

export const ModalActionButton = styled.button`
    background: rgba(185, 157, 121, 0.9);
    border: none;
    border-radius: 25px;
    padding: 12px 20px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: rgba(185, 157, 121, 1);
        transform: translateY(-2px);
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
    background: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(185, 157, 121, 0.8)'};
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    color: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0.4)' : 'white'};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: ${({ disabled }) => disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(185, 157, 121, 1)'};
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
    background: linear-gradient(135deg, #2d4a3a 0%, #1a3b34 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    padding: 12px 24px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;

    &:hover {
        background: linear-gradient(135deg, #1a3b34 0%, #0d2a24 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(0);
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
