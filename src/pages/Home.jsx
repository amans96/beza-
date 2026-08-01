
import HeroPage from '../components/HeroPage .jsx';
import Card from '../components/Card.jsx'; 
import cardsData from '../data/cardsData.js';
import Achievers from '../components/Achivers.jsx';
import Footer from '../components/Footer.jsx';
import App from '../components/App.jsx';
import navbarLinks from '../data/navbar.js';
import Navbar from "../components/navbar.jsx"
export default function Home() {
  return(
    <div>
        <Navbar links={navbarLinks} />
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
      <Achievers/>
       <App/>
      <Footer/>
     
    </div>
  )
}