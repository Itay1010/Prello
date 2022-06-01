import React from "react"

import { connect } from 'react-redux'

import { userService } from "../services/user.service"
import { onLogin, onSignup, onGoogleAuth } from "../store/user/user.actions"

import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'

import { GoogleLogin } from 'react-google-login'
import { gapi } from "gapi-script"
const clientId = "168490950789-fil5g5m4nauiousknnut75avvh0dhsb5.apps.googleusercontent.com"

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
        this.props.history.push('/workspace')
    }

    onSuccess = async (res) => {
        try {
            await this.props.onGoogleAuth(res.profileObj)
            this.onGoOn()
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
                {(type === 'signup') && <SignupForm onSignup={this.signup} />}
                {(type === 'login') && <LoginForm onLogin={this.login} />}
                <div className="login-method-separator">OR</div>
                <div className="google-login">
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Continue with Google"
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
