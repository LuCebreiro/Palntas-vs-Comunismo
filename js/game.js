class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.levelSelected = 0;
        this.background = new Background(this.ctx, this, this.ctx.canvas.height);
        this.obstacles = []
        this.player = new Player(ctx, this)
        this.floors = LEVELS[this.levelSelected].floors;
        this.stairs = LEVELS[this.levelSelected].escaleras.map((escalera) => {
            return new Escalera(ctx, escalera.x, escalera.y, escalera.large, escalera.level);
        });
        this.scoreBlock = new ScoreBlock(ctx, 55, 30, LEVELS[this.levelSelected].score);

        this.plantas = LEVELS[this.levelSelected].plantas.map((planta) => {
            return new Planta(ctx, planta.x, planta.y, planta.isTaken);
        });

        this.plataformas = LEVELS[this.levelSelected].plataformas.map((plataforma) => {
            return new Plataforma(ctx, plataforma.x, plataforma.y, plataforma.width)
        });

        this.enemigo = null;

        this.takenPlants = [];

        this.intervalId = null;
        this.counter = 0;

        this.transitioningLevel = false;

        this.score = 0;

        this.music = new Audio();
        this.music.src = '../audio/himno-pp-merengue.mp3';
        this.music.loop = true;
        this.music.volume = 0.1;


    }
    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.checkCollisions()
            this.move();
            this.draw();
            this.counter++;

            if (this.levelSelected > 0 && this.counter % LEVELS[this.levelSelected].obsSpeed === 0) {
                this.addObstacle();
            }

        }, 1000 / 60);

    }


    draw() {
        this.ctx.imageSmoothingEnabled = false
        this.background.draw();

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
        this.obstacles.forEach((obs) => {
            obs.draw();
        });

        this.enemigo && this.enemigo.draw();

        this.player.draw();
    }


    move() {
        this.background.move();
        this.player.move();
        this.obstacles.forEach((obs) => {
            obs.move();
        });
        setTimeout(() => {
            this.enemigo && this.enemigo.move();
        }, 1000);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.y < this.ctx.canvas.height);
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
            if (plantsCollision && !obs.isTaken && !this.player.isHoldingPlant && this.player.movements.space) {
                this.plantas.splice(index, 1);
                this.player.isHoldingPlant = true;
                this.player.movements.space = false;
            } else if (this.player.isHoldingPlant && this.player.movements.space) {
                this.addPlants();
                this.player.isHoldingPlant = false;
                this.scoreBlock.scored++;
                this.score++;
                this.background.gradientPoint -= LEVELS[this.levelSelected].degradado;

                //console.log(this.score)
                /*if (this.score) {
                    this.nubes.updateScore(this.score)
                }*/
                this.player.movements.space = false;
                //sumar en score y en scoreblock
            }
        });

        if (this.scoreBlock.scored === LEVELS[this.levelSelected].score && !this.transitioningLevel) {
            this.transitioningLevel = true;
            setTimeout(() => {
                this.nextLevel();
                this.transitioningLevel = false;
            }, 1000);
        }

        this.obstacles.forEach((obs) => {
            if (this.player.x + this.player.width >= obs.x &&
                this.player.x <= obs.x + obs.width &&
                this.player.y + this.player.height >= obs.y &&
                this.player.y <= obs.y + obs.height) {
                this.gameOver();
            }
        });

    }
    addPlants() {
        const newPlant = new Planta(this.ctx, this.player.x + this.player.width + 1, this.player.y + 15, true);
        this.plantas.push(newPlant);

    }



    addObstacle() {
        const randomXFrame = Math.floor(Math.random() * 5);
        const newObstacle = new Obstaculo(this.ctx, this.enemigo.x, randomXFrame);
        this.obstacles.push(newObstacle);

    }

    nextLevel() {

        if (this.levelSelected < LEVELS.length - 1) {
            clearInterval(this.intervalId);
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            const image = new Image();
            image.src = './img/FONDO-INICIO.png'
            this.ctx.drawImage(image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.font = '65px VT323';
            this.ctx.fillStyle = '#444345';
            ctx.textAlign = "center";
            this.ctx.fillText('¡La contaminación ha bajado gracias a ti!', (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 2));
            setTimeout(() => {
                this.levelSelected++;
                this.reset();
                this.start();
            }, 3500);

        } else {
            //console.log('colisiono')
            this.winGame();
        }
    }

    reset() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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
        this.obstacles = []

        this.enemigo = new Enemigo(this.ctx, this, LEVELS[this.levelSelected].randomMove, LEVELS[this.levelSelected].speed)

        this.takenPlants = [];
        this.player.x = 550;
        this.player.y = 565;
        this.score = 0;

        this.background.gradientPoint = 650;

    }

    winGame() {
        clearInterval(this.intervalId);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const image = new Image();
        image.src = './img/FONDO-WIN.png';

        image.onload = () => {
            this.ctx.drawImage(image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.font = '65px VT323';
            this.ctx.fillStyle = '#444345';
            ctx.textAlign = "center";
            this.ctx.fillText('¡Enhorabuena! ¡Has salvado a tu Comunidad!', (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 3));

        }
        this.showResetButton();

    }

    gameOver() {
        clearInterval(this.intervalId);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        setTimeout(() => {
            const image = new Image();
            image.src = './img/FONDO-GAMEOVER.png';

            image.onload = () => {
                this.ctx.drawImage(image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.ctx.font = '65px VT323';
                this.ctx.fillStyle = 'RED';
                ctx.textAlign = "center";
                this.ctx.fillText('El comunismo ha ganado esta vez...', (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 3));
            }
            this.showResetButton();
        }, 250);
    }

    showResetButton() {
        reloadButton.classList.remove('hidden')
    }
}