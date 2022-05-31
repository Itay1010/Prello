import React, { useState } from 'react'
import { Attachment } from '../dynamic-cmps/attachment'

export const AttachmentPreview = ({ attachment, removeAttachment, openImgModal, saveAttachment }) => {
    const [isEditMode, setEditMode] = useState(null)
    const { url, title, createdAt, id } = attachment
    let diff = (Date.now() - createdAt) / 1000

    const dateToDisplay = () => {
        if (diff < 10) return 'Added a few seconds ago'
        if (diff <= 60) return `Added ${Math.floor(diff)} seconds ago `
        diff = diff / 60
        if (diff <= 60) return `Added ${Math.floor(diff)} ${diff < 1 ? 'minute ago' : 'minutes ago'} `
        diff = diff / 60
        if (diff <= 24) return `Added ${Math.floor(diff)} ${diff < 1 ? 'hour ago' : 'hours ago'}`
        const date = new Date(createdAt)
        return `Added at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `
    }

    const onRemoveAttachment = () => {
        removeAttachment(id)
    }


    return <div className='attachment-preview flex space-between' key={attachment.id}>
        {/* <div className='img-container' onClick={() => openImgModal(url)}>
            <img src={url} alt="" />
        </div> */}
        <a href={attachment.url} target={'_blank'} className='img-container'>
            <img src={url} alt="" />
        </a>
        {/* <a href=""></a> */}
        {/* <div className='attachment-title-and-options'> */}
        <div className='attachment-data flex col space-between'>
            <h3>{title}</h3>
            <p>{dateToDisplay()}  </p>
            <div className='attachment-button'> <a onClick={onRemoveAttachment}>Remove</a><span>-</span><a onClick={() => setEditMode(true)}>Edit</a></div>
            {isEditMode && <div className='modal'><Attachment attachmentToUpdate={attachment} saveAttachment={saveAttachment} closeModal={() => setEditMode(false)} /></div>}
        </div>
    </div>
}