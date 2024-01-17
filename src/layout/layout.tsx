import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import { Container } from "../components/Container";

type LayoutProps = {
	children: JSX.Element | JSX.Element[];
};

const PageLayout = styled.div`
	min-height: 80vh;
`;

function Layout({ children }: LayoutProps) {
	return (
		<Container align="stretch">
			<Header />
			<PageLayout>{children || <Outlet />}</PageLayout>
		</Container>
	);
}

export default Layout;
