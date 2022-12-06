let symbols = ['Χ', 'Ο', 'Υ', 'Ξ', 'Δ', 'Ω', 'Ψ', 'Θ', 'Σ', 'Φ'];
let players = [];
let scoreList = [];
let exterminationList = [];
let activePlayer = 0;
let moveCounter = 0;
let board = 0;
let clearTopRow = 0;
let clearRightCol = 0;
let clearBottomRow = 0;
let clearLeftCol = 0;
let playersParent = document.querySelector("#players__list");
let scoreParent = document.querySelector("#score__list");
let playing = true;

function changePlayersQuantityText() {
  if (document.getElementById("players__quantity").value == 2) {
    document.getElementById("players__quantity__text").innerHTML = "(первые 5 раундов поле не будет расширяться)";
  }
  if (document.getElementById("players__quantity").value == 2 &&
     (document.getElementById("victory__line").value == 3 &&
      document.getElementById("destruction__timer").value < 3)) {
    document.getElementById("players__quantity__text").innerHTML = "(поле не будет расширяться, при стандартных условиях)";
  }
  if (document.getElementById("players__quantity").value == 3) {
    document.getElementById("players__quantity__text").innerHTML = "(на троих есть и поинтереснее занятия)";
    document.getElementById("row__countdown").setAttribute("min", 3);
  }
  if (document.getElementById("players__quantity").value == 4) {
    document.getElementById("players__quantity__text").innerHTML = "(не хотите ли попробовать двое на двое?)";
    document.getElementById("row__countdown").setAttribute("min", 4);
  }
  if (document.getElementById("players__quantity").value == 5) {
    document.getElementById("players__quantity__text").innerHTML = "(главное не запутаться!)";
    document.getElementById("row__countdown").setAttribute("min", 5);
  }
  if (document.getElementById("players__quantity").value == 6) {
    document.getElementById("players__quantity__text").innerHTML = "(главное не запутаться!)";
    document.getElementById("row__countdown").setAttribute("min", 6);
  }
  if (document.getElementById("players__quantity").value == 7) {
    document.getElementById("players__quantity__text").innerHTML = "(как вам удалось договориться?)";
    document.getElementById("row__countdown").setAttribute("min", 7);
  }
  if (document.getElementById("players__quantity").value == 8) {
    document.getElementById("players__quantity__text").innerHTML = "(как вам удалось договориться?)";
    document.getElementById("row__countdown").setAttribute("min", 8);
  }
}

function changeVictoryLine() {
  if (document.getElementById("players__quantity").value == 2 &&
      document.getElementById("victory__line").value > 3) {
    changePlayersQuantityText();
  }
  if (document.getElementById("victory__line").value == 3) {
    document.getElementById("victory__line__text").innerHTML = "(классика)";
    document.getElementById("destruction__timer").setAttribute("min", 3);
    changePlayersQuantityText();
  }
  if (document.getElementById("victory__line").value == 4) {
    document.getElementById("victory__line__text").innerHTML = "(сложно, но можно)";
    document.getElementById("destruction__timer").setAttribute("min", 4);
  }
  if (document.getElementById("victory__line").value == 5) {
    document.getElementById("victory__line__text").innerHTML = "(запаситесь терпением)";
    document.getElementById("destruction__timer").setAttribute("min", 5);
  }
  if (document.getElementById("victory__line").value == 6) {
    document.getElementById("victory__line__text").innerHTML = "(вы в это верите?)";
    document.getElementById("destruction__timer").setAttribute("min", 6);
  }
  startGame();
}

function changeDestructionTimerText() {
  if (document.getElementById("destruction__timer").value < 5) {
    document.getElementById("rounds").innerHTML = "раунда";
  }
  if (document.getElementById("destruction__timer").value >= 5) {
    document.getElementById("rounds").innerHTML = "раундов";
  }
  if (document.getElementById("players__quantity").value == 2 &&
      document.getElementById("destruction__timer").value >= 3) {
    changePlayersQuantityText();
  }
  if (document.getElementById("destruction__timer").value == 3) {
    document.getElementById("destruction__timer__text").innerHTML = "(суетливо)";
  }
  if (document.getElementById("destruction__timer").value == 4) {
    document.getElementById("destruction__timer__text").innerHTML = "(потребуется внимательность)";
  }
  if (document.getElementById("destruction__timer").value == 5) {
    document.getElementById("destruction__timer__text").innerHTML = "(как бы всё упомнить...)";
  }
  if (document.getElementById("destruction__timer").value == 6) {
    document.getElementById("destruction__timer__text").innerHTML = "(ноотропы в помощь!)";
  }
  if (document.getElementById("destruction__timer").value == 7) {
    document.getElementById("destruction__timer__text").innerHTML = "(есть разряд по шахматам?)";
  }
  if (document.getElementById("destruction__timer").value == 8) {
    document.getElementById("destruction__timer__text").innerHTML = "(а смысл есть?)";
  }
  startGame();
}

