import React from 'react';
import Navbar from '../components/navbar';
import logo from '../assets/logo.jpg';
import HeroPage from '../components/HeroPage .jsx';
import Card from '../components/Card.jsx'; 
import cardsData from '../data/cardsData.js';



export default function Home() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "About",
      children: [
        { label: "Our Story", href: "#" },
        { label: "Mission & Vision", href: "#" },
        { label: "Principal's message", href: "#" },
        { label: "Our Team", href: "#" },
      ]
    },
    {
      label: "Admissions",
      children: [
        { label: "How to apply", href: "#" },
        { label: "Admission requirements", href: "#" },
        { label: "Tuition & Fees", href: "#" },
      ],
    },
    { label: "Student Life",
      children: [
        { label: "Clubs & activities", href: "#" },
        { label: "Sports programs", href: "#" },
        { label: "Events", href: "#" },
      ]
    },
    { label: "Gallery", href: "#gallery" },
  ];
  
  return(
    <div>
      <Navbar logo={logo} links={links} />
      <HeroPage />
     <div className=" my-10 p-10 grid grid-cols-3 gap-6">
  {cardsData.map((card, index) => (
    <Card
      key={index}
      {...card}
      delay={index * 100}
    />
  ))}
</div>


  </div>
  )
}