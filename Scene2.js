var config = {
    width: 256,
    height: 272,
    
}
    
    var gameSettings = {
        playerSpeed: 200,
    }
    class Beam extends Phaser.GameObjects.Sprite{
        constructor(scene){
    
            var x = scene.player.x;
            var y = scene.player.y;
    
            super(scene, x,y, "beam");
            scene.add.existing(this);
            this.play("beam_anim");
            scene.physics.world.enableBody(this);
            this.body.velocity.y = - 250;
            scene.projectiles.add(this);
        }
        update(){
            if(this.y < 32) {
                this.destroy();
            }
          
        }
    }
    class Explosion extends Phaser.GameObjects.Sprite{
        constructor(scene,x,y){
            super(scene, x,y, "explosion");
            scene.add.existing(this);
            this.play("explode")
        }
    }
    class Scene2 extends Phaser.Scene {
        constructor(){
            super("playGame");
             
            this.gameConfig = config;
            this.bullets = globalBullets;
            this.lives = globalHealth;
            this.nesmrtelnost = 0;
            this.score = 0;
            globalScoreFormated = "";
            globalScoreFull = 0;
            globalBullets = 11;
            globalShields = 0;
            globalHealth = 10;
            globalHalusky = 0;
            globalBoost = 0;
            this.bulletsadder = 0;
            globalScoreFormated = this.zeroPad(this.score, 6);
           
            
        }
        create(){
            this.score = 1000;
            this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
            this.background.setOrigin(0,0);
            this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2 - 120, "shipk");
            this.ship2 = this.add.sprite(config.width/2, config.height/2 - 120, "shipk2");
            this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2 - 120, "shipk3");
            //this.character = this.add.sprite(config.width/2 + 50, config.height/2, "character1");

            
            this.physics.world.setBounds(0, 20, config.width, config.height-20);
            

            this.enemies = this.physics.add.group();
            this.enemies.add(this.ship1);
            this.enemies.add(this.ship2);
            this.enemies.add(this.ship3);
            this.ship1.play("shipk1_anim");
            this.ship2.play("shipk2_anim");
            this.ship3.play("shipk3_anim");
           // this.character.play("character_anim");
            this.ship1.setInteractive();
            this.ship2.setInteractive();
            this.ship3.setInteractive();

            this.input.on('gameobjectdown', this.destroyShip, this);

            this.projectiles = this.add.group();
            this.powerUps = this.physics.add.group();
            

           

           
            this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
            this.player.play("thrust");
            this.cursorKeys = this.input.keyboard.createCursorKeys();
            this.player.setCollideWorldBounds(true);
            this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

            this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
                projectile.destroy();
            });
            this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
            this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
            this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

            var graphics = this.add.graphics();
            graphics.fillStyle("Black");
            graphics.fillRect(0,0,config.width,20);
         
            this.scoreLabel = this.add.bitmapText(10,5, "pixelFont", "SCORE: 000000", 16);
            this.bulletCountLabel = this.add.bitmapText(180,5, "pixelFont", "BULLETS: ", 16 );
            this.livesLabel = this.add.bitmapText(110,5, "pixelFont", "LIVES: ", 16 );
            this.beamSound = this.sound.add("audio_beam");
            this.explosionSound = this.sound.add("audio_explosion");
            this.pickupSound = this.sound.add("audio_pickup");
            this.respawnSound = this.sound.add("audio_respawn");
            this.ammoSound = this.sound.add("audio_no_ammo");
            this.music = this.sound.add("music", {volume: 0.25});
            var musicConfig = {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            }
            this.music.play(musicConfig);

            this.timer = this.time.addEvent({
                delay: 3000,
                callback: this.spawnPowerUp,
                callbackScope: this,
                loop: true
            });
           
            
            this.time.addEvent({
                delay: 120000,
                callback: this.shop,
                callbackScope: this,
                loop: true
            });
            
        }
        spawnPowerUp(){
            
                var powerUp = this.physics.add.sprite(16, 16, "power-up");
                this.powerUps.add(powerUp);
                powerUp.setRandomPosition(0,0, config.width, config.height);

                powerUp.type = Phaser.Math.RND.pick([ "gray", "gray", "red"]);
                powerUp.play(powerUp.type)
                powerUp.setVelocity(100, 100);
                powerUp.setCollideWorldBounds(true);
                powerUp.setBounce(1);
            
            
        }
        pickPowerUp(player, powerUp){
            powerUp.disableBody(true, true);
            this.pickupSound.play({volume: 0.25});
           if (powerUp.type === "red"){
            globalHealth += 1;
           }
           if (powerUp.type === "gray"){
               globalBullets += 2;
           }
        }
        resetPlayer(){
            var x = config.width / 2 - 8;
            var y = config.height + 64;
            this.player.enableBody(true, x, y, true, true);

            this.player.alpha = 0.5;
            var tween = this.tweens.add({
                targets: this.player,
                y: config.height - 64,
                ease: 'Power1',
                duration: 1500,
                repeat: 0,
                onComplete: function(){
                    this.player.alpha = 1;
                },
                callbackScope: this
            });
        }
        hurtPlayer(player, enemy){
           
                this.resetShipPos(enemy);
                this.explosionSound.play({volume: 0.25});
            
                if(globalHealth > 0){
                    globalHealth -= 1;
                   
                }
                if(this.player.alpha < 1){
                    globalHealth += 1;
                }
                player.disableBody(true,true);

           var explosion = new Explosion(this, player.x, player.y);
           this.resetPlayer();
           
        }
       

        moveShip(ship, speed){
            ship.y += speed;
            if (ship.y > config.height){
                this.resetShipPos(ship);
            }
        }
        update(){
            this.moveShip(this.ship1, 1);
            this.moveShip(this.ship2, 2);
            this.moveShip(this.ship3, 3);
            this.background.tilePositionY -= 0.5;
            this.movePlayerManager();
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
                if(this.player.active){
                    console.log("Fire!");
                    this.shootBeam();
                }
            }
           for(var i = 0; i < this.projectiles.getChildren().length; i++){
             var beam = this.projectiles.getChildren()[i];
             beam.update();
            }

            this.bulletCountLabel.text = "BULLETS: " + globalBullets;
            this.livesLabel.text = "LIVES: " + globalHealth;
            this.scoreLabel.text = "SCORE: " + globalScoreFormated;

            if (globalHealth == 0){
                this.sound.stopAll();
                this.scene.start("koniec");
                console.log("koniec");
            }

            if(globalScoreFormated >= 999999){
                this.ship1.destroy(true);
                this.ship2.destroy(true);
                this.ship3.destroy(true);
            }
        }
                
                shootBeam(){
                    if (globalBullets > 0) {
                    var beam = new Beam(this);
                    this.beamSound.play({volume: 0.25});
                        globalBullets--;
                    }
                    else {
                        this.ammoSound.play({volume: 1});
                    }
                } 


        movePlayerManager(){
            if(this.cursorKeys.left.isDown){
                this.player.setVelocityX(-gameSettings.playerSpeed);
            } else if(this.cursorKeys.right.isDown){
                this.player.setVelocityX(gameSettings.playerSpeed);
            } else {
                this.player.setVelocityX(0);
            }
            if(this.cursorKeys.up.isDown){
                this.player.setVelocityY(-gameSettings.playerSpeed);
            } else if(this.cursorKeys.down.isDown){
                this.player.setVelocityY(gameSettings.playerSpeed);
            } else {
                this.player.setVelocityY(0);
            }
        }
        resetShipPos(ship){
            ship.y = 0;
            var randomX = Phaser.Math.Between(0, config.width);
            ship.x = randomX;
        }
        destroyShip(pointer,gameObject){
            gameObject.setTexture("explosion");
            gameObject.play("explode");
        }
        hitEnemy(projectile, enemy){

                var explosion = new Explosion(this, enemy.x, enemy.y);
                projectile.destroy();
                this.resetShipPos(enemy);
                this.score += 25;
                globalScoreFormated = this.zeroPad(this.score, 6);
                globalScoreFull += 25;
                this.scoreLabel.text = "SCORE " + globalScoreFormated;
                this.explosionSound.play({volume: 0.25});
                if (Phaser.Math.RND.between(0, 1) === 1){
                   globalBullets += 1; 
                }
               // this.bullets += 1;
            //enemy.setTexture("explosion");
            //enemy.play("explode");
        }
        
        zeroPad(number, size){
            var stringNumber = String(number);
            while(stringNumber.length < (size || 2)){
                stringNumber = "0" + stringNumber;
            }
            return stringNumber;
        }
        shop(){
            console.log("shop")
            this.sound.stopAll()
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start("Shop")
            });
        }
       
    }
