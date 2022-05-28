import React from 'react'
import { AttachmentPreview } from './attachment-preview.jsx'

export const AttachmentList = ({ attachments, removeAttachment }) => {

    return (<div className='attachments'>
        <span>icon</span>
        <div className='attachment-list'>
            <h2>{(attachments.length > 1) ? 'attachments' : 'attachment'}</h2>
            {attachments.map(attachment => {
                return <AttachmentPreview key={attachment.id} attachment={attachment} removeAttachment={removeAttachment} />
            })}
        </div>
    </div>
    )

}