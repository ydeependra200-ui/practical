console.log("Welcome to Tic Tac Toe");

let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

const changeTurn = () => turn === "X" ? "O" : "X";

// Check for win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let e of wins) {
        if (
            boxtexts[e[0]].innerText !== "" &&
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[1]].innerText === boxtexts[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isgameover = true;
            gameover.play();
            drawLine(e[0], e[2]);
            return true;
        }
    }
    return false;
};

// Draw winning line
function drawLine(startIndex, endIndex) {
    const container = document.querySelector(".container");
    const boxes = document.getElementsByClassName("box");
    const line = document.querySelector(".line");

    const containerRect = container.getBoundingClientRect();
    const startRect = boxes[startIndex].getBoundingClientRect();
    const endRect = boxes[endIndex].getBoundingClientRect();

    const x1 = startRect.left - containerRect.left + startRect.width / 2;
    const y1 = startRect.top - containerRect.top + startRect.height / 2;
    const x2 = endRect.left - containerRect.left + endRect.width / 2;
    const y2 = endRect.top - containerRect.top + endRect.height / 2;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
}

// Main game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');

    element.addEventListener('click', () => {
        if (isgameover || boxtext.innerText !== '') {
            if (boxtext.innerText !== '') {
                alert("This box is already filled!");
            }
            return;
        }

        boxtext.innerText = turn;
        audioTurn.play();

        if (checkWin()) return;

        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;

        // Check for draw
        let boxtexts = document.querySelectorAll('.boxtext');
        let isDraw = Array.from(boxtexts).every(text => text.innerText !== '');

        if (isDraw) {
            document.querySelector('.info').innerText = "It's a Draw";
            isgameover = true;
        }
    });
});

// Reset Button
document.getElementById("reset").addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    boxtexts.forEach(text => text.innerText = "");
    
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0";
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector('.imgbox img').style.width = "0";
});