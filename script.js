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

function updateScreen(e){

    let currentText = currentScreenText.textContent;
    const operator = e.target.getAttribute("data-key");

    if(operator=="=")
        currentScreenResult.textContent = "= result";
    else if(operator=="clear")
    {
        currentScreenText.textContent = "";
        currentScreenResult.textContent = "";
    }
    else
        currentScreenText.textContent = currentText+= `${operator}`;

}

let currentScreenText = document.querySelector(".screen-text");
let currentScreenResult = document.querySelector(".screen-result");
const keypads = document.querySelectorAll("li");

keypads.forEach(keypad=>keypad.addEventListener('click', updateScreen));

