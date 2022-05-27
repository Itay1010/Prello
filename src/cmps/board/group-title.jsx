import React from 'react'
import { TextareaAutosize } from '@mui/material'
export const GroupTitle = ({ groupInfo, setGroupTitle, onArchiveGroup, onGroupChange }) => {
    if (!groupInfo) return <React.Fragment />
    return <div className="group-header flex space-between">
        <TextareaAutosize
            maxLength="521"
            value={groupInfo.txt}
            onChange={ev => {
                setGroupTitle(prevState => ({ ...prevState, txt: ev.target.value }))
            }}
            onBlur={ev => {
                if (!groupInfo.txt) return
                onGroupChange(groupInfo)
            }}
            onKeyDown={ev => {
                if (ev.key === "Enter") {
                    ev.preventDefault()
                    ev.target.blur()
                }
            }}></TextareaAutosize>
        <div className="more" onClick={ev => {
            onArchiveGroup(groupInfo.id)
        }}></div>
    </div>
}