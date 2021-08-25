import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

const GamePage = ({ shipList, setShipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [turn, setTurn] = useState("")

    //Grid rows & cols
    let cols = 10;
    let rows = 10;

    //initialize just once
    useEffect(() => {
        setPlayerBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0)));//setting 2d array 10x10
    }, [])


    //PC: Place random coordinates on PC's board
    let rowEnemy = 0
    let colEnemy = 0
    let direction = false

    //dragging & dropping (default action of dragover is to cancel the drop so we need to prevent)
    let dragOver = (e) => {
        e.preventDefault();
    }

    let data = []
    let drop = (e) => {
        e.preventDefault();
        data = JSON.parse(e.dataTransfer.getData("ship"));
        let coord = e.target.id
        if (e.target.className === "square shipdropedColor") {
            return
        }

        placeShips(coord, data, e)
    }

    //Player: place coordinates on player board
    let placeShips = (coord, data, e) => {
        const newShipList = shipList.filter(ship => ship.name !== data.name)//delete ship droped from shipList
        let row = parseInt(coord[0])
        let col = parseInt(coord[2]) // todo arreglar id


        if (data.size === "1") {
            playerBoard[row][col] = 1
            e.target.classList.add("shipdropedColor");//to add new style to our target
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        if (data.size === "2" && col <= 8) {
            for (let i = 0; i <= 1; i++) {
                playerBoard[row][col + i] = 2
                document.getElementById(`${row},${col + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        if (data.size === "3" && col <= 7) {
            for (let i = 0; i <= 2; i++) {
                playerBoard[row][col + i] = 3
                document.getElementById(`${row},${col + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        if (data.size === "4" && col <= 6) {
            for (let i = 0; i <= 3; i++) {
                playerBoard[row][col + i] = 4
                document.getElementById(`${row},${col + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        if (data.size === "5" && col <= 5) {
            for (let i = 0; i <= 4; i++) {
                playerBoard[row][col + i] = 5
                document.getElementById(`${row},${col + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        generateRandomDirection(data.size)
        console.log("row& col", row, col)
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = (size) => {
        direction = Math.random() < 0.5
        getRandomCoordinates(size)
    }

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (size) => {
        rowEnemy = Math.floor(Math.random() * 10) + 1;
        colEnemy = Math.floor(Math.random() * (11 - parseInt(size))) + 1;
        console.log("row&colenemy", rowEnemy, colEnemy)
        // validateShipPosition(rowEnemy, colEnemy, size, PcBoard) //on PC's board

        placeShipsRandomly(size) //trigger this after validation ok
    };

    const placeShipsRandomly = (size) => {

        if (size === "1") {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
            console.log("PcBoard", PcBoard)
            return
        }
        if (data.size === "2" && colEnemy <= 9 &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0) {
            for (let i = -1; i <= 0; i++) {
                PcBoard[rowEnemy - 1][colEnemy + i] = 2
            }
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            generateRandomDirection(size)
        }
        if (data.size === "3" && colEnemy <= 8 && //infinite loop!!!!!
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 1] === 0) {
            for (let i = -1; i <= 1; i++) {
                PcBoard[rowEnemy - 1][colEnemy + i] = 3
            }
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            generateRandomDirection(size)
        }
        if (data.size === "4" && colEnemy <= 7 &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 2] === 0) {
            for (let i = -1; i <= 2; i++) {
                PcBoard[rowEnemy - 1][colEnemy + i] = 4
            }
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            generateRandomDirection(size)
        }
        if (data.size === "5" &&

            colEnemy <= 6 &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 2] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 3] === 0) {
            for (let i = -1; i <= 3; i++) {
                PcBoard[rowEnemy - 1][colEnemy + i] = 5
            }
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            generateRandomDirection(size)
        }
    };
    ///////////////////////////////////
    // const validateShipPosition = (row, col, size, board) => {
    //     console.log("row", row)
    //     console.log("col", col)
    //     console.log("size", size)
    //     console.log("board", board)
    //     for (let i = col - 1; i < size; i++) {
    //         if (board[row - 1][i] === 0 && col <= 10 - size) {
    //             return
    //         }
    //     }
    // }

    // const placeShipsRandomly = (size) => {
    //     let direction = generateRandomDirection()
    //     console.log("direction", direction)
    //     console.log("size parsed", parseInt(size))

    //     for (let i = colEnemy - 1; i < size - 1; i++) {
    //         if (validateShipPosition) {
    //             PcBoard[rowEnemy - 1][colEnemy - 1] = size
    //         } else {
    //             getRandomCoordinates(size)
    //         }
    //     }

    //     console.log("PcBoard", PcBoard)
    ////////////////////////////////
    // if (size === "1") {
    //     PcBoard[rowEnemy - 1][colEnemy - 1] = 1
    //     console.log("PcBoard", PcBoard)
    //     return
    // }
    // if (size === "2" && colEnemy <= 9 &&
    //     PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy] === 0) {
    //     for (let i = -1; i <= 0; i++) {
    //         PcBoard[rowEnemy - 1][colEnemy + i] = 2
    //     }
    //     console.log("PcBoard", PcBoard)
    //     return
    // }
    // else {
    //     getRandomCoordinates(size)
    // }
    // if (size === "3" && colEnemy <= 8 &&
    //     PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy + 1] === 0) {
    //     for (let i = -1; i <= 1; i++) {
    //         PcBoard[rowEnemy - 1][colEnemy + i] = 3
    //     }
    //     console.log("PcBoard", PcBoard)
    //     return
    // }
    // else {
    //     getRandomCoordinates(size)
    // }
    // if (size === "4" && colEnemy <= 7 &&
    //     PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy + 1] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy + 2] === 0) {
    //     for (let i = -1; i <= 2; i++) {
    //         PcBoard[rowEnemy - 1][colEnemy + i] = 4
    //     }
    //     console.log("PcBoard", PcBoard)
    //     return
    // }
    // else {
    //     getRandomCoordinates(size)
    // }
    // if (size === "5" &&

    //     colEnemy <= 6 &&
    //     PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy + 1] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy + 2] === 0 &&
    //     PcBoard[rowEnemy - 1][colEnemy + 3] === 0) {
    //     for (let i = -1; i <= 3; i++) {
    //         PcBoard[rowEnemy - 1][colEnemy + i] = 5
    //     }
    //     console.log("PcBoard", PcBoard)
    //     return
    // }
    // else {
    //     getRandomCoordinates(size)
    // }
    //};


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
                        {playerBoard.map((rows, rowIndex) => (
                            <div key={rowIndex} >
                                {
                                    rows.map((cols, colIndex) => (
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
                        {PcBoard.map((rows, rowIndex) => (
                            <div key={rowIndex} >
                                {
                                    rows.map((cols, colIndex) => (
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