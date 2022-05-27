import React from 'react'
import { useForm } from '../../../hooks/useForm'

export const Attachment = ({ saveAttachment }) => {
    const [attachment, handleChange] = useForm({
        title: '',
        url: '',
    })

    const onSaveAttachment = (ev) => {
        ev.preventDefault()
        const { url } = attachment
        console.log(url)
        const isUrlValid = isUrl(url)
        console.log(isUrlValid)
        console.log(attachment)
        if (isUrlValid) saveAttachment(attachment)
    }

    function isUrl(url) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    }






    return <div className='modal-type'>
        <h4>Title</h4>
        <form onSubmit={onSaveAttachment}>
            <input autoComplete='off' type="text" placeholder='Enter title' name='title' onChange={handleChange} />
            <input autoComplete='off' type="text" placeholder='Enter url' name='url' onChange={handleChange} />
            <button>Save</button>
        </form>
    </div>
}
