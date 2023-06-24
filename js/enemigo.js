class Enemigo {
    constructor(ctx, game, randomMove, speed) {
        this.ctx = ctx;
        this.game = game;
        this.x = this.ctx.canvas.width / 2;
        this.y = 50;
        this.width = 35;
        this.height = 54.8916;
        this.xFrame = 0;
        this.yFrame = 0;
        this.xFramesCount = 2;
        this.yFramesCount = 3;
        this.image = new Image();
        this.image.src = './img/enemigo.png';
        this.isReady = false;
        this.image.onload = () => {
            this.isReady = true;
        }

        this.speedX = speed;
        this.randomMove = randomMove;

    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.image,
                this.xFrame * this.image.width / this.xFramesCount,
                this.yFrame * this.image.height / this.yFramesCount,
                this.image.width / this.xFramesCount,
                this.image.height / this.yFramesCount,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    move() {

        if(this.randomMove){
            const randomMove = Math.random();
            //console.log(randomMove)
            if (randomMove <= 0.02){
                this.speedX*=-1
            }
        }

        this.x += this.speedX

       

        if(this.speedX >0){
            this.yFrame = 2;
        }else if (this.speedX < 0){ 
            this.yFrame = 1;
        }else {
            this.yFrame = 0;
        }
            
            
        if (this.game.counter % 10 === 0) {
            this.xFrame++;
            if (this.xFrame >= this.xFramesCount) {
                this.xFrame = 0;
            }}


        if (this.x <= 220) {
            this.speedX = Math.abs(this.speedX)
    
           
            }
            if (this.x + this.width >= 940) {
                this.speedX = -Math.abs(this.speedX);

            }
        }
    }