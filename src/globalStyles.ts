import { createGlobalStyle } from "styled-components";
import greatVibes from "./assets/fonts/greatVibes-Regular.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GreatVibes';
    src: url(${greatVibes}) format('truetype');
  }

  body {
    font-family: 'GreatVibes', sans-serif;
  }
`;

export default GlobalStyle;
