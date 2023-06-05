class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.background = new Background(this.ctx);
        this.player = new Player(ctx, this)
        this.stairs = [
            new Obstacle(ctx, 430, 400, true),
            new Obstacle(ctx, 685, 400, true),
            new Obstacle(ctx, 850, 295, false),
            new Obstacle(ctx, 270, 295, false),
            new Obstacle(ctx, 725, 187, false),
            new Obstacle(ctx, 395, 187, false),
        ]
        this.plantas = [
            new Planta(ctx, this.ctx.canvas.width - 85, 563),
            new Planta(ctx, this.ctx.canvas.width - 40, 563),
        ]

        this.intervalId = null;
        this.counter = 0;

    }
    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();
            this.checkCollisions()
            this.counter++;
        }, 1000 / 60);

    }


    draw() {
        this.background.draw();
        this.stairs.forEach(obs => {
            obs.draw();
        });
        this.plantas.forEach(obs => {
            obs.draw();
        });
        this.player.draw();
    }


    move() {
        this.player.move();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
     }

     checkCollisions() {
        const stairsCollision = this.stairs.some((obs)=>obs.collidesWith(this.player));
        if (stairsCollision) {
            this.player.actions.canClimb = true;
            console.log('puedo subir')
            
        } else {
            this.player.actions.canClimb = false;
            console.log('no puedo subir')
            
        }

        this.plantas.some((planta, index) => {
            const plantsCollision = planta.collidesWith(this.player);
            if (plantsCollision && this.player.movements.space) {
              this.plantas.splice(index, 1)
             // planta.x = this.player.x + 50;
    };
});
}
}