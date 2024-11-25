// Select elements
const inputField = document.querySelector('.calci input[type="text"]');
const buttons = document.querySelectorAll('.calci button');

// Variables for calculation
let currentInput = '';
let expression = ''; // To hold the entire operation expression
let operator = '';

// Function to update the display
function updateDisplay(value) {
    inputField.value = value || '0'; // Show '0' when the input is empty
}

// Handle button click
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            // Number or decimal clicked
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            expression += value;
            updateDisplay(expression);
        } else if (value === 'DEL') {
            // Delete last character
            currentInput = currentInput.slice(0, -1);
            expression = expression.slice(0, -1);
            updateDisplay(expression);
        } else if (value === 'AC') {
            // Clear all
            currentInput = '';
            expression = '';
            operator = '';
            updateDisplay('');
        } else if (value === '=') {
            // Calculate result
            if (expression) {
                try {
                    const result = eval(expression); // Use eval for simple calculations
                    currentInput = result.toString();
                    expression = currentInput; // Set expression to result for further calculations
                    updateDisplay(currentInput);
                } catch {
                    updateDisplay('Error');
                }
            }
        } else if (value === 'Ans') {
            // Use the last result (Ans)
            expression += currentInput; // Add the last result to the expression
            updateDisplay(expression);
        } else if (value === '×10x') {
            // Multiply by 10^x (e.g., 10^3 = 1000)
            if (currentInput) {
                const result = Math.pow(10, Number(currentInput)).toString();
                currentInput = result;
                expression = result;
                updateDisplay(currentInput);
            }
        } else {
            // Operator clicked (+, -, ×, ÷)
            if (currentInput || value === '-') { // Allow negative sign as the first character
                operator = value === '×' ? '*' : value === '÷' ? '/' : value;
                expression += operator;
                currentInput = ''; // Reset current input for the next number
                updateDisplay(expression);
            }
        }
    });
});

// Handle keyboard input
document.addEventListener('keydown', e => {
    const key = e.key;

    if (!isNaN(key) || key === '.') {
        // Number or decimal key pressed
        if (key === '.' && currentInput.includes('.')) return;
        currentInput += key;
        expression += key;
        updateDisplay(expression);
    } else if (key === 'Backspace') {
        // Delete last character
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
        updateDisplay(expression);
    } else if (key === 'Escape') {
        // Clear all
        currentInput = '';
        expression = '';
        operator = '';
        updateDisplay('');
    } else if (key === 'Enter') {
        // Calculate result
        if (expression) {
            try {
                const result = eval(expression);
                currentInput = result.toString();
                expression = currentInput; // Set expression to result for further calculations
                updateDisplay(currentInput);
            } catch {
                updateDisplay('Error');
            }
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Operator key pressed
        if (currentInput || key === '-') { // Allow negative sign as the first character
            operator = key;
            expression += operator;
            currentInput = ''; // Reset current input for the next number
            updateDisplay(expression);
        }
    }
});

// Function to perform calculations
function calculate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error';
        default:
            return '';
    }
}
