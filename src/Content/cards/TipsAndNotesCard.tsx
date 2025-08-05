import { useEffect, useRef, useState } from 'react';
import { Modal } from '../modal/modal';
import { Flex } from '../styled';
import { Button, Card, ChecklistContainer, ChecklistItem, ChecklistText, HeartIcon, Info, Label, Ribbon } from './styled';
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
                <Flex column gap={20}>
                    <ChecklistContainer>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Código de vestimenta:</strong> Vístete como te sientas cómodo. Lo importante es que nos acompañes en este momento tan especial.
                            </ChecklistText>
                        </ChecklistItem>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Confirmación:</strong> La opción de confirmación estará disponible hasta el 15 de septiembre. Después de este día entendemos que no podrás acompañarnos en este día tan especial.
                            </ChecklistText>
                        </ChecklistItem>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Acompañante:</strong> En el panel de confirmaciones puedes confirmar por ti y una persona más (tu acompañante) en caso de que así se haya informado.
                            </ChecklistText>
                        </ChecklistItem>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Fotos:</strong> La opción de subir fotos estará disponible a partir del 20 de octubre. Agradecemos que suban todas las fotos según la metodología para capturar todos los momentos especiales.
                            </ChecklistText>
                        </ChecklistItem>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Puntualidad:</strong> Llegar puntual a la iglesia. La misa inicia a las 4 en punto.
                            </ChecklistText>
                        </ChecklistItem>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Restricciones:</strong> A la salida de la iglesia no está permitido arrojar pétalos, arroz ni confeti.
                            </ChecklistText>
                        </ChecklistItem>
                        <ChecklistItem>
                            <HeartIcon>
                                <span className='fa fa-heart' />
                            </HeartIcon>
                            <ChecklistText>
                                <strong>Mascotas:</strong> por normas externas a nosotros no está permitido el ingreso de mascotas.
                            </ChecklistText>
                        </ChecklistItem>
                    </ChecklistContainer>
                </Flex>
            </Modal>
            <Card>
                <Ribbon>Tips y Notas </Ribbon>
                <Lottie
                    animationData={note}
                    loop
                    autoplay
                    lottieRef={lottieRef}
                    style={{ width: 100, height: 90, margin: '0 auto' }}
                />
                <Info>
                    <Label>Información adicional para tener en cuenta</Label> 
                </Info>
                <Button onClick={() => setShowModal(true)}>Ver Tips</Button>
            </Card>
        </>
    )
}
