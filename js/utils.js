'use strict'
console.log('exutils')

// function setMinesNegsCount(cellI, cellJ) {
//   var negsMinesCount = 0
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
//     if (i < 0 || i >= gBoard.length) continue
//     for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//       if (j < 0 || j >= gBoard[i].length) continue
//       if (i === cellI && j === cellJ) continue
//       if (gBoard[i][j] === MINE) negsMinesCount++
//     }
//   }
//   var balls = document.querySelector('h2')
//   balls.innerText = `you have + ${negsMinesCount} +around you`
//   console.log(negsMinesCount)
//   return negsMinesCount
// }
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
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
  var elSpan = document.querySelector('.timer')
  elSpan.innerText = '0.00'
}

function chooseLvlSize(level, mines) {
  // resetTimer()
  gLevel.SIZE = level
  gLevel.MINES = mines
  onInit()
}
