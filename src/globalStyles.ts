import { createGlobalStyle } from "styled-components";
import greatVibes from "./assets/fonts/greatVibes-Regular.ttf";
import nefelibata from "./assets/fonts/Nefelibata-Script.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GreatVibes';
    src: url(${greatVibes}) format('truetype');
  }

  @font-face {
    font-family: 'nefelibata';
    src: url(${nefelibata}) format('truetype');
  }
  
  body {
    font-family: 'nefelibata', sans-serif;
    .title{
      font-family: 'GreatVibes';

    }
  }
`;

export default GlobalStyle;
