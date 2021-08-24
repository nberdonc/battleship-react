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
        console.log(coord)
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
            playerBoard[row][col] = 2
            playerBoard[row][col + 1] = 2
            e.target.classList.add("shipdropedColor");//to add new style to our target
            document.getElementById(`${row},${col + 1}`).classList.add("shipdropedColor");
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        else { console.log(data.size) }

        if (data.size === "3" && col <= 7) {
            for (let i = 0; i <= 2; i++) {
                playerBoard[row][col + i] = 3
                document.getElementById(`${row},${col + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        else { console.log(data.size) }

        if (data.size === "4" && col <= 6) {
            for (let i = 0; i <= 3; i++) {
                playerBoard[row][col + i] = 4
                document.getElementById(`${row},${col + i}`).classList.add("shipdropedColor");
            }
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        else { console.log(data.size) }

        if (data.size === "5" && col <= 5) {
            console.log(data.size)
            playerBoard[row][col] = 5
            playerBoard[row][col + 1] = 5
            playerBoard[row][col + 2] = 5
            playerBoard[row][col + 3] = 5
            playerBoard[row][col + 4] = 5
            e.target.classList.add("shipdropedColor");//to add new style to our target
            document.getElementById(`${row},${col + 1}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 2}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 3}`).classList.add("shipdropedColor");
            document.getElementById(`${row},${col + 4}`).classList.add("shipdropedColor");
            console.log("PlayerBoard", playerBoard)
            setShipList(newShipList)
        }
        else {
            console.log(data.size)
        }

        placeShipsRandomly(data.size) //on PC's board
        console.log("size to pass", data.size)
        console.log("row& col", row, col)
    };

    //PC: Place random coordinates on PC's board
    let rowEnemy = 0
    let colEnemy = 0
    const placeShipsRandomly = (size) => {
        let direction = generateRandomDirection()
        getRandomCoordinates(size)

        if (size === "1") {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
            console.log("PcBoard", PcBoard)
            return
        }
        if (data.size === "2" &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0) {

            PcBoard[rowEnemy - 1][colEnemy - 1] = 2
            PcBoard[rowEnemy - 1][colEnemy] = 2
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            getRandomCoordinates(size)
        }
        if (data.size === "3" &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 1] === 0) {

            PcBoard[rowEnemy - 1][colEnemy - 1] = 3
            PcBoard[rowEnemy - 1][colEnemy] = 3
            PcBoard[rowEnemy - 1][colEnemy + 1] = 3
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            getRandomCoordinates(size)
        }
        if (data.size === "4" &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 2] === 0) {

            PcBoard[rowEnemy - 1][colEnemy - 1] = 4
            PcBoard[rowEnemy - 1][colEnemy] = 4
            PcBoard[rowEnemy - 1][colEnemy + 1] = 4
            PcBoard[rowEnemy - 1][colEnemy + 2] = 4
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            getRandomCoordinates(size)
        }
        if (data.size === "5" &&
            PcBoard[rowEnemy - 1][colEnemy - 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 1] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 2] === 0 &&
            PcBoard[rowEnemy - 1][colEnemy + 3] === 0) {

            PcBoard[rowEnemy - 1][colEnemy - 1] = 5
            PcBoard[rowEnemy - 1][colEnemy] = 5
            PcBoard[rowEnemy - 1][colEnemy + 1] = 5
            PcBoard[rowEnemy - 1][colEnemy + 2] = 5
            PcBoard[rowEnemy - 1][colEnemy + 3] = 5
            console.log("PcBoard", PcBoard)
            return
        }
        else {
            getRandomCoordinates(size)
        }

    };

    //PC: Random coordinates for PC's board
    const getRandomCoordinates = (size) => {
        rowEnemy = Math.floor(Math.random() * 10) + 1;
        if (size === "1") {
            colEnemy = Math.floor(Math.random() * 10) + 1;
            console.log("row&colenemy", rowEnemy, colEnemy)
        }
        else if (size === "2") {
            colEnemy = Math.floor(Math.random() * 9) + 1;
            console.log("row&colenemy", rowEnemy, colEnemy)
        }
        else if (size === "3") {
            colEnemy = Math.floor(Math.random() * 8) + 1;
            console.log("row&colenemy", rowEnemy, colEnemy)
        }
        else if (size === "4") {
            colEnemy = Math.floor(Math.random() * 7) + 1;
            console.log("row&colenemy", rowEnemy, colEnemy)
        }
        else if (size === "5") {
            colEnemy = Math.floor(Math.random() * 6) + 1;
            console.log("row&colenemy", rowEnemy, colEnemy)
        }
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