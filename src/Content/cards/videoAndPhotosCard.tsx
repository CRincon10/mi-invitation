import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Modal } from '../modal/modal';
import { Flex } from '../styled';
import { Button, Card, Info, Label, Ribbon, SubTitle } from './styled';
import Lottie from 'lottie-react';
import clientList from '../../assets/animations/photo.json';

export const VideoAndPhotosCard = () => {
    const [showModal, setShowModal] = useState(false);

    const uploadLink = 'https://tulinkpara-subir-fotos.com'; // <-- Reemplaza con tu link real

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Flex column padding={20} gap={20} alignCenter justifyCenter>
                    {/* <SubTitle>Escanea este código QR</SubTitle>
                    <QRCodeSVG
                        value={uploadLink}
                        size={200}
                        fgColor="#1a1641"
                        bgColor="#fef9f6"
                        level="H"
                    />
                    <Label>O toca el botón para abrir directamente</Label>
                    <Button onClick={() => window.open(uploadLink, '_blank')}>
                        Ir a la galería
                    </Button> */}
                    <span style={{ 
                        fontSize: "25px", 
                        marginTop: "10px", 
                        textAlign: "center", 
                    }}>
                        A partir del 20 de octubre estará disponible la aplicación para que todos subamos las fotos de los momentos importantes y entre todos podamos compartirlas sin perdernos nada.
                    </span>
                </Flex>
            </Modal>
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
                <Button onClick={() => setShowModal(true)}>Subir fotos</Button>
            </Card>
        </>
    );
};
