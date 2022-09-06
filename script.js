function add( a, b ){return a + b};

function subtract (a,b){return a-b};

function multiply(a,b){return a*b};

function divide (a,b){return Math.round((a/b)* 10) / 10 };

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
            console.log(a);
            if(a == 0 || b == 0){
                return "ERROR";
            }else
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

function clear(){

    let currentScreenText = document.querySelector(".screen-text");
    let currentScreenResult = document.querySelector(".screen-result");

    currentScreenText.textContent = "";
    currentScreenResult.textContent = "";
    currentOperator = "";
    firstNum = 0;
    secondNum = 0;
}

function updateScreen(e){
    let currentScreenText = document.querySelector(".screen-text");
    let currentScreenResult = document.querySelector(".screen-result");
    
    const key = e.target.getAttribute("data-key");

    //clear the screen if "=" at the start of expression or when the expression is incomplete
    if(key=="="){
        if(firstNum==0 || (firstNum!=0 && currentOperator!="" && !currentScreenResult.textContent) ){
            clear();
            return;
        }        
    }

    //clear the screen if operators are clicked again before numbers
    if(operators.includes(key) && key != "="){
        if(!currentScreenResult.textContent){
            clear();
            return;
        }
    }

    if(key=="clear"){

        clear();

    }else if(operators.includes(key)){

        if(firstNum == 0){
            firstNum = Number.parseInt(currentScreenResult.textContent);
            currentScreenText.textContent = currentScreenResult.textContent += key;
            currentOperator = key;
            currentScreenResult.textContent = "";

        }else if(key == "=" ){          

            secondNum = Number.parseInt(currentScreenResult.textContent);
            console.log(currentOperator+" "+firstNum+" "+secondNum);
            result = operate(currentOperator,firstNum,secondNum);

            if(result == "ERROR"){
                alert(errorMessage);
                clear();
                return;
            }

            currentScreenText.textContent = result;
            firstNum = result;  
            currentOperator = "";       
            currentScreenResult.textContent = "";

        }else{

            if(currentScreenResult.textContent){
                secondNum = Number.parseInt(currentScreenResult.textContent);
                result = operate(currentOperator,firstNum,secondNum);

                if(result == "ERROR"){
                    alert(errorMessage);
                    clear();
                    return;
                }

                currentScreenText.textContent = result + key;
                firstNum = result;  
                currentOperator = key;       
                currentScreenResult.textContent = "";

            }else{
                currentScreenText.textContent = currentScreenText.textContent += key;
                currentOperator = key;
                currentScreenResult.textContent = "";
            }

        }

    }else{
        currentScreenResult.textContent += key;
    }

}

const operators = ["+","-","x","÷","="];

const keypads = document.querySelectorAll("li");
let currentOperator = "";
let firstNum = 0,secondNum = 0;
let errorMessage = "You cant do that here dimwit";

keypads.forEach(keypad=>keypad.addEventListener('click', updateScreen));

