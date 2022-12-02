// boardDiv and handDiv allow for easy referencing of their respective divs within the HTML file. They should not be directly read from or written to (instead use board[] or hand[])
boardDiv = document.getElementById('board');
handDiv = document.getElementById('hand');
errorState = true;
console.log(boardDiv);

// board and hand are the arrays that store the Tile and div pairs and allows for easy access within code.
board = [];
hand = [];

// boxList and handList retain a record of all HandBox and Box instances that have ever existed. It allows for the ability to recall moves and as single arrays to manage classes.
boxList = [];
handList = [];

// activeHand and activeBox track which elements are currently selected and are used to replace the Tiles.
activeHand = null;
activeBox = null;

// staticTiles tracks which tiles have yet to be submitted and can be used to reset them.
staticTiles = [];
staticHand = [];

// tilesBag determines which tiles are still available to be picked.
tilesBag = [];

// Should return name of string
const varToString = varObj => Object.keys(varObj)[0]

class Tile {
  constructor(letterVal, numVal) {
    if (letterVal == undefined || letterVal == null || letterVal == "") {
      this.letterVal = "";
    } else {
      this.letterVal = letterVal;
    }
    if (numVal == undefined || letterVal == null || numVal == "") {
      this.numVal = "";
    } else {
      this.numVal = numVal;
    }

    if (this.numVal == "" && this.letterVal == "") {
      this.blankTile = true;
    } else {
      this.blankTile = false;
    }
  }
}
class Box {
  constructor(tileElem) {
    if (tileElem == undefined || tileElem == null || tileElem == "") {
      this.tileElem = new Tile("", "");
    } else {
      this.tileElem = tileElem;
    }
    this.divElem = document.createElement('div');

    this.adjacentTiles = [null, null, null, null];

    this.indexInRow;
    this.rowNum;

    this.letterDiv = document.createElement('span');
    this.letterDiv.className = 'letter';
    this.letterDiv.innerHTML = this.tileElem.letterVal;

    this.numDiv = document.createElement('span');
    this.numDiv.className = 'number';
    this.numDiv.innerHTML = this.tileElem.numVal;

    this.divElem.appendChild(this.letterDiv);
    this.divElem.appendChild(this.numDiv);
    this.divElem.className = 'scrabbleBox';
    this.divElem.addEventListener('click', () => {
      if (this.divElem.classList.contains('activeBox')) {
        removeActiveBoxClasses();
        checkToRewrite()
      } else {
        removeActiveBoxClasses();
        this.divElem.classList.add('activeBox');
        activeBox = this;
        checkToRewrite()
      }
    })

    boxList.push(this);
  }
}
class HandBox {
  // Variables included when an instance of the class is made (like parameters) go in the constructor
  // All other variables must be preceded by 'this.'
  constructor(tileElem) {
    if (tileElem == undefined || tileElem == null || tileElem == "") {
      this.tileElem = new Tile("", "");
    } else {
      this.tileElem = tileElem;
    }
    this.divElem = document.createElement('div');

    this.letterDiv = document.createElement('span');
    this.letterDiv.className = 'handLetter';
    this.letterDiv.innerHTML = this.tileElem.letterVal;

    this.numDiv = document.createElement('span');
    this.numDiv.className = 'handNumber';
    this.numDiv.innerHTML = this.tileElem.numVal;

    this.divElem.appendChild(this.letterDiv);
    this.divElem.appendChild(this.numDiv);
    this.divElem.className = 'handBox';
    this.divElem.addEventListener('click', () => {
      if (this.divElem.classList.contains('activeHand')) {
        removeActiveHandClasses();
        checkToRewrite()
      } else {
        removeActiveHandClasses();
        this.divElem.classList.add('activeHand');
        activeHand = this;
        checkToRewrite()
      }
    })

    handList.push(this);
  }
}

