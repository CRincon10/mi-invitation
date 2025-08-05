import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../styled';
import { Button, Card, Info, Label, Ribbon } from './styled';
import Lottie from 'lottie-react';
import clientList from '../../assets/animations/photo.json';

export const VideoAndPhotosCard = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const currentDate = new Date();
    const availableDate = new Date('2024-10-20');
    const isAvailable = currentDate >= availableDate;

    const handleOpenPhotos = () => {
        if (isAvailable) {
            navigate('/fotos');
        } else {
            setShowModal(true);
        }
    };

    return (
        <>
            {showModal && !isAvailable && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 10000,
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        padding: '40px',
                        borderRadius: '15px',
                        maxWidth: '90vw',
                        textAlign: 'center'
                    }}>
                        <button 
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>
                        
                    </div>
                </div>
            )}
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
                <Button onClick={handleOpenPhotos}>
                    {isAvailable ? "Abrir Galería" : "Ver Información"}
                </Button>
            </Card>
        </>
    );
};
