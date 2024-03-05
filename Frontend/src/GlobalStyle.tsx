import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
      --color-text: black;
      --color-dark: #00233b;
      --color-lightgrey: #ececec;
      --color-navy: #040461;
      --color-orange: #ff7530;
      --color-yellow: #ffb700;
    }

    body {
      @font-face {
        font-family: "Giants-Inline";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Inline.woff2")
          format("woff2");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
          font-family: "SEBANG_Gothic_Bold";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Bold.woff")
            format("woff");
          font-weight: normal;
          font-style: normal;
      }
      @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 100;
        font-style: normal;
      }
      margin: 0;
      font-family: 'Pretendard-Regular';

    }
`

export default GlobalStyle
