const Calculator = (function(){
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
    
    function mod(number1, number2){
        return number1 % number2;
    }
    function operate(operator, number1, number2){
        if(operator === '+'){
            return add(number1, number2);
        }
        if(operator === '-'){
            return subtract(number1, number2);
        }
        if(operator === 'x'){
            return multiply(number1, number2);
        }
        if(operator === '/'){
            return divide(number1, number2);
        }
        if(operator === '%'){
            return mod(number1, number2);
        }
    }
    return {operate};
})();




const numberPad = document.querySelectorAll('.col div');
const display = document.querySelector('.display');


let ioHandler = (function(){
    let _allInputs = [];
    let _operators = [];
    let _operands = [];
    let _multipleFloats = 0;
    let _clear = ()=>{
        _allInputs = [];
        _operands = [];
        _operators = [];
        _multipleFloats = 0;
    }

    let push = (char)=>{
        if(char === 'C'){
            _allInputs = [];
            _operators = [];
            _operands = [];
        }
        else if(/[x\+\-\%\=]/.test(char)){
            _operators.push(char);
            if(_allInputs.length)
            {
                if(_allInputs.join("").split('.').length > 2){
                    _multipleFloats = 1;
                }
                _operands.push(+(_allInputs.join('')));
            }
            _allInputs = []
        }
        else{
            _allInputs.push(char);
        }
    };

    let _output = ()=>{
        if(_multipleFloats){
            return "ERROR: Not a Number";
        }
        if(_operators.at(-1) === '='){
            if(_operands.length == 2){
                if(_operands[1] == 0 && (_operators[0] === '/' || _operators[0] === '%')){
                    _clear();
                    return "ERROR: Division by Zero Being Attempted";
                }
                let intermediateValue = Calculator.operate(_operators[0], _operands[0], _operands[1]);
                _operands = [];
                _operators = [];
                _operands.push(intermediateValue)
                // console.log(_operands, _operators)
                return intermediateValue;
            }else{
                _clear();
                return "ERROR: Operation Cannot be Performed"
            }
        }

        if(_operands.length == 2 && _operators.length == 2){
            let intermediateValue = Calculator.operate(_operators[0], _operands[0], _operands[1])
            _operands = []
            _operators =  _operators.slice(1);
            _operands.push(intermediateValue);
        }

        if(_operands.length && _operators.length)
        {
            // console.log(_operands, _operators)
            return _operands.at(0)+ _operators.at(0) + _allInputs.join('');
        }
        if(_allInputs.length){
            return _allInputs.join('')
        }
        return ''
    };
    let populateDisplay = (display)=>{
        display.textContent = _output();
    }
    return {push, populateDisplay};
})();








numberPad.forEach(item=>{
    item.addEventListener('click', (event)=>{

        ioHandler.push(event.target.textContent);
        
        ioHandler.populateDisplay(display);
    });
})