import React from 'react'

export const AttachmentPreview = ({ attachment, removeAttachment }) => {
    const { url, title, createdAt, id } = attachment
    let diff = (Date.now() - createdAt) / 1000

    const dateToDisplay = () => {
        if (diff <= 60) return `added ${Math.floor(diff)} seconds ago `
        diff = diff / 60
        if (diff <= 60) return `added ${Math.floor(diff)} ${diff < 1 ? 'minute ago-' : 'minutes ago-'} `
        diff = diff / 60
        if (diff <= 24) return `added ${Math.floor(diff)} ${diff < 1 ? 'hour ago-' : 'hours ago-'}`
        const date = new Date(createdAt)
        return `added at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `
    }

    const onRemoveAttachment = () => {
        console.log(id)
        removeAttachment(id)
    }

    return <div className='attachment-preview'>
        <img src={url} alt="" />
        <div className='attachment-title-and-options'>
            <p>{title}</p>
            <div className='attachment-options'>
                <p>{dateToDisplay()}  </p><div className='attachment-button'> <a onClick={onRemoveAttachment}>Remove</a><span>-</span><a>Edit</a></div>
            </div>
        </div>
    </div>
}