function changeRowCountdownText() {
  if (document.getElementById("row__countdown").value < 5) {
    document.getElementById("moves").innerHTML = "хода";
  }
  if (document.getElementById("row__countdown").value >= 5) {
    document.getElementById("moves").innerHTML = "ходов";
  }
  if ((document.getElementById("row__countdown").value) >
      (Number(document.getElementById("players__quantity").value)) + 6) {
    document.getElementById("row__countdown__text").innerHTML = "(незанятые строки и ряды будут исчезать с большой задержкой)";
  }
  if ((document.getElementById("row__countdown").value) <= 
      (Number(document.getElementById("players__quantity").value)) + 6) {
    document.getElementById("row__countdown__text").innerHTML = "(незанятые строки и ряды будут исчезать с задержкой)";
  }
  if ((document.getElementById("row__countdown").value) <=
     (Number(document.getElementById("players__quantity").value)) + 3) {
    document.getElementById("row__countdown__text").innerHTML = "(незанятые строки и ряды будут исчезать с небольшой задержкой)";
  }
  if (document.getElementById("row__countdown").value <=
      (Number(document.getElementById("players__quantity").value)) + 1) {
    document.getElementById("row__countdown__text").innerHTML = "(незанятые строки и ряды будут быстро исчезать)";
  }
}

function resetDestructionTimer() {
  document.getElementById("destruction__timer").value = "";
  document.getElementById("destruction__timer__text").innerHTML = "(скучно, зато легко)";
  changePlayersQuantityText();
}

function rowDestructionCountdown() {
  document.getElementById("row__countdown").value = "";
  document.getElementById("row__countdown__text").innerHTML = "(поле будет беспрепятственно расширяться (можно изменить в любой момент))";
}

function setPlayersQuantity() {
  scoreList = [];
  playersParent.innerHTML = "";
  var j, temp;
  for (var i = symbols.length - 1; i > 0; i--) {
  	j = Math.floor(Math.random() * (i + 1));
  	temp = symbols[j];
  	symbols[j] = symbols[i];
  	symbols[i] = temp;
  }
  players = symbols.slice(0, document.getElementById("players__quantity").value);
  for (let i = 0; i < players.length; i++) {
    scoreList.push(0);
    var div = document.createElement("div");
    div.className = "player__field";
    div.innerHTML = `Игрок №${i + 1} | ${players[i]}`;
    document.getElementById("players__list").appendChild(div);
  }
  changePlayersQuantityText();
}
setPlayersQuantity();

function setLeader() {
  let equality = true;
  for (let i = 0; i < scoreList.length; i++) {
    if (scoreList[i] !== scoreList[0]) {
      equality = false;  
    }
  }
  if (equality == false) {
    let x = scoreList.indexOf(Math.max(...scoreList));  
    scoreParent.children[x].classList.add("leading__player");
  }
}

function setScore() {
  document.querySelector("#score__list").innerHTML = "";
  for (let i = 0; i < players.length; i++) {
    var div = document.createElement("div");
    div.className = "player__field";
    div.innerHTML = `Игрок ${players[i]} : ${scoreList[i]}`;
    document.getElementById("score__list").appendChild(div);
  }
  setLeader();
}

function resetScore() {
  scoreList = [];
  for (let i = 0; i < players.length; i++) {
    scoreList.push(0);
  }
  startGame();
}

