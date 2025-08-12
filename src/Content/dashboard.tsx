import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { logoutUser } from "../firebase/functions";
import { db } from "../firebaseConfig";
import FilterToggle from "../inputs/toggle";
import { Button, Label } from "./cards/styled";
import { ConfirmedDataState } from "./confirmation";
import { Modal } from "./modal/modal";
import { ConfirmacionesContainer, ContainerLogged, Flex, IconWrapper, InputApp, SelectWrapper, StyledOption, StyledSelect } from "./styled";
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';

export const Dashboard = () => {
    const [confirmaciones, setConfirmaciones] = useState<ConfirmedDataState[]>([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtro, setFiltro] = useState<"todos" | "asistentes" | "no-asistentes">("todos");
    const [showManualForm, setShowManualForm] = useState(false);
    const [manualName, setManualName] = useState("");
    const [manualConfirmCeremonia, setManualConfirmCeremonia] = useState<boolean | undefined>(undefined);
    const [manualConfirmRecepcion, setManualConfirmRecepcion] = useState<boolean | undefined>(undefined);
    const [manualCompanion, setManualCompanion] = useState("");

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
                (filtro === "asistentes" && c.asisteCeremonia) ||
                (filtro === "no-asistentes" && !c.asisteCeremonia);

            return (coincideNombre || coincideAcompanante) && coincideAsistencia;
        })
        .sort((a, b) => {
            const fechaA = a.fechaConfirmacion?.seconds ? new Date(a.fechaConfirmacion.seconds * 1000) : new Date(0);
            const fechaB = b.fechaConfirmacion?.seconds ? new Date(b.fechaConfirmacion.seconds * 1000) : new Date(0);
            return fechaB.getTime() - fechaA.getTime(); // 🔥 Cambio aquí: ahora ordena de mayor a menor
        });

    const handleManualAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!manualName || manualConfirmCeremonia === undefined || manualConfirmRecepcion === undefined) return;

        const confirmationData = {
            nombre: manualName,
            asisteCeremonia: manualConfirmCeremonia,
            asisteRecepcion: manualConfirmRecepcion,
            fechaConfirmacion: serverTimestamp(),
            acompanante: !!manualCompanion,
            nombreAcompanante: manualCompanion || null,
        };

        try {
            const docRef = await addDoc(collection(db, "confirmaciones"), confirmationData);
            const newId = docRef.id;

            const newConfirmation: ConfirmedDataState = {
                ...confirmationData,
                id: newId,
                fechaConfirmacion: { seconds: new Date().getTime() / 1000 }
            };

            // Agregarlo a la lista de confirmaciones en pantalla
            setConfirmaciones([...confirmaciones, newConfirmation]);
            setManualName("");
            setManualCompanion("");
            setManualConfirmCeremonia(undefined);
            setManualConfirmRecepcion(undefined);

            showSuccessAlert("¡Invitado agregado!", "La confirmación se guardó correctamente.");
            setShowManualForm(false);
        } catch (error) {
            showErrorAlert("Error al guardar", "Hubo un problema. Intenta nuevamente.");
        }
    };



    return (
        <ContainerLogged className="logged">
            {showManualForm && (
                <Modal isOpen={showManualForm} onClose={() => setShowManualForm(false)} >

                    <Flex onClick={(e) => e.stopPropagation()}>
                        <Flex column paddingRight={20} paddingBottom={50} paddingLeft={20} spaceBetween>
                            <Flex column gap20>
                                <form onSubmit={handleManualAdd}>
                                    <InputApp 
                                        type="text" 
                                        placeholder="Nombre" 
                                        value={manualName} 
                                        onChange={(e) => setManualName(e.target.value)} 
                                        required 
                                    />
                                    <InputApp 
                                        type="text" 
                                        placeholder="Nombre del acompañante (opcional)" 
                                        value={manualCompanion} 
                                        onChange={(e) => setManualCompanion(e.target.value)} 
                                    />
                                    
                                    <Label style={{ marginTop: "10px", marginBottom: "5px" }}>Asistencia a la Ceremonia:</Label>
                                    <SelectWrapper>
                                        <StyledSelect
                                            value={manualConfirmCeremonia !== undefined ? manualConfirmCeremonia.toString() : ""}
                                            onChange={(e) => setManualConfirmCeremonia(e.target.value === "true")}
                                        >
                                            <StyledOption value="">Selecciona para ceremonia</StyledOption>
                                            <StyledOption value="true">Asiste a ceremonia</StyledOption>
                                            <StyledOption value="false">No asiste a ceremonia</StyledOption>
                                        </StyledSelect>
                                        <IconWrapper>
                                            <span className="fa-regular fa-chevron-down" />
                                        </IconWrapper>
                                    </SelectWrapper>

                                    <Label style={{ marginTop: "10px", marginBottom: "5px" }}>Asistencia a la Recepción:</Label>
                                    <SelectWrapper>
                                        <StyledSelect
                                            value={manualConfirmRecepcion !== undefined ? manualConfirmRecepcion.toString() : ""}
                                            onChange={(e) => setManualConfirmRecepcion(e.target.value === "true")}
                                        >
                                            <StyledOption value="">Selecciona para recepción</StyledOption>
                                            <StyledOption value="true">Asiste a recepción</StyledOption>
                                            <StyledOption value="false">No asiste a recepción</StyledOption>
                                        </StyledSelect>
                                        <IconWrapper>
                                            <span className="fa-regular fa-chevron-down" />
                                        </IconWrapper>
                                    </SelectWrapper>
                                    
                                    <Button type="submit">Guardar Invitado</Button>
                                </form>
                            </Flex>
                        </Flex>
                    </Flex>
                </Modal>
            )}
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px", color: "#b19776" }}>
                Panel de Confirmaciones
            </h1>

            <Flex w100 column alignCenter gap20 style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
                {/* Barra de búsqueda y botón agregar */}
                <Flex w100 columnMobile gap10 alignCenter>
                    <InputApp
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        style={{
                            flex: "1",
                            minWidth: "200px",
                            padding: "12px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <Button 
                        className="small" 
                        onClick={() => setShowManualForm(!showManualForm)}
                        style={{ whiteSpace: "nowrap", minWidth: "140px" }}
                    >
                        Agregar Invitado
                    </Button>
                </Flex>

                <FilterToggle
                    selected={filtro}
                    setSelected={setFiltro}
                    all={confirmaciones.reduce((total, c) => total + (c.nombreAcompanante ? 2 : 1), 0)}
                    attends={confirmaciones.reduce((total, c) => total + (c.asisteCeremonia ? (c.nombreAcompanante ? 2 : 1) : 0), 0)}
                    noAttends={confirmaciones.reduce((total, c) => total + (!c.asisteCeremonia ? (c.nombreAcompanante ? 2 : 1) : 0), 0)}
                />

                {/* Lista de confirmaciones */}
                <ConfirmacionesContainer style={{ width: "100%" }}>
                    <ol style={{ padding: "0", margin: "0" }}>
                        {confirmacionesFiltradas.length > 0 ? (
                            confirmacionesFiltradas.map((confirm, index) => {
                                return (
                                    <li key={confirm.id || index} style={{ marginBottom: "20px", listStyle: "none" }}>
                                        <Flex column w100 gap5 style={{ 
                                            padding: "16px", 
                                            border: "1px solid #e0e0e0", 
                                            borderRadius: "8px",
                                            backgroundColor: "#fff",
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                        }}>
                                            {/* Nombre principal y acompañante */}
                                            <Flex column>
                                                <span style={{ fontWeight: "bold", fontSize: "18px", color: "#b19776", marginBottom: "4px" }}>
                                                    {confirm.nombre}
                                                </span>
                                                {confirm.acompanante && confirm.nombreAcompanante && (
                                                    <span style={{ fontWeight: "bold", fontSize: "16px", color: "#b19776", marginLeft: "0px" }}>
                                                        + {confirm.nombreAcompanante}
                                                    </span>
                                                )}
                                            </Flex>

                                            {/* Estado de asistencia */}
                                            <Flex columnMobile gap10 style={{ marginTop: "12px" }}>
                                                <Flex alignCenter gap10 style={{ minWidth: "150px" }}>
                                                    <span style={{ fontSize: "14px", fontWeight: "500", minWidth: "70px" }}>Ceremonia:</span>
                                                    <span className={confirm.asisteCeremonia ? "asiste" : "no-asiste"}>
                                                        {confirm.asisteCeremonia ? "✅ Asiste" : "❌ No asiste"}
                                                    </span>
                                                </Flex>
                                                <Flex alignCenter gap10 style={{ minWidth: "150px" }}>
                                                    <span style={{ fontSize: "14px", fontWeight: "500", minWidth: "70px" }}>Recepción:</span>
                                                    <span className={confirm.asisteRecepcion ? "asiste" : "no-asiste"}>
                                                        {confirm.asisteRecepcion ? "✅ Asiste" : "❌ No asiste"}
                                                    </span>
                                                </Flex>
                                            </Flex>

                                            {/* Información adicional */}
                                            <Flex columnMobile gap5 style={{ 
                                                marginTop: "12px", 
                                                padding: "12px", 
                                                backgroundColor: "rgba(177, 151, 118, 0.1)", 
                                                borderRadius: "6px" 
                                            }}>
                                                <span style={{ fontSize: "12px", color: "#666" }}>
                                                    <strong>Total personas:</strong> {confirm.acompanante && confirm.nombreAcompanante ? 2 : 1}
                                                </span>
                                                <span style={{ fontSize: "12px", color: "#666" }}>
                                                    <strong>Confirmado:</strong> {moment.unix(confirm.fechaConfirmacion.seconds).format("DD/MM/YYYY HH:mm")}
                                                </span>
                                                <span style={{ fontSize: "12px", color: "#666", wordBreak: "break-all" }}>
                                                    <strong>ID:</strong> {confirm.id}
                                                </span>
                                            </Flex>
                                        </Flex>
                                    </li>
                                )
                            })
                        ) : (
                            <p className="no-confirmaciones" style={{ textAlign: "center", padding: "40px", color: "#666" }}>
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
