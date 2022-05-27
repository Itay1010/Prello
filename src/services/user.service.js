import { storageService } from './basic/async-storage.service'
import { utilService } from './basic/util.service'
// import { httpService } from './basic/http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

const LOCAL_STORAGE_USER_DB = 'userDB'
const LOCAL_STORAGE_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    signup,
    login,
    logout,
    getUserById,
}

window.userService = userService

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER) || 'null')
}

function getUserById(userId) {
    console.log(userId);
}

async function signup(userCred,onGoOn) {
    const user = await storageService.post(LOCAL_STORAGE_USER_DB, userCred)
    // user._id = utilService.makeId()
    login(user)
    onGoOn()
}

async function login(userCred,onGoOn) {
    const users = await storageService.query(LOCAL_STORAGE_USER_DB)
    const user = users.find(user=> user.username=== userCred.username && user.password=== userCred.password )
    if (user){
        delete user._id
        delete user.firstName
        delete user.lastName
        _saveLocalUser(user)
        onGoOn()
    }
}

async function logout() {
    sessionStorage.removeItem(LOCAL_STORAGE_LOGGEDIN_USER)
}


function _saveLocalUser(user) {
    sessionStorage.setItem(LOCAL_STORAGE_LOGGEDIN_USER, JSON.stringify(user))
    return user
}


// ;(async ()=>{
    //     await userService.signup({_id: u101,fullname: 'Itay Zonshine', username: 'itay', password:'itay', isAdmin: false})
    //     await userService.signup({_id: u102,fullname: 'Offir Carmi', username: 'offir', password:'offir', isAdmin: true})
    //     await userService.signup({_id: u103,fullname: 'Eytan Silberberg', username: 'eytan', password:'eytan',isAdmin: false})
    // })()
    
    
    // This is relevant when backend is connected
    // ;(async () => {
        //     var user = getLoggedinUser()
        //     if (user) socketService.emit('set-user-socket', user._id)
        // })()