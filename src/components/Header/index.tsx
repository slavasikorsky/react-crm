import LanguageSwitcher from "../LanguageSwitcher";
import styled from "styled-components";
import ThemeSwitcher from "../ThemeSwitcher";
import logo from "../../assets/react.svg";

const HeaderContaner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	h1 {
		width: 100%;
	}
`;

export default function Header() {
	return (
		<HeaderContaner>
			<h1>
				<img src={logo} alt="" />
				React crm
			</h1>
			<ThemeSwitcher />
			<LanguageSwitcher />
		</HeaderContaner>
	);
}
