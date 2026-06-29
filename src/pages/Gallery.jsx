import React from "react";
import {useState,useEffect} from 'React' 
import Navbar from '../components/navbar.jsx'
import navbarLinks from '../data/navbar.js';
import Header from "../components/Header.jsx";
import Images from '../components/Images.jsx'
export default function Gallery(){
    
return(
    <div>
        <Navbar links={navbarLinks}/>
        <Header/>
      

    </div>
)
}