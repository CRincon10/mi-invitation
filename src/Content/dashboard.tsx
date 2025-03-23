import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { logoutUser } from "../firebase/functions";
import { db } from "../firebaseConfig";
import FilterToggle from "../inputs/toggle";
import { ConfirmedDataState } from "./invitation";
import { ConfirmacionesContainer, ContainerLogged, Flex, InputApp } from "./styled";

export const Dashboard = () => {
    const [confirmaciones, setConfirmaciones] = useState<ConfirmedDataState[]>([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtro, setFiltro] = useState<"todos" | "asistentes" | "no-asistentes">("todos");

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
    }, []);

    // Filtrado por nombre y estado de asistencia
    const confirmacionesFiltradas = confirmaciones.filter((c) => {
        const filtroTexto = filtroNombre.toLowerCase();
        const coincideNombre = c.nombre.toLowerCase().includes(filtroTexto);
        const coincideAcompanante = c.nombreAcompanante?.toLowerCase().includes(filtroTexto) || false;
        const coincideAsistencia =
            filtro === "todos" ||
            (filtro === "asistentes" && c.asiste) ||
            (filtro === "no-asistentes" && !c.asiste);

        return (coincideNombre || coincideAcompanante) && coincideAsistencia;
    });

    return (
        <ContainerLogged className="logged">
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px", color: "#b19776" }}>
                Panel de Confirmaciones
            </h1>

            <Flex w100 column alignCenter gap20 style={{ maxWidth: "500px", margin: "0 auto" }}>
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
                            confirmacionesFiltradas.map((confirm, index) => (
                                <Flex alignCenter gap10>
                                    <Flex minWidth={15}>
                                        <strong>{index + 1}.</strong>
                                    </Flex>
                                    <li key={index}>
                                        <Flex column w100>
                                            <span> {confirm.nombre}
                                                {confirm.nombreAcompanante && ` y ${confirm.nombreAcompanante}`}
                                            </span>

                                            <span className={confirm.asiste ? "asiste" : "no-asiste"}>
                                                {confirm.asiste ? (confirm.nombreAcompanante ? "Asisten ✅" : "Asiste ✅") : (confirm.nombreAcompanante ? "No asisten ❌" : "No asiste ❌")}
                                            </span>
                                        </Flex>
                                    </li>
                                </Flex>
                            ))
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
