import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"

import { userService } from "../services/user.service"
import { loadGuest, onLogin, setUser } from "../store/user/user.actions"

export const Home = () => {
    const dispatch = useDispatch()
    const loggedinUser = userService.getLoggedinUser()

    useEffect(() => {
        if (!loggedinUser) {
            dispatch(loadGuest())
        }
        else {
            dispatch(setUser(loggedinUser))
        }
    }, [loggedinUser])


    return <section className="home">
        <nav className="flex space-between">
            <div className="logo"><img src={require('../assets/imgs/logo/logo-25X25-color.png')} />
                <h1>Prello</h1>
            </div>
            <div className="auth-links"><NavLink to={'/auth/login'}>Log in</NavLink><NavLink to={'/auth/signup'}>Sign up</NavLink></div>
        </nav>
        <div className="hero">
            <div className="hero-content">
                <h1><span>Save yourself the trouble</span><span> with Prello</span></h1>
                <p>Engage Your day to day work with a highly equipped software</p>
                <p>Preparation is the key name, as a freelancer to enterprises </p>
                <p>Prello is the tool to keep yourself at ease.</p>
                <Link to={'/workspace'}><button>Get started</button></Link>
            </div>
            <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="" />
        </div>
    </section>
}