import { UPDATE_DISPLAY, UNDO_DISPLAY, UPDATE_FINAL_RESULT, RESET_DISPLAY } from '../actions/actionTypes'; 

const defaultState = {
    display: "", 
    finalResult: "", 
    done: false, 
}; 

const rootReducer = (state = defaultState, action) => {
    switch(action.type) {
        case UPDATE_DISPLAY: 
            return Object.assign({}, state, {display: state.display + action.payload}); 
        case UNDO_DISPLAY: 
            if (state.display[state.display.length - 1] == " ")
                return Object.assign({}, state, {display: state.display.substring(0, state.display.length - 2)}); 
            else
                return Object.assign({}, state, {display: state.display.substring(0, state.display.length - 1)}); 
        case UPDATE_FINAL_RESULT: 
            return Object.assign({}, state, {finalResult: action.payload}, {done: true}); 
        case RESET_DISPLAY: 
            return Object.assign({}, state, {display: ""}, {finalResult: ""}, {done: false}); 
        default: return state; 
    }; 
}; 

export default rootReducer; 