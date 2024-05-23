'use strict'
console.log('utils')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getClassName(location) {
  return `cell-${location.i}-${location.j}`
}

function startTimer() {
  gStartTime = Date.now()

  gTimerInterval = setInterval(() => {
    var seconds = ((Date.now() - gStartTime) / 1000).toFixed(2)
    var elSpan = document.querySelector('.timer')
    elSpan.innerText = seconds
  }, 10)
}

function resetTimer() {
  clearInterval(gTimerInterval)
  gStartTime = null
  var elSpan = document.querySelector('.timer')
  elSpan.innerText = '0.00'
}

function chooseLvlSize(level, mines) {
  gLevel.SIZE = level
  gLevel.MINES = mines
  resetGame()
}

function resetGame() {
  gLife = 3
  var lifeElement = document.querySelector('.lifeBoard span')
  if (lifeElement) {
    lifeElement.innerText = `${gLife}`
  }
  gFirstClicked = true
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
  }
  resetTimer()
  gBoard = buildBoard(gLevel.SIZE)
  renderBoard(gBoard)
  var scoreElement = document.querySelector('.score')
  if (scoreElement) {
    scoreElement.innerText = ''
  }
  var restartBtnElement = document.querySelector('.restart-btn')
  if (restartBtnElement) {
    restartBtnElement.innerText = '😀'
  }
}

function victory() {
  clearInterval(gTimerInterval)
  document.querySelector('.score').innerText = `Victory!`
  document.querySelector('.restart-btn').innerText = `😎`
}

function onToggleMode() {
  var toggleBtn = document.querySelector('.darkMode')
  var footer = document.querySelector('.footer')
  var changeBodyColor = document.querySelector('body')
  isDarkMode = !isDarkMode

  if (isDarkMode) {
    changeBodyColor.style.backgroundColor = 'gray'
    toggleBtn.style.backgroundColor = 'black'
    footer.style.backgroundColor = 'black'
    footer.style.color = 'white'
    toggleBtn.innerText = '☀️'
  } else {
    changeBodyColor.style.backgroundColor = 'lightblue'
    footer.style.backgroundColor = 'lightgreen'
    footer.style.color = 'black'
    toggleBtn.style.backgroundColor = 'white'
    toggleBtn.innerText = '🌙'
  }
}
