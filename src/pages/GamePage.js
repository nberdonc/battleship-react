import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

let PcShipsLeft = [1, 2, 3, 4, 5];
let PlayerShipsLeft = [1, 2, 3, 4, 5];
let pcShips = 5
let playerShips = 5
let rotated = false

const GamePage = ({ shipList, setShipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [turn, setTurn] = useState("")
    const [pcInfo, setPcInfo] = useState("")
    const [playerInfo, setPlayerInfo] = useState("")
    const checkWinner = (accumulator, curr) => accumulator + curr;//to check if player is winner

    let BOARD_COLS = 10;
    let BOARD_ROWS = 10;

    let PcRowIdx = 0
    let PcColIdx = 0
    let pcId = 0

    let ShipData = []
    let validated = false

    //initialize just once
    useEffect(() => {
        setPlayerBoard(new Array(BOARD_COLS).fill(0).map(() => new Array(BOARD_ROWS).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(BOARD_COLS).fill(0).map(() => new Array(BOARD_ROWS).fill(0)));//setting 2d array 10x10
    }, [])

    useEffect(() => {
        console.log("WHICH TURN IT IS???????", turn)
    }, [turn])

    const refresh = () => {
        window.location.reload();
    };

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
            generateRandomDirection(ShipSize)
        }
        else { console.log("not valid") }
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = (ShipSize) => {
        rotated = Math.random() < 0.5
        getRandomCoordinates(ShipSize, rotated)
    }

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (ShipSize, rotated) => {
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
        validated = validateShipPosition(PcRowIdx, PcColIdx, ShipSize, PcBoard, rotated) //on PC's board

        if (validated) {
            placeShipsRandomly(ShipSize)
        }
        else {
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
        console.log("pc board", PcBoard)
        rotated = false
        return
    };

    //Start Game Function
    let startGameBtn = (e) => {
        if (shipList.length === 0) {
            setStartGame("on")
            setTurn("YOUR")
            setPcInfo(`${pcShips} ships left`)
            setPlayerInfo(`${playerShips} ships left`)
        }
    };

    //Player: shoots to coordinates on PC's board
    let recieveShootPc = (rowIndex, colIndex, e) => {
        console.log("pc board", PcBoard)
        let squareID = e.target.id
        if (startGame === "on") {
            if (typeof PcBoard[rowIndex][colIndex] !== 'number') {
                console.log("not allowed")
                return
            }
            else if (PcBoard[rowIndex][colIndex] === 0) {
                PcBoard[rowIndex][colIndex] = 'o'
                document.getElementById(`${squareID}`).classList.add("missShot");
            }
            else if (PcBoard[rowIndex][colIndex] === 1 || 2 || 3 || 4 || 5) {
                countPcLeftShips(PcBoard[rowIndex][colIndex], e)//reduce ship hit
                PcBoard[rowIndex][colIndex] = 'x'
                document.getElementById(`${squareID}`).classList.add("shipShotColor");
            }


            if (!countPcLeftShips) {//TODO
                console.log("SHips all sunk so you win and stop game")//TODO
                return//TODO
            }
            else {
                setTurn("PC's")
                setTimeout(function () { recieveShootPlayer() }, 1000)
            }
        }
    };

    let recieveShootPlayer = () => {
        //to create random shoot
        PcRowIdx = Math.floor(Math.random() * BOARD_ROWS);
        PcColIdx = Math.floor(Math.random() * BOARD_ROWS);
        console.log("random coord", PcRowIdx, PcColIdx)
        console.log("num?", playerBoard[PcRowIdx][PcColIdx])
        if (startGame === "on") {
            if (typeof playerBoard[PcRowIdx][PcColIdx] !== 'number') {
                recieveShootPlayer()//create other coordinates as square already shot
            }
            else if (playerBoard[PcRowIdx][PcColIdx] === 0) {
                playerBoard[PcRowIdx][PcColIdx] = 'o'
                document.getElementById(`${PcRowIdx},${PcColIdx}`).classList.add("missShot");
                setTurn("YOUR")
                console.log("playerboard", playerBoard)
            }
            else if (playerBoard[PcRowIdx][PcColIdx] === 1 || 2 || 3 || 4 || 5) {
                countPlayerLeftShips(playerBoard[PcRowIdx][PcColIdx])
                playerBoard[PcRowIdx][PcColIdx] = 'x'
                document.getElementById(`${PcRowIdx},${PcColIdx}`).classList.add("shipShotColor");
                setTurn("YOUR")
                console.log("playerboard", playerBoard)
            }
        }
    };

    //Count PLayer ships left after each shot
    let countPlayerLeftShips = (PlayerShipNum) => {
        console.log("num", PlayerShipNum)
        let ShotIdx = PlayerShipNum - 1

        PlayerShipsLeft[ShotIdx]--
        console.log("PcShipsLeft", PlayerShipsLeft)
        if (PlayerShipsLeft[ShotIdx] === 0) {
            console.log("ShipSunk", PlayerShipNum)
            playerShips--
            setPlayerInfo(`${playerShips} ships left`)
        }

        if (PlayerShipsLeft.reduce(checkWinner) === 0) {
            console.log("PC WON")
            setPlayerInfo(`${playerShips} SHIPS LEFT, PC HAS DEFEAT YOU!!`)
            return false
        }
    }
    //Count PC ships left after each shot
    let countPcLeftShips = (PcShipNum, e) => {
        console.log("num", PcShipNum)
        let ShotIdx = PcShipNum - 1

        PcShipsLeft[ShotIdx]--
        //console.log("PcShipsLeft", PcShipsLeft)

        if (PcShipsLeft[ShotIdx] === 0) {
            pcShips--
            setPcInfo(`${pcShips} ships left`)
            console.log("ShipSunk", PcShipNum)
        }

        if (PcShipsLeft.reduce(checkWinner) === 0) {
            console.log("YOU WON")
            setPcInfo(`${pcShips} SHIPS LEFT, YOU WON!!`)//block all features of the game
            return false//TODO
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
                    <h4 className="info">{playerInfo}</h4>
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
                    <h4 className="info">{pcInfo}</h4>
                </div>
            </div>
            <button onClick={startGameBtn}>START</button>
            <button onClick={refresh}>RESTART</button>
            <ShipsDragNDrop shipList={shipList} />

        </div>
    );
}

export default GamePage;