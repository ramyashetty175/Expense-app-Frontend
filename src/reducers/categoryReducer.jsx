export default function categoryReducer(state, action) {
    switch(action.type) {
        case "ADD_CATEGORY": {
            return { ...state, category: [...state.category, action.payload], serverErrMsg: "" }
        }
        case "SET_CATEGORY": {
            return { ...state, category: action.payload }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrMsg: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}