import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import styled, { ThemeProvider } from "styled-components";
import { RootState } from "../store/store";
import GlobalStyle from "../components/GlobalStyle";

type LayoutProps = {
	children: JSX.Element | JSX.Element[];
};

const PageLayout = styled.div`
	min-height: 80vh;
`;

function Layout({ children }: LayoutProps) {
	const theme = useSelector((state: RootState) => state.theme);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
			<PageLayout>{children || <Outlet />}</PageLayout>
		</ThemeProvider>
	);
}

export default Layout;
