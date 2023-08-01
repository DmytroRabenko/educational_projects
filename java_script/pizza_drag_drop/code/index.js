
//інгредієнти
const pizza = {
    size: '85',
    souce: {},
    topping: {}
}
//прайс
const price = {
    size: {
        small: '50',
        mid: '75',
        big: '85'
    },
    souce: {
        ketchup: 5,
        bbq: 10,
        ricotta: 15
    },
    topping: {
        chizze: 10,
        fetta: 15,
        motsarella: 20,
        veal: 10,
        tomato: 5,
        mushroom: 10
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const soucesList = document.querySelector('#sauce');
    const topingsList = document.querySelector('#topping');
    const table = document.querySelector('.table');
    let droppedIN = false;
    
    let activeSouce = null;
    let resultat;

// Шукаємо розмір коржу
    document.getElementById("pizza")
        .addEventListener("click", function (ev) {

//Визначаємо обраний корж і записуємо данні в обьєкт 
            switch (ev.target.id) {
                case "small": pizza.size = price.size.small;
                    break
                case "mid": pizza.size = price.size.mid;
                    break
                case "big": pizza.size = price.size.big;
                    break
            }
            show(pizza);
        })
    
// визначаємо обрані соуси

    document.querySelectorAll('.draggable').
        forEach(souce => {
            souce.addEventListener('dragstart', () => {
                activeSouce = souce.cloneNode();
            })
            
            souce.addEventListener('dragend', (ev) => {
                if(droppedIN === true){
                    souce.classList.add('filter');
                    let souceName = souce.nextElementSibling.cloneNode(true);
                    //соуси
                    if(souce.classList.contains('sauceElem')){
                        soucesList.append(souceName);
                        
                        switch (ev.target.id) {
                            case 'sauceClassic': pizza.souce.ketchup = price.souce.ketchup;
                                                activeSouce.id = 'sauceClassic-1';                       
                                break
                            case 'sauceBBQ': pizza.souce.bbq = price.souce.bbq;
                                            activeSouce.id = 'sauceBBQ-1';                          
                                break
                            case 'sauceRikotta': pizza.souce.ricotta = price.souce.ricotta;
                                                activeSouce.id = 'sauceRikotta-1'; 
                                break
                        }
                        show(pizza);
                    }
                    // топінги
                    else if(souce.classList.contains('toppingElem')){
        
                        topingsList.append(souceName);
        
                        switch (ev.target.id) {
                            case "moc1": pizza.topping.chizze = price.topping.chizze;
                                        activeSouce.id = 'moc1-1'; 
                                break
                            case "moc2": pizza.topping.fetta = price.topping.fetta;
                                        activeSouce.id = 'moc2-1';
                                break
                            case "moc3": pizza.topping.motsarella = price.topping.motsarella;
                                        activeSouce.id = 'moc3-1';
                                break
                            case "telya": pizza.topping.veal = price.topping.veal;
                                        activeSouce.id = 'telya-1';
                                break
                            case "vetch1": pizza.topping.tomato = price.topping.tomato;
                                        activeSouce.id = 'vetch1-1';
                                break
                            case "vetch2": pizza.topping.mushroom = price.topping.mushroom;
                                        activeSouce.id = 'vetch2-1';
                                break
                        }
                        show(pizza);
                    }
                    souceName.addEventListener('click', () => {
                    cancaleCouce(souceName, souce, souceName.textContent);
                    show(pizza); 
                    })
                    droppedIN = false;
                }
                
            })
        })
    
//елемент в який перетаскується
        table.addEventListener('dragenter',(e) => {
            e.preventDefault();
        });
        table.addEventListener('dragleave', (e) => {
            e.preventDefault();
        });
        table.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        table.addEventListener('drop', (e) => {
            e.preventDefault(); 
            table.append(activeSouce); 
            droppedIN = true;  
        });

        show(pizza);
        btnRun();
})

//метод для виводу інформації про продукт
function show (pizza) {
    //отримали блок ціни
    const price = document.querySelector("#price");
    let newObj = {
        ...pizza.size,
        ...pizza.topping,
        ...pizza.souce
    }
    price.innerText = resultat = Object.values(newObj).reduce((x, y) => Number(x + y), 0);
}

function btnRun () {  
    const btn = document.querySelector("#banner");
    btn.addEventListener("mousemove", () => {
        const coords = {
            X : Math.floor(Math.random() * document.body.clientWidth),
            Y : Math.floor(Math.random() * document.body.clientHeight)
        }

        if((coords.X + 350) > document.body.clientWidth){
            return
        }
        if((coords.Y + 150) > document.body.clientHeight){
            return
        }
        btn.style.top = coords.Y + "px"
        btn.style.left = coords.X + "px"
    })

}

//відміна вибраного соусус
const cancaleCouce = (souceName, souce, text) => {
    souceName.remove();
    souce.classList.remove('filter');
    switch (text) {
        case 'Кетчуп':
            document.querySelector('#sauceClassic-1').remove();
            delete pizza.souce.ketchup;
          break
        case 'BBQ':
            document.querySelector('#sauceBBQ-1').remove();
            delete pizza.souce.bbq;
          break
        case 'Рiкотта':
            document.querySelector('#sauceRikotta-1').remove();
            delete pizza.souce.ricotta;
          break
        case 'Сир звичайний':
            document.querySelector('#moc1-1').remove();
            delete pizza.topping.chizze;
          break
        case 'Сир фета':
            document.querySelector('#moc2-1').remove();
            delete pizza.topping.fetta;
          break
        case 'Моцарелла':
            document.querySelector('#moc3-1').remove();
            delete pizza.topping.motsarella;
          break
        case 'Телятина':
            document.querySelector('#telya-1').remove();
            delete pizza.topping.veal;
          break
        case 'Помiдори':
            document.querySelector('#vetch1-1').remove();
            delete pizza.topping.tomato;
          break
        case 'Гриби':
            document.querySelector('#vetch2-1').remove();
            delete pizza.topping.mushroom;
          break
      }
      show(pizza);
}
