import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

const GamePage = ({ shipList, setShipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [turn, setTurn] = useState("")

    let BOARD_COLS = 10;
    let BOARD_ROWS = 10;

    let PC_ROW_IDX = 0
    let PC_COL_IDX = 0
    let direction = false
    let SHIP_DATA = []

    //initialize just once
    useEffect(() => {
        setPlayerBoard(new Array(BOARD_COLS).fill(0).map(() => new Array(BOARD_ROWS).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(BOARD_COLS).fill(0).map(() => new Array(BOARD_ROWS).fill(0)));//setting 2d array 10x10
    }, [])

    //dragging & dropping (default action of dragover is to cancel the drop so we need to prevent)
    let dragOver = (e) => {
        e.preventDefault();
    }

    let drop = (e) => {
        e.preventDefault();
        SHIP_DATA = JSON.parse(e.dataTransfer.getData("ship"));
        let DROP_COORD = e.target.id
        if (e.target.className === "square shipdropedColor") {
            return
        }
        placeShips(DROP_COORD, SHIP_DATA, e)
        console.log("data", SHIP_DATA)
    }

    //Player: place coordinates on player board
    let placeShips = (DROP_COORD, SHIP_DATA, e) => {
        const newShipList = shipList.filter(ship => ship.name !== SHIP_DATA.name)//delete ship droped from shipList
        let DROP_ROW = parseInt(DROP_COORD[0])
        let DROP_COL = parseInt(DROP_COORD[2]) // todo arreglar id
        let SHIP_SIZE = parseInt(SHIP_DATA.size)

        if (DROP_COL < (BOARD_COLS - SHIP_SIZE)) {
            for (let i = 0; i < SHIP_SIZE; i++) {
                playerBoard[DROP_ROW][DROP_COL + i] = SHIP_SIZE
                document.getElementById(`${DROP_ROW},${DROP_COL + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard row& col", DROP_ROW, DROP_COL)
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
            generateRandomDirection(data.size)
            //getRandomCoordinates(SHIP_DATA.size)
        }
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = (SHIP_SIZE) => {
        direction = Math.random() < 0.5
        console.log("direction", direction)
        getRandomCoordinates(SHIP_SIZE)
    }

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (SHIP_SIZE) => {
        PC_ROW_IDX = Math.floor(Math.random() * BOARD_ROWS);
        PC_COL_IDX = Math.floor(Math.random() * (BOARD_COLS - parseInt(SHIP_SIZE) - 1));
        console.log("coordinates index generated", PC_ROW_IDX, PC_COL_IDX)
        let validated = validateShipPosition(PC_ROW_IDX, PC_COL_IDX, SHIP_SIZE, PcBoard) //on PC's board
        console.log(validated)

        if (validated) {
            placeShipsRandomly(SHIP_SIZE)
        }
        else {
            console.log("not validated")
            generateRandomDirection(SHIP_SIZE)
            //getRandomCoordinates(SHIP_SIZE)
        }
    };

    const validateShipPosition = (row, col, SHIP_SIZE, board) => {
        console.log("rowIDX&PC_COL_IDX", row, col, "/size", SHIP_SIZE)
        for (let i = col; i < col + parseInt(SHIP_SIZE) - 1; i++) {
            if (board[row][i] !== 0 && col <= (BOARD_ROWS - parseInt(SHIP_SIZE))) {
                return false
            }
        }
        return true
    }

    const placeShipsRandomly = (SHIP_SIZE) => {
        for (let i = 0; i < parseInt(SHIP_SIZE); i++) {
            PcBoard[PC_ROW_IDX][PC_COL_IDX + i] = parseInt(SHIP_SIZE)
        }
        console.log("PcBoard", PcBoard)
        return
    };

    //Start Game Function
    let startGameBtn = (e) => {
        if (shipList.length === 0) {
            setStartGame("on")
            setTurn("YOUR")
        }
    };

    //Player: shoots to coordinates on PC's board
    let recieveShootPc = (rowIndex, colIndex, e) => {
        if (startGame === "on") {
            if (PcBoard[colIndex][rowIndex] === 1 || 2 || 3 || 4 || 5) {
                PcBoard[colIndex][rowIndex] = 'x'
                console.log("hit")
                console.log('row', colIndex)
                console.log('col', rowIndex)
                console.log(PcBoard)
            } else if (PcBoard[colIndex][rowIndex] === 0) {
                PcBoard[colIndex][rowIndex] = 'o'
                console.log("miss")
                console.log('row', colIndex)
                console.log('col', rowIndex)
                console.log(PcBoard)
            }
            else if (PcBoard[colIndex][rowIndex] === 'x' || 'o') {
                console.log("not allowed")
            }
            setTurn("PC's")
        }
    };

    //PC: shoots random to player's board
    let recieveShootPlayer = (rowIndex, colIndex, e) => {
        if (startGame === "on") {
            if (playerBoard[colIndex][rowIndex] === 1) {
                playerBoard[colIndex][rowIndex] = 'x'
                console.log("hit")
                console.log('col', colIndex, '/row', rowIndex)
                console.log(playerBoard)
            } else {
                playerBoard[colIndex][rowIndex] = 'o'
                console.log("miss")
                console.log('col', colIndex, '/row', rowIndex)
                console.log(playerBoard)
            }
            setTurn("YOUR")
        }
    };

    return (
        <div className="">
            <h2>Hello</h2>
            <h3>Give me your coordinates</h3>
            <div className="all-boards">
                <div>
                    <p>PLAYER BOARD</p>
                    <div className="grid"
                        onDrop={(e) => drop(e)}
                        onDragOver={(e) => dragOver(e)}
                    >
                        {playerBoard.map((BOARD_ROWS, rowIndex) => (
                            <div key={rowIndex} >
                                {
                                    BOARD_ROWS.map((BOARD_COLS, colIndex) => (
                                        <div key={colIndex} className="square" id={[colIndex, rowIndex]}
                                            onClick={e => recieveShootPlayer(rowIndex, colIndex, e)}

                                        ></div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
                <h4>{turn} TURN</h4>
                <div>
                    <p>PC BOARD</p>
                    <div className="grid">
                        {PcBoard.map((BOARD_ROWS, rowIndex) => (
                            <div key={rowIndex} >
                                {
                                    BOARD_ROWS.map((BOARD_COLS, colIndex) => (
                                        <div key={colIndex} className="square" id={[colIndex, rowIndex]}
                                            onClick={e => recieveShootPc(rowIndex, colIndex, e)}></div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={startGameBtn}>START</button>
            <ShipsDragNDrop shipList={shipList} />
            <h4 className="info"></h4>
        </div>
    );
}

export default GamePage;