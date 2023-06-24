class Plataforma {
    constructor(ctx, x, y, width){
       this.ctx = ctx,
       this.x = x;
        this.y = y;
        this.width = width;
        this.image = new Image();
        this.image.src = './img/plataforma.png';
        this.isReady = false;
        this.image.onload = () => {
            this.height = this.width * this.image.height / this.image.width;
            this.isReady = true;
        } 
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

        }
    }

    collidesWith(element) {
        const isColliding = this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;

        return isColliding;
}}