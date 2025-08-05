import { useIsMobileListener } from "../listener";
import { EventCard } from "./cards/eventCard";
import { TipsAndNotesCard } from "./cards/TipsAndNotesCard";
import { VideoAndPhotosCard } from "./cards/videoAndPhotosCard";
import { ImageCarousel } from "./carouselImage";
import { Confirmation } from "./confirmation";
import { FamilyGallery } from "./familyGallery";
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

import cups from "../assets/animations/FiestaCopas.json";
import weddingRings from "../assets/animations/Wedding.json";

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
                <span className="bold">¡Nos casamos!</span>
                <span> Queremos compartir este momento tan especial contigo, que eres parte importante de nuestra historia. </span>
            </Flex>
            <SaveTheDate />
            <Flex alignCenter justifyCenter maxWidth={500} padding={20}>
                <span style={{ fontSize: "20px", textAlign: "center" }}>
                    “El amor es una parte del alma misma, es de la misma naturaleza que ella, es una chispa divina; como ella, es incorruptible, indivisible, imperecedero. Es una partícula de fuego que está en nosotros, que es inmortal e infinita, a la cual nada puede limitar, ni amortiguar”.
                </span>
            </Flex>
            <Flex column gap={40}>
                <EventCard
                    icon={weddingRings}
                    title="Ceremonia"
                    time="4:00 pm"
                    place="Parroquia Santa Maria de los Angeles - Poblado"
                    buttonText="¿Cómo llegar?"
                    onButtonClick={() => window.open("https://www.google.com/maps/place/Parroquia+Santa+Mar%C3%ADa+de+Los+%C3%81ngeles/@6.1909884,-75.58416,17z/data=!3m1!4b1!4m6!3m5!1s0x8e468360f9758e77:0x6f0e4b95b313d3c1!8m2!3d6.1909831!4d-75.5792891!16s%2Fg%2F1tc_547g?entry=ttu")}
                />
                <EventCard
                    icon={cups}
                    title="Recepción"
                    time="6:00 pm"
                    place="Salon de eventos Trinidad envigado"
                    buttonText="¿Cómo llegar?"
                    onButtonClick={() => window.open("https://www.google.com/maps/dir//Cra+24C+%2341+Sur-275,+Zona+6,+Envigado,+Antioquia/@6.1508508,-75.6667592,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8e4683a72329444b:0x6f82f44032507970!2m2!1d-75.584494!2d6.1509036?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D")}
                />
            </Flex>
            <ImageCarousel />
            <TipsAndNotesCard />
            <VideoAndPhotosCard />
            <Confirmation />

            <Flex alignCenter justifyCenter maxWidth={500} padding={20}>
                <span style={{ fontSize: "20px", textAlign: "center" }}>
                    “Dios ha sido el centro de nuestro amor, y en su perfecta voluntad, hoy unimos nuestras vidas. Con su bendición y por amor a nuestros hijos, damos este paso sagrado.”.
                </span>
            </Flex>
            <Footer>
                <FamilyGallery />
            </Footer>
            <WeddingCountdown />
            <MusicPlayer />
        </Container>
    );
}
