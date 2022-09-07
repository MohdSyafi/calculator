function add( a, b ){return a + b};

function subtract (a,b){return a-b};

function multiply(a,b){return a*b};

function divide (a,b){return Math.round((a/b)* 10) / 10 };

function operate( operator , a, b){

    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return  multiply(a,b);
        case '÷':
            console.log(a);
            if(a == 0 || b == 0){
                return "ERROR";
            }else
                return divide(a,b);

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
    firstNum = "";
    secondNum = "";
}

function displayError(){
    alert(errorMessage);
    clear();
}

function updateScreen(e){
    let currentScreenExpression = document.querySelector(".screen-text");
    let currentScreenResult = document.querySelector(".screen-result");
    
    const key = e.target.getAttribute("data-key");

    if(key==="clear"){
        clear();
    }else{

        if(operators.includes(key)){
            
            if(firstNum != ""){

                if(currentOperator == ""){
                    currentScreenExpression.textContent += key;
                    currentOperator = key;
                    return;
                }
          
                expressionArray = currentScreenExpression.textContent.toString().split(currentOperator);
                secondNum = expressionArray[1];
                
                if(secondNum === "0" && currentOperator ==="÷" ||secondNum === "")
                {  
                    displayError();
                    return;
                }

                let result = operate(currentOperator,Number.parseInt(firstNum), Number.parseInt(secondNum));

                if(result === "ERROR"){

                    displayError();
                    return;

                }else{

                    currentScreenResult.textContent = result;
                    currentScreenExpression.textContent = result;
                    firstNum = result;

                    if(key!="=")
                        currentOperator = key;
                    else
                        currentOperator = "";

                    secondNum = "";
                }

            }else{
                console.log("here");
                displayError();
                return;
            }   

        }

        if(key!="="){
            currentScreenExpression.textContent += key;       
        }
        
        firstNum = currentScreenExpression.textContent;
    }

}

const operators = ["+","-","x","÷","="];

const keypads = document.querySelectorAll("li");
let currentOperator = "";
let firstNum = "",secondNum = "";
let errorMessage = "You cant do that here dimwit";

keypads.forEach(keypad=>keypad.addEventListener('click', updateScreen));

