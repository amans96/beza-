
import {useState,useEffect} from 'react' 
import Navbar from '../components/navbar.jsx'
import navbarLinks from '../data/navbar.js';
import Header from "../components/Header.jsx";
import Footer from '../components/Footer.jsx';
export default function Gallery(){
    
return(
    <div>
        <Navbar links={navbarLinks}/>
        <Header/>
       <Footer/>
      

    </div>
)
}