import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CountdownContainer = styled.div`
    text-align: center;
    padding: 30px 20px;
    background-color: #fefaf6;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
    margin-bottom: 20px;
    gap: 20px;
`;

const Title = styled.div`
    color: #b19776;
    font-weight: bold;
    margin-bottom: 20px;
`;

const TimeBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const TimeUnit = styled.div`
    background-color: #fff;
    border-radius: 12px;
    padding: 18px;
    min-width: 80px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    text-align: center;
`;

const Number = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #b19776;
`;

const Label = styled.div`
    font-size: 14px;
    color: #747567;
`;

export const WeddingCountdown = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-11-01T16:00:00");
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!timeLeft) {
        return (
            <CountdownContainer>
                <Title>¡Ya llegó el gran día! 💍</Title>
                {/*TODO:// Agregar imagen de anillos  */}
            </CountdownContainer>
        );
    }

    return (
        <CountdownContainer>
            <Title>Nuestra boda será en:</Title>
            <TimeBox>
                <TimeUnit>
                    <Number>{timeLeft.days}</Number>
                    <Label>Días</Label>
                </TimeUnit>
                <TimeUnit>
                    <Number>{timeLeft.hours}</Number>
                    <Label>Horas</Label>
                </TimeUnit>
                <TimeUnit>
                    <Number>{timeLeft.minutes}</Number>
                    <Label>Minutos</Label>
                </TimeUnit>

            </TimeBox>
        </CountdownContainer>
    );
};
