class Nubes{
    constructor(ctx, game){
        this.ctx = ctx;
        this.game = game;
        this.gradient = null;
        this.imageNubes = new Image()
        this.imageNubes.src = '../img/nubes-3.png'
        this.imageMadrid = new Image()
        this.imageMadrid.src = '../img/Fondo-Madrid.png'
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.x = 0;
        this.y = 0;
        this.isReady = false;

        this.createGradient();
    }

    draw(){

        this.ctx.fillStyle = this.gradient;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.ctx.drawImage(
                this.imageMadrid,
                0,
                0,
                this.width,
                this.height
            )
            this.ctx.drawImage(
                this.imageNubes,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.ctx.drawImage(
                this.imageNubes,
                 this.x + this.width,
                this.y,
                this.width,
                this.height
            );
        
    }

    move() {
        this.x -= 0.3;
    
        if (this.x < -this.width) {
          this.x = 0;
        }
      }

      createGradient() {
        const gradientColor = this.calculateGradientColor();
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.ctx.canvas.height);
        this.gradient.addColorStop(0, 'rgb(119, 136, 153');
        this.gradient.addColorStop(1, 'rgb(135, 206, 255)');
      }

      calculateGradientColor() {
        const maxScore = 3;
        const blueIncrement = 5;
        const blueValue = Math.round((this.score / blueIncrement) * 255);
        return `rgb(0, 0, ${blueValue})`;
      }

     /* updateScore(score) {
        this.score = score;
        this.createGradient();
      }*/
      
}