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
var gStartTime
var gTimerInterval
var isDarkMode = false
var gFirstClicked = true

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
  resetTimer()

  gBoard = buildBoard(gLevel.SIZE)
  createMinesOnBoard(gBoard, gLevel.MINES)
  setMinesNegsCount(gBoard)
  renderBoard(gBoard)
}

function buildBoard(size) {
  var board = []
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
  // board[3][1].isMine = true
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
          cellClass += ` mines-${currCell.minesAroundCount} cell-shown`
        }
      } else if (currCell.isMarked) {
        cellContent = FLAG
      }

      strHTML += `<td class="cell ${cellClass}" 
      onclick="onCellClicked(this,${i},${j})"oncontextmenu="onCellMarked(this, ${i}, ${j})">${cellContent}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
  if (gLife === 0) return

  if (gFirstClicked) {
    startTimer()
    gGame.isOn = true
    gFirstClicked = false
  }
  var cell = gBoard[i][j]
  if (cell.isShown) return

  cell.isShown = true
  if (cell.isMine) {
    console.log('Bommmmm!')
    gLife--
    checkLose()
  } else {
    gGame.shownCount++
    // if (gGame.shownCount === 3) {
    //   gGame.isOn = false
    //   victory()
    // }
    console.log('gGame.shownCount:', gGame.shownCount)
  }
  if (!gLife) {
    checkLose()
  }
  renderBoard(gBoard)
}

function onCellMarked(elCell, i, j) {
  event.preventDefault()

  var cell = gBoard[i][j]
  if (cell.isShown) return

  if (!cell.isMarked) {
    cell.isMarked = true
    gGame.markedCount++
    console.log('gGame.markedCount:', gGame.markedCount)
  } else {
    cell.isMarked = false
    gGame.markedCount--
  }

  renderBoard(gBoard)
  checkVictory()
}

function checkLose() {
  var life = document.querySelector('.lifeBoard span')
  life.innerText = `${gLife}`
  if (gLife === 0) {
    clearInterval(gTimerInterval)
    document.querySelector('.score').innerText = `Game Over !`
    document.querySelector('.restart-btn').innerText = `🤯`
  }
}

function checkVictory() {
  var currFlags = 0
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j]
      if (cell.isMine && cell.isMarked) currFlags++
    }
  }
  if (currFlags === gLevel.MINES && gGame.markedCount === gLevel.MINES) {
    victory()
  }
}

// #####################TODO####################################################
//  1. First click is never a Mine
// The first clicked cell is never a mine
// HINT: We need to start with an empty matrix (no mines) and
// then place the mines and count the neighbors only on first
// click

// 2. fix when mine shown, cant win the game if the other cells showns
