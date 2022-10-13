class Apple{
    constructor() {
        //this.appleX;
        //this.appleY;
    this.hi;
    }
    apple = (width, height, ctx, ctxW,ctxH) => {
        let x = Math.floor(Math.random() * (ctxW - 45));
        let y = Math.floor(Math.random() * (ctxH - 45));
        this.appleX = x;
        this.appleY = y;
        ctx.fillStyle = 'orangered'
        ctx.fillRect(x, y, width, height)
        console.log('x',x,'y',y,width,height)
    }
}
class Snake extends Apple{
    constructor(x, y, width, height,ctx, ctxW, ctxH ) {
        //for Apple
        super();
        //snake
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 10;
        //canvas or ctx
        this.ctx = ctx;
        this.ctxW = ctxW;
        this.ctxH = ctxH;
        this.interval;
        this.movement =  {
            x_axis: this.x,
            y_axis: this.y,
         };
        this.beforeX = this.movement.x_axis;
        this.beforeY = this.movement.y_axis;
        this.rect = (color) => {
            this.apple(this.width, this.height, this.ctx,this.ctxW,this.ctxH)
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }

    }
    move = e => {
        let key = e.keyCode
        let afterX;
        let afterY;
        if(key == 'w') { // upward
            clearInterval(this.interval)
      this.interval =   setInterval( _ => {
                afterX = this.beforeX;
                afterY = this.beforeY - this.speed;
             this.dir(this.beforeX, this.beforeY, afterX, afterY) 
             this.beforeX = afterX
             this.beforeY = afterY
            if((afterX == this.appleX) || afterY == this.appleY) {
                this.apple();
                console.log('hi')
            }
// problem in moivng both s and w interval are appearing
         }, 1000/this.speed )
        } else if(key == 's') { // downward
            clearInterval(this.interval)
           this.interval = setInterval( _ => {
                afterX = this.beforeX;
                afterY = this.beforeY + this.speed;
                this.dir(this.beforeX, this.beforeY, afterX, afterY)
                this.beforeX = afterX;
                this.beforeY = afterY;
            }, 1000/ this.speed)
            if((afterX == this.appleX) || afterY == this.appleY) {
                this.apple();
                console.log('hi')
            }
        } else if(key == 'a') { // leftwards
            clearInterval(this.interval)
            this.interval = setInterval( _ => {
                afterX = this.beforeX - this.speed;
                afterY = this.beforeY;
                this.dir(this.beforeX, this.beforeY, afterX, afterY)
                this.beforeX = afterX;
                this.beforeY = afterY;
            }, 1000/this.speed )
            if((afterX == this.appleX) || afterY == this.appleY) {
                this.apple();
                console.log('hi')
            }
        } else if(key == 'd') {
            clearInterval(this.interval)
            this.interval = setInterval( _ => {
                afterX = this.beforeX + this.speed;
                afterY = this.beforeY;
                this.dir(this.beforeX, this.beforeY, afterX, afterY)
                this.beforeX =afterX;
                this.beforeY = afterY;
                //console.log('snakex ', afterX, 'snakeY', afterY)
            }, 1000/this.speed)
            if((afterX == this.appleX) || afterY == this.appleY) {
                this.apple();
                console.log('hi')
            }
        }
    }
    dir = (beforeX, beforeY, afterX, afterY) => {
        //to clear previous
        this.ctx.clearRect(beforeX, beforeY, this.width, this.height)
        //to create
        this.ctx.fillRect(afterX, afterY, this.width, this.height)

    }

}
const body = document.querySelector('body')
const canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#000'
canvas.width = 500  //canvas width
canvas.height = 400 //canvas heigth
const ctx = canvas.getContext('2d')
let x = 10; // x axis
let y = 10; // y axis
let w = 25; // snake width 
let h = 25; // snake height 
const s = new Snake(x , y, w, h,ctx, canvas.width, canvas.height);
window.onload = _ => s.rect('limegreen')

body.addEventListener('keypress', e =>s.move(e))
