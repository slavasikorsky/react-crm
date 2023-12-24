import { Routes, Route } from "react-router-dom";
import Clients from "../pages/Clients";
import NotFound from "../pages/NotFound";
import Layout from "../layout/layout";

function Router() {
	return (
		<Layout>
			<Routes>
				<Route path="/" index element={<Clients />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}
export default Router;
