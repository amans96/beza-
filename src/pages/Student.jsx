import React,{useState,useEffect} from "react";
import Navbar from "../components/navbar.jsx"
import navbarLinks from '../data/navbar.js';
import Footer from '../components/Footer.jsx';
import Club from '../components/Club.jsx'

export default function  Student(){
    return(
        <div>
            <Navbar links={navbarLinks} />
             <Club/>
           
        </div>
    )
 };