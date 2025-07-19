import { createGlobalStyle } from "styled-components";
import texture from "./assets/images/fondoMatrimonio.jpg";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
  
    body {
        background-image: url(${texture});
        background-size: 400px 400px;
        background-repeat: repeat;
        background-position: center;
        background-color: #fffefdff;
        width: 100vw;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Lora', serif;
        font-size: 20px;
        color: #747567;
    }

    .content-invitation, .input-confirmation {
        /* background: url(${""}) no-repeat center center fixed; */
        background-size: cover;
        font-family: "Lora";
        background-attachment: scroll;
    }
    
    button {
        background-color: #b68e74;
        color: white;
        border: none;
        padding: 14px 26px;
        font-size: 24px;
        border-radius: 8px;
        cursor: pointer;
        font-family: "Lora";
        transition: all 0.3s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);

        &:hover {
            background-color: #a07a62;
        }
    }
`;

export default GlobalStyle;
