class Obstacle {
    constructor(ctx, x, y, large) {
        this.ctx = ctx,
            this.x = x;
        this.y = y;
        this.width = 40;
        this.image = new Image();
        this.image.src = large ? '../img/escalera-1.png' : '../img/escalera-2.png';
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

    collidesWith(element) {
        const isColliding = this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y < element.y + element.height &&
            this.y + this.height > element.y && element.x > this.x &&
            element.x + element.width < this.x + this.width ;

        return isColliding;

        /*const totalArea = this.width * this.height;
        const overlapX = Math.max(0, Math.min(this.x + this.width, element.x + element.width) - Math.max(this.x, element.x));
        const overlapY = Math.max(0, Math.min(this.y + this.height, element.y + element.height) - Math.max(this.y, element.y));
        const overlapArea = overlapX * overlapY;
        const collisionPercentage = (overlapArea / totalArea) * 100;
    
        return collisionPercentage >= 17;*/
    }
}
