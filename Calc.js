const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.current');
const history = document.querySelector('.history');
let displayNumber = '';
let historyNumber = '';
let result = '';

calcButtons.forEach(button => button.addEventListener('click', getInput));

function getInput() {
    data = this.dataset.key;

    switch (data) {
        case '1':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '1';
            }
            break;
        case '2':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '2';
            }
            break;
        case '3':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '3';
            }
            break;
        case '4':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '4';
            }
            break;

        case '5':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '5';
            }
            break;

        case '6':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '6';
            }
            break;

        case '7':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '7';
            }
            break;

        case '8':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '8';
            }
            break;

        case '9':
            clearDisplay();
            if (exceedsDisplay() === false) {
                displayNumber = displayNumber + '9';
            }
            break;

        case 'add':
            if (hasPreviousOperator() === false && exceedsHistory() === false) {
                displayNumber = displayNumber + ' + ';
                setHistory();
            }
            break;

        case 'sub':
            if (hasPreviousOperator() === false && exceedsHistory() === false) {
                displayNumber = displayNumber + ' - ';
                setHistory();
            }
            break;

        case 'mult':
            if (hasPreviousOperator() === false && exceedsHistory() === false) {
                displayNumber = displayNumber + ' * ';
                setHistory();
            }
            break;
        case 'divide':
            if (hasPreviousOperator() === false && exceedsHistory() === false) {
                displayNumber = displayNumber + ' / ';
                setHistory();
            }
            break;
        case 'clear':
            if (displayNumber != '') {
                displayNumber='';
            }
            break;
        case 'clearAll':
            displayNumber='';
            historyNumber='';
            setHistory();
            break;
        case 'backspace':
            if (displayNumber!=''){
                displayNumber=displayNumber.substring(0, displayNumber.length-1);
            }
            break;
        case '0':
            if (exceedsDisplay()===false && checkDivide()===false && noZeroCheck() ===true){
                displayNumber = displayNumber + '0';
            }
            break;
        case 'dot':
            if (displayNumber.length===0){
                displayNumber= '0.';
            } else if (exceedsDisplay()===false && hasPeriod() ===false){
                displayNumber = displayNumber + '.';
            }
            break;
        case 'equals':
            setHistory();
            history.textContent='';
            let equation = historyNumber.split(' ');
            while (equation.length !== 0 && (isNaN(equation[equation.length -1]) || equation[equation.length -1] == '' )) {
                equation.pop();
            }
            let calculation;
            console.log(equation);

            if (equation.includes('*') || equation.includes('/')){
                while(equation.includes('*') || equation.includes('/')){
                    let index = searchFirstIndex(equation);
                    calculation = operate(equation[index-1], equation[index+1], equation[index]);
                    console.log(calculation);
                    equation.splice(index-1, 3, calculation);
                    console.log(equation);                                     
                }

            }
            if (!equation.includes('*') || !equation.includes('/')) {
                while(equation.length > 1){
                    calculation = operate(equation[0], equation[2], equation[1]);
                    console.log(calculation);
                    equation.splice(0, 3, calculation);
                    console.log(equation);
                }
            }
            if(equation[0] == Infinity){
                alert('I refuse to divide by 0');
                displayNumber='';
                historyNumber='';
            } else if (equation.length == 0){
                displayNumber = '';
                historyNumber='';
            } else {
                result = equation[0];
                displayNumber = result;
                historyNumber='';
            }
            break;
    }    
    display.textContent = displayNumber;
}

function searchFirstIndex(equation){
    const mult = equation.indexOf('*');
    const div = equation.indexOf('/');
    if (mult !== -1 && div === -1){
        return equation.indexOf('*');
    } 
    else if (mult === -1 && div !== -1) {
        return equation.indexOf('/');
    }
    else if (mult !== -1 && div !== -1 && mult<div){
        return equation.indexOf('*');
    }
    else if (mult !== -1 && div !== -1 && mult>div){
        return equation.indexOf('/');
    } 
}

function setHistory() {
    historyNumber = historyNumber + displayNumber;
    history.textContent = historyNumber;
    displayNumber = '';
}

function hasPeriod(){
    if(displayNumber.match(/\./)){
        return true;
    } else return false;
}

function checkDivide() {
    if (displayNumber.length===0 && historyNumber.charAt(historyNumber.length-1)==='/') {
        alert('Unable to divide by 0');
        return true;
    } else return false;
}

function noZeroCheck() {
    if ((displayNumber.match(/[1-9]|\./g) != null)){
        return true;
    } else return false;
}

function exceedsDisplay() {
    if (displayNumber.length >= 14) {
        alert('Display is full')
        return true;
    } else return false;

}

function exceedsHistory() {
    if (((historyNumber + displayNumber).length >= 40)) {
        alert('Display is full')
        return true;
    } else return false;

}

function hasPreviousOperator() {
    if (displayNumber.length != 0 || (displayNumber.charAt(displayNumber.length - 1).match(/d\./))) {
        return false;
    } else return true;
}

function add(a, b) {
    a=parseFloat(a);
    b=parseFloat(b);
    let result = (a + b);
    result = Math.round(result*100000000)/100000000;
    return String(result);
}

function subtract(a, b) {
    a=parseFloat(a);
    b=parseFloat(b);
    let result = (a - b);
    result = Math.round(result*100000000)/100000000;
    return String(result);
}

function divide(a, b) {
    a=parseFloat(a);
    b=parseFloat(b);
    let result = (a / b);
    result = Math.round(result*100000000)/100000000;
    return String(result);
}

function multiply(a, b) {
    a=parseFloat(a);
    b=parseFloat(b);
    let result = (a * b);
    result = Math.round(result*100000000)/100000000;
    return String(result);
}

function clearDisplay() {
    if (result != '') {
        result = '';
        displayNumber='';
    }
}


function operate(a, b, operator) {

    if (operator === '+') {
        return add(a, b);
    }
    if (operator === '-') {
        return subtract(a, b);
    }
    if (operator === '*') {
        return multiply(a, b);
    }
    if (operator === '/') {
        return divide(a, b);
    }

}

