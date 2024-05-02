import Game from "./src/game.js";
import Visual from "./src/visual.js";
import Controls from "./src/controls.js";
// const audioObj = new Audio("./sounds/1.mp3");

const app = document.getElementById("app");
const game = new Game();

const gameboy = document.createElement("div");
const gameboyExit = document.createElement("button");
gameboy.setAttribute("id", "gameboy");
gameboyExit.setAttribute("id", "gameboyExit");
app.appendChild(gameboyExit);
app.appendChild(gameboy);
const gameboyExitNode = document.createTextNode("<- Back to main");
gameboyExit.appendChild(gameboyExitNode);

const visual = new Visual(gameboy, 360, 480, 20, 10);
const controls = new Controls(game, visual);

const menu = document.createElement("div");
menu.setAttribute("id", "menu");
app.appendChild(menu);

const h1 = document.createElement("h1");
h1.setAttribute("id", "h1");
menu.appendChild(h1);
const h1Node = document.createTextNode("TETRIS");
h1.appendChild(h1Node);

const displayHiScore = document.createElement("div");
displayHiScore.setAttribute("id", "displayHiScore");
app.appendChild(displayHiScore);
displayHiScore.style.display = "none";

const newGame = document.createElement("button");
newGame.setAttribute("id", "newGame");
menu.appendChild(newGame);
const newGameNode = document.createTextNode("New game");
newGame.appendChild(newGameNode);
const hiScore = document.createElement("button");
hiScore.setAttribute("id", "hiScore");
menu.appendChild(hiScore);
const hiScoreNode = document.createTextNode("Hi score");
hiScore.appendChild(hiScoreNode);
const rules = document.createElement("button");
rules.setAttribute("id", "rules");
menu.appendChild(rules);
const rulesNode = document.createTextNode("How to play");
rules.appendChild(rulesNode);
// const myAudio1 = new Audio("./sounds/blockRotate.mp3");
const startNewGame = () => {
  const name = prompt("Enter yor name");
  // myAudio1.play();
  visual.renderStart();
  gameboy.style.display = "block";
  gameboyExit.style.display = "block";
  menu.style.display = "none";
  game.nicName = name;
};
newGame.addEventListener("click", startNewGame);

const renderHiScore = () => {
  const hiScoreArr = JSON.parse(localStorage.personsData);
  console.log("wwwwwwwwww", hiScoreArr);
  hiScoreArr.sort((a, b) => (a.score > b.score ? 1 : -1));

  const uniqueScore = Array.from(new Set(hiScoreArr));
  console.log("1111111", uniqueScore);
  let result = `<h2 class="h1">Hi Scores:</h2> <br>`;
  let resArr = [];
  hiScoreArr.forEach((player) => {
    const list = Object.values(player);
    const x = list.join(" : ");
    resArr.unshift(x);
  });
  const uniqueRes = Array.from(new Set(resArr));
  console.log("---------", uniqueRes);
  const z = uniqueRes.sort((a, b) => b - a);

  z.forEach((res) => {
    result += `<span class="znachenie">${res} points</span> <br><br>`;
  });
  menu.style.display = "none";
  displayHiScore.innerHTML = result;
  displayHiScore.style.display = "block";
  gameboyExit.style.display = "block";
  gameboyExit.style.marginRight = "300px";
};
hiScore.addEventListener("click", renderHiScore);
/////////////////////// EXIT ///////////////////////////////////////////////////
gameboyExit.addEventListener("click", () => {
  gameboy.style.display = "none";
  gameboyExit.style.display = "none";
  menu.style.display = "block";
  displayHiScore.style.display = "none";
  gameboyExit.style.marginRight = "-161px";

  game.restart();

  // this.visual.renderGameOver(state);
  // this.visual.renderStart();

  // // game.restart();
  // visual.renderStart();
});

window.game = game;
window.visual = visual;
window.controls = controls;

const btnControls = document.createElement("div");
btnControls.setAttribute("class", "btnControls");
gameboy.appendChild(btnControls);

const btnControlsLeft = document.createElement("div");
btnControlsLeft.setAttribute("class", "btnControlsLeft");
const btnControlsRight = document.createElement("div");
btnControlsRight.setAttribute("class", "btnControlsRight");
btnControls.appendChild(btnControlsLeft);
btnControls.appendChild(btnControlsRight);

const btnUp = document.createElement("button");
btnUp.setAttribute("id", "btnUp");
btnControlsLeft.appendChild(btnUp);
const divLeftRight = document.createElement("div");
divLeftRight.setAttribute("class", "divLeftRight");
btnControlsLeft.appendChild(divLeftRight);
const btnDown = document.createElement("button");
btnDown.setAttribute("id", "btnDown");
btnControlsLeft.appendChild(btnDown);

const btnLeft = document.createElement("button");
btnLeft.setAttribute("id", "btnLeft");
divLeftRight.appendChild(btnLeft);

const arrowsImg = document.createElement("img");
arrowsImg.setAttribute("id", "arrowsImg");
arrowsImg.setAttribute("src", "cross.svg");
divLeftRight.appendChild(arrowsImg);

const btnRight = document.createElement("button");
btnRight.setAttribute("id", "btnRight");
divLeftRight.appendChild(btnRight);

const btnRotate = document.createElement("button");
btnRotate.setAttribute("id", "btnRotate");
btnRotate.setAttribute("class", "btnRotate");
btnControlsRight.appendChild(btnRotate);

const txtRotate = document.createElement("div");
txtRotate.setAttribute("id", "txtRotate");
btnControlsRight.appendChild(txtRotate);
const txtNode = document.createTextNode("rotate");
txtRotate.appendChild(txtNode);
// const btnDown = document.getElementById("btnDown");

// btnLeft.addEventListener("click", () => {
//   this.game.movePieceLeft();
//   this.visual.updateVisual();
// });
controls.clickControl();
