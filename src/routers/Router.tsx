import { createBrowserRouter } from "react-router-dom";
import Clients from "../pages/Clients";
import NotFound from "../pages/NotFound";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Clients />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
