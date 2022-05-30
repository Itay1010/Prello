import React from "react"
import { ReactDOM } from "react-dom"

import { userService } from "../services/user.service"

import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'
import FacebookLogin from 'react-facebook-login'


// import { userAction } from '../store/user/user.actions'
// import { useForm } from "../hooks/useForm"


export class Auth extends React.Component {
    state = {
        type: null
    }
    responseFacebook = (response) => {
        console.log(response);
    }
    componentDidMount() {
        const { type } = this.props.match.params
        this.setState({ type })
    }
    // responseFacebook()

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

                <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,user_friends,user_actions.books"
                    callback={this.responseFacebook}
                    icon="fa-facebook"
                />

            </div>
        </section>
    }
}