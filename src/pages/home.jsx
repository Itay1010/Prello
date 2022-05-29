import React from "react"
import { NavLink } from "react-router-dom"
import { TaskPreview } from "../cmps/board/task-preview"


export const Home = () => {
    return <section className="home">
        <nav className="flex space-between">
            <div className="logo">Logo</div>
            <div className="auth-links"></div>
        </nav>
        <div className="hero">
            <div className="hero-content">
                <h1><span> While you grow, save yourself</span><span> the trouble with Prello</span></h1>
                <p>Preparation is the key name, as a freelancer to enterprises </p>
                <p>Prello is the tool to keep yourself in ease.</p>
                <button>Come and explore</button>
            </div>
            <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="" />
        </div>
    </section>
}