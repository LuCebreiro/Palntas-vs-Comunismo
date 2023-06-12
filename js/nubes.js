class Nubes{
    constructor(ctx){
        this.ctx = ctx;
        this.image = new Image()
        this.image.src = '../img/nubes-2.png'
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.x = 0;
        this.y = 0;
        this.isReady = false;
        this.image.onload = () => {
            this.isReady = true;
        }

    }

    draw(){
        if(this.isReady){
            this.ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.ctx.drawImage(
                this.image,
                 this.x + this.width,
                this.y,
                this.width,
                this.height
            );
        }
    }

    move() {
        this.x -= 0.3;
    
        if (this.x < -this.width) {
          this.x = 0;
        }
      }
}