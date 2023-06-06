class Plataforma {
    constructor(ctx, x, y, large){
       this.ctx = ctx,
       this.x = x;
        this.y = y;
        this.width = 176;
        this.image = new Image();
        this.image.src = '../img/plataforma.png';
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
            this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.stroke();
        }
    }
}