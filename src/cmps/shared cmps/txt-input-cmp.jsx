import React, { useState, useRef, useEffect } from "react"

export const TxtInputCmp = ({ boardTitle, handleBoardTitleChange }) => {

    const [boardTitleValue, setBoardTitleValue] = useState(boardTitle)
    const contentRef = useRef()
    const [width, setWidth] = useState(0)

    const handleContentChange = ({ target }) => {
        setWidth(target.value.length + 1 + 'ch')
        setBoardTitleValue(target.value)
    }

    useEffect(() => {
        setBoardTitleValue(boardTitle)
        setWidth(boardTitle.length + 1 + 'ch')
    }, [boardTitle])


    const onSaveBoardTitle = (ev) => {
        if (ev.key === 'Enter') {
            setBoardTitleValue(boardTitleValue)
        }
    }

    return <input
        className="board-name"
        style={{ minWidth: "5ch", width }}
        ref={contentRef}
        type="text"
        value={boardTitleValue}
        onChange={handleContentChange}
        onBlur={(() => {
            handleBoardTitleChange(boardTitleValue)
        })}
        onKeyDown={onSaveBoardTitle} />
}