let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#a");

let turn = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "O";
      turn = false;
    } else {
      box.innerText = "X";
      turn = true;
    }
    box.classList.add("disabled");
    
    checkWinner();
    draw();
  });
});

const style = document.createElement('style');
style.innerHTML = '.disabled { pointer-events: none; }';
document.head.appendChild(style);

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        document.getElementById("msg").innerText = `${pos1Val} is winner!`;
        boxes.forEach((box) => {
                box.classList.add("disabled");
        });
        return true; 
      }
    }
  }
  return false; 
};

const draw = () => {
  if (!checkWinner() && Array.from(boxes).every(box => box.classList.contains("disabled"))) {
    document.getElementById("msg").innerText = "It's a draw!";
  }
};
 
resetBtn.addEventListener("click",() =>
{
        boxes.forEach(box =>{
                box.innerText = "";
                box.classList.remove("disabled");
        });
        turn = true;
        document.getElementById("msg").innerText = ""
; });