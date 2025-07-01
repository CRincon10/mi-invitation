import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
  
    body {
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        /* background-color: white !important; */
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        font-family: "Lora" !important;
        font-size: 24px;
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
        font-size: 17px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.3s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);

        &:hover {
            background-color: #a07a62;
        }
    }
`;

export default GlobalStyle;
