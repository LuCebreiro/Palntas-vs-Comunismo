class ScoreBlock {
    constructor(ctx, x, y, score) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.score = score;
        this.scored = 0;
        this.width = 12;
        this.height = 30;
        this.isReady = false;

        this.imgStartRed = new Image()
        this.imgStartRed.src = './img/inicio-rojo.png'

        this.imgStartGreen = new Image()
        this.imgStartGreen.src = './img/inicio-verde.png'

        this.imgCenterRed = new Image()
        this.imgCenterRed.src = './img/centro-rojo.png';

        this.imgCenterGreen = new Image() 
        this.imgCenterGreen.src = './img/centro-verde.png';

        this.imgEndRed = new Image();
        this.imgEndRed.src = './img/fin-rojo.png';
        
        this.imgEndGreen = new Image();
        this.imgEndGreen.src = './img/fin-verde.png';

    }

    draw() {
            const pointsArr =  new Array(this.score);

            pointsArr.fill('').forEach((block, index) => {
                let image;
                if (index === 0) {
                    image = index + 1 <= this.scored ? this.imgStartGreen : this.imgStartRed;
                } else if (index === pointsArr.length - 1) {
                    image = this.scored >= this.score ? this.imgEndGreen : this.imgEndRed;
                } else {
                    image = index + 1 <= this.scored ? this.imgCenterGreen : this.imgCenterRed;
                }
           
                    this.ctx.drawImage(
                        image,
                        this.x + (this.width * index),
                        this.y,
                        this.width,
                        this.height
                    );
                
            })
           
       
    }

}