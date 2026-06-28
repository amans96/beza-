import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './components/navbar';
import navbarLinks from './data/navbar';

function App() {
  return (
    <div>
      
      <Outlet />
    </div>
  );
}

export default App;