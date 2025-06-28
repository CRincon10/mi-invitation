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
    
    button{
        background-size: cover;
        font-family: "Lora";

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
    
    .logged{
        /* background: url(${""}) no-repeat center center fixed; */
    }


    `;

export default GlobalStyle;
