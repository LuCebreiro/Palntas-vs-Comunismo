class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.nubes =  new Nubes(this.ctx);
        this.background = new Background(this.ctx);
        this.player = new Player(ctx, this)
        this.stairs = [
            new Obstacle(ctx, 397, 398, true),
            new Obstacle(ctx, 270, 294, false),
            new Obstacle(ctx, 397, 188, false),
            
            new Obstacle(ctx, 727, 398, true),
            new Obstacle(ctx, 855, 294, false),
            new Obstacle(ctx, 727, 188, false),

        ]
        this.plantas = [
            new Planta(ctx, this.ctx.canvas.width - 85, 580),
            new Planta(ctx, this.ctx.canvas.width - 40, 563),
        ]

        this.takenPlants = [];

        this.intervalId = null;
        this.counter = 0;
        this.score = new Score(ctx);

    }
    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.checkCollisions()
            this.move();
            this.draw();
            this.endGame()

            this.counter++;
        }, 1000 / 60);

    }


    draw() {
        this.ctx.imageSmoothingEnabled = false
        this.nubes.draw();
        this.background.draw();
        this.score.draw();

        this.stairs.forEach(obs => {
            obs.draw();
        });
        this.plantas.forEach(obs => {
            obs.draw();
        });

        this.player.draw();
    }


    move() {
        this.nubes.move();
        this.score.move();
        this.player.move();

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    checkCollisions() {
        const stairsCollision = this.stairs.some((obs) => obs.collidesWith(this.player));
        if (stairsCollision) {
            this.player.actions.canClimb = true;
            if (this.player.actions.canClimb && this.player.movements.up) {
                this.player.actions.isClimbing = true;
                if(this.player.actions.isClimbing){
                    this.player.movements.left = false;
                this.player.movements.right = false;
                }    
            }
           console.log('puedo subir')

        } else {
            this.player.actions.canClimb = false;
           console.log('no puedo subir')

        }




        this.plantas.some((obs, index) => {
            const plantsCollision = obs.collidesWith(this.player);
//console.log('obs is taken')
            if (plantsCollision && !obs.isTaken && !this.player.isHoldingPlant) {
                this.plantas.splice(index, 1);
                this.player.isHoldingPlant = true;

            } else if (this.player.isHoldingPlant && this.player.movements.space) 
            {
                this.addObstacle();
                this.player.isHoldingPlant = false;
               this.score.points ++
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

    endGame(){
        if(this.score.points === 2){
            clearInterval(this.intervalId);
            setTimeout(() => {
              this.ctx.font = '56px Arial';
              this.ctx.fillStyle = 'red';
              this.ctx.fillText(
                'Has logrado salvar a tu comunidad',
                this.ctx.canvas.width / 2 - 150,
                this.ctx.canvas.height / 2,
                300);
            }, 10);
          }
    }
}