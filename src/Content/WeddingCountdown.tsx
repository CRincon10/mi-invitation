import { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "./styled";

const CountdownContainer = styled.div`
  width: 100vw;
  padding: 40px 20px;
  background-color: #4e6756;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Lora', serif;
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const TimeUnit = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
  min-width: 70px;
  text-align: center;
`;

const Number = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #b99d79;
`;

const Label = styled.div`
  font-size: 14px;
  color: #c2c6d4;
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
            seconds: Math.floor((difference / 1000) % 60),
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
                <span style={{ fontSize: "30px", fontWeight: 'bold', color: "#b99d79" }}>
                    ¡Ya llegó el gran día! 💍
                </span>
            </CountdownContainer>
        );
    }

    return (
        <CountdownContainer>
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
                    <Label>Min</Label>
                </TimeUnit>
                <TimeUnit>
                    <Number>{timeLeft.seconds}</Number>
                    <Label>Seg</Label>
                </TimeUnit>
            </TimeBox>
            <Flex marginTop={30}>
                <span style={{ fontSize: "30px", fontWeight: 'bold', color: "#b99d79" }}>
                    ¡Los Esperamos!
                </span>
            </Flex>
        </CountdownContainer>
    );
};
