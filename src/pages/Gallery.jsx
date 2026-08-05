
import {useState,useEffect} from 'react' 
import Navbar from '../components/navbar.jsx'
import navbarLinks from '../data/navbar.js';
import Header from "../components/Header.jsx";

export default function Gallery(){
    
return(
    <div>
        <Navbar links={navbarLinks}/>
        <Header/>
       
      

    </div>
)
}