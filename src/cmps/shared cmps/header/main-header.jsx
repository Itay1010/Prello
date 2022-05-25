import React from 'react'

import { Filter } from './header cmps/filter.jsx'
const logo = require('../../../assets/imgs/logo/logo_20x20.png')

export function MainHeader() {
    return <header className="main-header full flex align-center">
        <img src={logo} alt="logo" />
        <h1>Prello</h1>
        <Filter />

    </header>
}