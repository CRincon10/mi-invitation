import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../firebaseConfig";
import { Button, Label } from './cards/styled';
import HeartLineComponent from './heartLine';
import { Modal } from './modal/modal';
import { Circle, Flex, InputApp, Wrapper } from './styled';


export interface ConfirmedDataState {
    id: string;
    nombre: string;
    asiste: boolean;
    fechaConfirmacion: any;
    acompanante: boolean;
    nombreAcompanante: string | null;
}

export const Confirmation = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmedData, setConfirmedData] = useState<ConfirmedDataState>();
    const [docId, setDocId] = useState<string | null>(null);
    const [confirm, setConfirm] = useState<boolean>();
    const [name, setName] = useState("");
    const [companion, setCompanion] = useState("");
    const [confirmCompanion, setConfirmCompanion] = useState(false);
    const [loading, setLoading] = useState(false);
    const isButtonDisabled = !name || confirm === undefined;



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
        <Wrapper>
            {openConfirm && (
                <Modal isOpen={openConfirm} onClose={() => setOpenConfirm(false)}>
                    <Flex column onClick={(e) => e.stopPropagation()}>
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
                                        <span className="color-app">Asistes a la ceremonia?</span>
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
                    </Flex>
                </Modal>
            )}

            <HeartLineComponent />
            <span className="color-gold" style={{fontFamily: "Satisfy", fontSize: "35px", fontWeight: 'bold', marginBottom: "10px" }}>Confirmación</span>
            <Label  style={{ fontWeight: 'bold' }}>Nos acompañas en este dia tan especial?</Label>
            <Flex alignCenter justifyCenter marginTop={30} marginBottom={30}>
                <span className='fas fa-list' style={{ fontSize: "40px" }} />
            </Flex>
            <Button onClick={() => setOpenConfirm(true)}>Confirmar asistencia</Button>
            <HeartLineComponent />
        </Wrapper>
    )
}
