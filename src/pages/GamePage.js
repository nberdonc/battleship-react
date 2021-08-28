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

    let PcRowIdx = 0
    let PcColIdx = 0
    let direction = false
    let ShipData = []

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
        ShipData = JSON.parse(e.dataTransfer.getData("ship"));
        let DropCoord = e.target.id
        if (e.target.className === "square shipdropedColor") {
            return
        }
        placeShips(DropCoord, ShipData, e)
        console.log("data", ShipData)
    }

    //Player: place coordinates on player board
    let placeShips = (DropCoord, ShipData, e) => {
        const newShipList = shipList.filter(ship => ship.name !== ShipData.name)//delete ship droped from shipList
        let DropRow = parseInt(DropCoord[0])
        let DropCol = parseInt(DropCoord[2]) // todo arreglar id
        let ShipSize = parseInt(ShipData.size)

        if (DropCol < (BOARD_COLS - ShipSize)) {
            for (let i = 0; i < ShipSize; i++) {
                playerBoard[DropRow][DropCol + i] = ShipSize
                document.getElementById(`${DropRow},${DropCol + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard row& col", DropRow, DropCol)
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
            generateRandomDirection(ShipData.size)
            //getRandomCoordinates(ShipData.size)
        }
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = (ShipSize) => {
        direction = Math.random() < 0.5
        console.log("direction", direction)
        getRandomCoordinates(ShipSize)
    }

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (ShipSize) => {
        let COORD1 = Math.floor(Math.random() * BOARD_ROWS);
        let COORD2 = Math.floor(Math.random() * (BOARD_ROWS - parseInt(ShipSize) - 1));

        if (!direction) {
            PcRowIdx = COORD2
            PcColIdx = COORD1
        }
        else {
            PcRowIdx = COORD1
            PcColIdx = COORD2
        }

        let validated = validateShipPosition(PcRowIdx, PcColIdx, ShipSize, PcBoard) //on PC's board
        console.log(validated)

        if (validated) {
            placeShipsRandomly(ShipSize)
        }
        else {
            console.log("not validated")
            generateRandomDirection(ShipSize)
            //getRandomCoordinates(ShipSize)
        }
    };

    const validateShipPosition = (row, col, ShipSize, board) => {
        console.log("rowIDX&PcColIdx", row, col, "/size", ShipSize)
        for (let i = col; i < col + parseInt(ShipSize); i++) {
            console.log("i", i)
            if (!direction) {
                if (board[i][col] !== 0 && row <= (BOARD_ROWS - parseInt(ShipSize))) {
                    return false
                }
            }
            else {
                if (board[row][i] !== 0 && col <= (BOARD_ROWS - parseInt(ShipSize))) {
                    return false
                }
            }
        }
        return true
    }

    const placeShipsRandomly = (ShipSize) => {
        for (let i = 0; i < parseInt(ShipSize); i++) {
            if (!direction) {
                PcBoard[PcRowIdx + 1][PcColIdx] = parseInt(ShipSize)
            }
            else {
                PcBoard[PcRowIdx][PcColIdx + i] = parseInt(ShipSize)
            }
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