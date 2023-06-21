class Background {
    constructor(ctx, game, gradientPoint) {
        this.ctx = ctx;
        this.game = game;
        this.gradient = null;
        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.imageNubes = new Image()
        this.imageNubes.src = '../img/nubes-3.png'
        this.imageMadrid = new Image()
        this.imageMadrid.src = '../img/Fondo-Madrid.png'
        this.imageEdificio = new Image()
        this.imageEdificio.src = '../img/Fondo-Edificio-3.png'
        this.imagePlanta = new Image()
        this.imagePlanta.src = '../img/planta.png'
        this.isReady = false;
        this.imageNubes.onload = () => {
            this.isReady = true;
        }
        this.gradientPoint = 650;
       
       
    }

    draw() {
        this.createGradient();
            this.ctx.fillStyle = this.gradient;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.isReady) {
    this.ctx.drawImage(
        this.imageMadrid,
        0,
        0,
        this.width,
        this.height
    );
    this.ctx.drawImage(
        this.imageNubes,
        this.x,
        this.y,
        this.width,
        this.height
    );
    this.ctx.drawImage(
        this.imageNubes,
        this.x + this.width,
        this.y,
        this.width,
        this.height
    );

    this.ctx.drawImage(
        this.imageEdificio,
        0,
        0,
        this.width,
        this.height
    );
    this.ctx.drawImage(
        this.imagePlanta,
        20,
        18,
        30,
        45
    );
        }
    }
    move() {
        this.x -= 0.3;
    
        if (this.x < -this.width) {
            this.x = 0;
        }
    }
    
    createGradient() {
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.gradientPoint);
        this.gradient.addColorStop(0, 'rgb(119, 136, 153');
        this.gradient.addColorStop(1, 'rgb(135, 206, 255)');
    }
    
      
    }