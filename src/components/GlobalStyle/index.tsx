import { createGlobalStyle } from "styled-components";
import { ThemeType } from "../../types/types";
import "../../assets/fonts.css";

declare module "styled-components" {
	export interface DefaultTheme {
		value: ThemeType;
	}
}

const GlobalStyle = createGlobalStyle`

  body {
    font-family: Pangolin, sans-serif;
    color: ${(props) => props.theme.value.primary_text_color};
    background-color: ${(props) => props.theme.value.primary_bg_color};
    line-height: 1.4;
    font-weight: 400;
  }
`;

export default GlobalStyle;
