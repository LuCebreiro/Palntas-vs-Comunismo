class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.background = new Background(this.ctx);
        this.player = new Player(ctx, this)
        this.stairs = [
            new Obstacle(ctx, 400, 416, true),
            new Obstacle(ctx, 715, 416, true),
            new Obstacle(ctx, 850, 310, false),
            new Obstacle(ctx, 264, 310, false),
            new Obstacle(ctx, 715, 203, false),
            new Obstacle(ctx, 400, 203, false),
        ]
        this.plantas = [
            new Planta(ctx, this.ctx.canvas.width - 85, 563),
            new Planta(ctx, this.ctx.canvas.width - 40, 563),
        ]

        this.takenPlants = [];

        this.intervalId = null;
        this.counter = 0;
        //this.score = new Score();

    }
    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.checkCollisions()
            this.move();
            this.draw();

            this.counter++;
        }, 1000 / 60);

    }


    draw() {
        this.ctx.imageSmoothingEnabled = false
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
        const stairsCollision = this.stairs.some((obs) => obs.collidesWith(this.player));
        if (stairsCollision) {
            this.player.actions.canClimb = true;
            if (this.player.actions.canClimb && this.player.y < 550) {
                this.player.movements.left = false;
                this.player.movements.right = false;
            }
           // console.log('puedo subir')

        } else {
            this.player.actions.canClimb = false;
           // console.log('no puedo subir')

        }

        /*if (this.player.movements.space) {
            let plantsCollision = false;
            let collisionIndex = -1;
            this.plantas.some((planta, index) => {
                if (planta.collidesWith(this.player)) {
                    plantsCollision = true;
                    collisionIndex = index;
                    return true;
                }
            });
            if (plantsCollision) {*/
        this.plantas.some((obs, index) => {
            const plantsCollision = obs.collidesWith(this.player);
console.log('obs is taken')
            if (plantsCollision && !obs.isTaken) {
                this.plantas.splice(index, 1);
                this.player.isHoldingPlant = true;

            } else if (this.player.isHoldingPlant && this.player.movements.space) 
            {
                this.addObstacle();
                console.log('dejo la planta')
               // this.score ++
            }
        });
    }


    /*  if (this.player.movements.space) {
            let plantsCollision = false;
            let collisionIndex = -1;
            this.plantas.some((planta, index) => {
                if (planta.collidesWith(this.player)) {
                    plantsCollision = true;
                    collisionIndex = index;
                    return true;
                }
            });
            const takedPlanta = this.plantas[0]
            if (plantsCollision && !this.takedPlanta.isTaken) {
                
                this.plantas.splice(collisionIndex, 1);
            } else {
                this.addObstacle();
                this.takedPlanta.isTaken = true;
            }
        }*/

    /* if (this.player.spaceBarPressed && this.player.movements.space) {
         if (!this.player.isHoldingPlant) {
             let plantsCollision = false;
             let collisionIndex = -1;
             this.plantas.some((planta, index) => {
                 if (planta.collidesWith(this.player) && !this.takenPlants.includes(planta)) {
                     plantsCollision = true;
                     collisionIndex = index;
                     return true;
                 }
             });
 
             if (plantsCollision) {
                 const collidedPlant = this.plantas[collisionIndex];
                 this.takenPlants.push(collidedPlant);
                 this.plantas.splice(collisionIndex, 1);
                 this.player.isHoldingPlant = true;
                 console.log('cojo la planta')
             } else {
                 this.addObstacle(this.player.x, this.player.y);
                 this.player.isHoldingPlant = false;
                 console.log('dejo la planta')
             }
         }
     }*/
    addObstacle() {
        const newPlant = new Planta(this.ctx, this.player.x+this.player.width+1, this.player.y,true);
        this.plantas.push(newPlant);
        
    }


}