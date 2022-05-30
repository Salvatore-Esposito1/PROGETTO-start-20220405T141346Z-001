let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
var interval;
let find = document.getElementsByClassName("find");
let modal = document.querySelector('#modal');
let timer = document.querySelector(".timer");

//--------------------------------INIZIO PARTE SCRITTA DALLA TRACCIA--------------------------------
//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    let currentIndex = a.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
//--------------------------------FINE PARTE SCRITTA DALLA TRACCIA--------------------------------

// una funzione che rimuove la classe active e chiama la funzione startGame()
function removeActive(){
    modal.classList.remove("active");
    startGame();
}
// la funzione startGame che pulisce il timer
function startGame(){
  clearInterval(interval);
// dichiara un array vuoto
  array = [];
// mescola casualmente l'array degli animali (var arrayShuffle = shuffle(arrayAnimali);)
  let arrayShuffle = shuffle(arrayAnimali);
// aggancia il contenitore con id griglia, 
  let idGriglia = document.querySelector('body #griglia');
// pulisce tutti gli elementi che eventualmente contiene
  idGriglia.innerHTML = '';
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
for(let i = 0; i < 24; i++){    
  let contenitore = document.createElement('div');
  let elemento = document.createElement('div');
  elemento.className = 'icon';
  document.querySelector('body #griglia').appendChild(contenitore).appendChild(elemento);
  elemento.innerHTML = arrayShuffle[i];
}
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
    startTimer();
    let icons = document.querySelectorAll(".icon");
    for (let i = 0; i < icons.length; i++){
      icons[i].addEventListener("click", displayIcon);
      icons[i].addEventListener("click", startModal);
    }
  }

//--------------------------------INIZIO PARTE SCRITTA DALLA TRACCIA--------------------------------
function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */
    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);
    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (let i = 0; i < find.length; i++) {
                        find[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}
//--------------------------------FINE PARTE SCRITTA DALLA TRACCIA--------------------------------

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function startModal(){  
  if (find.length == 24){
    clearInterval(interval);
    modal.classList.add("active");
    document.querySelector("#tempoTrascorso").innerHTML = timer.innerHTML;
  }
}
// una funzione che nasconde la modale alla fine e riavvia il gioco
function playAgain(){
  document.querySelector("#modal").classList.remove("active");
  startGame();
}
// una funzione che calcola il tempo
function startTimer(){
    let sec = 0; 
    let min = 0;
    interval = setInterval(function(){
    timer.innerHTML = 'Tempo: ' + min + " min " + sec + " sec";
    sec++;
      if(sec == 60){
        min++;
        sec = 0;
      }
      if(min == 60){
        removeActive() //richiamando questa funzione ho impostato massimo 1 ora per finire il memory dopodichè il gioco riparte.
      }
    },1000);
  }