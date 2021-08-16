import React from 'react';
import { useState, useEffect } from 'react';
import Board from '../components/Board'

const GamePage = ({ startPlaying }) => {

    const [rowInput, setRowInput] = useState()
    const [columnInput, setColumnInput] = useState()

    const board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let handleRowInput = (e) => {
        setRowInput(parseInt(e.target.value))
    }

    let handleColumnInput = (e) => {
        setColumnInput(parseInt(e.target.value))
    }

    let placeShip = (e) => {
        board[rowInput - 1][columnInput - 1] = 1
        console.log(e.target.value)
    }

    return (
        <div className="">
            <h2>Hello</h2>
            <h3>Give me your coordinates</h3>
            <input type="text" name="row" placeholder="row" value={rowInput} onChange={handleRowInput} />
            <input type="text" name="column" placeholder="column" value={columnInput} onChange={handleColumnInput} />
            <button onClick={placeShip}>PLACE SHIP</button>

            <Board />

        </div>
    );
}

export default GamePage;