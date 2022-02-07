'use strict'

var gLength;
var gNums;
var gNextNum;
var gTimerInterval;
var gTimePass = 0;

function init() {
    gNextNum = 1
    chekLevel();
}


function renderBoard() {
    
    resetNums(gLength);
    var strHTML = '';
    shuffle(gNums);

    var rowLength = gNums.length ** 0.5

    for (var i = 0; i < rowLength; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < rowLength; j++) {
            strHTML += `<td onclick="cellClicked(this)">${gNums.pop()}</td>`
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function chekLevel(num = 16){
    gLength = num;
    stopTimer();
    renderBoard();
}

function cellClicked(clickedNum) {
    var elNum = +clickedNum.innerText;
    var elH2 = document.querySelector('h2');
    var elRestart = document.querySelector('.restart');
    elH2.style.display = 'none';
    elRestart.style.display = 'none';


    if (elNum === gNextNum) {
        clickedNum.style.backgroundColor = 'gray';
        gNextNum++;
    }
    if (elNum === 1) startTimer();
    if (elNum === gLength && elNum === gNextNum-1){
        stopTimer();
        elH2.style.display = 'block';
        elRestart.style.display = 'inline';
    } 
}


function startTimer() {
    gStatTime = Date.now();
    var elTimer = document.querySelector('.timer');
    elTimer.style.display = 'block';
    gTimerInterval = setInterval(runTimer, 100)
}

var gStatTime;

function runTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = ((Date.now() - gStatTime)/1000).toFixed(3);
    // gTimePass++;
    // var TimeInSec = (gTimePass / 360).toFixed(3);
    // elTimer.innerText = TimeInSec;
}

function stopTimer() {
    clearInterval(gTimerInterval);
}


function resetNums(length) {
    gNums = [];
    for (var i = 1; i <= length; i++) {
        gNums.push(i)
    }
    return gNums;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}