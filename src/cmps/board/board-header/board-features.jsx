import React, { useState } from 'react'
import { SideMenu } from './side-menu.jsx'

export function BoardFeatures() {
    const [isSideMenuOpen, toggleSideMenu] = useState(false)

    return <section className="board-features flex align-center">
        <div className='btn-filter flex align-center justify-center'>
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z" /></svg>
            <p>Filter</p>
        </div>
        <div onClick={() => toggleSideMenu(!isSideMenuOpen)} className='btn-menu flex align-center justify-center'>
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" ><path fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" /></svg>
            <p>Show Menu</p>
        </div>
        {isSideMenuOpen && <SideMenu />}
    </section>
}