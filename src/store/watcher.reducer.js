
export const INITIAL_STATE = {
    watchers: null,
    selectedWatcher: null
}

export function watcherReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_WATCHERS':
            return {
                ...state,
                watchers: action.watchers
            }
        case 'SELECT_WATCHER':
            return {
                ...state,
                selectedWatcher: action.watcher
            }

        case 'ADD_WATCHER':
            return {
                ...state,
                watchers: [action.watcher, ...state.watchers]
            }

        case 'REMOVE_WATCHER':
            return {
                ...state,
                watchers: state.watchers.filter(watcher => watcher._id !== action.watcherId)
            }

        case 'UPDATE_WATCHER':
            return {
                ...state,
                watchers: state.watchers.map(watcher => watcher._id === action.watcher._id ? action.watcher : watcher)
            }

        default:
            return state;
    }
}