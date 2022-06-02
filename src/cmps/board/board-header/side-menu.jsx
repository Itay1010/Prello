import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ActivitiesList } from './activities-list.jsx'
import { IClose } from '../../icons/i-close.jsx'

export const SideMenu = ({ toggleMenu, isSideMenuOpen, openBackgroundModal }) => {

    const boardActivities = useSelector(storeState => storeState.boardModule.board.activities)
    return <section className='side-menu'>
        {isSideMenuOpen && <div onClick={toggleMenu} className='menu-screen'></div>}
        <div className={isSideMenuOpen ? 'menu-content open' : 'menu-content'}>
            <div className='close-modal-btn-wrapper' onClick={toggleMenu}  >
                <IClose />
            </div>
            <h1>Menu</h1>
            <div className='header-features-buttons-wrapper'>
                <button>About this board</button>
                <button onClick={() => openBackgroundModal(true)}>Choose background</button>
                <button>More</button>
            </div>
            <ActivitiesList activities={boardActivities} />
        </div>
    </section>
}