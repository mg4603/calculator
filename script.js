function add(number1, number2){
    return number1 + number2;
}

function subtract(number1, number2){
    return number1 - number2;
}

function multiply(number1, number2){
    return number1 * number2;
}

function divide(number1, number2){
    return number1 / number2
}

function operate(operator, number1, number2){
    if(operator === '+'){
        return add(number1, number2);
    }
    if(operator === '-'){
        return subtract(number1, number2);
    }
    if(operator === '*'){
        return multiply(number1, number2);
    }
    if(operator == "/"){
        return divide(number1, number2);
    }
}

console.log(add(1, 2));
console.log(subtract(1,2));
console.log(multiply(1,2));
console.log(divide(1,2));
console.log(operate('+', 1, 2));
console.log(operate('-', 1, 2));
console.log(operate('*', 1, 2));
console.log(operate('/', 1, 2));
