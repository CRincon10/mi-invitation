import React, { useState } from 'react'
import { Modal } from '../modal/modal'
import { Flex, SubTitleWrapper } from '../styled';
import { Button, Card, Info, Label, Title } from './styled';


export const TipsAndNotesCard = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                <Flex column padding={20} gap={20}>

                </Flex>
            </Modal>
            <Card>
                <Title>Tips y Notas </Title>
                <Flex alignCenter justifyCenter marginTop={30} marginBottom={30}>
                    <span className='fas fa-pen-to-square mt-2' style={{fontSize: "40px"}} />
                </Flex>
                <Info>
                    <Label>Información adicional para tener en cuenta</Label> 
                </Info>
                <Button onClick={() => setShowModal(true)}>+ Info</Button>
            </Card>
        </>
    )
}
