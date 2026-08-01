import {useState,useEffect} from "react";
import Navbar from "../components/navbar.jsx"
import navbarLinks from '../data/navbar.js';
import Footer from '../components/Footer.jsx';
import Club from '../components/Club.jsx'
import Events from "../components/Events.jsx";

export default function  Student(){
    return(
        <div>
            <Navbar links={navbarLinks} />
             <Club/>
             <Events/>
           
        </div>
    )
 };