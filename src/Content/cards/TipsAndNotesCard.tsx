import { useEffect, useRef, useState } from 'react';
import { Modal } from '../modal/modal';
import { Flex } from '../styled';
import { Button, Card, Info, Label, Ribbon } from './styled';
import Lottie from 'lottie-react';
import note from '../../assets/animations/note.json';


export const TipsAndNotesCard = () => {
    const lottieRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    if (lottieRef.current) {
      // @ts-ignore para evitar el error de typings estrictos
      lottieRef.current.setSpeed(0.5); // velocidad más lenta
    }
  }, []);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                <Flex column padding={20} gap={20}>

                </Flex>
            </Modal>
            <Card>
                <Ribbon>Tips y Notas </Ribbon>
                <Lottie
                    animationData={note}
                    loop
                    autoplay
                    lottieRef={lottieRef}
                    style={{ width: 200, height: 100, margin: '0 auto' }}
                />
                <Info>
                    <Label>Información adicional para tener en cuenta</Label> 
                </Info>
                <Button onClick={() => setShowModal(true)}>+ Info</Button>
            </Card>
        </>
    )
}
