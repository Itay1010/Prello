import { storageService } from './storage.service'


export const watcherService = {
    query,
    save,
    remove,
    add,
    getById,
    getEmptyWatcher,
    // tryRobot,
    // getNextRobotId
}

const STORAGE_KEY = 'watchers'

const gDefaultWatchers = [
    { _id: _makeId(), username: 'Brian', movies: ['Rambo Jumbo', 'Rocky\'s Scissors'], color: _getRandomColor() },
    { _id: _makeId(), username: 'Dustin', movies: ['Flat Fiction', 'TitaniX'], color: _getRandomColor() },
    { _id: _makeId(), username: 'Dominique', movies: ['Spiderwoman', 'ShrekIt'], color: _getRandomColor() }
]

var gWatchers = _loadWatchers()

function query() {
    return Promise.resolve(gWatchers)
}

function getById(id) {
    const watcher = gWatchers.find(watcher => watcher._id === id)
    return Promise.resolve({ watcher })
}

function remove(id) {
    const idx = gWatchers.findIndex(watcher => watcher._id === id)
    gWatchers.splice(idx, 1)
    if (!gWatchers.length) gWatchers = gDefaultWatchers.slice()
    storageService.store(STORAGE_KEY, gWatchers)
    return Promise.resolve()
}

function add(watcherToSave) {
    watcherToSave._id = _makeId()
    watcherToSave.color = _getRandomColor()
    gWatchers.unshift(watcherToSave)
    storageService.store(STORAGE_KEY, gWatchers)
    return Promise.resolve(gWatchers);
}

function save(watcherToSave) {
    watcherToSave._id = _makeId()
    gWatchers.push(watcherToSave)
    storageService.store(STORAGE_KEY, gWatchers)
    return Promise.resolve(watcherToSave);
}


function getEmptyWatcher() {
    return {
        username: '',
        color: _getRandomColor()
    }
}

function _loadWatchers() {
    let watchers = storageService.load(STORAGE_KEY)
    if (!watchers || !watchers.length) watchers = gDefaultWatchers
    storageService.store(STORAGE_KEY, watchers)
    return watchers
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}




// function getNextRobotId(id) {
//     const robotIdx = gRobots.findIndex(robot => robot._id === id)
//     const nextIdx = robotIdx + 1 > gRobots.length ? 0 : robotIdx + 1
//     return gRobots[nextIdx].id
// }