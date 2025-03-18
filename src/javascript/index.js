const cards = document.querySelectorAll('.card');

var cardOne = null;
var cardTwo = null;
var allMatched = 0;
var boardLocked = false;
    

/* console.log(cards); */

async function test() {
    alert('Hallo!');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function geklickt({target: clickedCard}) {
    console.log('cardOne: ' + cardOne);
    console.log('cardTwo: ' + cardTwo);
    console.log(clickedCard);
    if(clickedCard.classList.value == "card") {
        return null;
    }
    if(clickedCard.classList.value == "card-image" || clickedCard.classList.value == "card-back-img") {
        clickedCard = clickedCard.parentElement;
    }
    if (boardLocked == true) {
        return null;
    }
    if(clickedCard != cardOne && cardOne == null && clickedCard.classList.value != "card-front") {
        console.log('Erste If');
        cardOne = clickedCard;
        return flip(clickedCard);
    }
    if(clickedCard != cardTwo && cardTwo == null && clickedCard != cardOne && clickedCard.classList.value != "card-front") {
        console.log('Zweite If');
        cardTwo = clickedCard;
        flip(clickedCard);
    }
    if (cardOne != null && cardTwo != null) {
        document.getElementById('move-count').innerHTML = Number(document.getElementById('move-count').innerHTML) + 1;
        match();
    }
}

function flip(clickedCard) {
    /* console.log(clickedCard); */
    /* x = clickedCard.innerHTML;
    console.log(x); */
    /* console.log(typeof clickedCard.classList.value); */
    if (clickedCard.classList.value == "card-back") {
        clickedCard.classList.add("flip");
        clickedCard.parentElement.querySelectorAll('.card-front')[0].classList.remove('flip');
        clickedCard.parentElement.classList.add('selected-card');
    };
    if (clickedCard.classList.value == "card-front") {
        clickedCard.classList.add("flip");
        clickedCard.parentElement.querySelectorAll('.card-back')[0].classList.remove('flip');
    };
}

async function match() {
    if (cardOne.parentElement.querySelectorAll('.card-image')[0].src == cardTwo.parentElement.querySelectorAll('.card-image')[0].src) {
        await sleep(50);
        cardOne.parentElement.classList.remove('selected-card');
        cardTwo.parentElement.classList.remove('selected-card');
        cardOne.parentElement.removeEventListener("click", geklickt);
        cardTwo.parentElement.removeEventListener("click", geklickt);
        cardOne.parentElement.classList.add('correct');
        cardTwo.parentElement.classList.add('correct');
        cardOne.parentElement.classList.add('right-shake');
        cardTwo.parentElement.classList.add('right-shake');
        await sleep(300);
        cardOne.parentElement.classList.remove('right-shake');
        cardTwo.parentElement.classList.remove('right-shake');
        cardOne = null;
        cardTwo = null;
        allMatched = allMatched + 1;
        await sleep(100);
        if (allMatched == 8) {
            alert('You won in ' + document.getElementById('move-count').innerHTML + ' moves!! Congrats!!');
            allMatched = 0;
            reset();
            scramble();
        }
    }
    else {
        boardLocked = true;
        cardOne.parentElement.classList.remove('selected-card');
        cardTwo.parentElement.classList.remove('selected-card');
        cardOne.parentElement.classList.add('wrong-shake');
        cardTwo.parentElement.classList.add('wrong-shake');
        await sleep(300);
        cardOne.parentElement.classList.remove('wrong-shake');
        cardTwo.parentElement.classList.remove('wrong-shake');
        await sleep(500);
        cardOne.parentElement.querySelectorAll('.card-front')[0].classList.add('flip');
        cardOne.classList.remove('flip');
        cardTwo.parentElement.querySelectorAll('.card-front')[0].classList.add('flip');
        cardTwo.classList.remove('flip');
        cardOne = null;
        cardTwo = null;
        boardLocked = false;
    }
}

function reset() {
    cards.forEach(card => {
        card.querySelectorAll('.card-back')[0].classList.remove('flip');
        card.querySelectorAll('.card-back')[0].innerHTML = '<img class="card-back-img" src="../../resources/pro-backcard.png" width="75px" height="75px" style="border-radius: 5px;">';
        card.querySelectorAll('.card-front')[0].classList.add('flip');
    });
    document.body.querySelectorAll('.correct').forEach(card => {
        card.classList.remove('correct');
    })
    document.getElementById('move-count').innerHTML = "0";
    allMatched = 0;
    cardOne = null;
    cardTwo = null;
    scramble();
}

function turnAll() {
    cards.forEach(card => {
        card.querySelectorAll('.card-back')[0].classList.add('flip');
        card.querySelectorAll('.card-front')[0].classList.remove('flip');
    });
}

function scramble() {
    mode = document.getElementById("types").value;
    if (mode == "food") {
        type = ['../../resources/apple.png','../../resources/apple.png','../../resources/burger.png','../../resources/burger.png','../../resources/eggs.png','../../resources/eggs.png','../../resources/fruits.png','../../resources/fruits.png','../../resources/hot-chocolate.png','../../resources/hot-chocolate.png','../../resources/meat.png','../../resources/meat.png','../../resources/pancake.png','../../resources/pancake.png','../../resources/pizza.png','../../resources/pizza.png'];
        cards.forEach(card => {
            x = Math.floor(Math.random() * type.length);
            card.querySelectorAll('.card-front')[0].querySelectorAll('.card-image')[0].src = type[x];
            type.splice(x,1);
        });   
    }
    if (mode == "animals") {
        type = ['../../resources/cheetah.png','../../resources/cheetah.png','../../resources/funny-lemur.png','../../resources/funny-lemur.png','../../resources/hippo.png','../../resources/hippo.png','../../resources/horse.png','../../resources/horse.png','../../resources/kadse.png','../../resources/kadse.png','../../resources/melon-dog.png','../../resources/melon-dog.png','../../resources/monke.png','../../resources/monke.png','../../resources/nerd-dog.png','../../resources/nerd-dog.png'];
        cards.forEach(card => {
            x = Math.floor(Math.random() * type.length);
            card.querySelectorAll('.card-front')[0].querySelectorAll('.card-image')[0].src = type[x];
            type.splice(x,1);
        });
    }
    cards.forEach(card => {
        card.querySelectorAll('.card-back')[0].innerHTML = '<img class="card-back-img" src="../../resources/pro-backcard.png" width="75px" height="75px" style="border-radius: 5px;">';
        card.addEventListener("click", geklickt);
    });
}

function adminTools() {
    if(window.event.key == "m") {
        tools = document.querySelectorAll('.admin');
        tools.forEach(tool => {
            tool.classList.remove('hidden');
        });
    }
    if(window.event.key == "n") {
        tools = document.querySelectorAll('.admin');
        tools.forEach(tool => {
            tool.classList.add('hidden');
        });
    }
}

function homoMode() {
    /* console.log(document.getElementById('homo-mode-checkbox').checked); */
    if(document.getElementById('homo-mode-checkbox').checked) {
        document.body.classList.add('homo-mode');
    }
    if(!document.getElementById('homo-mode-checkbox').checked) {
        document.body.classList.remove('homo-mode');
    }
}

function solutions() {
    cards.forEach(card => {
        card.querySelectorAll('.card-back')[0].innerHTML = card.querySelectorAll('.card-front')[0].innerHTML;
    });
}

document.body.addEventListener('keydown',adminTools)
document.querySelectorAll('.homo-mode-checkbox')[0].addEventListener('click',homoMode)

scramble();