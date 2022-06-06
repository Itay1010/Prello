import React, { useRef, useState } from 'react'

import { TextareaAutosize } from '@mui/material'
import { IMore } from '../icons/i-more'
import { GroupModal } from './group-modal'
import { ILoader } from '../icons/i-loader'

export const GroupTitle = ({ groupInfo, setGroupTitle, onArchiveGroup, onGroupChange, onGroupColorChange }) => {

    const [isModalOpen, setModal] = useState(false)
    const [isColorSelect, setColorSelect] = useState(false)
    const titleRef = useRef()
    if (!groupInfo) return <ILoader />
    return <div className={`group-header flex space-between`} >
        <TextareaAutosize
            maxLength='521'
            value={groupInfo.txt}
            ref={titleRef}
            onChange={ev => {
                setGroupTitle(prevState => ({ ...prevState, txt: ev.target.value }))
            }}
            onBlur={ev => {
                if (!groupInfo.txt) return
                onGroupChange(groupInfo)
            }}

            onKeyDown={ev => {
                if (ev.key === 'Enter') {
                    ev.preventDefault()
                    ev.target.blur()
                }

            }}></TextareaAutosize>
        <div className='more flex justify-center align-center' onClick={ev => { setModal(prevState => !prevState) }}>
            <IMore />
        </div>
        {isModalOpen && <GroupModal
            setModal={setModal}
            archiveGroup={onArchiveGroup}
            groupInfo={groupInfo}
            setColorSelect={setColorSelect}
            titleRef={titleRef}
            isColorSelect={isColorSelect}
            onGroupColorChange={onGroupColorChange}
        />}

    </div>
}