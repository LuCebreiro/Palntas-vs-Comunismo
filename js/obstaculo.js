class Obstaculo {
  constructor(ctx, x, xFrame) {
    this.ctx = ctx;
    this.x = x;
    this.y = 70;
    this.width = 30;
    this.height = 30;
    this.xFrame = xFrame;
    this.yFrame = 0;
    this.xFramesCount = 5;
    this.yFramesCount = 1;
    this.image = new Image();
    this.image.src = './img/obstaculos.png';
    this.isReady = false;
    this.image.onload = () => {
      this.isReady = true;
    }
    this.gravity = 0.1;
    this.speed = 0;

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
  };

  move() {
    this.speed += this.gravity
    this.y += this.speed;
  }



}

