import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./routers/Router";
import { store } from "./store/store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</I18nextProvider>
		</Provider>
	</React.StrictMode>
);
