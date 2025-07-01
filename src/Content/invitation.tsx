import ceremonia from "../assets/images/ceremonia.png";
import ching from "../assets/images/ching.png";
import family from "../assets/images/family.jpg";
import { useIsMobileListener } from "../listener";
import { EventCard } from "./cards/eventCard";
import { TipsAndNotesCard } from "./cards/TipsAndNotesCard";
import { VideoAndPhotosCard } from "./cards/videoAndPhotosCard";
import { ImageCarousel } from "./carouselImage";
import { Confirmation } from "./confirmation";
import HeaderImage from "./headerImage";
import MusicPlayer from "./musicPlayer";
import SaveTheDate from "./saveTheDate";
import {
    Container,
    Divider,
    Flex,
    Footer,
    TitleContent
} from "./styled";
import { WeddingCountdown } from "./WeddingCountdown";

export default function Invitacion() {
    const isMobile = useIsMobileListener();
    
    return (
        <Container className="content-invitation">
            <HeaderImage />
            <TitleContent className={`${isMobile ? "isMobile" : ""}`}>
                <Flex gap15 className="names">
                    <span className="bride-name">Mariana</span>
                    <span className="ampersand">&</span>
                    <span className="groom-name">Cristian</span>
                </Flex>
                <Flex alignCenter justifyCenter w100>
                    <Divider />
                    <span className="text-small">01.11.2025</span>
                    <Divider />
                </Flex>
            </TitleContent>
            <Flex column gap10 alignCenter justifyCenter maxWidth={340} style={{ textAlign: "center", margin: "20px auto" }}>
                <span>¡Nos casamos! </span>
                <span> Estamos felices de comenzar esta nueva etapa juntos y queremos celebrarlo contigo. </span>
            </Flex>
            <SaveTheDate />
            <Flex column gap={40}>
                <EventCard
                    icon={ceremonia}
                    title="Ceremonia"
                    time="4:00 pm"
                    place="Parroquia Santa Maria de los Angeles - Poblado"
                    buttonText="¿Cómo llegar?"
                    onButtonClick={() => window.open("https://www.google.com/maps/place/Parroquia+Santa+Mar%C3%ADa+de+Los+%C3%81ngeles/@6.1909884,-75.58416,17z/data=!3m1!4b1!4m6!3m5!1s0x8e468360f9758e77:0x6f0e4b95b313d3c1!8m2!3d6.1909831!4d-75.5792891!16s%2Fg%2F1tc_547g?entry=ttu", "_blank")}
                />
                <EventCard
                    icon={ching}
                    title="Recepción"
                    time="7:00 pm"
                    place="Centro de eventos envigado"
                    buttonText="¿Cómo llegar?"
                    onButtonClick={() => window.open("https://www.google.com/maps?rlz=1C1RXQR_enCO1122CO1122&vet=12ahUKEwiKkYD5z5OOAxXpSzABHTywNf4Q8UF6BAgkEAM..i&lei=5p1faIqGJemXwbkPvODW8Q8&cs=0&um=1&ie=UTF-8&fb=1&gl=co&sa=X&geocode=KY26xciCg0aOMR5BweR5ReJ7&daddr=Cl.+40+Sur+%2324-13,+Zona+6,+Envigado,+Antioquia", "_blank")}
                />
            </Flex>
            <ImageCarousel />
            <TipsAndNotesCard />
            <VideoAndPhotosCard />
            <Confirmation />

            <Flex alignCenter justifyCenter maxWidth={500} padding={20}>
                <span style={{ fontSize: "20px", textAlign: "center" }}>
                    “El amor es una parte del alma misma, es de la misma naturaleza que ella, es una chispa divina; como ella, es incorruptible, indivisible, imperecedero. Es una partícula de fuego que está en nosotros, que es inmortal e infinita, a la cual nada puede limitar, ni amortiguar”.
                </span>
            </Flex>
            <Footer>
                <Flex column alignCenter justifyCenter gap={10}>
                    <img
                        src={family}
                        alt="Nuestra familia"
                        style={{
                            maxWidth: "100%",
                            width: "400px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            objectFit: "cover"
                        }}
                    />
                </Flex>
            </Footer>
            <WeddingCountdown />
            <MusicPlayer />
        </Container>
    );
}
