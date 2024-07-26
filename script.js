const display = document.getElementById('display');
let firstOperand = '';
let secondOperand = '';
let operator = null;
let shouldResetDisplay = false;

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const number = button.dataset.number;

        if (number !== undefined) {
            appendNumber(number);
        } else if (action !== undefined) {
            handleAction(action);
        }
    });
});

function handleAction(action) {
    switch (action) {
        case 'clear':
            clear();
            break;
        case 'plus-minus':
            toggleSign();
            break;
        case 'percent':
            percentage();
            break;
        case 'divide':
        case 'multiply':
        case 'subtract':
        case 'add':
            setOperator(action);
            break;
        case 'equals':
            calculate();
            break;
        case 'decimal':
            appendDecimal();
            break;
        default:
            break;
    }
}

function clear() {
    display.innerText = '0';
    firstOperand = '';
    secondOperand = '';
    operator = null;
}

function toggleSign() {
    display.innerText = (parseFloat(display.innerText) * -1).toString();
}

function percentage() {
    display.innerText = (parseFloat(display.innerText) / 100).toString();
}

function setOperator(op) {
    if (operator !== null) calculate();
    firstOperand = display.innerText;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;
    if (operator === 'divide' && display.innerText === '0') {
        alert("Can't divide by 0");
        return;
    }
    secondOperand = display.innerText;
    display.innerText = roundResult(operate(operator, firstOperand, secondOperand));
    operator = null;
}

function appendNumber(number) {
    if (display.innerText === '0' || shouldResetDisplay) {
        display.innerText = number;
        shouldResetDisplay = false;
    } else {
        display.innerText += number;
    }
}

function appendDecimal() {
    if (shouldResetDisplay) {
        display.innerText = '0';
        shouldResetDisplay = false;
    }
    if (!display.innerText.includes('.')) {
        display.innerText += '.';
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        default:
            return null;
    }
}
