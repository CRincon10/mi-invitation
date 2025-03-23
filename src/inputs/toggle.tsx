import styled from "styled-components";

// Definimos las props del componente
interface FilterToggleProps {
    selected: "todos" | "asistentes" | "no-asistentes";
    setSelected: (value: "todos" | "asistentes" | "no-asistentes") => void;
    all?: number;
    attends?: number;
    noAttends?: number;
}

// Contenedor principal del toggle
const ToggleContainer = styled.div`
    display: flex;
    background: #f5f5f5;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ToggleOption = styled.div<{ active: boolean }>`
    flex: 1;
    text-align: center;
    padding: 5px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    background: ${(props) => (props.active ? "#b19776" : "transparent")};
    color: ${(props) => (props.active ? "white" : "#555")};
    transition: all 0.3s;

    &:hover {
        background: ${(props) => (props.active ? "#9d8665" : "#ddd")};
    }
`;



const FilterToggle: React.FC<FilterToggleProps> = ({selected, setSelected, all, attends, noAttends}) => {
    return (
        <ToggleContainer>
            <ToggleOption active={selected === "todos"} onClick={() => setSelected("todos")}>
                {`Todos (${all})`}
            </ToggleOption>
            <ToggleOption active={selected === "asistentes"} onClick={() => setSelected("asistentes")}>
                {`Asisten (${attends})`}
            </ToggleOption>
            <ToggleOption active={selected === "no-asistentes"} onClick={() => setSelected("no-asistentes")}>
                {`No Asisten (${noAttends})`}
            </ToggleOption>
        </ToggleContainer>
    );
};

export default FilterToggle;
