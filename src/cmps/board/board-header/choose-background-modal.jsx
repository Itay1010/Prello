import React, { useRef } from 'react'
import { useForm } from '../../../hooks/useForm'


export const ChooseBackgroundModal = ({ closeBackgroundModal, imgs, setBackgroundImg, enterBackgroundSearch }) => {
    const searchRef = useRef()
    const [searchValue, handleSearchChange] = useForm('')

    const onSetBackgroundImg = (imgUrl) => {
        setBackgroundImg(imgUrl)
    }
    let timeoutId


    const searchValueTyped = (ev) => {
        timeoutId = null
        handleSearchChange(ev)
        timeoutId = setTimeout(() => {
            enterBackgroundSearch(searchValue)
            timeoutId = null
        }, 1000)
    }

    return <div className='background-modal'>
        <h1>hello</h1>
        <input ref={searchRef} type="text" placeholder='Enter search' onChange={searchValueTyped} name='searchValue' />
        <div className='unsplash-imgs-wrapper'>
            {imgs.map((img, idx) => {
                if (idx > 8) return
                return <div onClick={() => onSetBackgroundImg(img.urls.regular)} className='unsplash-imgs-small'>
                    <img src={img.urls.small} alt="" />
                </div>
            })}
        </div>
    </div>
}