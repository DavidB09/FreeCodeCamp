import { UPDATE_DISPLAY, UNDO_DISPLAY, UPDATE_FINAL_RESULT, RESET_DISPLAY } from './actionTypes'; 

const mapDispatchToProps = (dispatch) => {
    return {
        updateDisplay: (props) => dispatch({type: UPDATE_DISPLAY, payload: props}), 
        undoDisplay: () => dispatch({type: UNDO_DISPLAY}), 
        updateFinalResult: (props) => dispatch({type: UPDATE_FINAL_RESULT, payload: props}),
        resetDisplay: () => dispatch({type: RESET_DISPLAY}), 
    }; 
}; 

export default mapDispatchToProps; 