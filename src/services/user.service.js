// import { storageService } from './basic/async-storage.service'
import { httpService } from './basic/http.service'
import { utilService } from './basic/util.service'

// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
// const LOCAL_STORAGE_USER_DB = 'userDB'
const LOCAL_STORAGE_LOGGEDIN_USER = 'loggedinUser'


export const userService = {
    getLoggedinUser,
    signup,
    login,
    logout,
    googleAuth,
    loginGuest,
    // getUserById,
}

// window.userService = userService

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER) || 'null')
}

async function signup(userCred) {
    userCred.color = utilService.getRandomColor()
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(LOCAL_STORAGE_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

async function googleAuth(googleData) {
    console.log(googleData);
    const users = await httpService.get('user')
    const userExists = users.find(user => user.googleId === googleData.googleId)
    // const userExists = users.find(user => user.googleId === googleData.googleId || user.email === googleData.email)
    if (userExists) {
        login(userExists)
        //TODO:HANDLE ISSUE OF REGISTERED MAIL WITHOUT GOOGLEID

        // if (!userExists.googleId) {
        //     const googleUserToUpdate = { ...userExists, googleId: googleData.googleId }
        //     console.log(googleUserToUpdate);
        // } else {

        // }
    } else {
        const newUser = {
            email: googleData.email,
            firstName: googleData.givenName,
            lastName: googleData.familyName,
            imgUrl: googleData.imageUrl,
            googleId: googleData.googleId,
            color: utilService.getRandomColor()
        }
        const user = await httpService.post('auth/signup', newUser)
        _saveLocalUser(user);
    }
}

async function loginGuest() {
    const user = {
        _id: "g100",
        firstName: "Guest",
        lastName: "Guest",
        username: "Guest",
        password: "123",
        email: "Guest@gmail.com",
        // imgUrl: "https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg",
        color: "#5BC0EB"
    }
    sessionStorage.setItem(LOCAL_STORAGE_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function _saveLocalUser(user) {
    sessionStorage.setItem(LOCAL_STORAGE_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// function getUserById(userId) {
//     const users = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER)
//     console.log(userId);
// }




// This is relevant when backend is connected
// ;(async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })()



; (async () => {
    // await userService.signup({ _id: 'u101', firstName: 'Eytan', lastName: 'Silberberg', username: 'eytan', password: 'eytan', email: 'eytan133@gmail.com', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg' })
    // await userService.signup({ _id: 'u102', firstName: 'Itay', lastName: 'Zonshine', username: 'itay', password: 'itay', email: 'etay150@gmail.com', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/itay_brzaf1.jpg' })
    // await userService.signup({ _id: 'u103', firstName: 'Offir', lastName: 'Carmi', username: 'offir', password: 'offir', email: 'offircarmi@gmail.com', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/offir_ixxjf7.jpg' })
    // await userService.signup({ _id: 'u104', firstName: 'Idan', lastName: 'Gez', username: 'idan', password: 'idan', email: 'idan@gez.com', imgUrl: 'https://media-exp1.licdn.com/dms/image/C4E03AQHS2IrCTjh7kQ/profile-displayphoto-shrink_800_800/0/1645011912408?e=1658966400&v=beta&t=ztcm1v1QLUsANcPVcXF8c-2icQB51oLyQ5hgK5sn-VQ' })
})()