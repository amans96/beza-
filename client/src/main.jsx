import "./index.css";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Student from "./pages/Student.jsx";
import Contact from "./pages/Contact.jsx";
import Admissions from "./pages/Admissions.jsx";
import Faq from "./components/Faq.jsx";
import Register from "./components/Register.jsx";
import Careers from "./pages/Careers.jsx";

import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "admissions", element: <Admissions /> },
      { path: "student", element: <Student /> },
      { path: "gallery", element: <Gallery /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <Faq /> },
      { path: "register", element: <Register /> },
      { path: "careers", element: <Careers /> },
      { path: "login", element: <Login /> },

     {
  path: "admin",
  element: <ProtectedRoute />,
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
  ],
},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);