// This initializes the available tiles
function tileSetup() {
  // A Tiles
  for (let i = 0; i < 9; i++) {
    tilesBag.push(new Tile("A", 1));
  }
  // B Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("B", 3));
  }
  // C Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("C", 3));
  }
  // D Tiles
  for (let i = 0; i < 4; i++) {
    tilesBag.push(new Tile("D", 2));
  }
  // E Tiles
  for (let i = 0; i < 12; i++) {
    tilesBag.push(new Tile("E", 1));
  }
  // F Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("F", 4));
  }
  // G Tiles
  for (let i = 0; i < 3; i++) {
    tilesBag.push(new Tile("G", 2));
  }
  // H Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("H", 4));
  }
  // I Tiles
  for (let i = 0; i < 9; i++) {
    tilesBag.push(new Tile("I", 1));
  }
  // J Tiles
  for (let i = 0; i < 1; i++) {
    tilesBag.push(new Tile("J", 8));
  }
  // K Tiles
  for (let i = 0; i < 1; i++) {
    tilesBag.push(new Tile("K", 5));
  }
  // L Tiles
  for (let i = 0; i < 4; i++) {
    tilesBag.push(new Tile("L", 1));
  }
  // M Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("M", 3));
  }
  // N Tiles
  for (let i = 0; i < 6; i++) {
    tilesBag.push(new Tile("N", 1));
  }
  // O Tiles
  for (let i = 0; i < 8; i++) {
    tilesBag.push(new Tile("O", 1));
  }
  // P Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("P", 3));
  }
  // Q Tiles
  for (let i = 0; i < 1; i++) {
    tilesBag.push(new Tile("Q", 10));
  }
  // R Tiles
  for (let i = 0; i < 6; i++) {
    tilesBag.push(new Tile("R", 1));
  }
  // S Tiles
  for (let i = 0; i < 4; i++) {
    tilesBag.push(new Tile("S", 1));
  }
  // T Tiles
  for (let i = 0; i < 6; i++) {
    tilesBag.push(new Tile("T", 1));
  }
  // U Tiles
  for (let i = 0; i < 4; i++) {
    tilesBag.push(new Tile("U", 1));
  }
  // V Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("V", 4));
  }
  // W Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("W", 4));
  }
  // X Tiles
  for (let i = 0; i < 1; i++) {
    tilesBag.push(new Tile("X", 8));
  }
  // Y Tiles
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("Y", 4));
  }
  // Z Tiles
  for (let i = 0; i < 1; i++) {
    tilesBag.push(new Tile("Z", 10));
  }
  // -------------------- BLANK TILES -------------------- //
  for (let i = 0; i < 2; i++) {
    tilesBag.push(new Tile("?", 0));
  }
  console.log(tilesBag);
}
tileSetup();

// This just returns a random tile and removes it from the tilesBag array
function getRandomTile() {
  const randInt = Math.floor(Math.random() * tilesBag.length);
  console.log(randInt);
  tilesBag.splice(tilesBag[randInt], 1);
  return tilesBag[randInt];
}

// This initializes the board
for (i = 0; i < 15; i++) {
  rowDiv = document.createElement('div');
  rowDiv.className = 'scrabbleRow';
  row = [];
  for (l = 0; l < 15; l++) {
    box = new Box();
    rowDiv.appendChild(box.divElem);
    row.push(box);
  }
  boardDiv.appendChild(rowDiv);
  board.push(row);
}
function removeActiveBoxClasses() {
  activeBox = null;
  boxList.forEach(panel => {
    panel.divElem.classList.remove('activeBox');
  })
}

// This initializes the hand
for (i = 0; i < 7; i++) {
  const randTile = getRandomTile();
  console.log(randTile);
  handBox = new HandBox(randTile);
  //handBox = new HandBox(getRandomTile());
  handDiv.appendChild(handBox.divElem);
  hand.push(handBox);
}
function removeActiveHandClasses() {
  activeHand = null;
  handList.forEach(panel => {
    panel.divElem.classList.remove('activeHand');
  })
}

// This outlines the functions for rewriting boxes in the hand or on the board
function rewriteBox(rowI, boxI, tile) {
  board[rowI][boxI] = new Box(tile);
  boardDiv.children[rowI].children[boxI].parentNode.replaceChild(board[rowI][boxI].divElem, boardDiv.children[rowI].children[boxI]);

  return board[rowI][boxI];
}
function rewriteHandBox(boxI, tile) {
  hand[boxI] = new HandBox(tile);
  handDiv.children[boxI].parentNode.replaceChild(hand[boxI].divElem, handDiv.children[boxI]);

  return hand[boxI];
}

