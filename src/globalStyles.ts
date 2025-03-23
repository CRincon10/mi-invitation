import { createGlobalStyle } from "styled-components";
import greatVibes from "./assets/fonts/greatVibes-Regular.ttf";
import nefelibata from "./assets/fonts/Nefelibata-Script.ttf";
import backgroundImage from "./assets/images/Fondo-invitacion.jpg";


const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'GreatVibes';
        src: url(${greatVibes}) format('truetype');
    }

    @font-face {
        font-family: 'nefelibata';
        src: url(${nefelibata}) format('truetype');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
  
    body {
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        font-family: "Nefelibata", cursive !important;
        .title{
            font-family: 'GreatVibes';

        }
    }

    .content-invitation, input-confirmation {
        background: url(${backgroundImage}) no-repeat center center fixed;
        background-size: cover;
        font-family: "Nefelibata", cursive;
    }
    
    button{
        background-size: cover;
        font-family: "Nefelibata", cursive;

        background: rgb(248, 150, 141);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        width: 100%;
        font-size: 22px;
        cursor: pointer;
        margin-top: 20px;
        transition: background 0.3s;

        &:hover {
            background: #e65c50;
        }

    }
    
    .title {
        font-family: "GreatVibes", cursive;
    }
    
    .logged{
        background: url(${backgroundImage}) no-repeat center center fixed;
    }


    `;

export default GlobalStyle;
