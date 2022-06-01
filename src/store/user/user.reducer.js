export const initialReviews = {
    user: null,
}

export function userReducer(state = initialReviews, action = null) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        case 'REMOVE_USER':
            return { ...state, user: null }
        default:
            return state
    }
}
