import { useState } from 'react';
import { Modal } from '../modal/modal';
import { Flex } from '../styled';
import { Button, Card, Info, Label, SubTitle } from './styled';


export const TipsAndNotesCard = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                <Flex column padding={20} gap={20}>

                </Flex>
            </Modal>
            <Card>
                <SubTitle>Tips y Notas </SubTitle>
                <Flex alignCenter justifyCenter marginTop={30} marginBottom={30}>
                    <span className='fas fa-pen-to-square mt-1' style={{fontSize: "40px"}} />
                </Flex>
                <Info>
                    <Label>Información adicional para tener en cuenta</Label> 
                </Info>
                <Button onClick={() => setShowModal(true)}>+ Info</Button>
            </Card>
        </>
    )
}
