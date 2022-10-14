const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const body = document.body;
let snakeSize = 50
let canvasWidth = 50 * 20
let canvasHeight = 50 * 15

canvas.style.backgroundColor = '#323437'
canvas.width = canvasWidth
canvas.height = canvasHeight

class Snake {
    constructor(x,y,width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
