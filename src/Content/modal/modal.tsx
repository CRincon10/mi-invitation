import React, { useEffect } from 'react';
import { Flex } from '../styled';
import { ModalOverlay, ModalContent, CloseButton } from './styled';


export interface FullScreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Flex cursorPointer justifyEnd alignEnd onClick={onClose}>
                    <CloseButton>✖</CloseButton>
                </Flex>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};
