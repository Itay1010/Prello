import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"

import { userService } from "../services/user.service"
import { loadGuest, onLogin, setUser } from "../store/user/user.actions"
const boardSample = require('../assets/imgs/board-sample.png')

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
            <div className="logo"><img src={require('../assets/imgs/logo/Prello_logo_25.png')} />
                <h1>Prello</h1>
            </div>
            <div className="auth-links">
                <NavLink className="login-btn" to={'/auth/login'}>Log in</NavLink>
                <NavLink className="signup-btn" to={'/auth/signup'}>Sign up</NavLink>
            </div>
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
        <section className="home-body">
            <section className="text-container">
                <h1>It's more than work. It's a way of working together.</h1>
                <p>
                    Start with a Prello board, lists, and cards.
                    Customize and expand with more features as your teamwork grows.
                </p>
                <p>
                    Manage projects, organize tasks, and build team spirit—all in one place.
                </p>
            </section>
            <img src={boardSample} alt="" />
        </section>
    </section >
}