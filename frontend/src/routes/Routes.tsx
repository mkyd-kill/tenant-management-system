import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "login", element: <LoginPage /> },
        ],
    },
]);