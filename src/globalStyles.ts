import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    background: #222222;
  }
  html, #root, body {
    height: 100vh;
    font-size: 62.5%;
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  main {
    min-height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
  }
`;

export default GlobalStyles;