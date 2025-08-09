import Lottie from 'lottie-react';
import React from 'react';
import { Button, Card, Divider, Info, Label, Ribbon } from './styled';

type EventCardProps = {
    icon: any;
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
            <Ribbon>{title}</Ribbon>
            <Divider />
            <Lottie 
                animationData={icon} 
                loop 
                autoplay 
                style={{ width: 100, height: 120, margin: '0 auto' }} 
            />
            <Divider />
            <Info>
                <Label>Lugar:</Label> {place}
            </Info>
            <Info>
                <Label>Hora:</Label> {time}
            </Info>
            <Button onClick={onButtonClick}>{buttonText}</Button>
        </Card>
    );
};
