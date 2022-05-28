import React, { useState, useRef, useEffect } from "react";

export const TxtInputCmp = ({ saveBoardHeader, isBoardTitleEditable, toggleBoardTitleEditable, boardInitialTitle }) => {


    const [boardTitle, setBoardTitleValue] = useState('')
    const boardTitleRef = useRef()
    const [width, setWidth] = useState(0);

    const handleBoardTitleChange = ({ target, isBoardTitleEditable }) => {
        setWidth(target.value.length + 'ch')
        setBoardTitleValue(target.value)
    }

    useEffect(() => {
        setBoardTitleValue(boardInitialTitle)
        setWidth(boardInitialTitle.length + 'ch')
    }, [])



    const onSaveBoardTitle = (ev) => {
        if (ev.key === 'Enter') {
            toggleBoardTitleEditable()
            saveBoardHeader(boardTitle)
        }
    }

    return <input style={{ width }} ref={boardTitleRef} autoFocus type="text" value={boardTitle} placeholder='Enter board name' onChange={handleBoardTitleChange} onBlur={toggleBoardTitleEditable} onKeyDown={onSaveBoardTitle} />
}