document.addEventListener('DOMContentLoaded', function () {
    // Add an event handler for keyboard key presses
    document.addEventListener('keydown', function (event) {
        // Get the key code of the pressed key
        const key = event.key;

        if ('0123456789'.includes(key)) {
            // If a numeric key is pressed, call the function to handle digit input
            handleDigitInput(key);
        } else if ('+-*/%'.includes(key)) {
            // If an operation key is pressed, call the function to handle operator input
            handleOperatorInput(key);
        } else if (key === 'Enter') {
            // If the "Enter" key is pressed, call the function to calculate the result
            calculateResult();
        } else if (key === 'Backspace') {
            // If the "Backspace" key is pressed, call the function to delete the last digit
            deleteLastDigit();
        } else if (key === '.') {
            // If the "." key is pressed, add a decimal point to the current number
            handleDigitInput(key);
        }
    });

    // Add an event handler for the theme toggle button

    const themeToggleBtn = document.getElementById('btn-theme-toggle');

    themeToggleBtn.addEventListener('click', function () {
        // Toggle the theme by adding or removing the 'dark-theme' class from the <body> element
        document.body.classList.toggle('dark-theme');
    });

    const display = document.getElementById('calculator-display');
    const buttons = document.getElementById('calculator-buttons');

    let currentInput = '';
    let displayValue = '';

    buttons.addEventListener('click', function (event) {
        const button = event.target;
        const buttonValue = button.textContent;

        if (buttonValue === 'AC') {
            clearCalculator();
        } else if (buttonValue === 'DEL') {
            deleteLastDigit();
        } else if (buttonValue === '=') {
            calculateResult();
        } else if (buttonValue.match(/[0-9.]/)) {
            handleDigitInput(buttonValue);
        } else if ('+-*/%'.includes(buttonValue)) {
            handleOperatorInput(buttonValue);
        }
    });

    function clearCalculator() {
        currentInput = '';
        displayValue = '';
        updateDisplay('0');
    }

    function deleteLastDigit() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            displayValue = currentInput;
            updateDisplay(displayValue);
        }
    }

    function calculateResult() {
        try {
            // Replace only the last "%" with "/100*" and then evaluate
            currentInput = eval(
                currentInput.replace(/(?!.*%.*%.*$)%/, '/100*')
            ).toString();
            displayValue = currentInput;
            updateDisplay(displayValue);
        } catch (error) {
            displayValue = 'Error';
            currentInput = '';
            updateDisplay(displayValue);
        }
    }

    function handleDigitInput(digit) {
        // Prevent leading zeros
        if (currentInput === '0') {
            currentInput = digit;
            displayValue = digit;
        } else {
            currentInput += digit;
            displayValue += digit;
        }
        updateDisplay(displayValue);
    }

    function handleOperatorInput(operator) {
        if (
            currentInput &&
            '+-*/%'.includes(currentInput[currentInput.length - 1])
        ) {
            // If the last character is an operator, replace it with the new one.
            currentInput = currentInput.slice(0, -1);
            displayValue = displayValue.slice(0, -1);
        }
        currentInput += operator;
        displayValue += operator;
        updateDisplay(displayValue);
    }

    function updateDisplay(value) {
        display.value = value;
    }
});
