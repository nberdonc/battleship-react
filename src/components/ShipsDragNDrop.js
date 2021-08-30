import React from 'react';

export const ShipsDragNDrop = ({ shipList }) => {

    let rotated = false;
    const handleDragStart = (e) => {
        const data = JSON.stringify({
            size: e.target.value,
            offsetY: Math.floor(
                (e.clientY - e.target.getBoundingClientRect().top) / 50 // Calculate the position of the player's cursor on the ship
            ),
            offsetX: Math.floor(
                (e.clientX - e.target.getBoundingClientRect().left) / 50
            ),
            rotated: rotated,
            name: e.target.name,
        });
        e.dataTransfer.setData("ship", data);
        //console.log("/shipname:", e.target.name, "/shiplength:", e.target.value)
    }

    const handleClick = (e) => {
        if (!rotated) {
            document.querySelector(`.${e.target.className}`).style.transform = "rotate(90deg)";
        } else {
            document.querySelector(`.${e.target.className}`).style.transform = "";
        }
        rotated = !rotated;
    };

    // if (!rotated) {
    //     e.target.parentNode.style.transform = "rotate(90deg)";
    // } else {
    //     e.target.parentNode.style.transform = "";
    // }
    // rotated = !rotated;

    return (
        <div className="ships-container">
            {shipList.map((ele, eleIdx) => (
                <button
                    key={eleIdx}
                    onDragStart={handleDragStart}
                    draggable="true"
                    className={ele.name}
                    name={ele.name}
                    value={ele.length}
                    onClick={(e) => handleClick(e)} />
            ))}
        </div>
    )
}


