import React from 'react';

const ShipsDragNDrop = () => {

    let shipList = [
        { name: "cruiser-container", length: "1" },
        { name: "destroyer-container", length: "2" },
        { name: "submarine-container", length: "3" },
        { name: "battleship-container", length: "4" },
        { name: "carrier-container", length: "5" }
    ]

    const handleDragStart = (e) => {
        console.log(e.target.name, e.target.value)
        e.dataTransfer.setData('ship', e.target.name)
    }


    return (
        <div className="ships-container">
            {shipList.map((ele, eleIdx) => (
                <button key={eleIdx} onDragStart={handleDragStart} draggable="true" className={ele.name} name={ele.name} value={ele.length} />
            ))}

            {/* <button onDragStart={handleDragStart} draggable="true" className="ship cruiser-container" value="1" name="cruiser-container">
                <div id="cruiser-0"></div>
            </button>
            <button onDragStart={handleDragStart} draggable="true" className="ship destroyer-container" value="2" name="destroyer-container">
                <div id="destroyer-0"></div>
                <div id="destroyer-1"></div>
            </button>
            <button onDragStart={handleDragStart} draggable="true" className="ship submarine-container" value="3" name="submarine-container">
                <div id="submarine-0"></div>
                <div id="submarine-1"></div>
                <div id="submarine-2"></div>
            </button>
            <button onDragStart={handleDragStart} draggable="true" className="ship battleship-container" value="4" name="battleship-container">
                <div id="battleship-0"></div>
                <div id="battleship-1"></div>
                <div id="battleship-2"></div>
                <div id="battleship-3"></div>
            </button>
            <button onDragStart={handleDragStart} draggable="true" className="ship carrier-container" value="5" name="carrier-container">
                <div id="carrier-0"></div>
                <div id="carrier-1"></div>
                <div id="carrier-2"></div>
                <div id="carrier-3"></div>
                <div id="carrier-4"></div>
            </button> */}
        </div>
    )
}

export default ShipsDragNDrop;

