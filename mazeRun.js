
const runnerSpeed = 8
const runnerTrail = [{ x: 11, y: 11 }]
const GRID_SIZE = 21
const EXPANSION_RATE = 2
const gameBoard = document.getElementById('gameboard')
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
let trailsegments = 0
let lastRenderTime = 0
let gameOver = false
let food = getRandomFoodPosition()
var myScore;

//game
function main(currentTime) {
    if (gameOver) {
      if (confirm('You lost. Press ok to restart.')) {
        window.history.go(-1); 
      }
      return
    }
  
  
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / runnerSpeed) return
  
  
    lastRenderTime = currentTime
  
    update()
    draw()
    myScore = new component("30px", "Consolas", "black", 280,40,"text");
  }
  
  window.requestAnimationFrame(main)
  
  function update() {
    updateRunner()
    updateFood()
    checkDeath()
  }
  
  function draw() {
    gameBoard.innerHTML = ''
    drawRunner(gameBoard)
    drawFood(gameBoard)
  }
  
  function checkDeath() {
    gameOver = outsideGrid(getRunnerTrail()) || trailIntersection()
  }
//grid
function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}
function outsideGrid(position) {
  return (
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE
  )
} 


//input

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}


  function updateRunner() {
  addSegments()

  const inputDirection = getInputDirection()
  for (let i = runnerTrail.length - 2; i >= 0; i--) {
    runnerTrail[i + 1] = { ...runnerTrail[i] }
  }

  runnerTrail[0].x += inputDirection.x
  runnerTrail[0].y += inputDirection.y
}
function drawRunner(gameBoard) {
  runnerTrail.forEach(segment => {
    const runnerElement = document.createElement('div')
    runnerElement.style.gridRowStart = segment.y
    runnerElement.style.gridColumnStart = segment.x
    runnerElement.classList.add('runner')
    gameBoard.appendChild(runnerElement)
  })
}

//food
function updateFood() {
  if (onRunner(food)) {
    expandTrail(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}

function drawFood(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onRunner(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}
//end food section
function expandTrail(amount) {
  trailsegments += amount
}

function onRunner(position, { ignoreHead = false } = {}) {
  return runnerTrail.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

function getRunnerTrail() {
  return runnerTrail[0]
}

function trailIntersection() {
  return onRunner(runnerTrail[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < trailsegments; i++) {
    runnerTrail.push({ ...runnerTrail[runnerTrail.length - 1] })
  }

  trailsegments = 0
}
