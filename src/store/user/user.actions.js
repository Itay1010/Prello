import { getPhotoThumb } from "../../services/basic/unsplash.service";
import { userService } from "../../services/user.service";
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";

export function loadGuest() {
    return dispatch => {
        try {
            const guest = userService.loginGuest()
            dispatch({ type: 'SET_USER', guest })
            return guest
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}

export function setUser(user) {
    return dispatch => {
        if (!user) return new Error('no user to dispatch')
        return dispatch({ type: 'SET_USER', user })
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            // showErrorMsg('Cannot login')
            console.log('Cannot login', err)
            throw err
        }
    }
}


export function onSignup(credentials) {
    console.log('onSignup - credentials', credentials)
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            // showErrorMsg('Cannot signup')
            console.error('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            // showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}