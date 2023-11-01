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
        } else if (key === 'Enter' || key === '=') {
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

    // Get references to the display and buttons
    const display = document.getElementById('calculator-display');
    const buttons = document.getElementById('calculator-buttons');

    // Initialize variables to store input and display values
    let currentInput = '';
    let displayValue = '';

    // Add a click event listener to the calculator buttons
    buttons.addEventListener('click', function (event) {
        // Get the button that was clicked and its text content
        const button = event.target;
        const buttonValue = button.textContent;

        if (buttonValue === 'AC') {
            // If the "AC" button is clicked, clear the calculator
            clearCalculator();
        } else if (buttonValue === 'DEL') {
            // If the "DEL" button is clicked, delete the last digit
            deleteLastDigit();
        } else if (buttonValue === '=') {
            // If the "=" button is clicked, calculate the result
            calculateResult();
        } else if (buttonValue.match(/[0-9.]/)) {
            // If a numeric digit or a decimal point is clicked, handle digit input
            handleDigitInput(buttonValue);
        } else if ('+-*/%'.includes(buttonValue)) {
            // If an operator button is clicked, handle operator input
            handleOperatorInput(buttonValue);
        }
    });

    function clearCalculator() {
        // Reset the input and display values to clear the calculator
        currentInput = '';
        displayValue = '';
        updateDisplay('0');
    }

    function deleteLastDigit() {
        // Remove the last character from the current input and update the display
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            displayValue = currentInput;
            updateDisplay(displayValue);
        }
    }

    function calculateResult() {
        try {
            // Replace only the last "%" with "/100*" and then evaluate,
            // /(?!.*%.*%.*$)%/  This is a regular expression pattern
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
