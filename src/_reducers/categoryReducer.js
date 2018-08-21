import * as type from '../_constants/ActionTypes'
const initialState = [];




//REDUCER
export default function categoryReducer(state=initialState, action){

    switch(action.type) {

        case type.ALL_CATEGORY: {
            return {
                ...state,
                cats: action.categories
            }
        }

        default: return state
    }
}