import React, { useEffect } from 'react';
import { ModalOverlay, ModalContent, CloseButton, StandaloneCloseButton, ModalHeader, ModalTitle } from './styled';


export interface FullScreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, children, title }) => {
    // Efecto para bloquear/desbloquear el scroll del body
    useEffect(() => {
        if (isOpen) {
            // Guardar la posición actual del scroll
            const scrollY = window.scrollY;
            
            // Bloquear el scroll del body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            // Cleanup function para restaurar el scroll
            return () => {
                // Restaurar el scroll del body
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                
                // Restaurar la posición del scroll
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {title && (
                    <ModalHeader>
                        <div style={{ width: '44px' }}></div> {/* Spacer para balance */}
                        <ModalTitle>{title}</ModalTitle>
                        <CloseButton onClick={onClose}>✖</CloseButton>
                    </ModalHeader>
                )}
                {!title && <StandaloneCloseButton onClick={onClose}>✖</StandaloneCloseButton>}
                <div style={{ 
                    padding: title ? '20px' : '20px',
                    paddingTop: title ? '0' : '60px' 
                }}>
                    {children}
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};
