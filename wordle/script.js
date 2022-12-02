let wordsList = ["ABOUT", "ACTOR", "ADMIT", "ADULT", "AFTER", "AGREE", "ALARM", "ALIVE", "ALLOW", "ARGUE", "ASSET", "BIRTH", "BLAME", "BLIND", "BLOOD", "CAUSE", "CHAIN", "CHAIR", "CHART", "CHILD", "CLASS", "CLICK", "COACH", "CODES", "CRAFT", "CYCLE", "DEATH", "DOING", "DRAWN", "DRILL", "DRIVE", "EARLY", "ELITE", "EXIST", "EXTRA", "FAINT", "FAULT", "FIBER", "FIFTH", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "GIVEN", "GLASS", "GRACE", "GRANT", "GRASS", "GROSS", "GUARD", "HAIRY", "HAPPY", "HEART", "HEAVY", "HOUSE", "HUMAN", "IDEAL", "IMAGE", "INDEX", "INNER", "INPUT", "ISSUE", "JAPAN", "JOINT", "LABEL", "LARGE", "LEGAL", "LEVEL", "LIGHT", "LIVES", "LOCAL", "LOGIC", "LUNCH", "MAGIC", "MAKER", "MARCH", "MOTOR", "MOUTH", "MOVIE", "MUSIC", "NEVER", "NEWLY", "NIGHT", "NORTH", "NOVEL", "NURSE", "OCEAN", "OFFER", "ORDER", "PAINT", "PANEL", "PAPER", "PARTY", "PHASE", "PIECE", "PILOT", "PITCH", "PRIZE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAPID", "REACH", "REFER", "RIGHT", "RIVAL", "RIVER", "ROUGH", "ROUTE", "ROYAL", "SCALE", "SCENE", "SEVEN", "SHAPE", "SHELL", "SHIFT", "SIXTH", "SIZED", "SKILL", "SLEEP", "SOLID", "SOLVE", "SPEED", "SPENT", "STORM", "SUGAR", "TABLE", "TAKEN", "TASTE", "THANK", "THEFT", "THEME", "THESE", "THICK", "THIRD", "TOWER", "TRACK", "TRAIN", "TREND", "TRUCK", "TRULY", "TRUST", "UNDER", "UNDUE", "VALID", "VIDEO", "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL", "WHICH", "WHILE", "WORLD", "WORRY", "WORST", "WRITE", "YIELD", "YOUNG"]

let currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
console.log(currentWord);

let rowsBody = document.getElementById('wordRows');
let wordBoxes = [];
for (let i = 0; i < 6; i++) {
  let wordrow = document.createElement('div');
  wordrow.className = "wordrow";

  for (let i = 0; i < 5; i++) {
    let wordbox = document.createElement('div');
    wordbox.classList.add("wordbox");
    if (i == 4) {
      wordbox.classList.add("finalBox");
    }
    wordrow.appendChild(wordbox);
    wordBoxes.push(wordbox)
  }

  rowsBody.appendChild(wordrow);
}

activeBox = wordBoxes[0];
activeBox.classList.add('active');
wordBoxes[0].innerHTML = " ";
currentBoxNum = 0;

function keyEntered() {
  if (outputLetter != "" && activeBox.classList.contains("finalBox")) {
    console.log(outputLetter);
    correctNum = 0;

    activeBox.parentElement.childNodes.forEach((child, index) => {
      console.log(child.innerHTML);
      if (Array.from(currentWord)[index] == child.innerHTML) {
        child.classList.add("correct");
        correctNum++;
        keysArr = document.querySelectorAll('.key');
        keysArr.forEach(keyObj => {
          if (keyObj.innerHTML == child.innerHTML) {
            keyObj.style.background = '#fcfcfc';
          }
        });
      } else if (Array.from(currentWord).includes(child.innerHTML)) {
        child.classList.add("wrongSpot");
        keysArr = document.querySelectorAll('.key');
        keysArr.forEach(keyObj => {
          if (keyObj.innerHTML == child.innerHTML) {
            keyObj.style.background = '#fcfcfc';
          }
        });
      } else {
        child.classList.add("incorrect");
        keysArr = document.querySelectorAll('.key');
        keysArr.forEach(keyObj => {
          if (keyObj.innerHTML == child.innerHTML) {
            keyObj.style.background = '#5e5e5e';
          }
        });
      }

      if (correctNum == 5) {
        winGame();
      }
    });





    activeBox.innerHTML = outputLetter;
    activeBox.classList.remove('active');
    currentBoxNum++;
    if (wordBoxes[currentBoxNum] == undefined) {

    } else {
      activeBox = wordBoxes[currentBoxNum];
      activeBox.classList.add('active');
      outputLetter = "";
    }
  }
};

function winGame() {
  messageBox = document.getElementById('errorMsg');
  messageBox.innerHTML = "You Win!";
}
function loseGame() {

}