import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, Theme } from "./styles";
import { router } from "./routers/router";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Layout from "./layout/layout";
export default function App() {
	const themeMode = useSelector((state: RootState) => state.theme);
	const themeSettings = { ...themeMode, ...Theme };

	return (
		<ThemeProvider theme={themeSettings}>
			<GlobalStyle />
			<Layout>
				<RouterProvider router={router} fallbackElement={<Loader />} />
			</Layout>
		</ThemeProvider>
	);
}
