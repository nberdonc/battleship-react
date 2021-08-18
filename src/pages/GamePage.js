import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';

const GamePage = () => {
    let [playerBoard, setPlayerBoard] = useState([])
    let [PcBoard, setPcBoard] = useState([])
    let [startGame, setStartGame] = useState("off")
    let [placedShips, setPlacedShips] = useState("no")
    let [turn, setTurn] = useState("")
    let cols = 10;
    let rows = 10;


    useEffect(() => {
        setPlayerBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0)));//setting 2d array 10x10

    }, [])

    /////Player board///// to change for drag and drop
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
        if (startGame === "on") {
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
            setTurn("PC's")
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
        setPlacedShips("yes")
        console.log("PcBoard", PcBoard)
    };

    //PC: shoots random to player's board
    let recieveShootPlayer = (rowIndex, colIndex, e) => {
        if (startGame === "on") {
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
            setTurn("YOUR")
        }
    };

    //Start Game Function
    let startGameBtn = (e) => {
        if (placedShips === "yes") {
            setStartGame("on")
            setTurn("YOUR")
        }

    }

    return (
        <div className="">
            <h2>Hello</h2>
            <h3>Give me your coordinates</h3>
            <input type="text" name="row" placeholder="row" value={rowInput} onChange={handleRowInput} />
            <input type="text" name="column" placeholder="column" value={columnInput} onChange={handleColumnInput} />
            <button onClick={placeShips}>PLACE SHIP</button>

            <div className="all-boards">
                <div>
                    <p>PLAYER BOARD</p>
                    <div>
                        <div className="grid">
                            {playerBoard.map((rows, rowIndex) => (
                                <div key={rowIndex} >
                                    {
                                        rows.map((cols, colIndex) => (
                                            <div key={colIndex} className="square"
                                                onClick={e => recieveShootPlayer(rowIndex, colIndex, e)}></div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <h4>{turn} TURN</h4>
                <div>
                    <p>PC BOARD</p>
                    <div>
                        <div className="grid">
                            {PcBoard.map((rows, rowIndex) => (
                                <div key={rowIndex} >
                                    {
                                        rows.map((cols, colIndex) => (
                                            <div key={colIndex} className="square"
                                                onClick={e => recieveShootPc(rowIndex, colIndex, e)}></div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={startGameBtn}>START</button>
            <h4 className="info"></h4>
            <div className="ships">
                <div className="ship destroyer-container" draggable="true">
                    <div id="destroyer-0"></div>
                    <div id="destroyer-1"></div>
                </div>
                <div className="ship submarine-container" draggable="true">
                    <div id="submarine-0"></div>
                    <div id="submarine-1"></div>
                    <div id="submarine-2"></div>
                </div>
                <div className="ship cruiser-container" draggable="true">
                    <div id="cruiser-0"></div>
                    <div id="cruiser-1"></div>
                    <div id="cruiser-2"></div>
                </div>
                <div className="ship battleship-container" draggable="true">
                    <div id="battleship-0"></div>
                    <div id="battleship-1"></div>
                    <div id="battleship-2"></div>
                    <div id="battleship-3"></div>
                </div>
                <div className="ship carrier-container" draggable="true">
                    <div id="carrier-0"></div>
                    <div id="carrier-1"></div>
                    <div id="carrier-2"></div>
                    <div id="carrier-3"></div>
                    <div id="carrier-4"></div>
                </div>
            </div>
        </div>
    );
}

export default GamePage;