/*    
Створіть програму секундомір.

* Секундомір матиме 3 кнопки "Старт, Стоп, Скидання"<br>
* При натисканні на кнопку стоп фон секундоміра має бути червоним, старт - зелений, скидання - сірий
* Виведення лічильників у форматі ЧЧ:ММ:СС<br>
* Реалізуйте Завдання використовуючи синтаксис ES6 та стрілочні функції
*/
const gets = selector => document.querySelectorAll(selector);

const clearClass = (el, newClass) => {
    el.classList.remove('black', 'green', 'red', 'silver');
    el.classList.add(newClass);
} 
const addZero = (num) => {
    if (num >= 0 && num <= 9) {
		return '0' + num;
	} else {
		return num;
	}
}

const container = document.querySelector('.container-stopwatch');
const [...buttons] = gets('.stopwatch-control > button');
const startButton = buttons[0], stopButton = buttons[1], resetButton = buttons[2];
const [...timers] = gets('.stopwatch-display > span');
const hourTimer = timers[0], minTimer = timers[1], secTimer = timers[2];
let sec = 0, min = 0, hour = 0, interval, zero = '00';

const stopwatch = () => {
    if (+secTimer.textContent < 59){
        ++sec;
        secTimer.textContent = addZero(sec);
    }
    else if (+minTimer.textContent < 59){
        ++min;
        minTimer.textContent = addZero(min);
        sec = 0;
        secTimer.textContent = zero;
    }
    else if(+hourTimer.textContent < 23){
        ++hour;
        hourTimer.textContent = addZero(hour);
        min = 0;
        minTimer.textContent = zero;
        sec = 0;
        secTimer.textContent = zero;
    }
    else{
        hour = 0;
        hourTimer.textContent = zero;
        min = 0;
        minTimer.textContent = zero;
        sec = 0;
        secTimer.textContent = zero;
    }
}

startButton.addEventListener('click', () => {
    clearClass(container, 'green')
    interval = setInterval(stopwatch, 1000);
});
stopButton.addEventListener('click', () => {
    clearClass(container, 'red')
    clearInterval(interval);
});
resetButton.addEventListener('click', () => {
    clearClass(container, 'silver')
    clearInterval(interval);
    hour = 0;
    hourTimer.textContent = zero;
    min = 0;
    minTimer.textContent = zero;
    sec = 0;
    secTimer.textContent = zero;
});





