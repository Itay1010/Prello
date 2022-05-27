import React from 'react'
import { AttachmentPreview } from './attachment-preview.jsx'

export const AttachmentList = ({ attachments }) => {

    return (<div className='attachments'>
        <span>icon</span>
        <div className='attachment-list'>
            <h2>{(attachments.length > 1) ? 'attachments' : 'attachment'}</h2>
            {attachments.map(attachment => {
                return <AttachmentPreview attachment={attachment} />
            })}
        </div>
    </div>
    )

}