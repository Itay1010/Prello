import React from "react"

import { userService } from "../services/user.service"

import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'

// import { userAction } from '../store/user/user.actions'
// import { useForm } from "../hooks/useForm"

export class Auth extends React.Component {
    state = {
        type: null
    }

    componentDidMount() {
        const { type } = this.props.match.params
        this.setState({ type })
    }

    signup = (credentials) => {
        userService.signup(credentials, this.onGoOn)
    }

    login = (credentials) => {
        userService.login(credentials, this.onGoOn)
    }

    onGoOn = () => {
        this.props.history.push('/board/b101')
    }

    render() {
        const { type } = this.state
        return <section className="auth-page">
            <h1>Prello</h1>
            <div className="form-wrapper">
                <h2>Sign up for your account</h2>
                {(type === 'signup') && <SignupForm onSignup={this.signup} />}
                {(type === 'login') && <LoginForm onLogin={this.login} />}
                <div className="login-method-separator">OR</div>
                <a>Continue with Google</a>
                <a>Continue with FaceBook</a>

            </div>
        </section>
    }
}