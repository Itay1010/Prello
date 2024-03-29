import { httpService } from './basic/http.service'
import { socketService } from './basic/socket.service'
import { utilService } from './basic/util.service'

// const LOCAL_STORAGE_USER_DB = 'userDB'
const LOCAL_STORAGE_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    getUsers,
    getLoggedinUser,
    signup,
    login,
    logout,
    loginGuest,
}

// window.userService = userService

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER) || 'null')
}

async function getUsers() {
    try {
        const users = await httpService.get('user')

        return users

    } catch (err) {
        console.error('error getting users')
        throw err
    }
}

async function signup(userCred) {
    try {
        userCred.color = utilService.getRandomColor()
        if (!userCred.imgUrl) {
            const colorHex = userCred.color.slice(1)
            userCred.imgUrl = `https://ui-avatars.com/api/?name=${userCred.firstName}+${userCred.lastName}&background=${colorHex}`

        }
        const user = await httpService.post(`${BASE_URL}signup`, userCred)
        _saveLocalUser(user)
        return user

    } catch (err) {
        console.error('error in login')
        throw err
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post(`${BASE_URL}login`, userCred)
        return _saveLocalUser(user)
    }

    catch (err) {
        console.error('error in login')
        throw err
    }
}

async function logout() {
    sessionStorage.removeItem(LOCAL_STORAGE_LOGGEDIN_USER)
    return await httpService.post(`${BASE_URL}logout`)
}

async function loginGuest() {
    const user = {

        _id: 'g' + utilService.makeId(20),
        firstName: 'Guest',
        lastName: 'Guest',
        username: 'Guest',
        password: '123',
        email: 'Guest@gmail.com',
        // imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg',
        color: '#0E1856'

    }
    sessionStorage.setItem(LOCAL_STORAGE_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function getUserById(id) {
    
}

function _saveLocalUser(user) {
    sessionStorage.setItem(LOCAL_STORAGE_LOGGEDIN_USER, JSON.stringify(user))
    return user
}


// This is relevant when backend is connected
; (async () => {
    var user = getLoggedinUser()
    // console.log('; - user', user._id)
    if (user) socketService.emit('set-user-socket', user._id)
})()



    ; (async () => {
        // await userService.signup({ _id: 'u101', firstName: 'Eytan', lastName: 'Silberberg', username: 'eytan', password: 'eytan', email: 'eytan133@gmail.com', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg' })
        // await userService.signup({ _id: 'u102', firstName: 'Itay', lastName: 'Zonshine', username: 'itay', password: 'itay', email: 'etay150@gmail.com', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/itay_brzaf1.jpg' })
        // await userService.signup({ _id: 'u103', firstName: 'Offir', lastName: 'Carmi', username: 'offir', password: 'offir', email: 'offircarmi@gmail.com', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/offir_ixxjf7.jpg' })
        // await userService.signup({ _id: 'u104', firstName: 'Idan', lastName: 'Gez', username: 'idan', password: 'idan', email: 'idan@gez.com', imgUrl: 'https://media-exp1.licdn.com/dms/image/C4E03AQHS2IrCTjh7kQ/profile-displayphoto-shrink_800_800/0/1645011912408?e=1658966400&v=beta&t=ztcm1v1QLUsANcPVcXF8c-2icQB51oLyQ5hgK5sn-VQ' })
    })()