import styled, { keyframes } from "styled-components";

const fadeInLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

interface FlexProps {
    column?: boolean;
    columnMobile?: boolean;
    columnDesktop?: boolean;
    row?: boolean;
    alignCenter?: boolean;
    justifyStart?: boolean;
    justifyCenter?: boolean;
    justifyEnd?: boolean;
    spaceBetween?: boolean;
    gap?: number;
    gap5?: boolean;
    gap10?: boolean;
    gap15?: boolean;
    gap20?: boolean;
    flexWrap?: boolean;
    w100?: boolean;
    h100?: boolean;
    mobileW100?: boolean;
    alignStart?: boolean;
    padding?: number;
    paddingLeft?: number;
    paddingTop?: number;
    paddingBottom?: number;
    borderDesktop?: boolean;
    paddingDesktop?: number;
    marginLeftAuto?: boolean;
    maxWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    minHeight?: number;
    minHeightPercentage?: number;
    maxWidthPercentage?: number;
    minWidthPercentage?: number;
    alignEnd?: boolean;
    paddingRight?: number;
    fitContent?: boolean;
    borderBottom?: boolean;
    borderBottomBlack?: boolean;
    borderTop?: boolean;
    border?: boolean;
    borderBlack?: boolean;
    borderDashed?: boolean;
    borderRadius?: number;
    boxSizingBorderBox?: boolean;
    bgLight?: boolean;
    background?: boolean;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    overflowHidden?: boolean;
    overflowAuto?: boolean;
    overflowXAuto?: boolean;
    positionRelative?: boolean;
    nowrap?: boolean;
    zIndex?: number;
    pointer?: boolean;
    textAlignCenter?: boolean;
    textAlignLeft?: boolean;
    positionAbsolute?: boolean;
    rounded?: number;
    widthPercentage?: number;
    cursorPointer?: boolean;
    backgroundColor?: string;
}

export const Flex = styled.div<FlexProps>`
    display: flex;
    contain: layout;

    ${({ column }) => column && "flex-direction: column;"}
    ${({ alignCenter }) => alignCenter && "align-items: center;"}
    ${({ alignStart }) => alignStart && "align-items: flex-start;"}
    ${({ justifyCenter }) => justifyCenter && "justify-content: center;"}
    ${({ justifyEnd }) => justifyEnd && "justify-content: flex-end;"}
    ${({ justifyStart }) => justifyStart && "justify-content: flex-start;"}
    ${({ spaceBetween }) => spaceBetween && "justify-content: space-between;"}
    
    ${({ gap }) => gap && `gap: ${gap}px;`}
    ${({ gap5 }) => gap5 && "gap: 5px;"}
    ${({ gap10 }) => gap10 && "gap: 10px;"}
    ${({ gap15 }) => gap15 && "gap: 15px;"}
    ${({ gap20 }) => gap20 && "gap: 20px;"}

    ${({ flexWrap }) => flexWrap && "flex-wrap: wrap;"}
    ${({ w100 }) => w100 && "width: 100%;"}
    ${({ h100 }) => h100 && "height: 100%;"}
    ${({ row }) => row && "flex-direction: row;"}
    
    ${({ padding }) => padding && `padding: ${padding}px;`}
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}px;`}
    ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop}px;`}
    ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}px;`}
    ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight}px;`}

    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`}
    ${({ minWidth }) => minWidth && `min-width: ${minWidth}px;`}
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}px;`}
    ${({ minHeight }) => minHeight && `min-height: ${minHeight}px;`}

    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px;`}
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}px;`}
    ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px;`}
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px;`}

    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}px;`}
    ${({ backgroundColor }) => backgroundColor && `background: ${backgroundColor};`}
    
    ${({ overflowHidden }) => overflowHidden && "overflow: hidden;"}
    ${({ overflowAuto }) => overflowAuto && "overflow: auto;"}
    ${({ positionRelative }) => positionRelative && "position: relative;"}
    ${({ positionAbsolute }) => positionAbsolute && "position: absolute;"}

    ${({ cursorPointer }) => cursorPointer && "cursor: pointer;"}
    ${({ textAlignCenter }) => textAlignCenter && "text-align: center;"}
    ${({ textAlignLeft }) => textAlignLeft && "text-align: left;"}
    //agrega un borde negro en la propiedad border
    ${({ border }) => border && "border: 1px solid black;"}

    ${({ border }) => border && "border: 1px solid  ;"}

    /* Responsive columnMobile */
    ${({ columnMobile }) => columnMobile && `
        @media (max-width: 768px) {
            flex-direction: column;
        }
    `}
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-position: center;
    gap: 20px;

    .mr-1 {
        margin-right: 10px;
    }
    .mr-2 {
        margin-right: 20px;
    }
    .mt-1 {
        margin-top: 10px;
    }
    .mt-2 {
        margin-top: 20px;
    }
    .column {
        flex-direction: column;
    }
    .row {
        display: flex;
        flex-direction: row;
    }

    .icon {
        font-size: 40px;
        color: #b19776;
    }
    .color-app {
        color: #747567;
    }
    .color-gold {
        color: #b19776;
    }
    .underline {
        text-decoration: "underline";
    }
    .text-small {
        font-size: 20px;
    }
    .bold {
        font-weight: bold;
    }
