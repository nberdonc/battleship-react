import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

const GamePage = ({ shipList, setShipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [turn, setTurn] = useState("")
    const [elRefs, setElRefs] = useState([]);

    //Grid rows & cols
    let cols = 10;
    let rows = 10;


    //initialize just once
    useEffect(() => {
        setPlayerBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0)));//setting 2d array 10x10
        console.log("sr", document.getElementById("pepe"))
    }, [])

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
        } else {
            const newShipList = shipList.filter(ship => ship.name !== data.name)//delete ship droped from shipList
            setShipList(newShipList)
        }
        placeShips(coord, data, e)
        console.log(coord)
    }

    //Player: place coordinates on player board
    let placeShips = (coord, data, e) => {
        console.log("id", e.target.id)
        let row = parseInt(coord[0])
        let col = parseInt(coord[2]) // todo arreglar id

        if (data.size === "1") {
            playerBoard[row][col] = 1
            e.target.classList.add("shipdropedColor");//to add new style to our target
        }

        if (data.size === "2" && col <= 8) {
            playerBoard[row][col] = 1
            playerBoard[row][col + 1] = 1
            e.target.classList.add("shipdropedColor");//to add new style to our target
            document.getElementById(`${row},${col + 1}`).classList.add("shipdropedColor");
        }
        else { return }

        if (data.size === "3" && col <= 7) {
            playerBoard[row][col] = 1
            playerBoard[row][col + 1] = 1
            playerBoard[row][col + 2] = 1
            e.target.classList.add("shipdropedColor");//to add new style to our target
            document.getElementById(`${row},${col + 1}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 2}`).classList.add("shipdropedColor");
        }
        else { return }

        if (data.size === "4" && col <= 6) {
            playerBoard[row][col] = 1
            playerBoard[row][col + 1] = 1
            playerBoard[row][col + 2] = 1
            playerBoard[row][col + 3] = 1
            e.target.classList.add("shipdropedColor");//to add new style to our target
            document.getElementById(`${row},${col + 1}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 2}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 3}`).classList.add("shipdropedColor");
        }
        else { return }

        if (data.size === "5" && col <= 5) {
            playerBoard[row][col] = 1
            playerBoard[row][col + 1] = 1
            playerBoard[row][col + 2] = 1
            playerBoard[row][col + 3] = 1
            playerBoard[row][col + 4] = 1
            e.target.classList.add("shipdropedColor");//to add new style to our target
            document.getElementById(`${row},${col + 1}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 2}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 3}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 4}`).classList.add("shipdropedColor");
        }
        else { return }

        placeShipsRandomly(data.size) //on PC's board
        console.log("PlayerBoard", playerBoard)
        console.log("row& col", row + 1, col)
        console.log("data", data)
    };

    //PC: Place random coordinates on PC's board
    let rowEnemy = 0
    let colEnemy = 0
    const placeShipsRandomly = (size) => {
        let direction = generateRandomDirection()
        getRandomCoordinates(size)

        if (size === "1") {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
        }
        else if (data.size === "2") {
            console.log("roenemy", rowEnemy)
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
            PcBoard[rowEnemy - 1][colEnemy] = 1
        }
        else if (data.size === "3") {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
            PcBoard[rowEnemy - 1][colEnemy] = 1
            PcBoard[rowEnemy - 1][colEnemy + 1] = 1
        }
        else if (data.size === "4") {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
            PcBoard[rowEnemy - 1][colEnemy] = 1
            PcBoard[rowEnemy - 1][colEnemy + 1] = 1
            PcBoard[rowEnemy - 1][colEnemy + 2] = 1
        }
        else if (data.size === "5") {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
            PcBoard[rowEnemy - 1][colEnemy] = 1
            PcBoard[rowEnemy - 1][colEnemy + 1] = 1
            PcBoard[rowEnemy - 1][colEnemy + 2] = 1
            PcBoard[rowEnemy - 1][colEnemy + 3] = 1
        }

        console.log("PcBoard", PcBoard)
    };

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (size) => {
        rowEnemy = Math.floor(Math.random() * (10 - size + 1));
        colEnemy = Math.floor(Math.random() * 10);
        console.log("row&colenemy", rowEnemy, colEnemy)
    };

    //PC: Random direction for PC's ships 0 horizontal 1 vertical
    const generateRandomDirection = () => {
        return Math.floor(Math.random() * 2) + 0
    }

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

    //PC: shoots random to player's board
    let recieveShootPlayer = (rowIndex, colIndex, e) => {
        if (startGame === "on") {
            if (playerBoard[rowIndex][colIndex] === 1) {
                playerBoard[rowIndex][colIndex] = 'x'
                console.log("hit")
                console.log('row', rowIndex, '/col', colIndex)
                console.log(playerBoard)
            } else {
                playerBoard[rowIndex][colIndex] = 'o'
                console.log("miss")
                console.log('row', rowIndex, '/col', colIndex)
                console.log(playerBoard)
            }
            setTurn("YOUR")
        }
    };

    return (
        <div className="">
            <h2 id="pepe">Hello</h2>
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