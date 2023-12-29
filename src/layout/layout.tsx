import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import styled, { ThemeProvider } from "styled-components";
import { RootState } from "../store/store";
import GlobalStyle from "../components/GlobalStyle";

type LayoutProps = {
	children: JSX.Element | JSX.Element[];
};

const PageContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 10px;
`;

const PageLayout = styled.div`
	min-height: 80vh;
`;

function Layout({ children }: LayoutProps) {
	const theme = useSelector((state: RootState) => state.theme);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<PageContainer>
				<Header />
				<PageLayout>{children || <Outlet />}</PageLayout>
			</PageContainer>
		</ThemeProvider>
	);
}

export default Layout;
