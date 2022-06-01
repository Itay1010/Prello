import React from 'react'
import { useSelector } from 'react-redux'
// import { ActivitiesList } from './activities-list.jsx'
export const SideMenu = ({ toggleMenu, isSideMenuOpen }) => {

    const boardActivities = useSelector(storeState => storeState.boardModule.board.activities)
    console.log(boardActivities)
    return <section className='side-menu'>
        {isSideMenuOpen && <div onClick={() => {
            toggleMenu()
        }} className='menu-screen'></div>}
        <div className={isSideMenuOpen ? 'menu-content open' : 'menu-content'}>
            <h1>Menu</h1>
            <div className='header-features-buttons-wrapper'>
                <button>About this board</button>
                <button>Choose background</button>
                <button>More</button>
            </div>
            <div className='activity-wrapper'>
                {/* <ActivitiesList activities={boardActivities} /> */}
            </div>
        </div>
    </section>
}