import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../firebaseConfig";
import { Button, Label } from './cards/styled';
import HeartLineComponent from './heartLine';
import { Modal } from './modal/modal';
import { Circle, Flex, InputApp, Wrapper } from './styled';
import { showWeddingConfirmAlert, showRegretAlert, showErrorAlert } from '../utils/alerts';


export interface ConfirmedDataState {
    id: string;
    nombre: string;
    fechaConfirmacion: any;
    acompanante: boolean;
    nombreAcompanante: string | null;
    asisteCeremonia: boolean;
    asisteRecepcion: boolean;
}

interface ConfirmState {
    asisteCeremonia: boolean;
    asisteRecepcion: boolean;
}

export const Confirmation = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmedData, setConfirmedData] = useState<ConfirmedDataState>();
    const [docId, setDocId] = useState<string | null>(null);
    const [confirm, setConfirm] = useState<ConfirmState>({
        asisteCeremonia: false,
        asisteRecepcion: false
    });
    const [name, setName] = useState("");
    const [companion, setCompanion] = useState("");
    const [confirmCompanion, setConfirmCompanion] = useState(false);
    const [loading, setLoading] = useState(false);
    const isButtonDisabled = !name || !name.trim() || (confirmCompanion && (!companion || !companion.trim()));

    useEffect(() => {
        // Verifica si ya hay una confirmación guardada en localStorage
        const storedConfirmation = localStorage.getItem("confirmacion_matrimonio");
        if (storedConfirmation) {
            const data = JSON.parse(storedConfirmation);
            setConfirmedData(data);
            setDocId(data.id || null); // Recupera el ID si existe
        }
        setConfirmCompanion(false);
    }, []);

    const handleConfirm = async () => {
        if (!name || confirm === undefined) return;

        const confirmationData = {
            nombre: name,
            fechaConfirmacion: new Date(),
            acompanante: !!companion,
            nombreAcompanante: companion || null,
            asisteCeremonia: confirm.asisteCeremonia,
            asisteRecepcion: confirm.asisteRecepcion,
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

            // Mostrar alerta personalizada según asistencia
            if (confirm.asisteCeremonia || confirm.asisteRecepcion) {
                await showWeddingConfirmAlert(name);
            } else {
                await showRegretAlert(name);
            }
            setOpenConfirm(false);
        } catch (error) {
            showErrorAlert("Error al confirmar", "Hubo un problema al guardar tu confirmación. Intenta nuevamente.");
        }
        setLoading(false);
    };

    return (
        <Wrapper>
            {openConfirm && (
                <Modal isOpen={openConfirm} onClose={() => setOpenConfirm(false)} title="Confirmación">
                    <Flex column onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                        {confirmedData ?
                            <Flex column padding={20}>
                                <span className="color-app" style={{ fontSize: "40px" }}>
                                    {confirmedData.nombre}{confirmedData.nombreAcompanante ? ` y ${confirmedData.nombreAcompanante}` : ""}, gracias por confirmar tu asistencia.
                                </span>
                                <span style={{ fontSize: "22px", marginTop: "20px" }} className="color-app">
                                    {confirmedData.asisteCeremonia || confirmedData.asisteRecepcion
                                        ? "Estamos muy felices de poder compartir este día tan especial contigo."
                                        : "Lamentamos que no puedas asistir, pero sabemos que estarás con nosotros en espíritu."}
                                </span>
                            </Flex>
                            : (
                                <Flex column paddingRight={10} paddingBottom={50} paddingLeft={10} spaceBetween>
                                    <Flex column gap10 marginTop={20}>
                                        <span>Compartenos tus datos personales para la confirmación:</span>
                                        <InputApp
                                            className="input-confirmation"
                                            type="text"
                                            placeholder="Nombre completo"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            // autoFocus
                                            style={{ fontSize: "18px" }}
                                        />
                                        <Flex alignCenter gap10>
                                            <div style={{ position: 'relative', display: 'inline-block', marginTop: '8px' }}>
                                                <input
                                                    type="checkbox"
                                                    id="acompanante"
                                                    checked={confirmCompanion}
                                                    onChange={(e) => setConfirmCompanion(e.target.checked)}
                                                    style={{
                                                        appearance: 'none',
                                                        width: '20px',
                                                        height: '20px',
                                                        border: '2px solid #b99d79',
                                                        borderRadius: '4px',
                                                        backgroundColor: confirmCompanion ? '#b99d79' : 'transparent',
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                                {confirmCompanion && (
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '2px',
                                                        left: '5px',
                                                        color: 'white',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        pointerEvents: 'none'
                                                    }}>✓</span>
                                                )}
                                            </div>
                                            <label
                                                htmlFor="acompanante"
                                                style={{
                                                    fontSize: "18px",
                                                    cursor: "pointer",
                                                    userSelect: "none",
                                                    padding: "5px 0"
                                                }}
                                                className="color-app"
                                            >
                                                Confirmar por mi acompañante
                                            </label>
                                        </Flex>
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
                                    <Flex column gap20 marginTop={30} alignStart>
                                        <span className="color-app" style={{ fontSize: "22px" }}>{`- ${confirmCompanion ? "Asisten" : "Asistes"} a la ceremonia?`}</span>
                                        <Flex spaceBetween gap20 column>
                                            <Flex alignCenter gap10 onClick={() => setConfirm({ ...confirm, asisteCeremonia: true })}>
                                                <Circle selected={confirm?.asisteCeremonia === true}>✔</Circle>
                                                <span style={{ fontSize: "18px" }} className="color-app">{`${confirmCompanion ? "¡Sí! Confirmamos" : "¡Sí! Confirmo."}`}</span>
                                            </Flex>
                                            <Flex alignCenter gap10 onClick={() => setConfirm({ ...confirm, asisteCeremonia: false })}>
                                                <Circle selected={confirm.asisteCeremonia === false}>✖</Circle>
                                                <span style={{ fontSize: "18px" }} className="color-app">{`${confirmCompanion ? "¡No! No podemos : (" : "¡No! No puedo : ("}`}</span>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex column gap20 marginTop={30} alignStart>
                                        <span className="color-app" style={{ fontSize: "22px" }}>{`- ${confirmCompanion ? "Asisten" : "Asistes"} a la recepción?`}</span>
                                        <Flex spaceBetween column gap20>
                                            <Flex alignCenter gap10 onClick={() => setConfirm({ ...confirm, asisteRecepcion: true })}>
                                                <Circle selected={confirm.asisteRecepcion === true}>✔</Circle>
                                                <span style={{ fontSize: "18px" }} className="color-app">{`${confirmCompanion ? "¡Sí! Confirmamos" : "¡Sí! Confirmo."}`}</span>
                                            </Flex>
                                            <Flex alignCenter gap10 onClick={() => setConfirm({ ...confirm, asisteRecepcion: false })}>
                                                <Circle selected={confirm.asisteRecepcion === false}>✖</Circle>
                                                <span style={{ fontSize: "18px" }} className="color-app">{`${confirmCompanion ? "¡No! No podemos : (" : "¡No! No puedo : ("}`}</span>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    {confirm.asisteRecepcion &&
                                        <Flex gap10 w100 marginTop={50} column alignCenter>
                                            <i className="fa-regular fa-envelope color-app" style={{ fontSize: "60px" }} />
                                            <Flex flexWrap justifyCenter textAlignCenter>
                                                <span style={{ fontSize: "18px" }} className="color-app">
                                                    Nuestro mayor deseo es compartir este día tan especial contigo. Tu presencia es el mejor regalo,
                                                    pero si deseas tener un detalle con nosotros, una lluvia de sobres será recibida con gratitud y cariño.
                                                </span>
                                            </Flex>
                                        </Flex>
                                    }
                                    <Flex marginTop={30} marginBottom={30}>
                                        <Button w100 className={isButtonDisabled ? "disabled" : ""} disabled={isButtonDisabled} onClick={() => handleConfirm()} style={{ marginTop: "20px" }}>
                                            {loading ? "Enviando..." : "Enviar Respuesta"}
                                        </Button>
                                    </Flex>
                                </Flex>
                            )}
                    </Flex>
                </Modal>
            )}

            <HeartLineComponent />
            <span className="color-gold" style={{ fontFamily: "Satisfy", fontSize: "35px", fontWeight: 'bold', marginBottom: "10px" }}>Confirmación</span>
            <Label style={{ fontWeight: 'bold' }}>Nos acompañas en este dia tan especial?</Label>
            <Flex alignCenter justifyCenter marginTop={30} marginBottom={30}>
                <span className='fas fa-list' style={{ fontSize: "40px" }} />
            </Flex>
            <Button onClick={() => setOpenConfirm(true)}>Confirmar asistencia</Button>
            <HeartLineComponent />
        </Wrapper>
    )
}
