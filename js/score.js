class Score {
  constructor(ctx, imageSrc, frames, game) {
    this.ctx = ctx;
    this.game = game;
    this.x = 30;
    this.y = 30;
    this.yFrame = 0;
    this.frames = frames;
    this.width = 100;
    this.height = 40;
    this.image = new Image();
    this.image.src = imageSrc;
    this.isReady = false;

    this.image.onload = () => {
      this.isReady = true;
    };

    this.points = 0;
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(
        this.image,
        0,
        this.yFrame * this.image.height / this.frames,
        this.image.width,
        this.image.height / this.frames,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  move() {
    if (this.points === 1) {
      this.yFrame = 1
    } /*if (this.points === 2) {
      this.yFrame = 2
    }*/
  }
}