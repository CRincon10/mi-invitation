import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import clientList from '../../assets/animations/photo.json';
import { Flex } from '../styled';
import { Button, Card, Info, Label, Ribbon } from './styled';

export const VideoAndPhotosCard = () => {
    const navigate = useNavigate();
    const currentDate = new Date();
    const availableDate = new Date('2024-10-20');
    const isAvailable = currentDate >= availableDate;

    const handleOpenPhotos = () => {
        if (isAvailable) {
            navigate('/fotos');
        }
    };

    return (
        <>
            <Flex marginTop={20}></Flex>
            <Card>
                <Ribbon>Fotos y videos</Ribbon>
                <Flex paddingBottom={20}></Flex>
                <Lottie
                    animationData={clientList}
                    loop
                    autoplay
                    style={{ width: 150, height: 70, margin: '0 auto' }}
                />
                <Info>
                    <Label>No queremos perdernos ningún momento de este hermoso día</Label>
                </Info>
                <Button 
                    id="gallery-button"
                    data-gallery-button="true"
                    onClick={handleOpenPhotos}
                >
                    {isAvailable ? "Abrir Galería" : "Ver Información"}
                </Button>
            </Card>
        </>
    );
};
