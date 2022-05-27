import React from 'react'

export const AttachmentPreview = ({ attachment }) => {
    const { url, title, createdAt } = attachment
    let diff = (Date.now() - createdAt) / 1000
    const dateToDisplay = () => {
        if (diff <= 60) return `added ${Math.floor(diff)} minutes ago`
        diff = diff / 60
        if (diff <= 60) return `added ${Math.floor(diff)} minutes ago`
        diff = diff / 60
        if (diff <= 24) return `added ${Math.floor(diff)}`
        const date = new Date(createdAt)
        return `added at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    console.log(diff / 1000 / 60)
    console.log(url)
    return <div className='attachment-preview'>
        <img src={url} alt="" />
        <div className='attachment-title-and-options'>
            <p>{title}</p>
            <div className='attachment-options'>
                <span>{dateToDisplay()}</span><div className='attachment-button'><a>Remove</a><a>Edit</a></div>
            </div>
        </div>
    </div>
}