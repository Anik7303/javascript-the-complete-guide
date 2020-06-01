const defaultResult = 0;
let currentResult = defaultResult;
let calculationDescription = '';
let logEntries = [];

/**
 * Get input from input field
 */
function getUserInput() {
    return parseInt(userInput.value);
}

function writeToLog(
    operationIdentifier,
    prevResult,
    operationNumber,
    newResult
) {
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const description = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, description);
    writeToLog(operator, resultBeforeCalc, calcNumber, currentResult);
}

function add() {
    calculateResult('+');
}

function subtract() {
    calculateResult('-');
}

function multipy() {
    calculateResult('*');
}

function divide() {
    calculateResult('/');
}

function calculateResult(calculationType) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    if (calculationType === '+') {
        currentResult = currentResult + enteredNumber;
    } else if (calculationType === '-') {
        currentResult = currentResult - enteredNumber;
    } else if (calculationType === '*') {
        currentResult = currentResult * enteredNumber;
    } else {
        currentResult = currentResult / enteredNumber;
    }
    createAndWriteOutput(calculationType, initialResult, enteredNumber);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multipy);
divideBtn.addEventListener('click', divide);
