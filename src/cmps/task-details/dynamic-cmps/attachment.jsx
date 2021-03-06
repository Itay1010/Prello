import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { uploadImg } from '../../../services/basic/cloudinary-service'

export const Attachment = ({ attachmentToUpdate, saveAttachment, closeModal }) => {

    const [imgFromUpload, setImgFromUpload] = useState(null)
    let fileRef = useRef()
    let [attachment, handleChange] = useForm({
        title: attachmentToUpdate ? attachmentToUpdate.title : '',
        url: attachmentToUpdate ? attachmentToUpdate.url : '',
        id: attachmentToUpdate ? attachmentToUpdate.id : false,
        createdAt: attachmentToUpdate ? attachmentToUpdate.createdAt : ''
    })
    const onSaveAttachment = (ev) => {
        ev.preventDefault()
        const { url } = attachment
        const isUrlValid = isUrl(url)
        if (isUrlValid) {
            saveAttachment(attachment)
            closeModal()
        }
    }
    useEffect(() => {

    }, [attachment.url])

    const handleFileChange = async (ev) => {
        const imgUrl = await uploadImg(ev)
        attachment.url = imgUrl
        handleChange({ target: { name: 'url', value: imgUrl } })
    }
    function isUrl(url) {
        return /^(ftp|http|https):\/\/[^ ']+$/.test(url)
    }

    return <div className='attachments'>
        <div className='close-modal flex justify-center align-center' onClick={(event) => {
            event.stopPropagation()
            closeModal(null)
        }}><svg width='24' height='24' viewBox='0 0 24 24' ><path fillRule='evenodd' clipRule='evenodd' d='M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z' /></svg></div>
        <h2>Attachments</h2>
        <hr />
        <form onSubmit={onSaveAttachment} className=' flex col'>
            <h3>Title</h3>
            <input value={attachment.title} autoComplete='off' type='text' placeholder='Enter title' name='title' onChange={handleChange} />
            <h3>URL</h3>
            <input value={attachment.url} autoComplete='off' type='text' placeholder='Enter url' name='url' onChange={handleChange} />
            <div className='button-wrapper'>
                <button>Save</button>
                <label htmlFor="inputFile">
                    Upload image
                    <input onChange={handleFileChange} ref={fileRef} id='inputFile' style={{ display: 'none' }} className='input-file' type="file" />
                </label>
            </div>
        </form>
    </div>
}
