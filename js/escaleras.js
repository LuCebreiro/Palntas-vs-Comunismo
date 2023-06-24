class Escalera {
    constructor(ctx, x, y, large, level) {
        this.ctx = ctx,
            this.x = x;
        this.y = y;
        this.width = 40;
        this.image = new Image();
        this.image.src = large ? './img/escalera-1.png' : './img/escalera-2.png';
        this.isReady = false;
        this.image.onload = () => {
            this.height = this.width * this.image.height / this.image.width;
            this.isReady = true;
        }
        this.level = level;
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
            this.y + this.height > element.y && element.x > this.x &&
            element.x + element.width < this.x + this.width ;

        return isColliding;

    }
}
