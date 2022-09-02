startConfetti();
let buttonEnd = document.querySelector(".buttonEnd");
var highScore = new Audio("highScore.mp3");
highScore.play();

   buttonEnd.onclick = () => {
    window.location.href = "thegame.html";
  }