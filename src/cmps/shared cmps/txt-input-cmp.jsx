import React, { useState, useRef, useEffect } from "react";

export const TxtInputCmp = ({ saveFunc, toggleContentEditable, contentInitialState, handleBoardTitleChange }) => {


    const [content, setBoardTitleValue] = useState('')
    const contentRef = useRef()
    const [width, setWidth] = useState(0);

    const handleContentChange = ({ target }) => {
        setWidth(target.value.length + 'ch')
        setBoardTitleValue(target.value)
        handleBoardTitleChange(target.value)
    }

    useEffect(() => {
        setBoardTitleValue(contentInitialState)
        setWidth(contentInitialState.length + 'ch')
    }, [])



    const onSaveBoardTitle = (ev) => {
        if (ev.key === 'Enter') {
            saveFunc(content)
        }
    }

    return <input
        className="board-name"
        style={{ minWidth: "2ch", width }}
        // ref={contentRef}
        type="text"
        value={content}
        placeholder='Enter board name'
        onChange={handleContentChange}
        onBlur={handleContentChange}
        onKeyDown={onSaveBoardTitle} />
}