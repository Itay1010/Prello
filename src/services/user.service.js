import { storageService } from './basic/async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    // gWatchedUser = user;
    return user;
}
function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user)
    return user;
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) saveLocalUser(user)
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    return saveLocalUser(user)

    // if (user) return saveLocalUser(user)
    // const user = await httpService.post('auth/login', userCred)
    // socketService.emit('set-user-socket', user._id);
}
async function signup(userCred) {
    userCred.score = 10000;
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id);
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
    // socketService.emit('unset-user-socket');
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
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
        // })();
        
        
     