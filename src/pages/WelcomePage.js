
import React from 'react';

const WelcomePage = ({ startPlaying }) => {

    return (
        <div className="">
            <h2>BATTLESHIPS</h2>
            <p>gamerules</p>
            <button onClick={startPlaying}>START</button>
        </div>
    );
}

export default WelcomePage;