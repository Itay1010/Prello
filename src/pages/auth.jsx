import React from 'react'
import { connect } from 'react-redux'

import { onLogin, onSignup } from '../store/user/user.actions'

import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'

import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Link } from 'react-router-dom'

import { ReactComponent as Img1 } from '../assets/imgs/auth-img-1.svg';
import { ReactComponent as Img2 } from '../assets/imgs/auth-img-2.svg';

const clientId = '168490950789-fil5g5m4nauiousknnut75avvh0dhsb5.apps.googleusercontent.com'

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
                scope: ''
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
            const user = await this.props.onLogin(credentials)
            this.onGoOn()
        } catch (err) {
            console.error(err)
        }
    }

    onGoOn = () => {
        this.props.history.push('/workspace')
    }

    onGoogleAuth = (googleUser) => {
        const { profileObj } = googleUser
        const user = {
            email: profileObj.email,
            firstName: profileObj.givenName,
            lastName: profileObj.familyName,
            imageUrl: profileObj.imageUrl,
            googleId: profileObj.googleId
        }
        if (this.props.match.params.type === 'signup') this.signup(user)
        else this.login(user)

    }

    onGoogleFailure = (res) => {
        console.log('LOGIN FAILED! ,res ', res)
    }

    render() {
        const { type } = this.state
        return <section className='auth-page'>
            <section className='background-container'>
                <Img1 />
                <Img2 />
            </section>
            <div className='auth-logo flex align-center'>
                <img className='logo-img' src={require('../assets/imgs/logo/Prello_logo_40.png')} />
                <h1>Prello</h1>
            </div>
            <div className='form-wrapper'>
                {(type === 'signup') && <SignupForm onSignup={this.signup} />}
                {(type === 'login') && <LoginForm onLogin={this.login} />}

                <div className='login-method-separator'>OR</div>

                {type === 'login' && <button style={({ margin: '0 0 16px' })} onClick={() => {
                    window.location.assign('/auth/signup')
                    this.setState((prevState) => 'signup')
                }}>
                    Sign up
                </button>}

                <div className='google-login'>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText='Continue with Google'
                        onSuccess={this.onGoogleAuth}
                        onFailure={this.onGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false}
                    />
                </div>
                <hr />
                <Link to='/' className='to-home reset' >Home</Link>
                {type === 'signup' && <a href='login' className='to-login reset'>Login</a>}
            </div>
            <svg></svg>
        </section>
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = {
    onLogin,
    onSignup,
    // onGoogleAuth
}

export const Auth = connect(mapStateToProps, mapDispatchToProps)(_Auth)
