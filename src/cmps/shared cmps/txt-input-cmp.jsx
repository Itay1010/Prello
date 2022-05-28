import React, { useState, useRef, useEffect } from "react";

export const TxtInputCmp = ({ saveFunc, toggleContentEditable, contentInitialState }) => {


    const [content, setBoardTitleValue] = useState('')
    const contentRef = useRef()
    const [width, setWidth] = useState(0);

    const handleContentChange = ({ target }) => {
        setWidth(target.value.length + 'ch')
        setBoardTitleValue(target.value)
    }

    useEffect(() => {
        setBoardTitleValue(contentInitialState)
        setWidth(contentInitialState.length + 'ch')
    }, [])



    const onSaveBoardTitle = (ev) => {
        if (ev.key === 'Enter') {
            toggleContentEditable()
            saveFunc(content)
        }
    }

    return <input className="min-width-input" style={{ width }} ref={contentRef} autoFocus type="text" value={content} placeholder='Enter board name' onChange={handleContentChange} onBlur={toggleContentEditable} onKeyDown={onSaveBoardTitle} />
}