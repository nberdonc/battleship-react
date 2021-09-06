
import React from 'react';

const WelcomePage = ({ startPlaying }) => {

    return (
        <div>
            <h2>BATTLESHIPS</h2>
            <h3>GAMERULES:</h3>
            <ol className="rules-list">
                <li>Drag and drop your ships into the Player's board</li>
                <li>To change ship's direction, click on the ship</li>
                <li>Once all ships are in place, press START</li>
                <li>To start again press RESTART</li>
            </ol>
            <button className="btn" onClick={startPlaying}>START</button>
        </div>
    );
}

export default WelcomePage;