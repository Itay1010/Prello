import React, { useEffect } from 'react'
import { useForm } from '../../../hooks/useForm'

export const Attachment = ({ saveAttachment, closeModal }) => {
    const [attachment, handleChange] = useForm({
        title: '',
        url: '',
    })
    // let divRef = React.useRef(null);

    // useEffect(() => {
    //     // divRef.current.focus();
    // }, []);

    const onSaveAttachment = (ev) => {
        ev.preventDefault()
        const { url } = attachment
        const isUrlValid = isUrl(url)
        if (isUrlValid) saveAttachment(attachment)
    }

    function isUrl(url) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    }






    return <div
        //  ref={divRef} 
        // tabIndex={0}
        // onFocus={() => { console.log('main', 'focus'); }}
        // onBlur={closeModal}
        className='modal-type' tabindex={1}>
        <h4>Title</h4>
        <form onSubmit={onSaveAttachment}>
            <input autoComplete='off' type="text" placeholder='Enter title' name='title' onChange={handleChange} />
            <input autoComplete='off' type="text" placeholder='Enter url' name='url' onChange={handleChange} />
            <button>Save</button>
        </form>
    </div>
}
