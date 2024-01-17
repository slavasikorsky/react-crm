import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import logo from "../../assets/react.svg";
import { Container } from "../Container";
import { Heading } from "./styled";

export default function Header() {
	return (
		<Container direction="nowrap" align="center" padding="12px 0">
			<Heading>
				<img src={logo} alt="logo" />
				<h1>React crm</h1>
			</Heading>
			<ThemeSwitcher />
			<LanguageSwitcher />
		</Container>
	);
}
