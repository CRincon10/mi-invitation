import styled from "styled-components";

const HeartLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px; /* espacio entre línea y corazón */
    margin: 40px 0;
`;

const Line = styled.div`
    flex: 1;
    height: 1px;
    background-color: #747567;
`;

const Heart = styled.span`
    font-size: 15px;
    padding: 0 4px; /* espaciado entre línea y corazón */
`;

export default function HeartLineComponent() {
    return (
        <HeartLine>
            <Line />
            <Heart>♥</Heart>
            <Line />
            <Heart>♥</Heart>
            <Line />
            <Heart>♥</Heart>
            <Line />
            <Heart>♥</Heart>
            <Line />
        </HeartLine>
    );
}