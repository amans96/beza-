import React from "react";
import AboutHero  from "../components/AboutHero.jsx";
import Navbar from "../components/navbar.jsx"
import PrincipalMessage from "../components/PrincipalMessage.jsx"
import Mission from "../components/mission.jsx";
import Goal from "../components/Goal.jsx";
import StaffPage from "../components/StaffPage .jsx";
import navbarLinks from '../data/navbar.js';
import Footer from '../components/Footer.jsx';
import Explore from '../components/Explore.jsx'
export default function About(){
    return(
        <div>
  <Navbar links={navbarLinks} />
<AboutHero/>
<PrincipalMessage/>
<Mission/>
<Goal/>
<StaffPage/>
<Explore/>
<Footer/>

        </div>
    )
}