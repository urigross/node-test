
export const emojisShort = ['💝', '💖', '💓', '💞', '💕','💝', '💖', '💓', '💞', '💕'];
export const emojisLong = ['💘','💝','💖','💗','💓','💞','💕','❣️','💘','💝','💖','💗','💓','💞','💕','❣️'];





const button = document.querySelector(".button");
var endGame = new Audio("endGame.mp3");
var nextLevel = new Audio("nextLevel.wav");
var correctAnswer = new Audio("correctAnswer.wav");
var wrongAnswer = new Audio("wrongAnswer.wav");
var background = new Audio("background.mp3");
const userName = localStorage.getItem("userName");
let champs = document.querySelector(".champs");
let buttonEnd = document.querySelector(".buttonEnd");
let countDown = document.querySelector(".countdown");
let timeline = document.querySelector(".timeline");
let timeline2 = document.querySelector(".timeline2");
let randomEmojiRun = document.querySelector(".randomEmojiRun");
let counter = document.querySelector(".count");
let displayLevel = document.querySelector(".level");
let levelOne = document.querySelector(".levelOne");
let levelTwo = document.querySelector(".levelTwo");
let rwwrapper = document.querySelector(".rwwrapper");




background.volume = 0.2;
background.play();


let level = 1;
let randomEmoji = "";
let chosenEmoji = "";
let myInterval = 0;
let myInterval2 = 0;
let myTimeout = 0;
let extra = [];
let emojis = [];
let emojisWithExtra = [];
let countHearts = 2;
let points = 0;



let championsStorage = {
  get() {
    let championsListJSON = localStorage.getItem("championsTableJSON");
    try {
      return JSON.parse(championsListJSON) || this.set([]);
    } catch (e) {
      return this.set([]);
    }
  },
  set(championsList = this.get()) {
    localStorage.setItem("championsTableJSON", JSON.stringify(championsList));
    return championsList;
  },
  add(champion) {
    let championsList = this.get();
    championsList.push(champion);
    championsList.sort((a, b) => a.userPoints - b.userPoints);
    return this.set(championsList);
  },
};

function setChampsTable(championsTable = championsStorage.get()) {
  if (championsTable.length > 0) {
    const championsList = document.createElement("ol");
    champs.appendChild(championsList);
    championsTable.sort((b, a) => a.userPoints - b.userPoints);
    for (let i = 0; i < championsTable.length; i++) {
      let li = document.createElement("li");
      championsList.appendChild(li);
      li.textContent = ` ${championsTable[i].userName} - ${championsTable[i].userPoints} points `;
    }
  }

  if (points >= championsTable[0].userPoints) {
    setTimeout(function () {
      window.location.href = "try.html";
    }, 4000);
  }
}

function resetAnimation() {
  timeline2.style.animation = "none";
  timeline2.offsetHeight;
  timeline2.style.animation = null;
  timeline2.style.animation = "animate";
  timeline2.style.animationTimingFunction = "linear";
}

function newLevel() {
  clearInterval(myInterval);
  clearInterval(myInterval2);
  clearTimeout(myTimeout);
  resetAnimation();
  countDown.style.visibility = "visible";

  emojis = [];
  extra = [];
  emojisWithExtra = [];

  button.style.pointerEvents = "auto";

  counter.innerHTML = points;
  displayLevel.textContent = level;

  timeline2.style.animationDuration = "6s";

  level !== 3
    ? (emojis = emojisShort.sort(() => 0.5 - Math.random()))
    : (emojis = emojisLong.sort(() => 0.5 - Math.random()));

  randomEmoji = document.querySelector(".emoji");
  randomEmoji.innerHTML = emojis[0];
  chosenEmoji = randomEmoji.innerHTML;

 

  let countDownValue = 5;
  myInterval = setInterval(() => {
    timeline2.style.animationDuration = "6s";
    countDown.textContent = `${countDownValue--}s`;
    if (countDown.textContent === "0s") {
      randomEmoji.textContent = "❓";
      countDown.style.visibility = "hidden";
      clearInterval(myInterval);
      clearInterval(timeline);
      clearInterval(timeline2);
       rwwrapper.classList.toggle("display");
  setTimeout(hideElement, 6000) //milliseconds until timeout//
  function hideElement() {
    rwwrapper.style.display = 'none';
  }

    }
  }, 1000);
  var first = false;
  myTimeout = setTimeout(() => {
    let sec = level === 1 ? 3000 : level === 2 ? 2000 : 1000;
    button.style.pointerEvents = "auto";
    for (let i = 0; i < emojis.length / 10; i++) {
      extra.push(chosenEmoji);
    }
    emojisWithExtra = emojis.concat(extra);

    myInterval2 = setInterval(() => {
      let currentEmojis = emojisWithExtra.sort(() => 0.5 - Math.random());
      timeline2.style.animationIterationCount = "infinite";
      timeline2.style.animationDuration = `${sec / 1000}s`;
      timeline2.onanimationiteration = (event) => {
        randomEmojiRun.innerHTML = currentEmojis[0];
      };

      let hearts = document.querySelectorAll(".heart");

      buttonEnd.onclick = () => {
        window.location.href = "http://localhost:3000/thegame.html";
       // window.location.href = "https://node-test-git-vercel2-urigross.vercel.app/thegame.html";
      }
      var clicked = false;
      button.onclick = () => {
        if (!clicked) {
          clicked = true;

          if (chosenEmoji === randomEmojiRun.textContent) {
            correctAnswer.play();
            points++;

            counter.textContent = points;

            if (level === 1 ? points === 5 : level === 2 ? points === 10 : false) {
              if (level === 1 ? points === 5 : false) {
                levelOne.classList.toggle("display");
                setTimeout(hideElement, 2000) //milliseconds until timeout//
                function hideElement() {
                  levelOne.style.display = 'none';
                }
              }
              if (level === 2 ? points === 10 : false) {

                levelTwo.classList.toggle("display");
                setTimeout(hideElement, 2000) //milliseconds until timeout//
                function hideElement() {
                  levelTwo.style.display = 'none';
                }
              }
              nextLevel.play();
              level++;
              button.style.pointerEvents = "none";
              clearTimeout(myTimeout);
              newLevel();
            }
          } else if (countHearts > 0) {
            wrongAnswer.play();
            hearts[countHearts - 1].classList.toggle("display");
            countHearts--;
          } else {
            clearInterval(myInterval);
            clearInterval(myInterval2);
            clearTimeout(myTimeout);
            button.style.pointerEvents = "none";
            timeline.style.visibility = "hidden";

            let champions = championsStorage.add({
              userName,
              userPoints: points,
            });
            setChampsTable(champions);
            endGame.play();
            champs.classList.toggle("display");
            buttonEnd.classList.toggle("display");
          }
        }
      };
    }, sec);

    clearTimeout(myTimeout);
  }, 6000);
  if (points === 5 || points === 10) {
    randomEmojiRun.innerHTML = "";
  }
}
newLevel();

