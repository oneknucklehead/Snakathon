//const and variables
let inputDir = { x: 0, y: 0 }
let speed = 10
let lastPaintTime = 0
let snake = [{ x: 13, y: 15 }]
let food = { x: 5, y: 7 }
let score = 0

//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return
  lastPaintTime = ctime
  gameEngine()
}

function isCollide(snake) {
  //for bumping into ourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  if (
    snake[0].x >= 30 ||
    snake[0].x <= 0 ||
    snake[0].y >= 30 ||
    snake[0].y <= 0
  )
    return true
}

function gameEngine() {
  //updating the snake and foor array
  if (isCollide(snake)) {
    inputDir = { x: 0, y: 0 }
    alert('Game Over! press f5 to continue or refresh ')
    snake = [{ X: 13, y: 15 }]
    score = 0
  }

  //after colliding with the food, incrementing the score and regenerating the food
  if (snake[0].y === food.y && snake[0].x === food.x) {
    score += 1
    if (score > hiscoreval) {
      hiscoreval = score
      localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
      displayHiScore.innerText = hiscoreval
    }
    displayScore.innerText = score
    snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y })
    let a = 1
    let b = 29
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }
  }
  //moving the snake
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] }
  }
  snake[0].x += inputDir.x
  snake[0].y += inputDir.y

  //displaying the snake and food array
  //display the snake
  board.innerHTML = ''
  snake.forEach((e, index) => {
    snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x

    if (index === 0) {
      snakeElement.classList.add('head')
    } else if (index >= snake.length - 2) {
      snakeElement.classList.add('tail')
    } else {
      snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement)
  })

  //display the food
  foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  board.appendChild(foodElement)
}

//logic

let hiscore = localStorage.getItem('hiscore')
if (hiscore === null) {
  hiscoreval = 0
  localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
} else {
  hiscoreval = JSON.parse(hiscore)
  displayHiScore.innerText = hiscore
}

window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
  inputDir = { x: 0, y: 1 }
  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0
      inputDir.y = -1
      break
    case 'ArrowDown':
      inputDir.x = 0
      inputDir.y = 1
      break
    case 'ArrowLeft':
      inputDir.x = -1
      inputDir.y = 0
      break
    case 'ArrowRight':
      inputDir.x = 1
      inputDir.y = 0
      break
    default:
      break
  }
})
