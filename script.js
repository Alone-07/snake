const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const body = document.body
let snakeSize = 50
let column = 15
let row = 10
let canvasWidth = snakeSize * column
let canvasHeight = snakeSize * row

canvas.style.backgroundColor = '#323437'
canvas.width = canvasWidth
canvas.height = canvasHeight

class Snake {
    constructor(x,y,width, height, ctx){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.tail =  {
            width: this.width,
            height: this.height
        }
        this.interval = 'nothing'
        this.speed = 5
        this.ctx = ctx
        this.snakeColor = 'white'
        this.appleColor = 'orangered'
        this.score = 0
        this.rotateX = 1
        this.rotateY = 1
        this.moved  = {
            x_axis : this.x,
            y_axis : this.y
        }
    }
    //to creat rectangle
    rect = (x, y, color, width, height) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x,y,width,height)
    }
    cRect = (preX, preY, preWidth,preHeight) => {
        this.ctx.clearRect(preX,preY,preWidth,preHeight)
    }
    // initial function 
    draw = _ => {
        this.rect(this.x, this.y, this.snakeColor,this.width, this.height)
    }
   move = e => {
        //here width and height are from snakeSize, Hence both are equal

        if(e.key == 'ArrowUp') {
            clearInterval(this.interval) // to clear previous interval

            this.interval = setInterval( _ => {
                this.cRect(this.moved.x_axis, this.moved.y_axis,this.tail.width, this.tail.height)
                this.moved.y_axis -= this.width;
                if(this.moved.x_axis == this.appleX && this.moved.y_axis ==this.appleY) {

                    this.apple()
                }
                this.rect(this.moved.x_axis, this.moved.y_axis, this.snakeColor, this.tail.width, this.tail.height)
                // for apple
                this.rect(this.appleX, this.appleY, this.appleColor, this.width, this.height)
            }, 1000/this.speed )
        }   
        else if(e.key == 'ArrowDown') {
            clearInterval(this.interval) // to clear previous interval

            this.interval = setInterval( _ => {
                this.cRect(this.moved.x_axis, this.moved.y_axis,this.tail.width, this.tail.height)
                this.moved.y_axis += this.width;
                if(this.moved.x_axis == this.appleX && this.moved.y_axis ==this.appleY) {

                    this.apple()
                }
                this.rect(this.moved.x_axis, this.moved.y_axis, this.snakeColor, this.tail.width, this.tail.height)
                    // for apple
                this.rect(this.appleX, this.appleY, this.appleColor, this.width, this.height)
            }, 1000/this.speed )
        }  
        else if(e.key == 'ArrowLeft') {
            clearInterval(this.interval)

            this.interval = setInterval( _ => {
                this.cRect(this.moved.x_axis, this.moved.y_axis,this.tail.width, this.tail.height)
                this.moved.x_axis -= this.width;
                 if(this.moved.x_axis == this.appleX && this.moved.y_axis ==this.appleY) {

                    this.apple()
                }
                this.rect(this.moved.x_axis, this.moved.y_axis, this.snakeColor, this.tail.width, this.tail.height)
                // for apple
                this.rect(this.appleX, this.appleY, this.appleColor, this.width, this.height)
            }, 1000/this.speed )
        }   
        else if(e.key == 'ArrowRight') {
            clearInterval(this.interval)

            this.interval = setInterval( _ => {
                this.cRect(this.moved.x_axis, this.moved.y_axis,this.tail.width, this.tail.height)
                this.moved.x_axis += this.width;
                  if(this.moved.x_axis == this.appleX && this.moved.y_axis ==this.appleY) {
                    this.apple()
                }
               this.rect(this.moved.x_axis, this.moved.y_axis, this.snakeColor, this.tail.width, this.tail.height)
                // for apple
                this.rect(this.appleX, this.appleY, this.appleColor, this.width, this.height)
            }, 1000/this.speed )
        }

    }

    apple = _ => {
        this.appleX = Math.floor(Math.random() * column) * this.width;
        this.appleY = Math.floor(Math.random() * row) * this.height;

        console.log('apple x', this.appleX, 'apple y', this.appleY)
        this.rect(this.appleX, this.appleY, this.appleColor, this.width, this.height)
    }
}
let x= 5 * snakeSize;
let y= 5 * snakeSize;
const snake = new Snake(x, y, snakeSize / 2, snakeSize / 2, ctx)
const scoreBoard = document.querySelector('.scoreBoard')

window.onload = _ => {
    snake.draw()
    snake.apple()
}
body.addEventListener('keydown', snake.move)

