const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const columns = 20
const rows = 15
const blockSize = 25
let count = 0

canvas.width = columns * 25
canvas.height = rows * 25
canvas.style.backgroundColor = '#323437'

let appleX = Math.floor(Math.random() * columns) * blockSize
let appleY = Math.floor(Math.random() * rows) * blockSize
let appleColor = 'orangered'


class Snake{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.tail = {
            x: this.x,
            y: this.y
        }
        this.rotateX = 0;
        this.rotateY = 0;
        this.snakeColor = 'white'
        this.appleColor = 'orangered'
    }
    move() {
        if(this.rotateX == 1) {
                this.tail.x = this.tail.x + blockSize
                this.tail.y = this.tail.y
        } else if(this.rotateX == -1) {
                this.tail.x = this.tail.x - blockSize
                this.tail.y = this.tail.y
        } else if(this.rotateY == 1) {
                this.tail.x = this.tail.x 
                this.tail.y = this.tail.y + blockSize
        } else if(this.rotateY == -1) {
                this.tail.x = this.tail.x
                this.tail.y = this.tail.y - blockSize
        }
    }
}

function createRect(x, y, color) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, blockSize, blockSize)
}
function deleteRect(x, y, width, height) {
        ctx.clearRect(x, y, width, height)
}

function changeApple() {
  if(snake.tail.x  == appleX && snake.tail.y == appleY) {
    appleX = Math.floor(Math.random() * columns) * blockSize
    appleY = Math.floor(Math.random() * rows) * blockSize
    count++
  }
}

function checkHitWall() {
  if(snake.tail.x > canvas.width || snake.tail.y > canvas.height || snake.tail.x < 0 || snake.tail.y < 0){

  //to reset the game
    snake.tail.x = blockSize
    snake.tail.y = blockSize
    snake.rotateX = 0
    snake.rotateY = 0
    appleX = Math.floor(Math.random() * columns) * blockSize
    appleY = Math.floor(Math.random() * rows) * blockSize
    count = 0
  }
}

const snake = new Snake(blockSize, blockSize)
const fps = 10

function draw() {
  //to clear the canvas 
    deleteRect(0, 0, canvas.width, canvas.height)
  //to create apple
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${count}`,  16.5 * blockSize, 20)
    createRect(appleX,appleY, appleColor)
  //to create snake 
    createRect(snake.tail.x, snake.tail.y, snake.snakeColor)

    show()
}

function show() {
  snake.move()
  changeApple()
  checkHitWall()
}

window.onload = _ => {
    setInterval(draw, 1000 / fps)
}
window.addEventListener('keydown', e => {
  let key = e.key

  if(key === "ArrowUp" && snake.rotateY != 1){
    snake.rotateY = -1
    snake.rotateX = 0
  }else if(key === "ArrowDown" && snake.rotateY != -1){
    snake.rotateY = 1
    snake.rotateX = 0
  }else if( key === "ArrowLeft" && snake.rotateX != 1) {
    snake.rotateX = -1
    snake.rotateY = 0 
  }else if(key === "ArrowRight" && snake.rotateX != -1) {
    snake.rotateX = 1
    snake.rotateY = 0
  }
})
