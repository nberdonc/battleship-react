import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';

const GamePage = () => {
    let [playerBoard, setPlayerBoard] = useState([])
    let [PcBoard, setPcBoard] = useState([])
    let [turn, setTurn] = useState("YOUR")
    let cols = 10;
    let rows = 10;


    useEffect(() => {
        setPlayerBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0)));//setting 2d array 10x10

    }, [])

    /////Player board/////
    const [rowInput, setRowInput] = useState()
    const [columnInput, setColumnInput] = useState()

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
        playerBoard[rowInput - 1][columnInput - 1] = 1
        console.log("PlayerBoard", playerBoard)
        placeShipsRandomly() //on PC's board
    };

    //Player: shoots to coordinates on PC's board

    let recieveShootPc = (rowIndex, colIndex, e) => {
        if (PcBoard[rowIndex][colIndex] === 1) {
            PcBoard[rowIndex][colIndex] = 'x'
            console.log("hit")
            console.log('row', rowIndex)
            console.log('col', colIndex)
            console.log(PcBoard)
        } else {
            PcBoard[rowIndex][colIndex] = 'o'
            console.log("miss")
            console.log('row', rowIndex)
            console.log('col', colIndex)
            console.log(PcBoard)
        }
    };

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = () => {
        rowEnemy = Math.floor(Math.random() * (10 - shipLength + 1));
        colEnemy = Math.floor(Math.random() * 10);
    };

    //PC: Place random coordinates on PC's board
    const placeShipsRandomly = () => {
        getRandomCoordinates()
        PcBoard[rowEnemy - 1][colEnemy - 1] = 1
        console.log("PcBoard", PcBoard)
    };

    //PC: shoots random to player's board
    let recieveShootPlayer = (rowIndex, colIndex, e) => {
        if (playerBoard[rowIndex][colIndex] === 1) {
            playerBoard[rowIndex][colIndex] = 'x'
            console.log("hit")
            console.log('row', rowIndex)
            console.log('col', colIndex)
            console.log(playerBoard)
        } else {
            playerBoard[rowIndex][colIndex] = 'o'
            console.log("miss")
            console.log('row', rowIndex)
            console.log('col', colIndex)
            console.log(playerBoard)
        }
    };


    return (
        <div className="">
            <h2>Hello</h2>
            <h3>Give me your coordinates</h3>
            <input type="text" name="row" placeholder="row" value={rowInput} onChange={handleRowInput} />
            <input type="text" name="column" placeholder="column" value={columnInput} onChange={handleColumnInput} />
            <button onClick={placeShips}>PLACE SHIP</button>
            <div className="boards">
                <div>
                    <p>PLAYER BOARD</p>
                    <div className="boards-each">
                        <div >
                            {playerBoard.map((rows, rowIndex) => (
                                <div key={rowIndex} >
                                    {
                                        rows.map((cols, colIndex) => (
                                            <button key={colIndex} className="square"
                                                onClick={e => recieveShootPlayer(rowIndex, colIndex, e)} />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <h4>{turn} TURN</h4>
                <div>
                    <p>PC BOARD</p>
                    <div className="boards-each">
                        <div >
                            {PcBoard.map((rows, rowIndex) => (
                                <div key={rowIndex} >
                                    {
                                        rows.map((cols, colIndex) => (
                                            <button key={colIndex} className="square"
                                                onClick={e => recieveShootPc(rowIndex, colIndex, e)} />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePage;