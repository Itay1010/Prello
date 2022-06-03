import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { getPhotos, getSearch } from '../../../services/basic/unsplash.service'

export const Cover = ({ saveCover, closeModal, task }) => {
    const unsplashRef = useRef()
    const [unsplashValue, setUnsplashValue] = useForm('')
    const [color, setColor] = useState()
    const [photos, setPhotos] = useState()

    const colors = ['#7BC86C', ' #F5DD2A', '#FFAF3F', '#EE7564', '#CD8DE5', '#28CCE5', '#5CA4CF', '#6DECA9', '#FF8ED4', '#182B4E']
    const onChooseColor = () => {

    }
    let timeoutId
    let background
    let lineColor
    let bottomColor
    const searchValueTyped = (ev) => {
        timeoutId = null
        timeoutId = setTimeout(async () => {
            const newImgs = await getSearch(ev.target.value)
            setPhotos(newImgs)
            timeoutId = null
        }, 1000)
    }

    console.log(task)

    useEffect(() => {
        loadPhotos()
        checkBackground()
    }, [])

    const loadPhotos = async () => {
        const photos = await getPhotos()
        console.log(photos)
        setPhotos(photos)
    }

    const checkBackground = () => {
        console.log(background)
        if (!task.background) return
        if (task.background.hasOwnProperty('backgroundImg')) {
            background = task.background.backgroundImg
        } else if (task.background.backgroundColor) {
            background = task.background.backgroundColor
        } else {
            background = ''
        }

    }


    if (!background) {
        background = '#D0D3DC'
        lineColor = '#D0D3DC'
        bottomColor = '#FAFBFC'
    } else {
        lineColor = '#6B778C'

    }

    if (!photos) return <React.Fragment></React.Fragment>
    return <div className='cover'>
        <div className='header-wrapper'>
            <h1>Cover</h1>
        </div>
        <h4>Size</h4>
        <div className='size-selector'>
            <div className='partial-cover' style={{ backgroundColor: `${background}` }}>
                <div className='card-example-header'></div>
                <div className='card-example-bottom' style={{ backgroundColor: `${bottomColor}` }}>
                    <div className='line-1' style={{ backgroundColor: `${lineColor}` }}></div>
                    <div className='line-2' style={{ backgroundColor: `${lineColor}` }}></div>
                    <div className='card-example-buttons'>
                        <div className='card-example-button' style={{ backgroundColor: `${lineColor}` }}></div>
                        <div className='card-example-button' style={{ backgroundColor: `${lineColor}` }}></div>
                    </div>
                </div>
            </div>
            <div className='full-cover' style={{ backgroundColor: `${background}` }}>
                <div className='card-example-bottom' style={{ backgroundColor: `${bottomColor}` }}>
                    <div className='line-1' style={{ backgroundColor: `${lineColor}` }}></div>
                    <div className='line-2' style={{ backgroundColor: `${lineColor}` }}></div>
                </div>
            </div>
        </div>
        <button>Remove cover</button>
        <h4>Colors</h4>
        <div className='colors-wrapper'>
            {colors.map(color => {
                return <span onClick={() => setColor(color)} className='color' style={{ backgroundColor: `${color}` }}></span>
            })}
        </div>
        <h4>Photos from Unsplash</h4>
        <div className='photos-from-unsplash'>
            {photos.map((photo, idx) => {
                if (idx > 8) return
                return <div className='img-pick-cover'> <img src={photo.urls.small} alt="" /></div>
            })}
            <input type="text" ref={unsplashRef} onChange={searchValueTyped} placeholder='Search Unsplash' />
        </div>




    </div>
}