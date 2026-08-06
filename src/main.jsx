
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx"
import Student from "./pages/Student.jsx"
import Contact from "./pages/Contact.jsx"
import Admissions from "./pages/Admissions.jsx"
import Faq from "./components/Faq.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register.jsx";
import Careers from "./pages/Careers.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
        { path: "admissions", element: <Admissions /> },
        {path:"student",element:<Student/>},
           {path:"gallery",element:<Gallery/>},
           {
  path: "contact",
  element: <Contact />,
},
{ path: "faq", element: <Faq /> },
{ path: "register", element: <Register /> },
{ path: "careers", element: <Careers /> },



    
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);