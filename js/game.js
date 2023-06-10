class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.levelSelected = 1;
        this.nubes = new Nubes(this.ctx);
        this.background = new Background(this.ctx, LEVELS[this.levelSelected].background);
        this.player = new Player(ctx, this)
        this.floors = LEVELS[this.levelSelected].floors;
        this.stairs = LEVELS[this.levelSelected].escaleras.map((escalera) => {
            return new Escalera(ctx, escalera.x, escalera.y, escalera.large, escalera.level);
        });
        this.scoreBlock = new ScoreBlock(ctx, 100, 30, LEVELS[this.levelSelected].score);

        this.plantas = LEVELS[this.levelSelected].plantas.map((planta) => {
            return new Planta(ctx, planta.x, planta.y, planta.isTaken);
        });

        this.plataformas = LEVELS[this.levelSelected].plataformas.map((plataforma) => {
            return new Plataforma(ctx, plataforma.x, plataforma.y, plataforma.width)
        });

        this.takenPlants = [];

        this.intervalId = null;
        this.counter = 0;
        //this.score = new Score(this.ctx, LEVELS[this.levelSelected].scoreBarImage, LEVELS[this.levelSelected].scoreFrames, this);
        // this.scoreBlocks = LEVELS[this.levelSelected].scoreBlocks.map((bloque) => {
        //     return new scoreBlock(ctx, bloque.x, bloque.y, isScored, imageSRC);
        // });



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
        //this.score.draw();
        this.scoreBlock.draw();
        this.plataformas.forEach(obs => {
            obs.draw();
        });
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
        //this.score.move();
        this.player.move();

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    checkCollisions() {
        const stairColliding = this.stairs.find((obs) => obs.collidesWith(this.player));

        if (stairColliding) {
            const topY = this.floors[stairColliding.level].topPlatformY;
            const bottomY = this.floors[stairColliding.level].bottomPlatformY
            this.player.actions.canClimb = true;

            if (this.player.actions.canClimb) {
                this.player.actions.isClimbing = this.player.y < stairColliding.y + stairColliding.height - this.player.height - 10 && this.player.y + this.player.height > stairColliding.y + 30;

                if (topY >= this.player.y + this.player.height) {
                    this.player.y = topY - this.player.height;
                    //console.log('He llegado arriba')
                } else if (bottomY <= this.player.y + this.player.height) {
                    this.player.y = bottomY - this.player.height;
                    //console.log('He llegado abajo')

                }
                //  console.log('puedo subir')

            }

        } else {
            this.player.actions.canClimb = false;
            this.player.actions.isClimbing = false;
            //console.log('no puedo subir')
        }

        this.plantas.some((obs, index) => {
            const plantsCollision = obs.collidesWith(this.player);
           // console.log(plantsCollision)
            if (plantsCollision && !obs.isTaken && !this.player.isHoldingPlant) {
                this.plantas.splice(index, 1);
                this.player.isHoldingPlant = true;

            } else if (this.player.isHoldingPlant && this.player.movements.space) {
                this.addObstacle();
                this.player.isHoldingPlant = false;
                //this.score.points++
                this.scoreBlock.scored++
                //sumar en score y en scoreblock
            }
        });

    }
    addObstacle() {
        const newPlant = new Planta(this.ctx, this.player.x + this.player.width + 1, this.player.y, true);
        this.plantas.push(newPlant);

    }

    endGame() {
        if (this.scoreBlock.scored === 2) {
            clearInterval(this.intervalId);
            setTimeout(() => {
                this.ctx.font = '56px Arial';
                this.ctx.fillStyle = 'red';
                this.ctx.fillText(
                    'Has logrado salvar a tu comunidad',
                    this.ctx.canvas.width / 2 - 150,
                    this.ctx.canvas.height / 2,
                    300);
            }, 100);
        }
    }
}
