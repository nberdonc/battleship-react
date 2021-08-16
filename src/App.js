import './App.css';
import React from 'react';
import WelcomePage from './pages/WelcomePage';
import GamePage from './pages/GamePage';
import { useState } from 'react';


function App() {

  //PAGE STATES//
  const [appState, setAppstate] = useState('welcome')

  const startPlaying = () => {
    setAppstate('play');
  }



  return (
    <div className="App">
      {appState === 'play' ? <GamePage /> : <WelcomePage startPlaying={startPlaying} />}
    </div>
  );
}

export default App;
