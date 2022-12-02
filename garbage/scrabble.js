board = document.getElementById('scrabbleboard');

let scrabbleBoxes = [];
let activeBox;
let selectedTile;
let activeTiles = [];
let activeTileValues = [];


for (let i = 0; i < 15; i++) {
  let row = document.createElement('div');
  row.className = "row";
  if (i == 0) {
    row.classList.add("firstrow");
  }
  if (i == 14) {
    row.classList.add("finalrow");
  }
  for (let i = 0; i < 15; i++) {
    let box = document.createElement('div');
    box.classList.add("box");
    if (i == 0) {
      box.classList.add("firstbox");
    }
    if (i == 14) {
      box.classList.add("finalbox");
    }
    row.appendChild(box);
    scrabbleBoxes.push(box)
  }

  board.appendChild(row);
}
console.log(scrabbleBoxes);

class Tile {
  constructor(innerText, innerNum) {
    this.innerText = document.createElement('p');
    this.innerText.innerHTML = innerText;
    this.innerText.className = innerText;

    this.innerNum = document.createElement('p');
    this.innerNum.innerHTML = innerNum;
    this.innerNum.className = "tileNum";

    //this.innerArray = [this.innerText, this.innerNum];
  }
}
let tiles = [];
function tileSetup() {
  // A Tiles
  for (let i = 0; i < 9; i++) {
    tiles.push(new Tile("A", 1));
  }
  // B Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("B", 3));
  }
  // C Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("C", 3));
  }
  // D Tiles
  for (let i = 0; i < 4; i++) {
    tiles.push(new Tile("D", 2));
  }
  // E Tiles
  for (let i = 0; i < 12; i++) {
    tiles.push(new Tile("E", 1));
  }
  // F Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("F", 4));
  }
  // G Tiles
  for (let i = 0; i < 3; i++) {
    tiles.push(new Tile("G", 2));
  }
  // H Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("H", 4));
  }
  // I Tiles
  for (let i = 0; i < 9; i++) {
    tiles.push(new Tile("I", 1));
  }
  // J Tiles
  for (let i = 0; i < 1; i++) {
    tiles.push(new Tile("J", 8));
  }
  // K Tiles
  for (let i = 0; i < 1; i++) {
    tiles.push(new Tile("K", 5));
  }
  // L Tiles
  for (let i = 0; i < 4; i++) {
    tiles.push(new Tile("L", 1));
  }
  // M Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("M", 3));
  }
  // N Tiles
  for (let i = 0; i < 6; i++) {
    tiles.push(new Tile("N", 1));
  }
  // O Tiles
  for (let i = 0; i < 8; i++) {
    tiles.push(new Tile("O", 1));
  }
  // P Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("P", 3));
  }
  // Q Tiles
  for (let i = 0; i < 1; i++) {
    tiles.push(new Tile("Q", 10));
  }
  // R Tiles
  for (let i = 0; i < 6; i++) {
    tiles.push(new Tile("R", 1));
  }
  // S Tiles
  for (let i = 0; i < 4; i++) {
    tiles.push(new Tile("S", 1));
  }
  // T Tiles
  for (let i = 0; i < 6; i++) {
    tiles.push(new Tile("T", 1));
  }
  // U Tiles
  for (let i = 0; i < 4; i++) {
    tiles.push(new Tile("U", 1));
  }
  // V Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("V", 4));
  }
  // W Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("W", 4));
  }
  // X Tiles
  for (let i = 0; i < 1; i++) {
    tiles.push(new Tile("X", 8));
  }
  // Y Tiles
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("Y", 4));
  }
  // Z Tiles
  for (let i = 0; i < 1; i++) {
    tiles.push(new Tile("Z", 10));
  }
  // -------------------- BLANK TILES -------------------- //
  for (let i = 0; i < 2; i++) {
    tiles.push(new Tile("?", 0));
  }
  console.log(tiles);
}
tileSetup();

// This turns a box into a tile from the greater 'tiles' array
function makeTile(boxIndex, tileIndex) {
  scrabbleBoxes[boxIndex].appendChild(tiles[tileIndex].innerText);
  scrabbleBoxes[boxIndex].appendChild(tiles[tileIndex].innerNum);
  scrabbleBoxes[boxIndex].classList.add(tiles[tileIndex].innerText.innerHTML);
  tiles.splice(tileIndex, 1);
  console.log(tiles[tileIndex].innerText);
}

// This makes a sample word
makeTile(7, 1);
makeTile(8, 49);
makeTile(9, 36);
makeTile(10, 90);
makeTile(11, 23);
makeTile(12, 24);
makeTile(13, 57);
makeTile(14, 26);
makeTile(15, 86);
makeTile(16, 28);

makeTile(22, 13);
makeTile(37, 14);

myTiles = [];
// This checks for a horizontal word at the current index
currentIndex = 7;
currentWord = "";
currentValue = 0;
while (scrabbleBoxes[currentIndex].innerHTML != "" && !scrabbleBoxes[currentIndex].classList.contains('firstbox')) {
  currentWord = currentWord + scrabbleBoxes[currentIndex].childNodes[0].innerHTML;
  currentValue = parseInt(currentValue) + parseInt(scrabbleBoxes[currentIndex].childNodes[1].innerHTML);
  currentIndex++;
}
console.log(currentWord);
console.log(currentValue);

