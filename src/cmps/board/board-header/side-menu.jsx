import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ActivitiesList } from './activities-list.jsx'
import { IClose } from '../../icons/i-close.jsx'
import { ChooseBackgroundModal } from './choose-background-modal.jsx'
import { getPhotos, getSearch } from '../../../services/basic/unsplash.service.js'

export const SideMenu = ({ closeSideMenu, isSideMenuOpen, setBackgroundImg }) => {
    const [isBackgroundPickerOpen, setBackgroundPicker] = useState(false)
    // console.log(isSideMenuOpen)
    const { activities: boardActivities, style } = useSelector(storeState => storeState.boardModule.board)
    // console.log(boardActivities)
    const [imgs, setImgs] = useState(null)
    // console.log(isSideMenuOpen)
    useEffect(() => {
        onLoad()
    }, [])

    const onLoad = async () => {
        const imgs = await getPhotos()
        // console.log(imgs)
        setImgs(imgs)
    }

    const searchImgvalue = async (searchValue) => {

        const newImgs = await getSearch(searchValue)
        setImgs(newImgs)
    }


    return <section className='side-menu'>
        <div className={isSideMenuOpen ? 'menu-content open' : 'menu-content'}>
            <div className='close-modal-btn-wrapper' onClick={() => closeSideMenu(false)}  >
                <IClose />
            </div>
            <h1>Menu</h1>
            <div className='header-features-buttons-wrapper'>
                <button className='background-select-btn' onClick={() => setBackgroundPicker(true)}>
                    <img src={style.background} alt="" />
                    <span>Choose background</span>
                </button>
            </div>
            <div className='activity-header-wrapper'>
                <div className='activity-logo-wrapper'>
                    <IClose />
                </div>
                <h4 className='activity-heading'>Activity</h4>
            </div>
            {!isBackgroundPickerOpen && <ActivitiesList activities={boardActivities} />}
            {isSideMenuOpen && <ChooseBackgroundModal isSideMenuOpen={isSideMenuOpen} isModalOpen={isBackgroundPickerOpen} closeBackgroundModal={() => setBackgroundPicker(false)} imgs={imgs} enterBackgroundSearch={searchImgvalue} setBackgroundImg={setBackgroundImg} />}
        </div>
    </section>
}