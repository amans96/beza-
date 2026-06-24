import React from "react";
import AboutHero  from "../components/AboutHero.jsx";
import Navbar from "../components/navbar.jsx"
import PrincipalMessage from "../components/PrincipalMessage.jsx"
import Mission from "../components/mission.jsx";
import Goal from "../components/Goal.jsx";
export default function About(){
    return(
        <div>
<Navbar/>
<AboutHero/>
<PrincipalMessage/>
<Mission/>
<Goal/>
        </div>
    )
}