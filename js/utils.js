'use strict'
console.log('exutils')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

function startTimer() {
  isTimerStarted = true
  gStartTime = Date.now()

  gTimerInterval = setInterval(() => {
    var seconds = ((Date.now() - gStartTime) / 1000).toFixed(2)
    var elSpan = document.querySelector('.timer')
    elSpan.innerText = seconds
  }, 10)
}

function resetTimer() {
  clearInterval(gTimerInterval)
  var elSpan = document.querySelector('.timer')
  elSpan.innerText = '0.00'
}

function chooseLvlSize(level, mines) {
  // resetTimer()
  gLevel.SIZE = level
  gLevel.MINES = mines
  onInit()
}
