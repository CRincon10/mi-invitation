import React, { useState } from 'react';
import { Modal } from '../modal/modal';
import { Flex, SubTitleWrapper } from '../styled';
import { Button, Card, Info, Label, Title } from './styled';
import { QRCodeSVG } from 'qrcode.react';

export const VideoAndPhotosCard = () => {
    const [showModal, setShowModal] = useState(false);

    const uploadLink = 'https://tulinkpara-subir-fotos.com'; // <-- Reemplaza con tu link real

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Flex column padding={20} gap={20} alignCenter justifyCenter>
                    <Title>Escanea este código QR</Title>
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
                    </Button>
                </Flex>
            </Modal>

            <Card>
                <Title>Comparte tus Fotos y videos de la boda aquí</Title>
                <Flex alignCenter justifyCenter marginTop={30} marginBottom={30}>
                    <QRCodeSVG
                        value={uploadLink}
                        size={120}
                        fgColor="#ffffff"
                        bgColor="#1a1641"
                        level="H"
                    />
                </Flex>
                <Info>
                    <Label>No queremos perdernos ningún momento de este hermoso día</Label>
                </Info>
                <Button onClick={() => setShowModal(true)}>Subir fotos</Button>
            </Card>
        </>
    );
};
