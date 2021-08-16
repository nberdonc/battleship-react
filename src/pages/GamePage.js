import React from 'react';
import { useState, useEffect } from 'react';
import Board from '../components/Board'

const GamePage = () => {
    let [board, setBoard] = useState([])
    let [PcBoard, setPcBoard] = useState([])

    useEffect(() => {
        console.log("ASHIPDASIPHDASPIOHDF")
        setBoard([
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
        ]);
        setPcBoard([
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
        ]);
        console.log(board)
    }, [])

    /////Player board/////
    const [rowInput, setRowInput] = useState()
    const [columnInput, setColumnInput] = useState()
    const [rowShootInput, setRowShootInput] = useState()
    const [columnShootInput, setColumnShootInput] = useState()


    /////PC's board/////


    const shipLength = 1
    let rowEnemy = 0
    let colEnemy = 0
    ////////////////////////////////////////


    //Player: get coordinates from input of player
    let handleRowInput = (e) => {
        setRowInput(parseInt(e.target.value))
    };

    let handleColumnInput = (e) => {
        setColumnInput(parseInt(e.target.value))
    };
    //Player: place coordinates on player board
    let placeShips = (e) => {
        board[rowInput - 1][columnInput - 1] = 1
        console.log(board)
        placeShipsRandomly() //on PC's board
    };

    //Player: shoots to coordinates on PC's board

    let handleRowShootInput = (e) => {
        setRowShootInput(parseInt(e.target.value))
    };

    let handleColumnShootInput = (e) => {
        setColumnShootInput(parseInt(e.target.value))
    };

    let shootPc = (e) => {
        if (PcBoard[rowShootInput - 1][columnShootInput - 1] === 1) {
            PcBoard[rowShootInput - 1][columnShootInput - 1] = 'x'
            console.log("hit")
            console.log(rowInput - 1)
            console.log(columnInput - 1)
            console.log(PcBoard)
        } else {
            PcBoard[rowShootInput - 1][columnShootInput - 1] = 'o'
            console.log("miss")
            console.log(rowInput)
            console.log(columnInput)
            console.log(PcBoard[rowInput - 1][columnInput - 1])
            console.log(PcBoard)
        }
    };

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = () => {
        rowEnemy = Math.floor(Math.random() * (10 - shipLength + 1));
        colEnemy = Math.floor(Math.random() * 10);
    };

    //PC: Place random coordinates on PC's board
    const placeShipsRandomly = async () => {
        await getRandomCoordinates()
        PcBoard[rowEnemy - 1][colEnemy - 1] = 1
        console.log(PcBoard)
    };

    let shootPlayer = () => {

    };

    return (
        <div className="">
            <h2>Hello</h2>
            <h3>Give me your coordinates</h3>
            <input type="text" name="row" placeholder="row" value={rowInput} onChange={handleRowInput} />
            <input type="text" name="column" placeholder="column" value={columnInput} onChange={handleColumnInput} />
            <button onClick={placeShips}>PLACE SHIP</button>
            <input type="text" name="row" placeholder="row" value={rowShootInput} onChange={handleRowShootInput} />
            <input type="text" name="column" placeholder="column" value={columnShootInput} onChange={handleColumnShootInput} />
            <button onClick={shootPc}>SHOOT</button>

            <Board />

        </div>
    );
}

export default GamePage;