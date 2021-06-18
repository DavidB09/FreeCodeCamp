import React from 'react';
import { connect } from "react-redux";
import mapStateToProps from './redux/state/rootState'; 
import mapDispatchToProps from './redux/actions/actions'; 

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
          current: "",
          previous: "", 
          operation: "", 
        }; 

        this.submitNewCurrent = this.submitNewCurrent.bind(this); 
        this.performMathOperation = this.performMathOperation.bind(this); 
        this.performAddSub = this.performAddSub.bind(this); 
        this.performMulDiv = this.performMulDiv.bind(this); 
    }

    submitNewCurrent(character) {
        let previousCurrChar = this.state.current[this.state.current.length - 1];
        let previousPrevChar = this.state.previous[this.state.previous.length - 1]; 

        if (this.props.info.done) {
            let previousDisplay = this.props.info.display; 
            this.props.resetDisplay(); 

            if (this.props.info.finalResult == "ERROR" && character == "UNDO") {
                this.props.updateDisplay(previousDisplay); 
            }
        }

        if (character == "UNDO") {

            if (this.state.current != "") {
                this.setState((state) => ({
                    current: state.current.substring(0, state.current.length - 1)
                })); 
            } else if (this.state.previous != "") {
                this.setState((state) => ({
                    current: state.previous.substring(0, state.previous.length - 1), 
                    previous: "", 
                    operation: state.operation.substring(0, state.operation.length - 1)
                })); 
            } else {
                let regex = /([+]|[/]|[*]|[-](?!\d+)|(?<=\d+)[-])/g; 
                let newCurr = this.state.operation.substring(0, this.state.operation.length - 1).split(regex); 
                this.setState((state) => ({
                    current: newCurr[newCurr.length - 1],
                    operation: newCurr.slice(0, -1).join("")
                })); 
            }

            this.props.undoDisplay(); 
        } 
        else if (character == "CLEAR") {
            this.setState((state) => ({
                current: "", 
                previous: "", 
                operation: ""
            })); 

            this.props.resetDisplay(); 
        }
        else if (character == "=") {

            if (/[-+/*]/.test(previousCurrChar) || (previousCurrChar == undefined && previousPrevChar == undefined)) {
                this.props.updateFinalResult("ERROR"); 
            } else {
                this.setState((state) => ({
                    operation: state.operation + state.current
                }), () => this.performMathOperation()); 

                this.props.updateDisplay(" " + character); 
            }

        } 
        else if (/[+/*]/.test(character)) {
          
            if (/[-+/*]/.test(previousCurrChar) || (previousCurrChar == undefined && previousPrevChar == undefined)) {
                this.props.updateFinalResult("ERROR"); 
            } else {
                this.setState((state) => ({
                    current: character, 
                    previous: state.current, 
                    operation: state.operation + state.current
                })); 

                this.props.updateDisplay(" " + character); 
            }

        } 
        else if (character == ".") {
          
            if (this.state.current.includes(character)) {
                this.props.updateFinalResult("ERROR"); 
            } else {
                if ((/[0-9]$/).test(this.state.current)) {
                    this.setState((state) => ({
                        current: state.current + character, 
                    })); 

                    this.props.updateDisplay(character); 
                } else {
                    this.setState((state) => ({
                        current: "0" + character, 
                        previous: state.current, 
                        operation: state.operation + state.current
                    })); 

                    this.props.updateDisplay(" 0" + character); 
                }
            }

        }
        else if (character == "-") {
                
            if (previousPrevChar == "-" && previousCurrChar == "-") {
                this.props.updateFinalResult("ERROR"); 
            } else {
                this.setState((state) => ({
                    current: character, 
                    previous: state.current, 
                    operation: state.operation + state.current
                })); 

                this.props.updateDisplay(" " + character); 
            }

        }
        else {

            if (previousCurrChar == "-" && previousPrevChar == "-") {
                this.setState((state) => ({
                current: state.current + character, 
                })); 

                this.props.updateDisplay(character); 
            } else {
                if (/[+/*]/.test(previousCurrChar) || (previousCurrChar == "-" && previousPrevChar != undefined)) {
                    this.setState((state) => ({
                        current: character + "", 
                        previous: state.current, 
                        operation: state.operation + state.current
                    })); 

                    this.props.updateDisplay(" " + character); 
                } else {
                    this.setState((state) => ({
                        current: state.current + character, 
                    })); 

                    this.props.updateDisplay(character); 
                }
            }

        }

      }

    performMathOperation() {
        let regex = /([+]|[/]|[*]|[-](?!\d+)|(?<=\d+)[-])/g; 
        let characters = this.state.operation.split(regex).filter((character) => character != " ").map((character) => /[0-9]/.test(character) ? character * 1 : character); 
        this.performMulDiv(characters); 
    }

    performMulDiv(array) {
        let newArray = []; 

        for (let i = 0; i < array.length; i++) {
            if (array[i] == "*") {
                newArray[newArray.length - 1] = newArray[newArray.length - 1] * array[i + 1]; 
                i += 1; 
            } else if (array[i] == "/") {
                newArray[newArray.length - 1] = newArray[newArray.length - 1] / array[i + 1]; 
                i += 1; 
            } else {
                newArray.push(array[i]); 
            }
        }

        this.performAddSub(newArray); 
    }

    performAddSub(array) {
        let finalArray = []; 

        for (let i = 0; i < array.length; i++) {
            if (array[i] == "-") {
                finalArray[finalArray.length - 1] = finalArray[finalArray.length - 1] - array[i + 1]; 
                i += 1; 
            } else if (array[i] == "+") {
                finalArray[finalArray.length - 1] = finalArray[finalArray.length - 1] + array[i + 1]; 
                i += 1; 
            } else {
                finalArray.push(array[i]); 
            }
        }

        this.props.updateFinalResult(finalArray[0]); 

        this.setState({
            current: "", 
            operation: "", 
            previous: "", 
        }); 

    }

    render() {
        return (
            <div id="container">
                <div id="display">
                    <p>{this.props.info.display}</p>
                    <p>{this.props.info.done ? this.props.info.finalResult : this.state.current}</p>
                </div>

                <button id="button-add" onClick={() => this.submitNewCurrent("+")}>+</button>
                <button id="button-subtract" onClick={() => this.submitNewCurrent("-")}>-</button>
                <button id="button-multiply" onClick={() => this.submitNewCurrent("*")}>*</button>
                <button id="button-divide" onClick={() => this.submitNewCurrent("/")}>/</button>
                <button id="button-equal" onClick={() => this.submitNewCurrent("=")}>=</button>
                <button id="button-one" onClick={() => this.submitNewCurrent(1)}>1</button>
                <button id="button-two" onClick={() => this.submitNewCurrent(2)}>2</button>
                <button id="button-three" onClick={() => this.submitNewCurrent(3)}>3</button>
                <button id="button-four" onClick={() => this.submitNewCurrent(4)}>4</button>
                <button id="button-five" onClick={() => this.submitNewCurrent(5)}>5</button>
                <button id="button-six" onClick={() => this.submitNewCurrent(6)}>6</button>
                <button id="button-seven" onClick={() => this.submitNewCurrent(7)}>7</button>
                <button id="button-eight" onClick={() => this.submitNewCurrent(8)}>8</button>
                <button id="button-nine" onClick={() => this.submitNewCurrent(9)}>9</button>
                <button id="button-zero" onClick={() => this.submitNewCurrent(0)}>0</button>
                <button id="button-period"onClick={() => this.submitNewCurrent(".")}>.</button>
                <button id="button-undo"onClick={() => this.submitNewCurrent("UNDO")}>UNDO</button>
                <button id="button-clear" onClick={() => this.submitNewCurrent("CLEAR")}>CLEAR</button>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator); 