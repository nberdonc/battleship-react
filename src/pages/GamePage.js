import React from 'react';
import { useState, useEffect } from 'react';
//import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

let PcShipsLeft = [1, 2, 3, 4, 5];
let PlayerShipsLeft = [1, 2, 3, 4, 5];
let pcShips = 5
let playerShips = 5

let checkWinner = (accumulator, curr) => accumulator + curr;//to check winner summing all ships left

const GamePage = ({ shipList, setShipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [turn, setTurn] = useState("")
    const [pcInfo, setPcInfo] = useState("")
    const [playerInfo, setPlayerInfo] = useState("")
    const [disabled, setDisabled] = useState(false)

    let BOARD_COLS = 10;
    let BOARD_ROWS = 10;

    let PcRowIdx = 0
    let PcColIdx = 0
    let pcId = 0 // to create square grid Id from 1 to 99

    let ShipData = []
    let validated = false

    //initialize just once
    useEffect(() => {
        setPlayerBoard(new Array(BOARD_COLS).fill(0).map(() => new Array(BOARD_ROWS).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(BOARD_COLS).fill(0).map(() => new Array(BOARD_ROWS).fill(0)));//setting 2d array 10x10
    }, [])

    useEffect(() => {
        console.log("WHICH TURN IT IS?", turn)
    }, [turn])

    // to reaload the page when RESTART button is pressed
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
        const newShipList = shipList.filter(ship => ship.name !== ShipData.name)//deletes ship dropped from shipList
        let DropRowIdx = parseInt(DropCoord[0])
        let DropColIdx = parseInt(DropCoord[2])
        let ShipSize = parseInt(ShipData.size)
        let rotated = ShipData.rotated
        let offsetY = parseInt(ShipData.offsetY)
        let offsetX = parseInt(ShipData.offsetX)

        validated = validateShipPosition(DropRowIdx, DropColIdx, ShipSize, playerBoard, rotated, offsetX, offsetY)

        if (validated) {
            for (let i = 0; i < ShipSize; i++) {
                if (ShipData.rotated) {
                    playerBoard[DropRowIdx - offsetY + i][DropColIdx] = ShipSize
                    document.getElementById(`${DropRowIdx - offsetY + i},${DropColIdx}`).classList.add("shipdropedColor");
                }
                else if (!ShipData.rotated) {
                    playerBoard[DropRowIdx][DropColIdx - offsetX + i] = ShipSize
                    document.getElementById(`${DropRowIdx},${DropColIdx - offsetX + i}`).classList.add("shipdropedColor");
                }
            }
            setShipList(newShipList)
            generateRandomDirection(ShipSize)
        }
        else { console.log("not valid") }
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = (ShipSize) => {
        let PcRotated = Math.random() < 0.5
        getRandomCoordinates(ShipSize, PcRotated)
    }

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (ShipSize, PcRotated) => {
        let COORD1 = Math.floor(Math.random() * BOARD_ROWS);
        let COORD2 = Math.floor(Math.random() * (BOARD_ROWS - ShipSize - 1));
        let offsetX = 0 //initializing offsets for PC's board as 0
        let offsetY = 0
        if (PcRotated) {
            PcRowIdx = COORD2
            PcColIdx = COORD1
        }
        else {
            PcRowIdx = COORD1
            PcColIdx = COORD2
        }
        validated = validateShipPosition(PcRowIdx, PcColIdx, ShipSize, PcBoard, PcRotated, offsetX, offsetY)

        if (validated) {
            placeShipsRandomly(ShipSize, PcRotated)
        }
        else {
            generateRandomDirection(ShipSize)
        }
    };

    // validate all ships positions in both boards
    const validateShipPosition = (row, col, ShipSize, board, rotated, offsetX, offsetY) => {
        if (!rotated) {
            for (let i = col - offsetX; i < col - offsetX + ShipSize; i++) {
                if (i >= BOARD_ROWS || i < 0 || board[row][i] !== 0) {
                    return false
                }
            }
            return true
        }
        else {
            for (let i = row - offsetY; i < row - offsetY + ShipSize; i++) {
                if (i >= BOARD_ROWS || i < 0 || board[i][col] !== 0) {
                    return false
                }
            }
            return true
        }
    }

    //PC: places ships randomly on Pc's board
    const placeShipsRandomly = (ShipSize, rotated) => {
        for (let i = 0; i < ShipSize; i++) {
            if (rotated) {
                PcBoard[PcRowIdx + i][PcColIdx] = ShipSize
            }
            else {
                PcBoard[PcRowIdx][PcColIdx + i] = ShipSize
            }
        }
        console.log("pc board", PcBoard)
        return
    };

    //Start Game Function
    let startGameBtn = (e) => {
        if (shipList.length === 0) {
            setStartGame("on")
            setTurn("YOUR")
            setPcInfo(`${pcShips} LEFT TO SINK`)
            setPlayerInfo(`${playerShips} LEFT TO SINK`)
        }
    };

    //Player: shoots to coordinates on PC's board
    let recieveShootPc = (rowIndex, colIndex, e) => {
        let squareID = e.target.id
        if (startGame === "on") {
            if (typeof PcBoard[rowIndex][colIndex] !== 'number') {
                console.log("not allowed")
                return
            }
            else if (PcBoard[rowIndex][colIndex] === 0) {
                PcBoard[rowIndex][colIndex] = 'o'
                document.getElementById(`${squareID}`).classList.add("missShot");
                setTurn("PC's")
                setTimeout(function () { recieveShootPlayer() }, 1000)
            }
            else if (PcBoard[rowIndex][colIndex] === 1 || 2 || 3 || 4 || 5) {
                countPcLeftShips(PcBoard[rowIndex][colIndex], e)
                PcBoard[rowIndex][colIndex] = 'x'
                document.getElementById(`${squareID}`).classList.add("shipShotColor");
                if (PcShipsLeft.reduce(checkWinner) !== 0) {
                    setTurn("PC's")
                    setTimeout(function () { recieveShootPlayer() }, 1000)
                }
            }
        }
    };

    //PC: shoots to coordinates on Player's board
    let recieveShootPlayer = () => {
        //to create random shoot
        let PlayerShotRowIdx = Math.floor(Math.random() * BOARD_ROWS);
        let PlayerShotColIdx = Math.floor(Math.random() * BOARD_ROWS);

        if (startGame === "on") {
            if (typeof playerBoard[PlayerShotRowIdx][PlayerShotColIdx] !== 'number') {
                recieveShootPlayer()//create other coordinates as square is already shot
            }
            else if (playerBoard[PlayerShotRowIdx][PlayerShotColIdx] === 0) {
                playerBoard[PlayerShotRowIdx][PlayerShotColIdx] = 'o'
                document.getElementById(`${PlayerShotRowIdx},${PlayerShotColIdx}`).classList.add("missShot");
                setTurn("YOUR")
            }
            else if (playerBoard[PlayerShotRowIdx][PlayerShotColIdx] === 1 || 2 || 3 || 4 || 5) {
                countPlayerLeftShips(playerBoard[PlayerShotRowIdx][PlayerShotColIdx])
                playerBoard[PlayerShotRowIdx][PlayerShotColIdx] = 'x'
                document.getElementById(`${PlayerShotRowIdx},${PlayerShotColIdx}`).classList.add("shipShotColor");
                setTurn("YOUR")
            }
        }
    };

    //Count PLayer ships left after each shot
    let countPlayerLeftShips = (PlayerShipNum) => {
        let ShotIdx = PlayerShipNum - 1
        PlayerShipsLeft[ShotIdx]--

        if (PlayerShipsLeft[ShotIdx] === 0) {
            console.log("ShipSunk", PlayerShipNum)
            playerShips--
            setPlayerInfo(`${playerShips} TO SINK`)
        }
        if (PlayerShipsLeft.reduce(checkWinner) === 0) {
            console.log("PC WON")
            setPlayerInfo(`${playerShips} LEFT TO SINK, PC HAS DEFEATED YOU!!`)
            setDisabled(true)
        }
    }
    //Count PC ships left after each shot
    let countPcLeftShips = (PcShipNum, e) => {
        let ShotIdx = PcShipNum - 1
        PcShipsLeft[ShotIdx]--

        if (PcShipsLeft[ShotIdx] === 0) {
            pcShips--
            setPcInfo(`${pcShips} TO SINK`)
        }

        if (PcShipsLeft.reduce(checkWinner) === 0) {
            setPcInfo(`${pcShips} LEFT TO SINK, YOU WON!!`)
            setDisabled(true)//blocks all features at gameover
        }
    }

    return (
        <div className="">
            <h2>BATTLESHIP</h2>
            <h3>Drag your ships to the Player's board and press START!</h3>
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
                                        <div key={rowIndex} disabled={disabled} className="square" id={pcId++}
                                            onClick={e => recieveShootPc(rowIndex, colIndex, e)}></div>
                                    ))}
                            </div>
                        ))}
                    </div>
                    <h4 className="info">{pcInfo}</h4>
                </div>
            </div>
            <button className="btn" onClick={startGameBtn}>START</button>
            <button className="btn" onClick={refresh}>RESTART</button>
            <ShipsDragNDrop shipList={shipList} />

        </div>
    );
}

export default GamePage;