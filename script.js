function add( a, b ){return a + b};

function subtract (a,b){return a-b};

function multiply(a,b){return a*b};

function divide (a,b){a/b};

function operate( operator , a, b){

    switch(operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case 'x':
            return  multiply(a,b);
            break;
        case '÷':
            return divide(a,b);
            break;

    }

};

function classifyArrays(expArray){

    let classifyArray = [];
    let number= "";

    for(let i = 0;i<expArray.length;i++){

       if(operators.includes(expArray[i])){
            classifyArray.push(number);
            classifyArray.push(expArray[i]);
            number= "";
       }else{
        number += expArray[i];
       }

       if(i==expArray.length-1){
        classifyArray.push(number);
       }
    }

    return classifyArray;
}

function updateScreen(e){
    let currentScreenText = document.querySelector(".screen-text");
    let currentScreenResult = document.querySelector(".screen-result");
    
    const key = e.target.getAttribute("data-key");

    if(key=="clear"){

        currentScreenText.textContent = "";
        currentScreenResult.textContent = "";

    }else if(operators.includes(key)){

        if(firstNum == 0){

            firstNum = Number.parseInt(currentScreenResult.textContent);
            currentScreenText.textContent = currentScreenResult.textContent += key;
            currentOperator = key;
            currentScreenResult.textContent = "";

        }else{
           
            secondNum = Number.parseInt(currentScreenResult.textContent);
            result = operate(currentOperator,firstNum,secondNum);
            currentScreenText.textContent = result += key;
            firstNum = result;  
            currentOperator = key;       
            currentScreenResult.textContent = "";

        }

    }else{
        currentScreenResult.textContent += key;
    }

}

const operators = ["+","-","x","÷","="];

const keypads = document.querySelectorAll("li");
let currentOperator = "";
let firstNum = 0,secondNum = 0;

keypads.forEach(keypad=>keypad.addEventListener('click', updateScreen));

