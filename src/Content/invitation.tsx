import { useState } from "react";
import anillos from "../assets/images/anillos.jpg";
import { useIsMobileListener } from "../listener";
import { Button, Circle, CloseButton, Container, ContainerContent, ContentCenter, DescriptionText, Flex, Footer, IconsContainer, ImageContent, Input, ModalContent, ModalOverlay, TitleContent } from "./styled";


export default function Invitacion() {
    const isMobile = useIsMobileListener();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirm, setConfirm] = useState<boolean>();
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");

    return (
        <Container>
            {openConfirm && (
                <ModalOverlay onClick={() => setOpenConfirm(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setOpenConfirm(false)}>✖</CloseButton>
                        <Flex column paddingRight={20} paddingBottom={50} paddingLeft={20} spaceBetween h100 >
                            <Flex column gap20>
                                <h2 className="color-app" style={{ fontSize: "40px" }}>Asites a la ceremonia?</h2>
                                <Flex spaceBetween>
                                    <Flex alignCenter gap10>
                                        <Circle onClick={() => setConfirm(true)} selected={confirm === true}>✔</Circle>
                                        <span style={{ fontSize: "22px" }} className="color-app">¡Sí! Confirmo</span>
                                    </Flex>
                                    <Flex alignCenter gap10>
                                        <Circle onClick={() => setConfirm(false)} selected={confirm === false}>✖</Circle>
                                        <span style={{ fontSize: "22px" }} className="color-app">No puedo :(</span>
                                    </Flex>
                                </Flex>

                                <Flex column gap10>
                                    <Input
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Datos importantes (Ej: Llevo pareja)"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                </Flex>
                                {confirm && <Flex gap10 w100>
                                    <i className="fa-regular fa-envelope color-app" style={{ fontSize: "60px" }} />
                                    <Flex flexWrap justifyCenter textAlignCenter>
                                        <span style={{ fontSize: "18px" }} className="color-app">Más que regalos materiales, queremos iniciar nuestro hogar con mucho amor y bendiciones. Si deseas obsequiarnos algo, una lluvia de sobres será bienvenida con el corazón.</span>
                                    </Flex>
                                </Flex>
                                }
                            </Flex>
                            <Flex>
                                <Button disabled onClick={() => setOpenConfirm(false)} style={{ marginTop: "20px" }}>
                                    Enviar
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalContent>
                </ModalOverlay>
            )}
            <TitleContent className={`${isMobile ? "isMobile" : ""} title`}>
                <span>Juan Camilo Rincón</span>
                <div className="row">
                    <span className="mr-2">&</span>
                    <span className="mt-1">Laura Córdoba</span>
                </div>
            </TitleContent>
            <div >
                <ImageContent src={anillos} alt="anillos" className={isMobile ? "isMobile" : ""} />
            </div>
            <ContentCenter className={isMobile ? "isMobile" : ""}>
                <span>
                    Nos sentimos muy felices de compartir nuestro matrimonio con la bendición de Dios y deseamos que seas partícipe de este día tan especial.
                </span>
            </ContentCenter>

            <IconsContainer className={isMobile ? "isMobile" : ""}>
                <Flex w100 column gap={20} className="icons" padding={20} borderRadius={10}>
                    <span className="color-gold" style={{ fontSize: "30px", fontWeight: "500" }}>Ceremonia</span>
                    <Flex column gap10 alignCenter w100 h100 minHeight={180}>
                        <i className="fa-regular fa-calendar custom-icon" />
                        <Flex flexWrap justifyCenter textAlignCenter>
                            <span className="color-gold">Domingo 01 de Junio 2025</span>
                        </Flex>
                    </Flex>
                    <Flex w100 h100 minHeight={180}>
                        <a
                            href="https://maps.google.com?q=Carrera+40A+46E+Sur+Envigado,+Antioquia"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }} // Evita cambios de estilo no deseados
                        >
                            <Flex column alignCenter justifyCenter gap10 cursorPointer h100 minHeight={150}>
                                <i className="fa-solid fa-church custom-icon" />
                                <Flex flexWrap justifyCenter alignCenter style={{ textAlign: "center" }}>
                                    <span style={{ color: "#b19776", textDecoration: "underline" }}>Parroquia San Ignacio de Antioquia - Carrera 40A  46E Sur.</span>
                                </Flex>
                            </Flex>
                        </a>
                    </Flex>
                    <Flex column justifyCenter gap10 alignCenter w100 h100 >
                        <i className="fa-regular fa-clock custom-icon" />
                        <Flex flexWrap justifyCenter textAlignCenter>
                            <span className="color-gold">2:30 pm</span>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w100 column gap={20} className="icons" padding={20} borderRadius={10}>
                    <span className="color-app" style={{ fontSize: "30px", fontWeight: "500" }}>Brindis</span>
                    <Flex column alignCenter justifyCenter gap10 w100 h100 minHeight={160}>
                        <i className="fa-solid fa-martini-glass-empty secondary-icons"></i>
                        <Flex w100 flexWrap justifyCenter alignCenter style={{ textAlign: "center" }}>
                            <span className="color-app">Esclavas Misioneras del Santísimo Sacramento</span>
                        </Flex>
                    </Flex>
                    <Flex w100 h100 minHeight={200}>
                        <a
                            href="https://maps.google.com?q=Cl+48C+Sur+%23+6,+Zona+7,+Envigado,+Antioquia"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Flex column marginTop={10} alignCenter gap10 cursorPointer h100>
                                <i className="fa-regular fa-location-dot secondary-icons" />
                                <Flex flexWrap justifyCenter alignCenter style={{ textAlign: "center" }} >
                                    <span style={{ color: "#747567", textDecoration: "underline" }}>Cl 48C Sur # 6, Zona 7, Envigado, Antioquia</span>
                                </Flex>
                            </Flex>
                        </a>
                    </Flex>
                    <Flex column justifyCenter gap10 alignCenter w100 h100 >
                        <i className="fa-regular fa-clock secondary-icons" />
                        <Flex flexWrap justifyCenter textAlignCenter>
                            <span className="color-app">5:00 pm</span>
                        </Flex>
                    </Flex>
                </Flex>
            </IconsContainer>
            <Flex w100 padding={20}>
                <Button onClick={() => setOpenConfirm(true)} className="button">
                    <span>Confirmar asistencia</span>
                </Button>
            </Flex>

            <ContainerContent className={isMobile ? "isMobile" : ""}>
                <DescriptionText className={isMobile ? "isMobile" : ""}>El color blanco se reserva para la novia</DescriptionText>
            </ContainerContent>
            {/* <ContainerContent className={isMobile ? "isMobile" : ""}> */}
            <ContentCenter className={isMobile ? "isMobile" : ""}>
                <span>
                    “No me ruegues que te deje y que me aparte de ti, porque a dondequiera que tú vayas, yo iré; y dondequiera que tú vivas, yo viviré. Tu pueblo será mi pueblo, y tu Dios será mi Dios.”
                </span>
            </ContentCenter>
            <Footer>
                <Flex>
                    -
                </Flex>
            </Footer>
        </Container>
    );
}
