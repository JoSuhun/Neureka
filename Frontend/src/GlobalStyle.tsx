import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
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
        margin: 0;
    }
`

export default GlobalStyle
