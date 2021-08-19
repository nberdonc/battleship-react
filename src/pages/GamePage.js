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

    /////PC's board to shoot bombs/////
    let rowEnemy = 0
    let colEnemy = 0

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
            e.target.classList.add("shipdropedColor");//to add new style to our target
            const newShipList = shipList.filter(ship => ship.name !== data.name)//delete ship droped from shipList
            setShipList(newShipList)
        }
        placeShips(coord, data)
    }

    //Player: place coordinates on player board
    let placeShips = (coord, data) => {
        let row = coord[0]
        let col = coord[2] // todo arreglar id

        playerBoard[row][col] = 1
        placeShipsRandomly(data.size) //on PC's board
        console.log("PlayerBoard", playerBoard)
        console.log("data", data)
    };

    //PC: Place random coordinates on PC's board
    const placeShipsRandomly = (size) => {
        let direction = generateRandomDirection()
        getRandomCoordinates(size)

        if (direction === 0) {
            PcBoard[rowEnemy - 1][colEnemy - 1] = 1
        } else {
            console.log("vartical!")
            //e.target.parentNode.style.transform = "rotate(90deg)";
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
                                            onClick={e => recieveShootPlayer(rowIndex, colIndex, e)}></div>
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