// This checks for a vertical word at the current index.
currentIndex = 7;
currentWord = "";
currentValue = 0;
while (scrabbleBoxes[currentIndex].innerHTML != "" && !scrabbleBoxes[currentIndex].parentNode.classList.contains('finalrow')) {
  currentWord = currentWord + scrabbleBoxes[currentIndex].childNodes[0].innerHTML;
  currentValue = parseInt(currentValue) + parseInt(scrabbleBoxes[currentIndex].childNodes[1].innerHTML);
  currentIndex += 15;
}
console.log(currentWord);
console.log(currentValue);


// Creates the current hand
for (let i = 0; i < 7; i++) {
  let randInt = Math.floor(Math.random() * tiles.length);
  myTiles.push(tiles[randInt]);
  tiles.splice(randInt, 1);
}
console.log(myTiles);

// Allows the scrabble boxes to be selected
scrabbleBoxes.forEach(panel => {
  panel.addEventListener('click', () => {
    if (!panel.classList.contains('active')) {
      doAddClass = true;
    } else {
      doAddClass = false;
    }
    removeActionClasses();
    if (doAddClass) {
      panel.classList.add('active');
      activeBox = panel;
      replaceTile();
    } else {
      activeBox = null;
    }
  })
})
function removeActionClasses() {
  scrabbleBoxes.forEach(panel => {
    panel.classList.remove('active')
  })
}
// Allows the tiles in the hand to be selected
hand = document.getElementById('hand');
let handTiles = [];
function makeHand() {
  handTiles = [];
  hand.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    let handIcon = document.createElement('div');
    handIcon.classList.add("handIcon");
    hand.appendChild(handIcon);
    handTiles.push(handIcon);
    handTiles[i].appendChild(myTiles[i].innerText);
    handTiles[i].appendChild(myTiles[i].innerNum);
  }
  handTiles.forEach(panel => {
    panel.addEventListener('click', () => {
      if (!panel.classList.contains('selected')) {
        doAddClass = true;
      } else {
        doAddClass = false;
      }
      removeSelectClasses();
      if (doAddClass) {
        panel.classList.add('selected');
        selectedTile = panel;
        console.log(selectedTile);
        replaceTile();
      } else {
        selectedTile = null;
      }
    })
  });

  activeTiles.forEach((activeTile, index) => {
    activeTile.innerHTML = "";
    letterP = document.createElement('p');
    letterP.className = activeTileValues[index].letter;
    numberP = document.createElement('p');
    numberP.className = "tileNum";
    letterP.innerHTML = activeTileValues[index].letter;
    numberP.innerHTML = activeTileValues[index].number;

    activeTile.appendChild(letterP);
    activeTile.appendChild(numberP);
  })
}
makeHand();
function removeSelectClasses() {
  handTiles.forEach(panel => {
    panel.classList.remove('selected');
  })
}

function replaceTile() {
  if (activeBox != null && selectedTile != null) {
    removeActionClasses();
    removeSelectClasses();

    textVar = selectedTile.childNodes[0];
    numVar = selectedTile.childNodes[1];

    activeTiles.push(activeBox);
    let tilePair = {
      letter: textVar.innerHTML,
      number: numVar.innerHTML
    }
    activeTileValues.push(tilePair);

    /*
    // This code adds a new random tile to the hand. The problem with this is that it doesn't allow us to clear the board if we don't want to submit.
    let randInt = Math.floor(Math.random() * tiles.length);
    myTiles.push(tiles[randInt]);

    tiles.splice(randInt, 1);*/
    activeBox.innerHTML = null;

    activeBox.appendChild(textVar);
    activeBox.appendChild(numVar);

    activeBox = null;
    selectedTile = null;

    console.log(myTiles);
    console.log(activeTiles);
  }
}

function resetHand() {
  console.log(myTiles);
  activeTiles.forEach((tile, index) => {
    //tile.innerHTML = "";
  });
  makeHand();
}

function submitTiles() {
  handTiles.forEach((handTile, index) => {
    console.log("activeTiles:");
    console.log(activeTiles);
    console.log("activeTileValues:");
    console.log(activeTileValues);
    console.log("myTiles:");
    console.log(myTiles);
    console.log("handTiles:");
    console.log(handTiles);
    console.log("activeBox:");
    console.log(activeBox);
    console.log("selectedTile:");
    console.log(selectedTile);


    if (handTile.innerHTML == "") {
      //activeTiles = [];
      //handTile.innerHTML = "HII";
      console.log(handTile);
      myTiles.splice(index, 1);

      let randInt = Math.floor(Math.random() * tiles.length);
      myTiles.push(tiles[randInt]);

      tiles.splice(randInt, 1);
    }
  });


  makeHand();
}

/*
0 Points - Blank tile.
1 Point - A, E, I, L, N, O, R, S, T and U.
2 Points - D and G.
3 Points - B, C, M and P.
4 Points - F, H, V, W and Y.
5 Points - K.
8 Points - J and X.
10 Points - Q and Z.
*/
/*
A-9,
B-2,
C-2,
D-4,
E-12,
F-2,
G-3,
H-2,
I-9,
J-1,
K-1,
L-4,
M-2,
N-6,
O-8,
P-2,
Q-1,
R-6,
S-4,
T-6,
U-4,
V-2,
W-2,
X-1,
Y-2,
Z-1 and
Blanks-2.

*/