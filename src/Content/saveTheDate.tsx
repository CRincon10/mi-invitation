import styled from 'styled-components';
import HeartLineComponent from './heartLine';
import { TitleWrapper, Wrapper } from './styled';

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
    const downloadICS = () => {
        const title = 'Boda Mariana & Cristian';
        const description = 'Acompáñanos a celebrar nuestro matrimonio';
        const location = 'Medellín, Colombia';
        const start = '20251101T150000Z';
        const end = '20251101T170000Z';

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'boda-mariana-cristian.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Wrapper>
            <HeartLineComponent />
            <TitleWrapper>Noviembre</TitleWrapper>
            <CalendarGrid>
                <DayLabel>Mié</DayLabel><DayLabel>Jue</DayLabel><DayLabel>Vie</DayLabel>
                <DayLabel>Sáb</DayLabel><DayLabel>Dom</DayLabel><DayLabel>Lun</DayLabel><DayLabel>Mar</DayLabel>
            </CalendarGrid>

            <CalendarGrid style={{ marginTop: '12px' }}>
                <DayCell>29</DayCell><DayCell>30</DayCell><DayCell>31</DayCell>
                <DayCell active>01</DayCell><DayCell>02</DayCell><DayCell>03</DayCell><DayCell>04</DayCell>
            </CalendarGrid>

            <button className='button-calendar' onClick={downloadICS}>Guardar en calendario</button>
            <HeartLineComponent />

        </Wrapper>
    );
}
