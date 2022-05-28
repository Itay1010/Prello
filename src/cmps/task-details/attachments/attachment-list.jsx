import React from 'react'
import { AttachmentPreview } from './attachment-preview.jsx'
import { IAttachment } from '../../icons/i-attachment'

export const AttachmentList = ({ attachments, removeAttachment, openImgModal }) => {



    return (<div className='attachments flex'>
        <div className='section-icon'>
            <IAttachment />
        </div>
        <div className='attachment-list'>
            <h2>{(attachments.length > 1) ? 'Attachments' : 'Attachment'}</h2>
            {attachments.map(attachment => {
                return <AttachmentPreview key={attachment.id} attachment={attachment} removeAttachment={removeAttachment} openImgModal={openImgModal} />
            })}
        </div>
    </div>
    )

}