// This is called everytime a tile is placed to determine what should happen after
function checkToRewrite() {
  if (activeBox != null && activeHand != null) {
    if (activeHand.tileElem.blankTile == true || activeBox.tileElem.blankTile != true) {
      console.log("Reset one Tile");
      resetOneTile();
      removeActiveBoxClasses();
      removeActiveHandClasses();
    } else {
      let indexOfRow;
      let elemOfRow;
      let currentHandBox = rewriteHandBox(hand.indexOf(activeHand), new Tile("", ""));
      board.forEach((row, index) => {
        if (row.indexOf(activeBox) != -1) {
          indexOfRow = index;
          elemOfRow = row;
        }
      });
      let currentBox = rewriteBox(indexOfRow, elemOfRow.indexOf(activeBox), new Tile(activeHand.tileElem.letterVal, activeHand.tileElem.numVal));

      staticTiles.push(currentBox);
      staticHand.push(currentHandBox);
      removeActiveBoxClasses();
      removeActiveHandClasses();
    }
    return true;
  } else {
    return false;
  }
}

// This resets the hand and puts all the tiles back
function resetOneTile() {
  if (activeHand.tileElem.blankTile == true) {
    let indexOfRow;
    let elemOfRow;
    board.forEach((row, index) => {
      if (row.indexOf(activeBox) != -1) {
        indexOfRow = index;
        elemOfRow = row;
      }
    });

    newIndex = hand.indexOf(activeHand);

    rewriteHandBox(hand.indexOf(activeHand), new Tile(activeBox.tileElem.letterVal, activeBox.tileElem.numVal));
    rewriteBox(indexOfRow, elemOfRow.indexOf(activeBox), new Tile("", ""));

    staticTiles.splice(staticTiles.indexOf(activeBox), 1);
    staticHand.splice(staticHand.indexOf(activeHand), 1);
  } else if (activeBox.tileElem.blanklTile != true) {
    let indexOfRow;
    let elemOfRow;
    board.forEach((row, index) => {
      if (row.indexOf(activeBox) != -1) {
        indexOfRow = index;
        elemOfRow = row;
      }
    });

    newIndex = hand.indexOf(activeHand);



    newBox = rewriteBox(indexOfRow, elemOfRow.indexOf(activeBox), new Tile(activeHand.tileElem.letterVal, activeHand.tileElem.numVal));

    //staticTiles.indexOf(activeBox) = newBox;
    staticTiles[staticTiles.indexOf(activeBox)] = newBox;

    rewriteHandBox(hand.indexOf(activeHand), new Tile(activeBox.tileElem.letterVal, activeBox.tileElem.numVal));
  }
  console.log(staticTiles);
}
function reset() {
  staticTiles.forEach((tile, index) => {
    let indexOfRow;
    let elemOfRow;
    board.forEach((row, index) => {
      if (row.indexOf(tile) != -1) {
        indexOfRow = index;
        elemOfRow = row;
      }
    });

    newIndex = hand.indexOf(staticHand[index]);
    rewriteHandBox(newIndex, new Tile(staticTiles[index].tileElem.letterVal, staticTiles[index].tileElem.numVal))
    rewriteBox(indexOfRow, elemOfRow.indexOf(tile), new Tile("", ""));
  });
  staticTiles = [];
  staticHand = [];
}

// This returns an array of all of the surrounding tiles
function checkAdjacent(column, box, val, dontprint) {
  if (dontprint == null) {
    dontprint = false;
  }
  aroundArray = [];
  if (board[column - val] != undefined && board[column - val][box] != undefined && board[column - val][box].tileElem.blankTile != true) {
    aroundArray.push(board[column - 1][box]);
  } else {
    aroundArray.push(undefined);
  }

  if (board[column] != undefined && board[column][box + val] != undefined && board[column][box + val].tileElem.blankTile != true) {
    aroundArray.push(board[column][box + 1]);
  } else {
    aroundArray.push(undefined);
  }

  if (board[column + val] != undefined && board[column + val][box] != undefined && board[column + val][box].tileElem.blankTile != true) {
    aroundArray.push(board[column + 1][box]);
  } else {
    aroundArray.push(undefined);
  }

  if (board[column] != undefined && board[column][box - val] != undefined && board[column][box - val].tileElem.blankTile != true) {
    aroundArray.push(board[column][box - 1]);
  } else {
    aroundArray.push(undefined);
  }
  if (dontprint == false) {
    console.log(aroundArray);
  }
}

