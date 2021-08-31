import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

let ShipsLeft = [1, 2, 3, 4, 5];

const GamePage = ({ shipList, setShipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [turn, setTurn] = useState("")

    let BOARD_COLS = 10;
    let BOARD_ROWS = 10;

    let PcRowIdx = 0
    let PcColIdx = 0
    let pcId = 0
    let rotated = false
    let ShipData = []
    let validated = false
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
    }

    //Player: place coordinates on player board
    let placeShips = (DropCoord, ShipData, e) => {
        const newShipList = shipList.filter(ship => ship.name !== ShipData.name)//delete ship droped from shipList
        let DropRowIdx = parseInt(DropCoord[0])
        let DropColIdx = parseInt(DropCoord[2]) // todo arreglar id
        let ShipSize = parseInt(ShipData.size)
        rotated = ShipData.rotated

        validated = validateShipPosition(DropRowIdx, DropColIdx, ShipSize, playerBoard, rotated) //on PC's board

        if (validated) {
            console.log("player validated", validated)
            for (let i = 0; i < ShipSize; i++) {
                if (ShipData.rotated) {
                    playerBoard[DropRowIdx + i][DropColIdx] = ShipSize
                    document.getElementById(`${DropRowIdx + i},${DropColIdx}`).classList.add("shipdropedColor");
                }
                else if (!ShipData.rotated) {
                    playerBoard[DropRowIdx][DropColIdx + i] = ShipSize
                    document.getElementById(`${DropRowIdx},${DropColIdx + i}`).classList.add("shipdropedColor");
                }
            }
            setShipList(newShipList)
            console.log("PlayerBoard row& col", DropRowIdx, DropColIdx)
            console.log("PlayerBoard", playerBoard)
            generateRandomDirection(ShipSize)
        }
        else { console.log("not valid") }
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = (ShipSize) => {
        rotated = Math.random() < 0.5
        getRandomCoordinates(ShipSize)
    }

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (ShipSize) => {
        let COORD1 = Math.floor(Math.random() * BOARD_ROWS);
        let COORD2 = Math.floor(Math.random() * (BOARD_ROWS - ShipSize - 1));

        if (rotated) {
            PcRowIdx = COORD2
            PcColIdx = COORD1
        }
        else {
            PcRowIdx = COORD1
            PcColIdx = COORD2
        }
        console.log("rowIDX&PcColIdx", PcRowIdx, PcColIdx, "/size", ShipSize)
        validated = validateShipPosition(PcRowIdx, PcColIdx, ShipSize, PcBoard) //on PC's board
        console.log("pc validated", validated)

        if (validated) {
            placeShipsRandomly(ShipSize)
        }
        else {
            console.log("not validated")
            generateRandomDirection(ShipSize)
        }
    };

    const validateShipPosition = (row, col, ShipSize, board, rotated) => {
        if (!rotated) {
            for (let i = col; i < col + ShipSize; i++) {
                if (board[row][i] !== 0 || col > BOARD_ROWS - ShipSize) {
                    return false
                }
            }
            return true
        }
        else {
            for (let i = row; i < row + ShipSize; i++) {
                if (board[i][col] !== 0 || row > BOARD_ROWS - ShipSize) {
                    return false
                }
            }
            return true
        }
    }

    const placeShipsRandomly = (ShipSize) => {
        for (let i = 0; i < ShipSize; i++) {
            if (rotated) {
                PcBoard[PcRowIdx + i][PcColIdx] = ShipSize
            }
            else {
                PcBoard[PcRowIdx][PcColIdx + i] = ShipSize
            }
        }
        rotated = false
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
        let squareID = e.target.id
        if (startGame === "on") {
            if (PcBoard[rowIndex][colIndex] === 0) {
                PcBoard[rowIndex][colIndex] = 'o'
                document.getElementById(`${squareID}`).classList.add("missShot");
                console.log("miss")
            }
            else if (PcBoard[rowIndex][colIndex] === 1 || 2 || 3 || 4 || 5) {
                countPcLeftShips(PcBoard[rowIndex][colIndex], e)//reduce ship hit
                PcBoard[rowIndex][colIndex] = 'x'
                document.getElementById(`${squareID}`).classList.add("shipShotColor");
                console.log("hit")

            }
            else if (PcBoard[rowIndex][colIndex] === 'x' || 'o') {
                console.log("not allowed")
            }
            console.log(PcBoard)
            setTurn("PC's")
            console.log("PCboard", PcBoard)
            setTimeout(function () { recieveShootPlayer() }, 1000)
        }
    };

    let recieveShootPlayer = () => {
        //to create random shoot
        PcRowIdx = Math.floor(Math.random() * BOARD_ROWS);
        PcColIdx = Math.floor(Math.random() * BOARD_ROWS);

        if (startGame === "on") {
            if (playerBoard[PcRowIdx][PcColIdx] === 0) {
                playerBoard[PcRowIdx][PcColIdx] = 'o'
                document.getElementById(`${PcRowIdx},${PcColIdx}`).classList.add("missShot");
                console.log("miss")
            }
            else if (playerBoard[PcRowIdx][PcColIdx] === 1 || 2 || 3 || 4 || 5) {
                countPlayerLeftShips(playerBoard[PcRowIdx][PcColIdx])
                playerBoard[PcRowIdx][PcColIdx] = 'x'
                document.getElementById(`${PcRowIdx},${PcColIdx}`).classList.add("shipShotColor");
                console.log("hit")

            }
            else if (playerBoard[PcRowIdx][PcColIdx] === 'x' || 'o') {
                console.log("not allowed")
            }
            console.log("playerboard", playerBoard)
            setTurn("YOUR")
        }
    };

    let countPlayerLeftShips = (ShotShipNum) => {
        //     console.log("num", PcShipNum)
        //     let ShotIdx = PcShipNum - 1

        //     ShipsLeft[ShotIdx]--
        //     console.log("ShipsLeft", ShipsLeft)

        //     if (ShipsLeft[ShotIdx] === 0) {
        //         console.log("ShipSunk", PcShipNum)
        //         ShipsLeft.splice(ShotIdx, 1)
        //         console.log("ShipsLeft", ShipsLeft)
        //     }

        //     if (ShipsLeft.length === 0) {
        //         console.log("YOU WON")
        //     }
        // }

    }

    let countPcLeftShips = (PcShipNum, e) => {
        console.log("num", PcShipNum)
        let ShotIdx = PcShipNum - 1

        ShipsLeft[ShotIdx]--
        console.log("ShipsLeft", ShipsLeft)

        if (ShipsLeft[ShotIdx] === 0) {
            console.log("ShipSunk", PcShipNum)// change ship color to black
            console.log("ShipsLeft", ShipsLeft)// in DOM
        }
        const reducer = (accumulator, curr) => accumulator + curr;

        if (ShipsLeft.reduce(reducer) === 0) {
            console.log("YOU WON")//in DOM
        }
    }

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
                        {playerBoard.map((BOARD_ROWS, colIndex) => (
                            <div key={colIndex} >
                                {
                                    BOARD_ROWS.map((BOARD_COLS, rowIndex) => (
                                        <div key={rowIndex} className="square" id={[rowIndex, colIndex]}
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
                        {PcBoard.map((BOARD_ROWS, colIndex) => (
                            <div key={colIndex} >
                                {
                                    BOARD_ROWS.map((BOARD_COLS, rowIndex) => (
                                        <div key={rowIndex} className="square" id={pcId++}
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