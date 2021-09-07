import './App.css';
import React from 'react';
import WelcomePage from './pages/WelcomePage';
import GamePage from './pages/GamePage';
import { useState } from 'react';


function App() {

  //PAGE STATES//
  const [appState, setAppstate] = useState('welcome')

  //SHIP LIST
  const [shipList, setShipList] = useState([
    { name: "cruiser-container", length: "1", id: "cruiser-container" },
    { name: "destroyer-container", length: "2", id: "destroyer-container" },
    { name: "submarine-container", length: "3", id: "submarine-container" },
    { name: "battleship-container", length: "4", id: "battleship-container" },
    { name: "carrier-container", length: "5", id: "carrier-container" }
  ])

  const startPlaying = () => {
    setAppstate('play');
  }



  return (
    <div className="App">
      {appState === 'play' ? <GamePage shipList={shipList} setShipList={setShipList} /> : <WelcomePage startPlaying={startPlaying} />}
    </div>
  );
}

export default App;
