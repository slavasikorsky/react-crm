import { createGlobalStyle } from "styled-components";
import { ThemeType } from "../types/types";

declare module "styled-components" {
	export interface DefaultTheme {
		value: ThemeType;
	}
}
const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Pangolin&display=swap");

   * {
      margin: 0;
      padding: 0;
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    body {
        font-family: Pangolin, sans-serif;
        font-size: 1rem;
        line-height: 1.4;
        font-weight: 400;
        color: ${(props) => props.theme.value.primary_text_color};
        background-color: ${(props) => props.theme.value.primary_bg_color};
      }
`;

export default GlobalStyle;
