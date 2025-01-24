let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBt = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

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
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) { // Player O turn
            box.innerText = "O";
            turnO = false;
        } else { // Player X turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
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

newGameBt.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);