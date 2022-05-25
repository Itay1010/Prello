import React from 'react'

import { Filter } from './header cmps/filter'
import { Search } from './header cmps/search'
const logo = require('../../../assets/imgs/logo/logo_20x20.png')
const notification = require('../../../assets/imgs/icons/notification.svg')

export function MainHeader() {
    return <header className="main-header full flex align-center">
        <img src={logo} alt="logo" />
        <h1>Prello</h1>
        <Filter />
        <Search />
        <button> <img src={notification} alt="" /></button>
        <div className='profile'></div>

    </header>
}