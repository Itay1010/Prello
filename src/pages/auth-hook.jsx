import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

import { userService } from '../services/user.service'
import { onLogin, onSignup } from '../store/user/user.actions'
import { SignupForm } from '../cmps/auth/signup.jsx'
import { LoginForm } from '../cmps/auth/login.jsx'

import { ReactComponent as Img1 } from '../assets/imgs/auth-img-1.svg'
import { ReactComponent as Img2 } from '../assets/imgs/auth-img-2.svg'

const clientId = '168490950789-fil5g5m4nauiousknnut75avvh0dhsb5.apps.googleusercontent.com'

export const Auth = () => {
    const [authType, setAuthType] = useState(null)
    const { type } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

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


    const signup = (credentials) => {
        try {
            dispatch(onSignup(credentials))
            onGoOn()
        } catch (err) {
            console.error(err)
        }
    }

    const login = async (credentials) => {
        try {
            dispatch(onLogin(credentials))
            onGoOn()
        } catch (err) {
            console.error(err)
        }
    }

    const onGoOn = () => {
        history.push('/workspace')
    }

    const onGoogleAuth = async (googleUser) => {
        const { profileObj: { email, givenName, familyName, imageUrl, googleId } } = googleUser
        const registeredUser = await userService.getGoogleUser(email)
        if (registeredUser) login(googleUser)
        else {
            const newUser = {
                email,
                firstName: givenName,
                lastName: familyName,
                imageUrl,
                googleId
            }
            signup(newUser)
        }
    }

    const onGoogleFailure = (res) => {
        console.log('LOGIN FAILED! ,res ', res)
    }

    return <section className="auth-page" >
        <div className="background-container" >
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
                buttonText="Continue with Google"
                onSuccess={onGoogleAuth}
                onFailure={onGoogleFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={false}
                className={"btn-google"}
            />

            <hr />

            <aside className="links">
                <Link to="/">Home</Link>
                {authType === 'login' && <Link to="/auth/signup">Sign up</Link>}
                {authType === 'signup' && <Link to="/auth/login">Login</Link>}
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
