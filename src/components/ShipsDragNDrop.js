import React from 'react';
import { useState } from 'react';

export const ShipsDragNDrop = ({ shipList }) => {
    const [toggleRotation, setToggleRotation] = useState("-vertical")
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
        console.log("id", e.target.id)

        rotated = !rotated;
        console.log("rotated", rotated)
        if (rotated) {
            document.getElementById(`${e.target.id}`).classList.replace(`${e.target.name}`, `${e.target.name}-vertical`)
        } else {
            document.getElementById(`${e.target.id}`).classList.replace(`${e.target.name}-vertical`, `${e.target.name}`)
        }
    };



    return (
        <div className="ships-container">
            {shipList.map((ele, eleIdx) => (
                <button
                    key={eleIdx}
                    onDragStart={handleDragStart}
                    touchstart={handleDragStart}
                    draggable="true"
                    className={ele.name}
                    name={ele.name}
                    value={ele.length}
                    id={ele.id}
                    onClick={(e) => handleClick(e)} />
            ))}
        </div>
    )
}


