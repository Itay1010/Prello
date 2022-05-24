import React from "react"
import { TaskPreview } from "../cmps/board/task-preview"

export const Home = () => {
    return <section className="home">
        <nav className="flex space-between"><div className="logo">Logo</div><div className="auth-links">Auth links</div></nav>
        <div className="hero">
            <h1>While you grow, save yourself the trouble with Prello</h1>
            <p>Preparation is the key name, as a freelancer to enterprises Prello is the tool to keep yourself in ease.</p>
            <button>Come and explore</button>
        </div>
    </section>
}