// This locks the tiles in place and draws new tiles
function submit() {
  masterArray = [];
  staticTiles.sort(function(a, b) {
    // let rowIndx;
    // let rowElem;
    // board.forEach((row, index) => {
    //   if (row.indexOf(a) != -1) {
    //     rowIndx = index;
    //     rowElem = row;
    //   }
    // });
    //return rowElem.indexOf(a) - rowElem.indexOf(b);
    return ((a.rowNum * 15) + a.indexInRow) - ((b.rowNum * 15) + b.indexInRow);
  });
  board.forEach((row, index) => {
    row.forEach(tile => {
      checkAdjacent(tile.rowNum, tile.indexInRow, 1, true);
    })
  });
  staticTiles.forEach((staticTile, index) => {
    // Handles the adjacent tiles code
    if (index != 0) {
      staticTile.adjacentTiles[3] = staticTiles[index - 1];
    }
    if (index != staticTiles.length - 1) {
      staticTile.adjacentTiles[1] = staticTiles[index + 1];
    }

    board.forEach((row, index) => {
      if (row.indexOf(staticTile) != -1) {
        staticTile.rowNum = index;
        staticTile.indexInRow = row.indexOf(staticTile);
      }
    });
    checkAdjacent(staticTile.rowNum, staticTile.indexInRow, 1);

    staticTile.adjacentTiles[0] = aroundArray[0];
    if (aroundArray[0] != null) {
      aroundArray[0].adjacentTiles[2] = staticTile;
    }

    staticTile.adjacentTiles[1] = aroundArray[1];
    if (aroundArray[1] != null) {
      aroundArray[1].adjacentTiles[3] = staticTile;
    }

    staticTile.adjacentTiles[2] = aroundArray[2];
    if (aroundArray[2] != null) {
      aroundArray[2].adjacentTiles[0] = staticTile;
    }

    staticTile.adjacentTiles[3] = aroundArray[3];
    if (aroundArray[3] != null) {
      aroundArray[3].adjacentTiles[1] = staticTile;
    }




    // Handles the vertical checks

    console.log(checkVertical(staticTile));
    masterArray.push("Vert: " + finalStr);




    checkVertical(staticTile).forEach(tile => {
      console.log(checkHorizontal(tile))
      masterArray.push("Horz: " + finalStr);
    });
  });


  staticHand.forEach((handTile, index) => {
    newIndex = hand.indexOf(staticHand[index]);
    let randTile = getRandomTile();
    rewriteHandBox(newIndex, randTile);
  });


  //debugMsg([varToString({ hasAllHorzElems }) + ": " + hasAllHorzElems, varToString({ hasAllVertElems }) + ": " + hasAllVertElems]);

  console.log(masterArray);
  tempStr = [];
  staticTiles.forEach(tile => { tempStr.push(tile.tileElem.letterVal); });
  debugMsg([varToString({ staticTiles }) + ": " + tempStr + ""]);
  for (i = 0; i < masterArray.length; i += 3) {
    debugMsg([varToString({ masterArray }) + i + ": " + masterArray[i] + "", varToString({ masterArray }) + (i + 1) + ": " + masterArray[i + 1] + "", varToString({ masterArray }) + (i + 2) + ": " + masterArray[i + 2] + ""]);
  }

  console.log(tilesBag);
  staticTiles = [];
  staticHand = [];
}

// This displays the error message
// !!!!!!!!!!  IT DOES NOT HANDLE ERRORS, ONLY SHOWS THE MESSAGE !!!!!!!!!!
function errorMsg(errorStr) {
  injectSpot = document.getElementById('errors');

  errorText = document.createElement('h2');
  errorText.innerHTML = errorStr;

  errorDiv = document.createElement('div');
  errorDiv.id = "errorBox";
  errorDiv.appendChild(errorText);
  injectSpot.appendChild(errorDiv);
  errorDiv.style.opacity = 0;

  errorDiv.style.opacity = 1;

  setTimeout(() => { errorDiv.style.opacity = 0; }, 2000);
  setTimeout(() => { errorDiv.outerHTML = ''; }, 2500);
}

