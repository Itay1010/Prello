import React from "react"
import { connect } from 'react-redux'
import { ReactDOM } from "react-dom"

import { userService } from "../services/user.service"

import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'

import { onLogin, onSignup, onGoogleAuth } from "../store/user/user.actions"

import { gapi } from "gapi-script"
const clientId = "168490950789-fil5g5m4nauiousknnut75avvh0dhsb5.apps.googleusercontent.com"



// import { userAction } from '../store/user/user.actions'
// import { useForm } from "../hooks/useForm"


export class _Auth extends React.Component {
    state = {
        type: null
    }

    componentDidMount() {
        const { type } = this.props.match.params
        this.setState({ type })

        function start() {
            gapi.client.init({
                clientId,
                scope: ""
            })
        }
        gapi.load('client:auth2', start)
    }

    signup = async (credentials) => {
        try {
            await this.props.onSignup(credentials)
            this.onGoOn()
        } catch (err) {
            console.error(err)
        }
        userService.signup(credentials, this.onGoOn)
    }

    login = async (credentials) => {
        try {
            await userService.login(credentials)
            this.onGoOn()
        } catch (err) {
            console.error(err)
        }
    }

    onGoOn = () => {
        this.props.history.push('/board/b101')
    }

    onSuccess = async (res) => {
        await this.props.onGoogleAuth(res.profileObj)
        try {
            this.onGoOn()
            console.log("LOGIN SUCCESS! current user: ", res.profileObj)
        } catch (res) {
            console.log("LOGIN FAILED! ,res ", res)
        }
    }

    onFailure = (res) => {
        console.log("LOGIN FAILED! ,res ", res)
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
                <div className="google-login">
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login with Google"
                        onSuccess={this.onSuccess}
                        onFailure={this.onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false}
                    />
                </div>
            </div>
        </section>
    }
}


const mapStateToProps = state => {

}

const mapDispatchToProps = {
    onLogin,
    onSignup,
    onGoogleAuth
}

export const Auth = connect(mapStateToProps, mapDispatchToProps)(_Auth)
