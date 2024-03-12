import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
      --color-text: black;
      --color-dark: #072539;
      --color-lightblue: #F0F3FF;
      --color-lightgrey: #f9f9f9;
      --color-grey: #7a7a7a;
      --color-navy: #333A73;
      --color-blue: #387ADF;
      --color-orange: #FBA834;
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
          font-family: 'SEBANG_Gothic_Regular';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Regular.woff') format('woff');
      }
      @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Pretendard-Thin';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff') format('woff');
        font-weight: 100;
        font-style: normal;
      }
      @font-face {
          font-family: 'Giants-Regular';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Regular.woff2') format('woff2');
          /* font-weight: 700; */
          font-style: normal;
      }
      margin: 0;
      font-family: 'Pretendard-Regular';
    }
    div {
      margin: 0;
    }
    p {
      margin: 0;
    }
`

export default GlobalStyle
