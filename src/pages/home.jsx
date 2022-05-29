import React from "react"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { TaskPreview } from "../cmps/board/task-preview"
import { ILogo } from "../cmps/icons/i-Logo"


export const Home = () => {
    return <section className="home">
        <nav className="flex space-between">
            <div className="logo"> <ILogo /> </div>
            <div className="auth-links"><NavLink to={'/auth/login'}>Log in</NavLink><NavLink to={'/auth/signup'}>Sign up</NavLink></div>
        </nav>
        <div className="hero">
            <div className="hero-content">
                <h1><span>Save yourself the trouble</span><span> with Prello</span></h1>
                <p>Preparation is the key name, as a freelancer to enterprises </p>
                <p>Prello is the tool to keep yourself in ease.</p>
                <Link to={'/workspace'}><button>Try now</button></Link>
            </div>
            <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="" />
        </div>
    </section>
}