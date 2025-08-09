import React from 'react';
import styled from 'styled-components';
import { PhotoApp } from './photoApp/PhotoApp';

const PhotoPageContainer = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a3b34 0%, #0d1b0f 100%);
    
    /* Importante: sobrescribir el fondo del body */
    background-image: none !important;
    background-color: transparent !important;
`;

export const PhotoPage: React.FC = () => {
    return (
        <PhotoPageContainer>
            <PhotoApp />
        </PhotoPageContainer>
    );
};