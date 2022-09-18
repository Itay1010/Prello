import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
// import { connect } from 'react-redux'

// import { onLogin, onSignup } from '../store/user/user.actions'
import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'

import { ReactComponent as Img1 } from '../assets/imgs/auth-img-1.svg'
import { ReactComponent as Img2 } from '../assets/imgs/auth-img-2.svg'

const clientId = '168490950789-fil5g5m4nauiousknnut75avvh0dhsb5.apps.googleusercontent.com'

export const Auth = () => {
    const [authType, setAuthType] = useState(null)
    const { type } = useParams()

    useEffect(() => {
        setAuthType(type)

        const start = () => {
            gapi.client.init({
                clientId,
                scope: ''
            })
        }
        gapi.load('client:auth2', start)
    }, [type])


    const signup = async (credentials) => {
        // try {
        //     await this.props.onSignup(credentials)
        //     this.onGoOn()
        // } catch (err) {
        //     console.error(err)
        // }
    }

    const login = async (credentials) => {
        // try {
        //     const user = await this.props.onLogin(credentials)
        //     this.onGoOn()
        // } catch (err) {
        //     console.error(err)
        // }
    }

    // const onGoOn = () => {
    //     this.props.history.push('/workspace')
    // }

    const onGoogleAuth = (googleUser) => {
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

    const onGoogleFailure = (res) => {
        console.log('LOGIN FAILED! ,res ', res)
    }

    return <section className="auth-page">
        <div className="background-container">
            <Img1 />
            <Img2 />
        </div>
        <div className="auth-logo">
            <img className="logo-img" src={require("../assets/imgs/logo/Prello_logo_40.png")} alt="logo" />
            <h1>Prello</h1>
        </div>
        <section className="form-wrapper">
            {(authType === 'login') && <LoginForm onLogin={login} />}
            {(authType === 'signup') && <SignupForm onSignup={signup} />}

            <h4 className="separator">OR</h4>

            <GoogleLogin
                clientId={clientId}
                buttonText='Continue with Google'
                onSuccess={onGoogleAuth}
                onFailure={onGoogleFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                className={'btn-google'}
            />

            <hr />

            <aside className="links">
                <Link to="/" className="to-home reset" >Home</Link>
                {authType === 'login' && <a href="signup">Signup</a>}
                {authType === 'signup' && <a href="login">Login</a>}
            </aside>
        </section>
    </section>
}
// }

// const mapStateToProps = state => {

// }

// const mapDispatchToProps = {
//     onLogin,
//     onSignup,
//     // onGoogleAuth
// }

// export const Auth = connect(mapStateToProps, mapDispatchToProps)(_Auth)
