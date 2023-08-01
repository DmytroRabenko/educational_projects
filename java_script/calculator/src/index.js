/*
* У папці calculator дана верстка макета калькулятора. 
Потрібно зробити цей калькулятор робочим.
* При натисканні на клавіші з цифрами - набір введених цифр має бути показаний на табло калькулятора.
* При натисканні на знаки операторів (`*`, `/`, `+`, `-`) на табло нічого не відбувається - програма чекає введення другого числа для виконання операції.
* Якщо користувач ввів одне число, вибрав оператор і ввів друге число, то при натисканні як кнопки `=`, так і будь-якого з операторів, в табло повинен з'явитися результат виконання попереднього виразу.
* При натисканні клавіш `M+` або `M-` у лівій частині табло необхідно показати маленьку букву `m` - це означає, що в пам'яті зберігається число. Натискання на MRC покаже число з пам'яті на екрані. Повторне натискання `MRC` має очищати пам'ять.
*/
const get = selector => document.querySelector(selector);
const displayToMemory = get('.display'),
display = get('.display > input'),
buttons = get('.keys'),
result = get('#eq');
let num1 = '', num2 = '', sign = '', res = '', memory = '', memoryPlus = false, finish = false;

const updateDisplay = () => {
    num1 = '';
    num2 = '';
    sign = '';
    res = '';
    display.value = '';
    finish = false;
}
//  function calc
function calc (sign) {
    switch(sign){
        case '+':
            res = (+num1) + (+num2);
            break;
        case '-':
            res = num1 - num2;
            break;
        case '*':
            res = num1 * num2;
            break;
        case '/':
            if(num2 == '0'){
                display.value = 'error';
                return;
            }
            res = num1 / num2;
            break;
    };
}
//  memory
const mPlus = () => {
    if(display.value === ''){return;}
    memory = display.value;
    displayToMemory.classList.add('mmr');
    memoryPlus = true;
}
const mMinus = () => {
    memory = 0;
    displayToMemory.classList.remove('mmr');
    memoryPlus = false;
};
const mrc = () => {
    if(memoryPlus){
        if(num1 === ''){
            num1 = memory;
            display.value = num1;
        }
        else{
            num2 = memory;
            display.value = num2;
        }
        memoryPlus = false;
    }
    else{
        memory = '';
        displayToMemory.classList.remove('mmr');
    }
}

buttons.addEventListener('click', (event) => { 

    const btnValue = event.target.value;
    if(!event.target.classList.contains('button')) return;  
    if(btnValue === 'C'){updateDisplay(); return};
    if(btnValue === 'm+'){mPlus();return}
    if(btnValue === 'm-'){mMinus();return}
    if(btnValue === 'mrc'){mrc();return}
    
    //  button 0-9 .
    if(/[0-9.]/.test(btnValue) && display.value.length < 12){

        //  first number      
        if(sign === '' && num2 === ''){  
            //  button .
            if(btnValue == '.'  && num1 === '') {
                num1 = '0.';
                display.value = num1;
                return;
            }
            else if(btnValue == '.' && num1.includes('.')) {
                display.value = num1;
                return
            };
            //  buttom 0
            if(btnValue == '0'  && num1 === '0'){
                num1 = '0';
                display.value = num1;
                return;
            }
            else if(/[0-9]/.test(btnValue) && num1 === '0'){
                num1 = btnValue;
                display.value = num1;
                return;
            }
            num1 += btnValue;
            display.value = num1; 
        }
        else if(num1 !== '' && num2 !== '' && finish == false){
            num2 += btnValue;
            display.value = num2;
        }
        //  second number
        else{
            //  button .
            if(btnValue == '.'  && num2 === '') {
                num2 = '0.'
                display.value = num2;
                return;
            }
            else if(btnValue == '.' && num2.includes('.')) {
                display.value = num2;
                return
            };
            //  buttom 0   
            if(btnValue == '0'  && num2 === '0'){
                num2 = '0';
                display.value = num2;
                return;
            }
            else if(/[0-9]/.test(btnValue) && num2 === '0'){
                num2 = btnValue;
                display.value = num2;
                return;
            }
            num2 += btnValue;
            display.value = num2; 
        }
        return;   
    }

    // sign / + - *
    if(btnValue === '-'|| btnValue === '+'|| btnValue === '/'|| btnValue === '*'){
        if(finish == true){
            calc(sign);
            let resPoint = String(res).split('.');
            if(/[.]/.test(res) && resPoint[1].length > 4){ 
                num1 = Number(res).toFixed(4);
            } 
            else{num1 = res;};
            num2 = '';
            sign = btnValue;
            display.value = num1;
        }
        else{
            sign = btnValue;
            result.removeAttribute('disabled');
            finish = true;
        }
        return;   
    };
    
    //  sign =
    if(btnValue === '='){
        if(num2 === '') num2 = num1;
        calc(sign);
        let resPoint = String(res).split('.');
            if(/[.]/.test(res) && resPoint[1].length > 4){ 
                num1 = Number(res).toFixed(4);
            }  
        else{num1 = res;};
        display.value = num1;
        finish = true;
    }
});




