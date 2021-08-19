import React from 'react';
import { useState, useEffect } from 'react';
import './GamePage.css';
import { ShipsDragNDrop } from '../components/ShipsDragNDrop'

const GamePage = ({ shipList }) => {
    const [playerBoard, setPlayerBoard] = useState([])
    const [PcBoard, setPcBoard] = useState([])
    const [startGame, setStartGame] = useState("off")
    const [placedShips, setPlacedShips] = useState("no")
    const [turn, setTurn] = useState("")

    const [shipLength, setShipLength] = useState(1)

    let cols = 10;
    let rows = 10;

    //initialize just once
    useEffect(() => {
        setPlayerBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0))); //setting 2d array 10x10
        setPcBoard(new Array(cols).fill(0).map(() => new Array(rows).fill(0)));//setting 2d array 10x10

    }, [])

    /////PC's board/////
    let rowEnemy = 0
    let colEnemy = 0
    ////////////////////////////////////////

    //Player: place coordinates on player board
    let placeShips = (coord, data) => {
        let row = coord[0]
        let col = coord[2] // todo arreglar id
        console.log("drop coord:", coord)
        console.log("data:", data)

        playerBoard[row][col] = 1
        //placeShipsRandomly() //on PC's board

        console.log("shiplist", shipList)
        console.log("PlayerBoard", playerBoard)
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

    //dragging & dropping
    let dragOver = (e) => {
        e.preventDefault();
        // The default action of onDragOver 
        // is to cancel the drop operation  -.-
        // so we need to prevent that
    }

    let drop = (e) => {
        e.preventDefault();
        let data = JSON.parse(e.dataTransfer.getData("ship"));
        let coord = e.target.id
        setShipLength(data.size)
        placeShips(coord, data)


        // because the onDragLeave won't fire after onDrop
    }

    let dragLeave = (e) => {
        // Drag Leave is used to
        // remove the highlight in the drop area
        //e.target.classList.remove("activeDropArea")
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
                        onDragLeave={dragLeave}>

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