import React from "react";
import AboutHero  from "../components/AboutHero.jsx";
import Navbar from "../components/navbar.jsx"
import PrincipalMessage from "../components/PrincipalMessage.jsx"
export default function About(){
    return(
        <div>
<Navbar/>
<AboutHero/>
<PrincipalMessage/>
        </div>
    )
}