`;

export const TitleContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    font-weight: 400;
    color: #b19776;
    text-align: center;
    animation: ${fadeInLeft} 0.8s ease-out;
    contain: layout;
    flex-direction: column;
    font-family: "Satisfy";
    margin-top: 20px;

    &.isMobile {
        font-size: 50px;
        margin-top: 20px;
        font-weight: 500;
    }
`;

export const Divider = styled.div`
    flex: 1;
    height: 1px;
    background: #b19776;
    margin: 0 12px;
`;

export const Wrapper = styled.div`
    width: 100vw;
    margin: auto;
    padding: 0 20px ;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .button-calendar{
        margin-top: 30px ;
    }
`;

export const TitleWrapper = styled.h2`
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const SubTitleWrapper = styled.h2`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const WeddingRingImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    opacity: 0.6;
    filter: blur(80px) brightness(1.1) saturate(1.2) sepia(0.15);
    border-radius: 18px;
    transition: all 0.5s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
`;

export const WeddingRingForeground = styled.img`
    width: 380px;
    height: auto;
    object-fit: contain;
    opacity: 0.95;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
    z-index: 1;
    position: relative;
    border-radius: 5px;
`;

export const ImageContent = styled.img`
    width: 100%;
    height: 400px; // Puedes ajustar esta altura según tu diseño
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    opacity: 0.9;
    filter: brightness(1.06) saturate(1.1) sepia(0.08);
`;

export const CarouselWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const Slide = styled.img<{ position: "prev" | "current" | "next" | "hidden" }>`
    position: absolute;
    width: 240px;
    height: 320px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;

    ${({ position }) => {
        switch (position) {
            case "current":
                return `
          transform: translateX(0) scale(1);
          z-index: 3;
          opacity: 1;
        `;
            case "prev":
                return `
          transform: translateX(-180px) translateY(20px) scale(0.85);
          z-index: 2;
          opacity: 0.5;
        `;
            case "next":
                return `
          transform: translateX(180px) translateY(20px) scale(0.85);
          z-index: 2;
          opacity: 0.5;
        `;
            default:
                return `
          opacity: 0;
          pointer-events: none;
        `;
        }
    }}
`;

export const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #747567;
    width: 100%;
    animation: ${fadeInLeft} 0.8s ease-out;
    contain: layout;
`;

export const ContentIcons = styled.div`
    display: flex; /* Esto activa Flexbox */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
`;

export const Card = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 350px;
`;

export const Footer = styled.div`
    display: flex;
`;

export const OptionsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
`;

export const ConfirmationOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;


export const Circle = styled.div<CircleProps>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #b19776;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${({ selected }) => (selected ? "white" : "#b19776")};
    background: ${({ selected, attends }) =>
        selected
            ? attends
                ? '#307b32ff' // verde si asiste
                : '#ae261dff' // rojo si no asiste
            : 'white'};
    transition: background 0.3s ease, color 0.3s ease;
`;

export const InputApp = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #b19776;
    border-radius: 5px;
    font-family: "Leckerli One", cursive;
    background-size: cover;
    font-size: 18px;
    color: #747567;

    &::placeholder {
        color: #b19776;
        opacity: 0.7;
    }

    &:focus {
        outline: none;
        border-color: #a78564;
        box-shadow: 0 0 5px rgba(167, 133, 100, 0.5);
    }
`;



interface CircleProps {
    selected: boolean;
    attends: boolean;
}

//USERS LOGGED

export const ContainerLogged = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    min-height: 100vh;
    width: 100%;
`;

export const ConfirmacionesContainer = styled.div`
    background: white;
    padding: 10px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    border-radius: 10px;

    @media (max-width: 768px) {
        padding: 5px;
    }

    .asiste {
        color: #1a3b34;
        font-weight: 500;
    }

    .no-asiste {
        color: #f44336;
        font-weight: 500;
    }
`;

export const SelectWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 10px;

    /* background-color: #fff; */
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: 0.3s;

    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #b19776;
    color: #747567;
    border-radius: 5px;
    /* font-size: 20px; */
    /* font-family: "Leckerli One", cursive;; */
    background-size: cover;
`;

export const StyledOption = styled.option`
    /* font-size: 18px; */
`;

export const IconWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none; /* Evita que el ícono interfiera con el select */
    color: #666;
`;
