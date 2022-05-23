import { watcherService } from "../services/basic/watcher.service"

export function loadWatchers() {
    return async (dispatch, getState) => {
        try {
            const watchers = await watcherService.query()
            dispatch({ type: 'SET_WATCHERS', watchers })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeWatcher(watcherId) {
    return async (dispatch) => {
        try {
            await watcherService.remove(watcherId)
            dispatch({ type: 'REMOVE_WATCHER', watcherId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function selectWatcher(watcher) {
    return (dispatch) => {
        dispatch({ type: 'SELECT_WATCHER', watcher })
    }
}

export function addWatcher(watcher) {
    return async (dispatch) => {
        try {
            const watchers = await watcherService.add(watcher)
            dispatch({ type: 'ADD_WATCHER', watcher })
            dispatch({ type: 'SET_WATCHERS', watchers })
        } catch (err) {
            console.log('err:', err)
        }
    }
}


export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}