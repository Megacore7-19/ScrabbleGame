let row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
let row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
let row3 = ["Z", "X", "C", "V", "B", "N", "M"];
let keyboard = document.getElementById('keyboard');
let displayLetter = document.getElementById('displayLetter');
let outputLetter = "";

row1Div = document.createElement('div');
row1Div.className = "keyboardRow";
row1Div.id = "row1";
row2Div = document.createElement('div');
row2Div.className = "keyboardRow";
row2Div.id = "row2";
row3Div = document.createElement('div');
row3Div.className = "keyboardRow";
row3Div.id = "row3";

row1.forEach(letter => {
  key = document.createElement('p');
  key.innerHTML = letter;
  key.className = "key";
  key.onclick = function keyPressed() {
    if (activeBox.classList.contains("finalBox") == false) {
      outputLetter = letter;
      console.log(outputLetter);

      activeBox.innerHTML = outputLetter;
      activeBox.classList.remove('active');
      currentBoxNum++;
      activeBox = wordBoxes[currentBoxNum];
      activeBox.classList.add('active');
      outputLetter = "";
    } else {
      outputLetter = letter;
      console.log(outputLetter);

      activeBox.innerHTML = outputLetter;
    }
  };
  row1Div.appendChild(key);
});
row2.forEach(letter => {
  key = document.createElement('p');
  key.innerHTML = letter;
  key.className = "key";
  key.onclick = function keyPressed() {
    if (activeBox.classList.contains("finalBox") == false) {
      outputLetter = letter;
      console.log(outputLetter);

      activeBox.innerHTML = outputLetter;
      activeBox.classList.remove('active');
      currentBoxNum++;
      activeBox = wordBoxes[currentBoxNum];
      activeBox.classList.add('active');
      outputLetter = "";
    } else {
      outputLetter = letter;
      console.log(outputLetter);

      activeBox.innerHTML = outputLetter;
    }
  };
  row2Div.appendChild(key);
});
row3.forEach(letter => {
  key = document.createElement('p');
  key.innerHTML = letter;
  key.className = "key";
  key.onclick = function keyPressed() {
    if (activeBox.classList.contains("finalBox") == false) {
      outputLetter = letter;
      console.log(outputLetter);

      activeBox.innerHTML = outputLetter;
      activeBox.classList.remove('active');
      currentBoxNum++;
      activeBox = wordBoxes[currentBoxNum];
      activeBox.classList.add('active');
      outputLetter = "";
    } else {
      outputLetter = letter;
      console.log(outputLetter);

      activeBox.innerHTML = outputLetter;
    }
  };
  row3Div.appendChild(key);
});

enterKey = document.createElement('p');
enterKey.innerHTML = "ENTER";
enterKey.classList.add("key");
enterKey.classList.add("bigKey");
enterKey.onclick = function doEnter() { keyEntered() };

delKey = document.createElement('p');
delKey.innerHTML = "DEL";
delKey.classList.add("key");
delKey.classList.add("bigKey");
delKey.onclick = function keyDeleted() {
  if (currentBoxNum == 0 || wordBoxes[currentBoxNum - 1].classList.contains("finalBox")) {
    activeBox.innerHTML = " ";
    outputLetter = "";
  }
  else {
    console.log(outputLetter);
    activeBox.innerHTML = " ";
    activeBox.classList.remove('active');
    currentBoxNum--;
    activeBox = wordBoxes[currentBoxNum];
    activeBox.classList.add('active');
    outputLetter = "";
    activeBox.innerHTML = " ";
  }
};

row1Div.appendChild(delKey);
row3Div.appendChild(enterKey);

keyboard.appendChild(row1Div);
keyboard.appendChild(row2Div);
keyboard.appendChild(row3Div);

