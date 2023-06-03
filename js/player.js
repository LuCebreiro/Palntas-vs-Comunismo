class Player {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.x = 550;
        this.y = 50;
        this.width = 51;
        this.height = 66;
        this.xFrame = 0;
        this.yFrame = 1;
        this.xFramesCount = 3;
        this.yFramesCount = 4;
        this.image = new Image();
        this.image.src = '../img/player-sprite.png';
        this.isReady = false;
        this.image.onload = () => {
            //this.height = this.width * this.image.height / this.image.width;
            this.isReady = true;
        }

        this.movements = {
            jump: false,
            left: false,
            right: false
        }

        this.vy = 0;
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
    }

   /* move() {
        if (this.movements.left) {
            this.yFrame = 1;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
        } else if (this.movements.right) {
            this.yFrame = 2;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
        }

        this.vy += this.gravity;
        this.y += this.vy;


        if (this.y >= this.ctx.canvas.height - this.height - 60) {
            this.y = this.ctx.canvas.height - this.height - 60;
            this.vy = 0;
        }
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown';
        if (!event.repeat) {
            switch (event.keyCode) {
                case KEY_LEFT:
                    this.movements.left = status;
                    this.xFrame = 1;
                    break;
                case KEY_RIGHT:
                    this.movements.right = status;
                    this.xFrame = 1;
                    break;
            }
        }
    }*/
}