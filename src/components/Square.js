import React, { useState } from 'react'

const Square = ({
    onClick,
    colorCode,
    boardId,
    name,
    currentPlayer,
    isPlacingShip,
    handleMouseEvent,
}) => {
    const [isMouseIn, setIsMouseIn] = useState(false)

    const chooseStyle = () => {
        const prepStyles = {
            backgroundColor: isMouseIn ? 'rgb(177, 175, 175)' : colorCode,
            pointerEvents:
                colorCode === 'gray' ? 'none' : !isPlacingShip ? 'none' : '',
        }

        const playerStyles = {
            backgroundColor: colorCode,
        }

        const AIStyles = {
            backgroundColor:
                isMouseIn && colorCode === 'white' ? 'rgb(177, 175, 175)' : colorCode,
            pointerEvents: currentPlayer === 'AI' ? 'none' : '',
        }

        if (name === 'prep') return prepStyles
        if (name === 'player') return playerStyles
        if (name === 'AI') return AIStyles
    }
    return (
        <div
            className={`board-square ${name}`}
            style={chooseStyle()}
            onMouseEnter={(e) => {
                setIsMouseIn(true)
                if (name === 'prep') handleMouseEvent(e)
            }}
            onMouseLeave={(e) => {
                setIsMouseIn(false)
                if (name === 'prep') handleMouseEvent(e)
            }}
            onClick={onClick}
            data-id={boardId}
            disabled={colorCode === 'gray' ? true : false}
        ></div>
    )
}

export default Square