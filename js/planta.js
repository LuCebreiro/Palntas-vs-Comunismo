class Planta {
    constructor(ctx, x, y, isTaken=false){
       this.ctx = ctx,
        this.x = x;
        this.y = y;
        this.width = 30;
        this.image = new Image();
        this.image.src = '../img/planta.png';
        this.isReady = false;
        this.image.onload = () => {
            this.height = this.width * this.image.height / this.image.width;
            this.isReady = true;
        } 
        this.isTaken = isTaken;
    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            
            );
            this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.stroke();
        }
    }

    collidesWith(element) {
        const isColliding = this.x < element.x + element.width &&
          this.x + this.width > element.x &&
          this.y < element.y + element.height &&
          this.y + this.height > element.y;
    
        return isColliding;
      }

    takedPlant() {
        this.isTaken = true;
    }
}