import family from "../assets/images/family.jpg";
// import family2 from "../assets/images/family2.jpg";
import family2 from "../assets/images/fam1.jpg";
import family3 from "../assets/images/Boda-001.jpg";
import { Flex } from "./styled";

export const FamilyGallery = () => {
    return (
        <Flex column alignCenter justifyCenter gap={20} padding={20}>
            <Flex gap={20} alignCenter justifyCenter style={{ flexWrap: "wrap" }}>
                <img
                    src={family}
                    alt="Nuestra familia"
                    draggable={false}
                    style={{
                        width: "180px",
                        height: "240px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        objectFit: "cover",
                        borderRadius: "10px",
                        userSelect: "none",
                        pointerEvents: "none"
                    }}
                />
                <img
                    src={family2}
                    alt="Nuestra familia 2"
                    draggable={false}
                    style={{
                        width: "180px",
                        height: "240px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        objectFit: "cover",
                        borderRadius: "10px",
                        userSelect: "none",
                        pointerEvents: "none"
                    }}
                />
            </Flex>

            {/* Una imagen horizontal en la parte inferior */}
            <img
                src={family3}
                alt="Momentos especiales"
                draggable={false}
                style={{
                    width: "380px",
                    height: "220px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "0px",
                    userSelect: "none",
                    pointerEvents: "none"
                }}
            />
        </Flex>
    );
};
