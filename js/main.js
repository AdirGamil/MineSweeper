'use strict'
console.log('Sprint')

const MINE = '💣'
const EMPTY = ' '
const FLAG = '🚩'

var gBoard
var gLevel
var gSize
var gGame
var gLife = 3
var gStartTime = false
var isTimerStarted
var gTimerInterval

var gLevel = {
  SIZE: 4,
  MINES: 3,
}
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

function onInit() {
  console.log('Game init')
  

  gBoard = buildBoard(gLevel.SIZE)
  createMinesOnBoard(gBoard, gLevel.MINES)
  setMinesNegsCount(gBoard)
  renderBoard(gBoard)
}

function buildBoard(size) {
  var board = []
  //board 4*4
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  // board[1][1].isMine = true
  // board[2][1].isMine = true
  return board
}

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      var cellClass = getClassName({ i: i, j: j })

      var cellContent = EMPTY
      if (currCell.isShown) {
        if (currCell.isMine) {
          cellContent = MINE
          cellClass += ' mine'
        } else {
          cellContent = currCell.minesAroundCount || EMPTY
          cellClass += ` mines-${currCell.minesAroundCount}`
        }
      }

      strHTML += `<td class="cell ${cellClass}" 
      onclick="onCellClicked(this,${i},${j})">${cellContent}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (!board[i][j].isMine) {
        board[i][j].minesAroundCount = getMineNegsCount(i, j)
      }
    }
  }
}

function getMineNegsCount(cellI, cellJ) {
  var negsMinesCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue
      if (i === cellI && j === cellJ) continue
      if (gBoard[i][j].isMine) negsMinesCount++
    }
  }
  return negsMinesCount
}

function onCellClicked(elCell, i, j) {
  var cell = gBoard[i][j]
  if (cell.isShown) return

  if (!isTimerStarted) {
    startTimer()
  }

  cell.isShown = true
  if (cell.isMine) {
    console.log('Bommmmm!')
    gLife--
    lifeDown()
  } else {
    // elCell.classList.add('empty')
    gGame.shownCount++
    var score = gGame.shownCount++
    // console.log('score:',score);
    document.querySelector('.score span').innerText = `${score}`
  }
  if (!gLife) {
    lifeDown()
  }
  renderBoard(gBoard)
}

function lifeDown() {
  var life = document.querySelector('.lifeBoard span')
  life.innerText = `${gLife}`
  if (gLife === 0) {
    clearInterval(gTimerInterval)
    document.querySelector('.score').innerText = `Game Over !`
    document.querySelector('.restart-btn').innerText = `🤯`
  }
}

function createMinesOnBoard(board, mines) {
  var minesOnBoard = 0
  while (minesOnBoard < mines) {
    var i = getRandomInt(0, gLevel.SIZE - 1)
    var j = getRandomInt(0, gLevel.SIZE - 1)
    if (!board[i][j].isMine) {
      board[i][j].isMine = true
      minesOnBoard++
    } else {
      console.log(`mine on board ${i},${j}`)
    }
  }
}


// function restartGame() {
//   gLevel = {
//     SIZE: 4,
//     MINES: 3,
//   }
//   gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0,
//     secsPassed: 0,
//   }
//   gLife = 3
//   clearInterval(gTimerInterval)
// }


// #####################TODO####################################################
//  1. First click is never a Mine
// The first clicked cell is never a mine
// HINT: We need to start with an empty matrix (no mines) and
// then place the mines and count the neighbors only on first
// click

// 2. Sunglasses – WIN 

// 3. put flag in right click.

// 4. fix the restart game, reset the all modal