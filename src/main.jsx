import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);