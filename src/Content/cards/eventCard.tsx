import React from 'react';
import { Button, Card, Divider, IconWrapper, Info, Label, Title } from './styled';

type EventCardProps = {
    icon: string;
    title: string;
    time: string;
    place: string;
    buttonText: string;
    onButtonClick?: () => void;
};

export const EventCard: React.FC<EventCardProps> = ({
    icon,
    title,
    time,
    place,
    buttonText,
    onButtonClick,
}) => {
    return (
        <Card>
            <IconWrapper>
                <img src={icon} alt="Icono del evento" style={{ width: '100px', height: '120px' }} />
            </IconWrapper>
            <Divider />
            <Title>{title}</Title>
            <Divider />
            <Info>
                <Label>Hora:</Label> {time}
            </Info>
            <Info>
                <Label>Lugar:</Label> {place}
            </Info>
            <Button onClick={onButtonClick}>{buttonText}</Button>
        </Card>
    );
};