function increaseAndDecreaseBoard(x, y) {
  if ((document.getElementById("players__quantity").value == 2 && document.getElementById("victory__line").value == 3) && moveCounter < 10) {
    return;
  } else {
    if (clearTopRow !== 0) {
      clearTopRow++;
    }
    if (clearTopRow - 1 == document.getElementById("row__countdown").value) {
      let emptyCellCount = 0;
      for (i = 0; i < board[0].length; i++) {
        if (board[0][i] == '') {
          emptyCellCount++;
        }
      }
      if (emptyCellCount == board[0].length) {
        for (i = 0; i < exterminationList.length; i++) {
          exterminationList[i][0]--;
        }
        board.shift();
        clearTopRow = 0;
        x--;
      }
    }
    if (clearTopRow == 0) {
      let emptyCellCount = 0;
      for (i = 0; i < board[0].length; i++) {
        if (board[0][i] == '') {
          emptyCellCount++;
        }
      }
      if (emptyCellCount == board[0].length) {
        clearTopRow = 1;
      }
      if (board.length <= 4) {
        clearTopRow = 0;
      }
    }
    if (clearRightCol !== 0) {
      clearRightCol++;
    }
    if (clearRightCol - 1 == document.getElementById("row__countdown").value) {
      let emptyCellCount = 0;
      if (board[0].length == 3) {
        return;
      }
      for (i = 0; i < board.length; i++) {
        if (board[i][board[0].length - 1] == '') {
          emptyCellCount++;
        }
      }    
      if (emptyCellCount == board.length) {
        for (i = 0; i < board.length; i++) {
          board[i].pop('');
        }
        clearRightCol = 0;
      }
    }
    if (clearRightCol == 0) {
      let emptyCellCount = 0;
      for (i = 0; i < board.length; i++) {
        if (board[i][board[0].length - 1] == '') {
          emptyCellCount++;
        }
      }
      if (emptyCellCount == board.length) {
        clearRightCol = 1;
      }
      if (board[0].length <= 4) {
        clearRightCol = 0;
      }
    }
    if (clearBottomRow !== 0) {
      clearBottomRow++;
    }
    if (clearBottomRow - 1 == document.getElementById("row__countdown").value) {
      let emptyCellCount = 0;
      for (i = 0; i < board[0].length; i++) {
        if (board[board.length - 1][i] == '') {
          emptyCellCount++;
        }
      }    
      if (emptyCellCount == board[0].length) {
        board.pop();
        clearBottomRow = 0;
      }
    }
    if (clearBottomRow == 0) {
      let emptyCellCount = 0;
      for (i = 0; i < board[0].length; i++) {
        if (board[board.length - 1][i] == '') {
          emptyCellCount++;
        }
      }
      if (emptyCellCount == board[0].length) {
        clearBottomRow = 1;
      }
      if (board.length <= 4) {
        clearBottomRow = 0;
      }
    }
    if (clearLeftCol !== 0) {
      clearLeftCol++;
    }
    if (clearLeftCol - 1 == document.getElementById("row__countdown").value) {
      let emptyCellCount = 0;
      for (i = 0; i < board.length; i++) {
        if (board[i][0] == '') {
          emptyCellCount++;
        }
      }    
      if (emptyCellCount == board.length) {
        for (i = 0; i < board.length; i++) {
          board[i].shift('');
        }
        for (i = 0; i < exterminationList.length; i++) {
          exterminationList[i][1]--;
        }
        clearLeftCol = 0;
        y--;
      }
    }
    if (clearLeftCol == 0) {
      let emptyCellCount = 0;
      for (i = 0; i < board.length; i++) {
        if (board[i][0] == '') {
          emptyCellCount++;
        }
      }
      if (emptyCellCount == board.length) {
        clearLeftCol = 1;
      }
      if (board[0].length <= 4) {
        clearLeftCol = 0;
      }
    }
    let newRow = [];
    if (x == 0) {
      for (i = 0; i < board[0].length; i++) {
        newRow.push('');
      }
      board.unshift(newRow);
      for (i = 0; i < exterminationList.length; i++) {
        exterminationList[i][0]++;
      }
      clearTopRow = 1;
    }
    if (y == board[0].length - 1) {
      for (i = 0; i < board.length; i++) {
        board[i].push('');
      }
      clearRightCol = 1;
    }
    if (x == board.length - 1) {
      for (i = 0; i < board[0].length; i++) {
        newRow.push('');
      }
      board.push(newRow);
      clearBottomRow = 1;
    }  
    if (y == 0) {
      for (i = 0; i < board.length; i++) {
        board[i].unshift('');
      }
      for (i = 0; i < exterminationList.length; i++) {
        exterminationList[i][1]++;
      }
      clearLeftCol = 1;
    }
  }
}

