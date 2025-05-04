var config = {
    width: 256,
    height: 272,
    
}
    
    var gameSettings = {
        playerSpeed: 200,
    }
   /* class Beam extends Phaser.GameObjects.Sprite{
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
    }*/
    class Scene3 extends Phaser.Scene {
        constructor(){
            super("level2");
             
            this.gameConfig = config;
           
            this.lives = globalHealth;
            this.nesmrtelnost = 0;
            this.score = 0;
            
            this.bulletsadder = 0;
            this.shieldDuration = 10000;
            this.shieldActive = false;
            this.bgspeed = 0.5;
            this.speeds1 = 2;
            this.speeds2 = 3;
            this.speeds3 = 4;
            this.speedchange = 0;
            
            this.boostDuration = 10000; 
            this.boostActive = false;
            this.graphics = null
        }
        create(){
            this.background = this.add.tileSprite(0,0, config.width, config.height, "background2");
            this.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
            this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            this.background.setOrigin(0,0);
            this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2 -70, "ship");
            this.ship2 = this.add.sprite(config.width/2, config.height/2 - 70, "ship2");
            this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2 - 70, "ship3");
            //this.character = this.add.sprite(config.width/2 + 50, config.height/2, "character1");

            
            this.physics.world.setBounds(0, 20, config.width, config.height-20);
            

            this.enemies = this.physics.add.group();
            this.enemies.add(this.ship1);
            this.enemies.add(this.ship2);
            this.enemies.add(this.ship3);
            this.ship1.play("ship1_anim");
            this.ship2.play("ship2_anim");
            this.ship3.play("ship3_anim");
           // this.character.play("character_anim");
            this.ship1.setInteractive();
            this.ship2.setInteractive();
            this.ship3.setInteractive();

            this.input.on('gameobjectdown', this.destroyShip, this);

            this.projectiles = this.add.group();
            this.powerUps = this.physics.add.group();
            
            this.shieldIndicator = this.add.rectangle(0, config.height - 20, config.width, 20, 0x00ff00);
            this.shieldIndicator.setOrigin(0, 0);
            this.shieldIndicator.setDepth(1);
            this.shieldIndicator.setPosition(0, config.height - 20);
            this.shieldIndicator.visible = false;
            this.boostIndicator = this.add.rectangle(0, 260, config.width, 20, 0xff0000); 
            this.boostIndicator.setOrigin(0, 0);
            this.boostIndicator.setDepth(1);
            this.boostIndicator.visible = false;
           
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

            this.graphics = this.add.graphics();
            this.graphics.fillStyle("Black");
            this.graphics.fillRect(0,0,config.width,20);
            this.graphics.alpha = 0.7;
            this.scoreLabel = this.add.bitmapText(10,5, "pixelFont", "SCORE: 000000", 16);
            this.bulletCountLabel = this.add.bitmapText(180,5, "pixelFont", "BULLETS: ", 16 );
            this.livesLabel = this.add.bitmapText(110,5, "pixelFont", "LIVES: 3", 16 );
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
            this.timee = this.time.addEvent({
                delay: 120000,
                callback: this.shop,
                callbackScope: this,
                loop: true
            });
           
            
           

          
        }
      
        pickPowerUp(player, powerUp){
            powerUp.disableBody(true, true);
            this.pickupSound.play({volume: 0.25});
           if (powerUp.type === "red"){
            this.lives += 1;
           }
           if (powerUp.type === "gray"){
           globalBullets += 1;
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
       

        moveShip(ship, speed){
            ship.y += speed;
            if (ship.y > config.height){
                this.resetShipPos(ship);
            }
           
        }
        update(){
           
            this.background.tilePositionY -= this.bgspeed;
            this.bulletCountLabel.text = "BULLETS: " + globalBullets;
            this.moveShip(this.ship1, this.speeds1);
            this.moveShip(this.ship2, this.speeds2);
            this.moveShip(this.ship3, this.speeds3);
         
            this.movePlayerManager();
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
                if(this.player.active){
                    console.log("Fire!");
                    this.shootBeam();
                }
            }
            
            if (globalBoost >= 1){
                if(this.bgspeed == 0.5){
                    if(Phaser.Input.Keyboard.JustDown(this.FKey)){
                        this.bgspeed = 5;
                        this.speeds1 = 6.5;
                        this.speeds2 = 7.5;
                        this.speeds3 = 8.5;
                        this.speedchange = 0; 
                        globalBoost -= 1;
                        this.time.addEvent({
                            delay: 10000,
                            callback: this.speedbg,
                            callbackScope: this,
                            loop: false
                        });
                        this.startBoostTimer();
                    }
                }
            }
           
            if (this.shieldActive) {
                this.shieldIndicator.visible = true;
               
                this.updateShieldIndicator();
                
            } 
            else {
                this.shieldIndicator.visible = false;
            
            }
            if (this.boostActive) {
                this.boostIndicator.visible = true;
                this.updateBoostIndicator();
            } else {
                this.boostIndicator.visible = false;
            }

            if(this.bgspeed == 0.5){
                if(globalShields >= 1){            
                    if (Phaser.Input.Keyboard.JustDown(this.TKey)){
                        globalShields -= 1;
                        this.player.setTexture("shieldp");
                        this.player.play("shieldthrust");
                        this.time.delayedCall(10000, this.shieldik, [], this);
                    
                        this.startShieldTimer();
                    }
                }
            }
           for(var i = 0; i < this.projectiles.getChildren().length; i++){
             var beam = this.projectiles.getChildren()[i];
             beam.update();
            }

            this.bulletCountLabel.text = "BULLETS: " + globalBullets;
            this.livesLabel.text = "LIVES: " + this.lives;
            this.scoreLabel.text = "SCORE: " + globalScoreFormated;

            if (this.lives === 0){
                this.sound.stopAll();
                this.scene.start("koniec");
                console.log("koniec");
            }

            if(globalScoreFormated >= 999999){
                this.ship1.destroy(true);
                this.ship2.destroy(true);
                this.ship3.destroy(true);
            }
            if (this.bgspeed == 5 && this.ship1.y > this.player.y) {
                
                this.hitEnemy1(this.player, this.ship1);
            }
            if (this.bgspeed == 5 && this.ship2.y > this.player.y) {
                
                this.hitEnemy1(this.player, this.ship2);
            }
            if (this.bgspeed == 5 && this.ship3.y > this.player.y) {
                
                this.hitEnemy1(this.player, this.ship3);
            }
           
        }
        hurtPlayer(player, enemy){
            console.log("collision");
            if(this.bgspeed == 0.5){
                if(this.player.alpha == 1){
                    if (player.texture.key !== "shieldp") {
                        this.resetShipPos(enemy);
                        this.explosionSound.play({volume: 0.25});
                    
                        if(this.lives > 0){
                            this.lives -= 1;
                        }
                        
                    
                        
                        player.disableBody(true,true);

                var explosion = new Explosion(this, player.x, player.y);
                this.resetPlayer();
                
            
                }
            }
        } 
        /*else{
            if(this.player.alpha == 1){
                if (player.texture.key !== "shieldp") {
                    this.resetShipPos(enemy);
                    this.explosionSound.play({volume: 0.25});
                
                    if(this.lives > 0){
                        this.lives -= 0;
                    }
                    player.disableBody(true,true);
                    var explosion = new Explosion(this, player.x, player.y);
                }
            }
        }*/
    }
        speedbg(){
            
            if(this.speedchange == 0){
            this.time.addEvent({
                delay: 100,
                callback: async () => {
                    this.bgspeed = 4;
                    this.speeds1 = 5.5;
                    this.speeds2 = 6.5;
                    this.speeds3 = 7.5;
                },
                callbackScope: this,
            });
            this.speedchange = 1; 
        } 
        if(this.speedchange == 1){
            this.time.addEvent({
                delay: 200,
                callback: async () => {
                    this.bgspeed = 3;
                    this.speeds1 = 4.5;
                    this.speeds2 = 5.5;
                    this.speeds3 = 6.5;
                
                },
                callbackScope: this,
            });
            this.speedchange = 2;   
        }
        if(this.speedchange == 2){
            this.time.addEvent({
                delay: 300,
                callback: async () => {
                    this.bgspeed = 2;
                    this.speeds1 = 3.5;
                    this.speeds2 = 4.5;
                    this.speeds3 = 5.5;
                },
                callbackScope: this,
            });  
            this.speedchange = 3;   
        }
        if(this.speedchange == 3){
            this.time.addEvent({
                delay: 400,
                callback: async () => {
                    this.bgspeed = 1;
                    this.speeds1 = 2.5;
                    this.speeds2 = 3.5;
                    this.speeds3 = 4.5;
                
                },
                callbackScope: this,
            }); 
            this.speedchange = 4;   
        }
        if(this.speedchange == 4){
            this.time.addEvent({
                delay: 800,
                callback: async () => {
                    this.bgspeed = 0.5;
                    this.speeds1 = 2;
                    this.speeds2 = 3;
                    this.speeds3 = 4;
                },
                callbackScope: this,
            }); 
           
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
            if(this.bgspeed !== 5){
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
               
                this.score = globalScoreFormated;
                const intNumber = parseInt(this.score);
                this.score = intNumber;
                this.score += 25;
                globalScoreFull += 25;
                globalScoreFormated = this.zeroPad(this.score , 6);
                this.scoreLabel.text = "SCORE " + globalScoreFormated;
                this.explosionSound.play({volume: 0.25});
                if (Phaser.Math.RND.between(0, 1) === 1){
                   globalBullets += 1; 
                }
               // this.bullets += 1;
            //enemy.setTexture("explosion");
            //enemy.play("explode");
        }
        hitEnemy1(player, enemy){

            var explosion = new Explosion(this, enemy.x, enemy.y);
            
            this.resetShipPos(enemy);
            
            globalScoreFormated = this.zeroPad(this.score, 6);
            this.scoreLabel.text = "SCORE " + globalScoreFormated;
            this.explosionSound.play({volume: 0.25});
           
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
     /*   shop(){
            console.log("shop")
            this.sound.stopAll()
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start("Shop")
            });
        }*/
        startBoostTimer() {
            this.boostStartTime = this.time.now;
            this.time.addEvent({
                delay: 0,
                callback: () => {
                    this.boostActive = true;
                    this.updateBoostIndicator();
                },
                callbackScope: this
            });
        }
        updateBoostIndicator() {
            if (this.boostActive) {
                const remainingTime = Math.max(this.boostDuration - (this.time.now - this.boostStartTime), 0);
                const indicatorWidth = config.width * remainingTime / this.boostDuration;
    
                this.boostIndicator.setSize(indicatorWidth, 20);
                
                if (remainingTime <= 0) {
                    this.boostIndicator.visible = false;
                }
            }
        }
        startShieldTimer() {
            this.shieldStartTime = this.time.now;
            this.time.addEvent({
                delay: 0,
                callback: () => {
                  
                    this.shieldActive = true;
                    this.updateShieldIndicator();
                },
                callbackScope: this
            });
        }
        updateShieldIndicator() {
            if (this.shieldActive) {
             
                const remainingTime = Math.max(this.shieldDuration + 5000 - (this.time.now - this.shieldStartTime), 0);
                const indicatorWidth = config.width * remainingTime / (this.shieldDuration + 5000);
                this.shieldIndicator.setSize(indicatorWidth, 20);
                if (remainingTime <= 0) {
                    this.shieldIndicator.visible = false;
                }
            }
          
        }
        shieldik() {
            this.shieldIndicator.visible = true;
          
            this.shieldActive = true;
         
            this.updateShieldIndicator();
            this.player.play("shieldthrust"); 
            const flashDuration = 500; 
            const totalFlashes = 5; 
        
          
            for (let i = 0; i < totalFlashes; i++) {
                this.time.addEvent({
                    delay: flashDuration * i * 2,
                    callback: () => {
                        this.player.setTexture("shieldp"); 
                    },
                    callbackScope: this
                });
                this.time.addEvent({
                    delay: flashDuration * (i * 2 + 1), 
                    callback: () => {
                        this.player.setTexture("player"); 
                    },
                    callbackScope: this
                });
            }
        
           
            this.time.addEvent({
                delay: flashDuration * totalFlashes * 2,
                callback: () => {
                    this.player.setTexture("player"); 
                    this.player.play("thrust"); 
                },
                callbackScope: this
            });
        }
        shop(){
            
            this.sound.stopAll();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start("Shop2")
            });
            
        }
    }
