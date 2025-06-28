import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useIsMobileListener } from "../listener";
import { ImageCarousel } from "./carouselImage";
import {
    Button,
    Circle,
    CloseButton,
    Container,
    ContainerContent,
    Flex,
    Footer,
    IconsContainer,
    InputApp,
    ModalContent,
    ModalOverlay,
    TitleContent,
    WeddingRingForeground,
    WeddingRingImage
} from "./styled";
import { WeddingCountdown } from "./WeddingCountdown";
import weddingRings from "../assets/images/wedding-rings-o.jpg";
export interface ConfirmedDataState {
    id: string;
    nombre: string;
    asiste: boolean;
    fechaConfirmacion: any;
    acompanante: boolean;
    nombreAcompanante: string | null;
}

export default function Invitacion() {
    const isMobile = useIsMobileListener();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirm, setConfirm] = useState<boolean>();
    const [name, setName] = useState("");
    const [companion, setCompanion] = useState("");
    const [confirmCompanion, setConfirmCompanion] = useState(false);
    const [loading, setLoading] = useState(false);
    const isButtonDisabled = !name || confirm === undefined;
    const [confirmedData, setConfirmedData] = useState<ConfirmedDataState>();
    const [docId, setDocId] = useState<string | null>(null);

    useEffect(() => {
        // Verifica si ya hay una confirmación guardada en localStorage
        const storedConfirmation = localStorage.getItem("confirmacion_matrimonio");
        if (storedConfirmation) {
            const data = JSON.parse(storedConfirmation);
            setConfirmedData(data);
            setDocId(data.id || null); // Recupera el ID si existe
        }
    }, []);

    const handleConfirm = async () => {
        if (!name || confirm === undefined) return;

        const confirmationData = {
            nombre: name,
            asiste: confirm,
            fechaConfirmacion: new Date(),
            acompanante: !!companion,
            nombreAcompanante: companion || null,
        };

        setLoading(true);
        try {
            if (docId) {
                // Si ya existe un ID, actualiza el documento
                const docRef = doc(db, "confirmaciones", docId);
                await updateDoc(docRef, confirmationData);
            } else {
                // Si no hay ID, crea un nuevo documento y guarda su ID
                const docRef = await addDoc(collection(db, "confirmaciones"), confirmationData);
                const newId = docRef.id;

                // Agregar el ID a los datos y guardarlos en localStorage
                const updatedData = { ...confirmationData, id: newId };
                localStorage.setItem("confirmacion_matrimonio", JSON.stringify(updatedData));

                setDocId(newId);
                setConfirmedData(updatedData);
            }

            alert("Confirmación enviada con éxito");
            setOpenConfirm(false);
        } catch (error) {
            console.error("Error al guardar la confirmación:", error);
            alert("Hubo un error, intenta nuevamente.");
        }
        setLoading(false);
    };

    return (
        <Container className="content-invitation">
            {openConfirm && (
                <ModalOverlay className={isMobile ? "isMobile" : ""} onClick={() => setOpenConfirm(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <Flex paddingRight={5}>
                            <CloseButton onClick={() => setOpenConfirm(false)}>✖</CloseButton>
                        </Flex>
                        {confirmedData ?
                            <Flex column padding={20}>
                                <span className="color-app" style={{ fontSize: "40px" }}>
                                    {confirmedData.nombre}{confirmedData.nombreAcompanante ? ` y ${confirmedData.nombreAcompanante}` : ""}, gracias por confirmar tu asistencia.
                                </span>
                                <span style={{ fontSize: "22px", marginTop: "20px" }} className="color-app">
                                    {confirmedData.asiste
                                        ? "Estamos muy felices de poder compartir este día tan especial contigo."
                                        : "Lamentamos que no puedas asistir, pero sabemos que estarás con nosotros en espíritu."}
                                </span>
                            </Flex>
                            : (
                                <Flex column paddingRight={20} paddingBottom={50} paddingLeft={20} spaceBetween>
                                    <Flex column gap20>
                                        <span className="color-app" style={{ fontSize: isMobile ? "40px" : "35px" }}>Asistes a la ceremonia?</span>
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
                                            <InputApp
                                                className="input-confirmation"
                                                type="text"
                                                placeholder="Nombre completo"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            {/* Checkbox para confirmar por acompañante */}
                                            <Flex alignCenter gap10>
                                                <input
                                                    type="checkbox"
                                                    id="acompanante"
                                                    checked={confirmCompanion}
                                                    onChange={(e) => setConfirmCompanion(e.target.checked)}
                                                />
                                                <label htmlFor="acompanante" style={{ fontSize: "18px" }} className="color-app">
                                                    Confirmar por acompañante
                                                </label>
                                            </Flex>

                                            {/* Input adicional si se confirma por acompañante */}
                                            {confirmCompanion && (
                                                <InputApp
                                                    className="input-confirmation"
                                                    type="text"
                                                    placeholder="Nombre del acompañante o pareja"
                                                    value={companion}
                                                    onChange={(e) => setCompanion(e.target.value)}
                                                />
                                            )}
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
                                        <Button className={isButtonDisabled ? "disabled" : ""} disabled={isButtonDisabled} onClick={() => handleConfirm()} style={{ marginTop: "20px" }}>
                                            {loading ? "Enviando..." : "Enviar Respuesta"}
                                        </Button>
                                    </Flex>
                                </Flex>
                            )}
                    </ModalContent>
                </ModalOverlay>
            )}
            <Flex padding={10} column alignCenter justifyCenter style={{ position: "relative", overflow: "hidden" }}>
                <WeddingRingImage src={weddingRings} alt="Anillos de boda difuminados" />
                <WeddingRingForeground src={weddingRings} alt="Anillos de boda" />
            </Flex>

            <TitleContent className={`${isMobile ? "isMobile" : ""}`}>
                <Flex gap15 className="names">
                    <span className="bride-name">Mariana</span>
                    <span className="ampersand">&</span>
                    <span className="groom-name">Cristian</span>
                </Flex>
            </TitleContent>
            <Flex column gap10 alignCenter justifyCenter maxWidth={320} style={{ textAlign: "center", margin: "0 auto" }}>
                <span>¡Nos casamos! </span>
                <span> Estamos felices de comenzar esta nueva aventura juntos y queremos celebrarlo contigo. </span>
            </Flex>


            <ImageCarousel />
            <WeddingCountdown />



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
                <span>El color blanco se reserva para la novia</span>
            </ContainerContent>
            {/* <ContainerContent className={isMobile ? "isMobile" : ""}> */}
            <Flex alignCenter justifyCenter maxWidth={500}>
                <span>
                    “No me ruegues que te deje y que me aparte de ti, porque a dondequiera que tú vayas, yo iré; y dondequiera que tú vivas, yo viviré. Tu pueblo será mi pueblo, y tu Dios será mi Dios.”
                </span>
            </Flex>
            <Footer>
                <Flex>
                    -
                </Flex>
            </Footer>
        </Container>
    );
}
