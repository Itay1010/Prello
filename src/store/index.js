import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
// import { watcherReducer } from "../store/watcher.reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    // watcherModule: watcherReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.myStore = store