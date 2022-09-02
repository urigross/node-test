let instructions = document.querySelector(".instructions");
let barerror = document.querySelector(".barerror");




function toggleInstructions() {
  instructions.classList.toggle("display");
}

let userName;
function SubmitPlayer() {
  userName = document.querySelector(".userName").value;
  localStorage.setItem("userName", userName);
  return userName; // whatever you want to do with it
}
let countDown = document.querySelector(".countdown");
let myInterval = 0;
function countdown() {
  if (userName.length > 1) {
    window.location.href = "countdown.html";
  }
  else{
    barerror.classList.toggle("display");
  }
}

