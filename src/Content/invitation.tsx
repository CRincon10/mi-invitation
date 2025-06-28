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
    ContentInfo,
    Flex,
    Footer,
    InputApp,
    ModalContent,
    ModalOverlay,
    TitleContent
} from "./styled";
import { WeddingCountdown } from "./WeddingCountdown";
import MusicPlayer from "./musicPlayer";
import family from "../assets/images/family.jpg";

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
            <ImageCarousel />
            <TitleContent className={`${isMobile ? "isMobile" : ""}`}>
                <Flex gap15 className="names">
                    <span className="bride-name">Mariana</span>
                    <span className="ampersand">&</span>
                    <span className="groom-name">Cristian</span>
                </Flex>
            </TitleContent>
            <Flex column gap10 alignCenter justifyCenter maxWidth={340} style={{ textAlign: "center", margin: "0 auto" }}>
                <span>¡Nos casamos! </span>
                <span> Estamos felices de comenzar esta nueva etapa juntos y queremos celebrarlo contigo. </span>
            </Flex>
            <WeddingCountdown />
            <ContentInfo className={isMobile ? "isMobile" : ""}>
                <span style={{paddingTop: "20px", paddingBottom: "20px"}} className=" bold">Ceremonia</span>
                <Flex gap15 alignCenter >
                    <span style={{ fontSize: "35px" }} className="fa-regular fa-calendar " />
                    <span className=" text-small">Sábado 01 de Noviembre </span>
                </Flex>
                <Flex alignCenter gap15 >
                    <span style={{ fontSize: "30px" }} className="fa-regular fa-clock " />
                    <span className=" text-small">4:00 pm</span>
                </Flex>
                <Flex gap10 alignCenter>
                    <a
                        href="https://www.google.com/maps/place/Parroquia+Santa+Mar%C3%ADa+de+Los+%C3%81ngeles/@6.1909884,-75.58416,17z/data=!3m1!4b1!4m6!3m5!1s0x8e468360f9758e77:0x6f0e4b95b313d3c1!8m2!3d6.1909831!4d-75.5792891!16s%2Fg%2F1tc_547g?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }} // Evita cambios de estilo no deseados
                    >
                        <Flex alignCenter gap10 cursorPointer>
                            <span style={{ fontSize: "28px" }} className="fa-solid fa-church " />
                            <span className=" text-small" style={{ textDecoration: "underline" }}>Parroquia Santa Maria de los Angeles - Poblado.</span>
                        </Flex>
                    </a>
                </Flex>
                    <span style={{paddingTop: "20px", paddingBottom: "20px"}} className="mt-2 bold">Recepción</span>
                    <Flex alignCenter gap15>
                        <span style={{ fontSize: "28px" }} className="fa-solid fa-martini-glass-empty" />
                        <span className="text-small">Centro de eventos envigado</span>
                    </Flex>
                    <Flex gap20 alignCenter>
                        <span style={{ fontSize: "28px" }}  className="fa-regular fa-clock" />
                        <span className="text-small">7:00 pm</span>
                    </Flex>
                    <Flex gap10 alignCenter>
                        <a
                            href="https://www.google.com/maps?rlz=1C1RXQR_enCO1122CO1122&vet=12ahUKEwiKkYD5z5OOAxXpSzABHTywNf4Q8UF6BAgkEAM..i&lei=5p1faIqGJemXwbkPvODW8Q8&cs=0&um=1&ie=UTF-8&fb=1&gl=co&sa=X&geocode=KY26xciCg0aOMR5BweR5ReJ7&daddr=Cl.+40+Sur+%2324-13,+Zona+6,+Envigado,+Antioquia"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Flex alignCenter gap20 cursorPointer>
                                <span style={{ fontSize: "28px" }} className="fa-solid fa-play" />
                                <span className="text-small" style={{ textDecoration: "underline" }}>Cl 48C Sur # 6, Zona 7, Envigado, Antioquia</span>
                            </Flex>
                        </a>
                    </Flex>
                    
            </ContentInfo>
            <Flex w100 padding={20}>
                <Button onClick={() => setOpenConfirm(true)} className="button">
                    <span>Confirmar asistencia</span>
                </Button>
            </Flex>

            <Flex alignCenter justifyCenter maxWidth={500} padding={20}>
                <span style={{ fontSize: "20px", textAlign: "center" }}>
                    “El amor es una parte del alma misma, es de la misma naturaleza que ella, es una chispa divina; como ella, es incorruptible, indivisible, imperecedero. Es una partícula de fuego que está en nosotros, que es inmortal e infinita, a la cual nada puede limitar, ni amortiguar”.
                </span>
            </Flex>
            <Footer>
                <Flex column alignCenter justifyCenter gap={10}>
                    <img
                        src={family}
                        alt="Nuestra familia"
                        style={{
                            maxWidth: "100%",
                            width: "400px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            objectFit: "cover"
                        }}
                    />
                </Flex>
            </Footer>
            <MusicPlayer />
        </Container>
    );
}
