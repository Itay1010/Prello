import React from 'react'
export const SideMenu = () => {
    return <section className='side-menu'>
        <div className='clear-screen'></div>
        <div className='menu-content'>
            <h1>Menu</h1>
            <div className='buttons-wrapper'>
                <button>About this board</button>
                <button>Choose background</button>
                <button>More</button>
            </div>
            <div className='activity-wrapper'></div>
        </div>
    </section>
}