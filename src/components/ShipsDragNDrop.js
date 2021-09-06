import React from 'react';

export const ShipsDragNDrop = ({ shipList }) => {
    let offSetPartition = 40 //each ship partition size is 40px
    let rotated = false;
    const handleDragStart = (e) => {
        const data = JSON.stringify({
            size: e.target.value,
            offsetY: Math.floor(
                (e.clientY - e.target.getBoundingClientRect().top) / offSetPartition // Calculate the position of the player's cursor on the ship
            ),
            offsetX: Math.floor(
                (e.clientX - e.target.getBoundingClientRect().left) / offSetPartition
            ),
            rotated: rotated,
            name: e.target.name,
        });
        e.dataTransfer.setData("ship", data);
    }

    const handleClick = (e) => {
        if (!rotated) {
            e.target.parentNode.style.transform = "rotate(90deg)";
            //document.querySelector(`.${e.target.className}`).style.transform = "rotate(90deg)";
        } else {
            e.target.parentNode.style.transform = "";
            //document.querySelector(`.${e.target.className}`).style.transform = "";
        }
        rotated = !rotated;
    };



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


