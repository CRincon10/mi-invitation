import Lottie from 'lottie-react';
import styled from 'styled-components';
import heartAnimation from '../assets/animations/WeddingRings.json';
import { useIsMobileListener } from '../listener';
import HeartLineComponent from './heartLine';
import { Flex, TitleWrapper, Wrapper } from './styled';
import { Button } from './cards/styled';

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 360px;
`;

const DayLabel = styled.span`
  font-size: 15px;
  color: #999;
  text-align: center;
`;

const DayCell = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#000' : '#bbb')};
  font-weight: ${({ active }) => (active ? '700' : 'normal')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  text-align: center;
  font-size: 18px;
`;

export default function SaveTheDateCalendar() {
    const isMobile = useIsMobileListener();
    
    const openGoogleCalendar = () => {
        const title = encodeURIComponent('Boda Mariana & Cristian');
        const location = encodeURIComponent('Medellín, Colombia');
        const description = encodeURIComponent('Acompáñanos a celebrar nuestro matrimonio');
        const startDate = '20251101T150000Z'; // 3:00 p.m. UTC
        const endDate = '20251101T170000Z';   // 5:00 p.m. UTC

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&location=${location}&dates=${startDate}/${endDate}`;
        
        if (isMobile) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <Wrapper>
            <HeartLineComponent />
            <Lottie 
                animationData={heartAnimation} 
                loop={true} 
                autoplay={true}
                style={{ width: 100, height: 100, margin: '0 auto' }}
            />
            <TitleWrapper>Noviembre</TitleWrapper>
            <CalendarGrid>
                <DayLabel>Mié</DayLabel><DayLabel>Jue</DayLabel><DayLabel>Vie</DayLabel>
                <DayLabel>Sáb</DayLabel><DayLabel>Dom</DayLabel><DayLabel>Lun</DayLabel><DayLabel>Mar</DayLabel>
            </CalendarGrid>

            <CalendarGrid style={{ marginTop: '12px' }}>
                <DayCell>29</DayCell><DayCell>30</DayCell><DayCell>31</DayCell>
                <DayCell active>01</DayCell><DayCell>02</DayCell><DayCell>03</DayCell><DayCell>04</DayCell>
            </CalendarGrid>
            <Flex alignCenter justifyCenter marginTop={50}>
                <Button onClick={openGoogleCalendar}>Agregar al calendario</Button>
            </Flex>
            <HeartLineComponent />
        </Wrapper>
    );
}
