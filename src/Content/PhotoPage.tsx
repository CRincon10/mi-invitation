import React from 'react';
import styled from 'styled-components';
import { PhotoApp } from './photoApp/PhotoApp';

const PhotoPageContainer = styled.div`
    min-height: 100vh;
    position: relative;
`;

export const PhotoPage: React.FC = () => {
    return (
        <PhotoPageContainer>
            <PhotoApp />
        </PhotoPageContainer>
    );
};