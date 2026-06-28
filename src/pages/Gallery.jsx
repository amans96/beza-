import React from "react";
import {useState,useEffect} from 'React' 
import Navbar from '../components/navbar.jsx'
import navbarLinks from '../data/navbar.js';
import Header from "../components/Header.jsx";
export default function Gallery(){
    const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // send value to parent
  };
return(
    <div>
        <Navbar links={navbarLinks}/>
        <Header/>

    </div>
)
}