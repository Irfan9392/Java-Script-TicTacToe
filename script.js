let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBt = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drawConatiner = document.querySelector(".draw-message-conatiner");
let drawMsg = document.querySelector("#drawMessage");
let count = 0;
let turnO = true;// PlayerX, PlayerO
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    drawConatiner.classList.add("hide");
    count=0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) { // Player O turn
            box.innerText = "O";
            playerColor(box);
            turnO = false;
            count++;
        } else { // Player X turn
            box.innerText = "X";
            turnO = true;
            count++;
        }
        box.disabled = true;
        drawGame(count);
        checkWinner();
    });
});

const disableBoxes= () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes= () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText ="";
    }
};

const showWinner = (winner) => {
    msg.innerText= `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (patterns of winPatterns) {
        // console.log(patterns[0],patterns[1],patterns[2]);
        // console.log(boxes[patterns[0]].innerText,
        //             boxes[patterns[1]].innerText,
        //             boxes[patterns[2]].innerHTML
        // );
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;
        
        if(pos1Val !="" && pos2Val!="" && pos3Val!="") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

const drawMessage = () => {
    drawMsg.innerText = "Draw Game!! Click Reset Game button."
    drawConatiner.classList.remove("hide");
};

const drawGame = (count) => {
    console.log(count);
    for (patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;
        if(pos1Val !="" && pos2Val!="" && pos3Val!="") {
            if( count === 9 && (pos1Val !== pos2Val && pos2Val !== pos3Val)) {
                count=0;
                drawMessage();
            }
        }
    }
};

const playerColor = (box) => {
    if(box.innerText === 'O') {
        box.style.color = 'green';
    } else {
        box.style.color = 'red';
    }
}

newGameBt.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);