function debugMsg(debugStr, debugBr) {
  injectSpot = document.getElementById('debugs');
  bigDiv = document.createElement('div');
  bigDiv.style.display = 'flex';
  bigDiv.className = "bigDiv";
  debugStr.forEach((indString, index) => {
    debugText = document.createElement('h2');
    debugText.innerHTML = indString;

    debugDiv = document.createElement('div');
    debugDiv.id = "debugBox";

    debugDiv.appendChild(debugText);
    bigDiv.appendChild(debugDiv);
  })
  lineBreak = document.createElement('hr');

  injectSpot.append(bigDiv);
  injectSpot.append(lineBreak);
}
function debugClear() {
  injectSpot = document.getElementById('debugs');
  injectList = [];
  injectSpot.childNodes.forEach((child, index) => {
    if (child.className == "bigDiv") {
      injectList.push(child);
    }
  });

  injectList.forEach((child, index) => {
    child.outerHTML = "";
  });
}

function checkHorizontal(tile) {
  columnI = tile.rowNum;
  boxI = tile.indexInRow;

  finalArray = [];


  currentCheck = true;
  currentTile = tile;
  while (currentCheck == true) {
    if (currentTile.adjacentTiles[3] == null || currentTile.adjacentTiles[3] == undefined) {
      currentCheck = false;
    } else {
      currentTile = currentTile.adjacentTiles[3];
      currentCheck = true;
    }
  }
  tile = currentTile;



  currentCheck = true;
  currentTile = tile;

  console.log("Current Check:");
  console.log(currentTile);

  while (currentCheck == true) {
    console.log("Current Check: " + currentTile.tileElem.letterVal);
    console.log(currentTile.adjacentTiles);

    finalArray.push(currentTile);

    if (currentTile.adjacentTiles[1] == null || currentTile.adjacentTiles[1] == undefined) {
      currentCheck = false;
    } else {
      currentTile = currentTile.adjacentTiles[1];
      currentCheck = true;
    }
  }

  isInLine = true;
  finalArray.forEach((elem, index) => {
    if (index != 0 && (finalArray[index].rowNum != finalArray[index - 1].rowNum)) {
      isInLine = false;
      errorMsg("Must be a straight line");
      debugMsg(["Not a straight horizontal line"]);
    }
  });


  finalStr = "";
  finalArray.forEach((elem, index) => { finalStr += elem.tileElem.letterVal; });
  //console.log(finalStr);

  return finalArray;
}

function checkVertical(tile) {


  columnI = tile.indexInRow;
  boxI = tile.rowNum;

  finalArray = [];


  currentCheck = true;
  checkNum = 0;
  currentTile = tile;
  while (currentCheck == true) {
    if (currentTile.adjacentTiles[0] == null || currentTile.adjacentTiles[0] == undefined) {
      currentCheck = false;
    } else {
      checkNum++;
      currentTile = currentTile.adjacentTiles[0];
    }
  }
  tile = currentTile;


  currentCheck = true;
  checkNum = 0;
  currentTile = tile;
  while (currentCheck == true) {
    finalArray.push(currentTile);
    if (currentTile.adjacentTiles[2] == null || currentTile.adjacentTiles[2] == undefined) {
      currentCheck = false;
    } else {
      checkNum++;
      currentTile = currentTile.adjacentTiles[2];
    }
  }

  isInLine = true;
  finalArray.forEach((elem, index) => {
    if (index != 0 && (finalArray[index].indexInRow != finalArray[index - 1].indexInRow)) {
      isInLine = false;
      errorMsg("Must be a straight line");
      debugMsg(["Not a straight vertical line"]);
    }
  });

  finalStr = "";
  finalArray.forEach((elem, index) => { finalStr += elem.tileElem.letterVal; });
  //console.log(finalStr);

  return finalArray;
}

console.log(board);
console.log(hand);

