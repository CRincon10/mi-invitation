import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { logoutUser } from "../firebase/functions";
import { db } from "../firebaseConfig";
import FilterToggle from "../inputs/toggle";
import { ConfirmedDataState } from "./invitation";
import { Button, CloseButton, ConfirmacionesContainer, ContainerLogged, Flex, IconWrapper, InputApp, ModalContent, ModalOverlay, SelectWrapper, StyledOption, StyledSelect } from "./styled";
import moment from "moment";
import { useIsMobileListener } from "../listener";

export const Dashboard = () => {
    const [confirmaciones, setConfirmaciones] = useState<ConfirmedDataState[]>([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtro, setFiltro] = useState<"todos" | "asistentes" | "no-asistentes">("todos");
    const [showManualForm, setShowManualForm] = useState(false);
    const [manualName, setManualName] = useState("");
    const [manualConfirm, setManualConfirm] = useState<boolean | undefined>(undefined);
    const [manualCompanion, setManualCompanion] = useState("");
    const isMobile = useIsMobileListener();

    useEffect(() => {
        const fetchConfirmaciones = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "confirmaciones"));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<ConfirmedDataState, "id">)
                }));
                setConfirmaciones(data);
            } catch (error) {
                console.error("Error obteniendo confirmaciones:", error);
            }
        };

        fetchConfirmaciones();
    }, [showManualForm]);

    // Filtrado por nombre y estado de asistencia
    const confirmacionesFiltradas = confirmaciones
        .filter((c) => {
            const filtroTexto = filtroNombre.toLowerCase();
            const coincideNombre = c.nombre.toLowerCase().includes(filtroTexto);
            const coincideAcompanante = c.nombreAcompanante?.toLowerCase().includes(filtroTexto) || false;
            const coincideAsistencia =
                filtro === "todos" ||
                (filtro === "asistentes" && c.asiste) ||
                (filtro === "no-asistentes" && !c.asiste);

            return (coincideNombre || coincideAcompanante) && coincideAsistencia;
        })
        .sort((a, b) => {
            const fechaA = a.fechaConfirmacion?.seconds ? new Date(a.fechaConfirmacion.seconds * 1000) : new Date(0);
            const fechaB = b.fechaConfirmacion?.seconds ? new Date(b.fechaConfirmacion.seconds * 1000) : new Date(0);
            return fechaB.getTime() - fechaA.getTime(); // 🔥 Cambio aquí: ahora ordena de mayor a menor
        });

    const handleManualAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!manualName || manualConfirm === undefined) return;

        const confirmationData = {
            nombre: manualName,
            asiste: manualConfirm,
            fechaConfirmacion: serverTimestamp(), // Se usa el timestamp de Firestore
            acompanante: !!manualCompanion,
            nombreAcompanante: manualCompanion || null,
        };

        try {
            const docRef = await addDoc(collection(db, "confirmaciones"), confirmationData);
            const newId = docRef.id;

            // Agregarlo a la lista de confirmaciones en pantalla (simulación, ya que serverTimestamp() se resuelve en el backend)
            setConfirmaciones([...confirmaciones, { ...confirmationData, id: newId, fechaConfirmacion: new Date() }]);

            alert("Invitado agregado con éxito");
            setShowManualForm(false);
        } catch (error) {
            console.error("Error al guardar el invitado:", error);
            alert("Hubo un error, intenta nuevamente.");
        }
    };



    return (
        <ContainerLogged className="logged">
            {showManualForm && (
                <ModalOverlay className={isMobile ? "isMobile" : ""} onClick={() => setShowManualForm(false)}>

                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <Flex paddingRight={5}>
                            <CloseButton onClick={() => setShowManualForm(false)}>✖</CloseButton>
                        </Flex>
                        <Flex column paddingRight={20} paddingBottom={50} paddingLeft={20} spaceBetween>
                            <Flex column gap20>
                                <form onSubmit={handleManualAdd}>
                                    <InputApp type="text" placeholder="Nombre" value={manualName} onChange={(e) => setManualName(e.target.value)} required />
                                    <InputApp type="text" placeholder="Nombre del acompañante (opcional)" value={manualCompanion} onChange={(e) => setManualCompanion(e.target.value)} />
                                    <SelectWrapper>
                                        <StyledSelect
                                            value={manualConfirm !== undefined ? manualConfirm.toString() : ""}
                                            onChange={(e) => setManualConfirm(e.target.value === "true")}
                                        >
                                            <StyledOption value="">Selecciona asistencia</StyledOption>
                                            <StyledOption value="true">Asiste</StyledOption>
                                            <StyledOption value="false">No asiste</StyledOption>
                                        </StyledSelect>
                                        <IconWrapper>
                                            <span className="fa-regular fa-chevron-down" />
                                        </IconWrapper>
                                    </SelectWrapper>
                                    <Button type="submit">Guardar Invitado</Button>
                                </form>
                            </Flex>
                        </Flex>
                    </ModalContent>
                </ModalOverlay>
            )}
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px", color: "#b19776" }}>
                Panel de Confirmaciones
            </h1>

            <Flex w100 column alignCenter gap20 style={{ maxWidth: "500px", margin: "0 auto" }}>
                <Flex justifyEnd alignEnd  w100 gap5>
                    <InputApp
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <Flex gap5 maxHeight={50} marginTop={10} alignEnd justifyEnd>
                        <Button className="small" onClick={() => setShowManualForm(!showManualForm)}>Agregar Invitado</Button>
                    </Flex>
                </Flex>

                <FilterToggle
                    selected={filtro}
                    setSelected={setFiltro}
                    all={confirmaciones.reduce((total, c) => total + (c.nombreAcompanante ? 2 : 1), 0)}
                    attends={confirmaciones.reduce((total, c) => total + (c.asiste ? (c.nombreAcompanante ? 2 : 1) : 0), 0)}
                    noAttends={confirmaciones.reduce((total, c) => total + (!c.asiste ? (c.nombreAcompanante ? 2 : 1) : 0), 0)}
                />
            </Flex>
            <Flex w100 style={{ maxWidth: "500px", margin: "0 auto" }}>
                <ConfirmacionesContainer>
                    <ol>
                        {confirmacionesFiltradas.length > 0 ? (
                            confirmacionesFiltradas.map((confirm, index) => {

                                const fecha = confirm.fechaConfirmacion instanceof Date
                                    ? confirm.fechaConfirmacion
                                    : new Date(confirm.fechaConfirmacion.seconds * 1000);

                                return (
                                    <Flex alignCenter gap10>
                                        <li key={index}>
                                            <Flex column w100>
                                                <span> {confirm.nombre}
                                                    {confirm.nombreAcompanante && ` y ${confirm.nombreAcompanante}`}
                                                </span>

                                                <span className={confirm.asiste ? "asiste" : "no-asiste"}>
                                                    {confirm.asiste ? (confirm.nombreAcompanante ? "Asisten ✅" : "Asiste ✅") : (confirm.nombreAcompanante ? "No asisten ❌" : "No asiste ❌")}
                                                </span>
                                                <span>
                                                    Fecha de confirmación: {moment.unix(confirm.fechaConfirmacion.seconds).format("DD/MM/YYYY")}
                                                </span>

                                            </Flex>
                                        </li>
                                    </Flex>
                                )
                            })
                        ) : (
                            <p className="no-confirmaciones">
                                No hay confirmaciones registradas.
                            </p>
                        )}
                    </ol>
                </ConfirmacionesContainer>
            </Flex>

            <span
                onClick={() => logoutUser()}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "8px 14px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    background: "#e65c50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#d14b42")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#e65c50")}
            >
                Cerrar Sesión
            </span>
        </ContainerLogged>
    );
};
