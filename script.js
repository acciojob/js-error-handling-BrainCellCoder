//your code here
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not < ${arg} >`);
        this.name = 'OutOfRangeError';
    }
}

class InvalidExprError extends Error {
    constructor() {
        super('Expression should not have an invalid combination of expression');
        this.name = 'InvalidExprError';
    }
}

function evalString(expression) {
    // Regular expression to check for invalid characters
    const invalidCharPattern = /[^0-9+\-*/\s]/;
    // Regular expression to check for invalid operator combinations
    const invalidOperatorPattern = /[\+\-\*/]{2,}/;
    // Regular expression to check for starting/ending with invalid operators
    const invalidStartEndPattern = /^[\+\*/]|[\+\-*/]$/;

    // Check for invalid characters
    const invalidCharMatch = expression.match(invalidCharPattern);
    if (invalidCharMatch) {
        throw new OutOfRangeError(invalidCharMatch[0]);
    }

    // Check for invalid operator combinations
    if (invalidOperatorPattern.test(expression)) {
        throw new InvalidExprError();
    }

    // Check if expression starts or ends with invalid operators
    if (invalidStartEndPattern.test(expression)) {
        if (/^[\+\*/]/.test(expression)) {
            throw new SyntaxError('Expression should not start with invalid operator');
        }
        if (/[\+\-*/]$/.test(expression)) {
            throw new SyntaxError('Expression should not end with invalid operator');
        }
    }

    // Evaluate the expression
    try {
        return eval(expression);
    } catch (e) {
        throw new SyntaxError('Invalid mathematical expression');
    }
}

try {
    // Example usage
    console.log(evalString("5 + 6 - 7 * 8 / 9")); // Valid expression
    console.log(evalString("5 + 6 -- 7"));        // Invalid combination of operators
    console.log(evalString("5 + 6 * -7"));        // Invalid combination of operators
    console.log(evalString("5 + 6 & 7"));         // Invalid character
    console.log(evalString("* 5 + 6"));           // Invalid starting operator
    console.log(evalString("5 + 6 -"));           // Invalid ending operator
} catch (error) {
    if (error instanceof OutOfRangeError) {
        console.error(error.message);
    } else if (error instanceof InvalidExprError) {
        console.error(error.message);
    } else if (error instanceof SyntaxError) {
        console.error(error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}