function victoryConditions() {
  for (let i = 0; i <= board.length - Number(document.getElementById("victory__line").value); i++) {
    for (let j = 0; j <= board[0].length - 1; j++) {
      let k = Number(document.getElementById("victory__line").value) - 1; // 2 3 4 5  | k
      let o = k - 1;                                                      // 1 2 3 4  | o
      let x = k - 2;                                                      // 0 2 2 3  | x
      let y = k;                                                          // 2 1 2 2  | y
      let z = o;                                                          // 1 1 1 1  | z
      if (Number(document.getElementById("victory__line").value) == 4) {
        x = o;
        y = x - 1;
        z = y;
      }
      if (Number(document.getElementById("victory__line").value) == 5) {
        y = x;
        z = x - 1;
      }
      if (Number(document.getElementById("victory__line").value) == 6) {
        y = x - 1;
        z = x - 2;
      }
      if ((((((board[i + k][j] == board[i + o][j + z]  && board[i + k][j] == board[i + x][j + y]) &&
               board[i + k][j] == board[i + y][j + x]) && board[i + k][j] == board[i + z][j + o]) &&
               board[i + k][j] == board[i]    [j + k]) && board[i + k][j] !== '')                 ||  // 🡽 
          (((((board[i + k][j] == board[i + o][j]      && board[i + k][j] == board[i + x][j]    ) &&
               board[i + k][j] == board[i + y][j]    ) && board[i + k][j] == board[i + z][j]    ) &&
               board[i + k][j] == board[i]    [j]    ) && board[i + k][j] !== '')                 ||  // 🡹
          (((((board[i]    [j] == board[i + z][j + z]  && board[i]    [j] == board[i + y][j + y]) &&
               board[i]    [j] == board[i + x][j + x]) && board[i]    [j] == board[i + o][j + o]) &&
               board[i]    [j] == board[i + k][j + k]) && board[i]    [j] !== '')                 ||  // 🡾
          (((((board[i]    [j] == board[i]    [j + z]  && board[i]    [j] == board[i]    [j + y]) &&
               board[i]    [j] == board[i]    [j + x]) && board[i]    [j] == board[i]    [j + o]) &&
               board[i]    [j] == board[i]    [j + k]) && board[i]    [j] !== '')                 ||  // 🡺 ( 🠉🠉🠉 )          
          (((((board[i + z][j] == board[i + z][j + z]  && board[i + z][j] == board[i + z][j + y]) &&
               board[i + z][j] == board[i + z][j + x]) && board[i + z][j] == board[i + z][j + o]) &&
               board[i + z][j] == board[i + z][j + k]) && board[i + z][j] !== '')                 ||  // 🡺 ( ✱✱✱ )
          (((((board[i + y][j] == board[i + y][j + z]  && board[i + y][j] == board[i + y][j + y]) &&
               board[i + y][j] == board[i + y][j + x]) && board[i + y][j] == board[i + y][j + o]) &&
               board[i + y][j] == board[i + y][j + k]) && board[i + y][j] !== '')                 ||  // 🡺 ( ✱✱✱ )
          (((((board[i + x][j] == board[i + x][j + z]  && board[i + x][j] == board[i + x][j + y]) &&
               board[i + x][j] == board[i + x][j + x]) && board[i + x][j] == board[i + x][j + o]) &&
               board[i + x][j] == board[i + x][j + k]) && board[i + x][j] !== '')                 ||  // 🡺 ( ✱✱✱ )
          (((((board[i + o][j] == board[i + o][j + z]  && board[i + o][j] == board[i + o][j + y]) &&
               board[i + o][j] == board[i + o][j + x]) && board[i + o][j] == board[i + o][j + o]) &&
               board[i + o][j] == board[i + o][j + k]) && board[i + o][j] !== '')                 ) { // 🡺 ( 🠋🠋🠋 )
        playing = false;
      }
    }
  }
  if (playing == false) {
    scoreList[activePlayer]++;
    setScore();
    showWinner(activePlayer);
  }
  if (document.querySelectorAll(".free").length == 0) {
    showDraw();
    playing = false;
  }
}

function nextPlayer() {
  if (playing == false) {
    return;
  }
  if (activePlayer < (players.length - 1)) {
    activePlayer++;
  } else {
    activePlayer = 0;
  }
  for (i = 0; i < players.length; i++) {
    playersParent.children[i].className = "player__field";
  }
  playersParent.children[activePlayer].classList.add("active__player");
}

function extermination() {
  let exterminationCounter = players.length * document.getElementById("destruction__timer").value;
  for (let i = 0; i < moveCounter; i++) {
    if ((moveCounter - (exterminationList[i][2] - 1)) == exterminationCounter) {
      board[exterminationList[i][0]][exterminationList[i][1]] = '';
      let idName = String(exterminationList[i][0]) + "|" + String(exterminationList[i][1]);
      document.getElementById(idName).classList.add("preExterminated");
    }
  }
}

function startGame() {
  exterminationList = [];
  activePlayer = 0;
  moveCounter = 0;
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  clearTopRow = 0;
  clearBottomRow = 0;
  clearRightCol = 0;
  clearLeftCol = 0;
  playing = true;
  for (i = 0; i < players.length; i++) {
    playersParent.children[i].className = "player__field";
  }
  playersParent.firstElementChild.classList.add("active__player");
  renderBoard(board);
  setScore();
}

function click(row, col) {
  moveCounter++;
  board[row][col] = players[activePlayer];
  let exterminationPoint = [Number(row), Number(col), moveCounter];
  exterminationList.push(exterminationPoint);
  increaseAndDecreaseBoard(row, col);
  renderBoard(board);
  extermination();
  victoryConditions();
  nextPlayer();
  setLeader();
}

function chagePlayersQuantity() {
  setPlayersQuantity();
  startGame();
}
