import { createGlobalStyle } from 'styled-components';

// Trick to get formatting in createglobalstyle
const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  html {
    /* 1rem = 10px */
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: #61dafb;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
