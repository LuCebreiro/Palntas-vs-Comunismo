class Player {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.x = 550;
        this.y = 565;
        this.width = 25;
        this.xFrame = 0;
        this.yFrame = 0;
        this.xFramesCount = 3;
        this.yFramesCount = 4;
        this.image = new Image();
        this.image.src = '../img/player-sprite.png';
        this.isReady = false;
        this.image.onload = () => {
            this.height = this.image.height / this.width;
            this.isReady = true;
        }

        this.actions = {
            canClimb: false,
        }

        this.movements = {
            up: false,
            left: false,
            right: false,
            down: false,
            space: false
        }

        this.isHoldingPlant = false;
        this.spaceBarPressed = false;

        this.vx = 2;
        this.vy = 2;
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
            this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.stroke();
        }
    }

    move() {
        const isStop = Object.values(this.movements).every(value => value === false);
        if (this.movements.left) {
            this.yFrame = 1;
            this.x -= this.vx;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
        } else if (this.movements.right) {
            this.yFrame = 2;
            this.x += this.vx;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
        } else if (this.movements.up && this.actions.canClimb) {
            this.yFrame = 3;
            this.y -= this.vy;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
        } else if (this.movements.down && this.actions.canClimb) {
            this.yFrame = 3;
            this.y += this.vy;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
        } else if (isStop) {
            this.xFrame = 0;
            this.yFrame = 0;
        }

        if(this.x < 260 && this.y <= 418-this.height){
            this.x = 260
        }else if(this.x - this.width > 410 && this.y <= 418-this.height){
            this.x = 436
        }
        if(this.x < 690 && this.y <= 418-this.height){
            this.x = 720
        }else if(this.x - this.width > 900 && this.y <= 418-this.height){
            this.x = 900
        }




    /*if (!this.actions.canClimb && this.y >= this.ctx.canvas.height - this.height - 35) {
            this.y = this.ctx.canvas.height - this.height - 35;
            this.vy = 0;
        }*/
    }

    onKeyEvent(event) {

        const status = event.type === 'keydown';
        if (!event.repeat) {
            switch (event.keyCode) {
                case KEY_LEFT:
                    this.movements.left = status;
                    break;
                case KEY_RIGHT:
                    this.movements.right = status;
                    break;
                case KEY_UP:
                    this.movements.up = status;
                    break;
                case KEY_DOWN:
                    this.movements.down = status;
                    break;
                    case KEY_SPACE:
                        this.movements.space = status;
                        if (status) {
                            this.spaceBarPressed = true;
                        } else {
                            this.spaceBarPressed = false;
                        }
                        break;
            }
        }
    }}
