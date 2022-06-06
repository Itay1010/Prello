import React, { useRef, useEffect } from 'react'
import { useForm } from '../../../hooks/useForm'
import { IClose } from '../../icons/i-close'


export const ChooseBackgroundModal = ({ isModalOpen, closeBackgroundModal, imgs, setBackgroundImg, enterBackgroundSearch }) => {
    // console.log(imgs)
    const searchRef = useRef()
    const [searchValue, handleSearchChange] = useForm('')

    const onSetBackgroundImg = (imgUrl) => {
        setBackgroundImg(imgUrl)
    }
    let timeoutId
    // console.log(isModalOpen)

    useEffect(() => {
        return closeBackgroundModal()
    }, [])
    const searchValueTyped = (ev) => {
        timeoutId = null
        timeoutId = setTimeout(() => {
            enterBackgroundSearch(ev.target.value)
            timeoutId = null
        }, 1000)
    }
    if (!imgs) return
    return <div className={`background-modal ${isModalOpen ? 'open' : ''}`}>
        <div onClick={closeBackgroundModal} className='close-modal-btn-wrapper'>
            <IClose />
        </div>
        <h1>Change background</h1>
        <input ref={searchRef} type='text' placeholder='Enter search' onChange={searchValueTyped} name='searchValue' />
        <div className='unsplash-imgs-wrapper'>
            {imgs.map((img, idx) => {
                if (idx > 8) return
                return <div onClick={() => onSetBackgroundImg(img.urls.regular)} className='unsplash-imgs-small'>
                    <img src={img.urls.small} alt='' />
                </div>
            })}
        </div>
    </div>
}