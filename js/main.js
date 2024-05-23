'use strict'
console.log('Sprint')

const MINE = '💣'
const EMPTY = ' '
const FLAG = '🚩'

var gBoard
var gLevel
var gGame
var gLife = 3
var gStartTime
var gTimerInterval
var isDarkMode = false
var gFirstClicked = true

var gLevel = {
  SIZE: 4,
  MINES: 2,
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
    createMinesOnBoard(gBoard, gLevel.MINES, i, j)
    setMinesNegsCount(gBoard)
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
    if (!cell.minesAroundCount) {
      expandShown(gBoard, i, j)
    }
    checkVictory()
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
  var allCellsShown = true
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j]
      if (cell.isMine && cell.isMarked) currFlags++
      if (!cell.isMine && !cell.isShown) {
        allCellsShown = false
      }
    }
  }

  if (
    (currFlags === gLevel.MINES && gGame.markedCount === gLevel.MINES) ||
    allCellsShown
  ) {
    victory()
  }
}
