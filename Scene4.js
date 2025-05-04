var config = {
    width: 256,
    height: 272,
    
}
    
    var gameSettings = {
        playerSpeed: 200,
    }
    class Valaska extends Phaser.GameObjects.Sprite {
        constructor(scene, playerX, playerY) {
            super(scene, playerX, playerY, "valaska");

            scene.add.existing(this);
            this.scene = scene;
            this.speed = 200;
            this.targetEnemyindic = false;
            this.findNearestEnemy();
           
           
            
        }
        findNearestEnemy() {
            let nearestEnemy = null;
            let nearestDistance = Infinity;
            this.scene.enemies.getChildren().forEach(enemy => {
                const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
                if (distance < nearestDistance) {
                    nearestEnemy = enemy;
                    nearestDistance = distance;
                }
            });
    
            this.scene.physics.world.enableBody(this);
            //this.body.velocity.y = - 250;
           
            this.targetEnemy = nearestEnemy;
            this.targetEnemyindic = true;
            const directionX = this.targetEnemy.x - this.x;
            const directionY = this.targetEnemy.y - this.y;

            
            const length = Math.sqrt(directionX ** 2 + directionY ** 2);
            const velocityX = (directionX / length) * this.speed;
            const velocityY = (directionY / length) * this.speed;

          
            this.x += velocityX * this.scene.game.loop.delta / 1000;
            this.y += velocityY * this.scene.game.loop.delta / 1000;
           
            this.body.velocity.y = velocityY;
            this.body.velocity.x = velocityX;

        }
        update() {
            this.angle += 5;
            this.findNearestEnemy();
           
           
        }
       
       
        
    }
    class Scene4 extends Phaser.Scene {
        constructor(){
            super("level3");
             
            this.gameConfig = config;
           
            this.lives = globalHealth;
            this.nesmrtelnost = 0;
            this.score = 0;
            this.bulletsadder = 0;
            this.shieldDuration = 10000;
            this.shieldActive = false;
            this.bgspeed = 0.5;
            this.speeds1 = 2.5;
            this.speeds2 = 3.5;
            this.speeds3 = 4.5;
            this.speedchange = 0;
            this.shopTimerDelay = 780000;
            this.boostDuration = 10000; 
            this.boostActive = false;
            this.orolindic = 0;
            this.p = 0
            this.k = 0
            this.g = 0
            this.d = 0;
            this.c = 0;
            this.b = 0;
            this.graphics = null;
            this.bossindic = 0;
            this.bossHealth = 10;
            this.wave2indic = 0
            globalHalusky = 1;
            this.canShoot = true;
        }
        create(){
            this.sound.stopAll();
            this.background = this.add.tileSprite(0,0, config.width, config.height, "space");
            this.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
            this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            this.GKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
            this.background.setOrigin(0,0);
            this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2 - 100, "shipb");
            this.ship2 = this.add.sprite(config.width/2, config.height/2 - 100, "shipb2");
            this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2 - 100, "shipb3");
            this.orol = this.add.sprite(97,390, "orol");
            this.orol.alpha = 0;
            //this.character = this.add.sprite(config.width/2 + 50, config.height/2, "character1");

            
            this.physics.world.setBounds(0, 20, config.width, config.height-20);
            

            this.enemies = this.physics.add.group();
            this.enemies.add(this.ship1);
            this.enemies.add(this.ship2);
            this.enemies.add(this.ship3);
            this.ship1.play("shipb1_anim");
            this.ship2.play("shipb2_anim");
            this.ship3.play("shipb3_anim");
           // this.character.play("character_anim");
            this.ship1.setInteractive();
            this.ship2.setInteractive();
            this.ship3.setInteractive();

            this.input.on('gameobjectdown', this.destroyShip, this);

            this.projectiles = this.add.group();
            this.valasky = this.add.group();
            this.powerUps = this.physics.add.group();
            this.bosses = this.physics.add.group();
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
            this.physics.add.overlap(this.valasky, this.enemies, this.destroyEnemy, null, this);
           
   
            
            

            this.graphics = this.add.graphics();
            this.graphics.fillStyle("Black");
            this.graphics.fillRect(0,0,config.width,20);
            this.graphics.alpha = 0.7;
            this.scoreLabel = this.add.bitmapText(10,5, "pixelFont", "SCORE: 000000", 16);
            this.bulletCountLabel = this.add.bitmapText(180,5, "pixelFont", "BULLETS: ", 16 );
            this.livesLabel = this.add.bitmapText(110,5, "pixelFont", "LIVES: ", 16 );
            this.beamSound = this.sound.add("audio_beam");
            this.explosionSound = this.sound.add("audio_explosion");
            this.pickupSound = this.sound.add("audio_pickup");
            this.respawnSound = this.sound.add("audio_respawn");
            this.ammoSound = this.sound.add("audio_no_ammo");
            this.music = this.sound.add("space", {volume: 0.25});
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
                delay: 3000,
                callback: this.shop,
                callbackScope: this,
                loop: false
            });
            
            this.time.addEvent({
                delay: 2100,
                callback: this.wave2,
                callbackScope: this,
                loop: true
            });
            this.time.addEvent({
                delay: 2100,
                callback: this.wave3,
                callbackScope: this,
                loop: true
            }); 
        }
        resetPlayer(){
            var x = config.width / 2 - 8;
            var y = config.height + 64;
            this.player.enableBody(true, x, y, true, true);
            this.player.alpha = 0.5;
            if(this.bossindic == 0){
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
            else{
                this.time.addEvent({
                    delay: 1500,
                    callback: async () => {
                       this.player.alpha = 1;
                    },
                    callbackScope: this,
                });
            }
        }
        moveShip(ship, speed){
            if(this.bossindic <= 1){
                ship.y += speed;
            }
            if(this.b == 0){
                if(this.bossindic == 2){
                    ship.x += speed;
                }
            }
            if(this.b ==1){
                ship.x += speed;
            }
            if (ship.y > config.height){
                this.resetShipPos(ship);
            }  
        }
        update(){
            
            this.background.tilePositionY -= this.bgspeed;
            if(this.bossindic == 0){
                this.bulletCountLabel.text = "BULLETS: " + globalBullets;
            }
            this.moveShip(this.ship1, this.speeds1);
            this.moveShip(this.ship2, this.speeds2);
            this.moveShip(this.ship3, this.speeds3);
            if(this.ship4){
                this.moveShip(this.ship4, this.speeds3);
            }
            if(this.ship5){
                this.moveShip(this.ship5, this.speeds3);
            }
            if(this.ship6){
                this.moveShip(this.ship6, this.speeds3);
            }
            if(this.ship7){
                this.moveShip(this.ship7, this.speeds3);
                this.moveShip(this.ship8, this.speeds3);
                this.moveShip(this.ship9, this.speeds3);
                
            }
            if(this.ship10){
                this.moveShip(this.ship10, this.speeds3);
            }
            if(this.b == 1){
                this.moveShip(this.boss, 3);
            }
            
            this.movePlayerManager();
            if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.k == 0){
                if(this.player.active){
                    console.log("Fire!");
                    this.shootBeam();
                }
            }
                if(this.g == 0){
                    if(globalHalusky >= 1 && this.bossindic == 0){
                        if (Phaser.Input.Keyboard.JustDown(this.GKey)){
                            this.orol.alpha = 1;
                            this.orolindic = 1;
                            this.g = 1;
                            this.p = 0;
                            this.k = 1;
                            globalHalusky -= 1;
                            this.player.play("slovakanim");
                            this.music.stop();
                            this.slovar = this.sound.add("slovar", {volume: 1});
                            var hudbaConfig = {
                                mute: false,
                                volume: 1,
                                rate: 1,
                                detune: 0,
                                seek: 0,
                                loop: true,
                                delay: 0
                            }
                            this.slovar.play(hudbaConfig);
                            if(this.player.active){
                                console.log("Valaska!");
                                this.valaska = new Valaska(this, this.player.x, this.player.y);
                                this.valaska.setScale(0.5);
                                this.physics.add.overlap(this.valaska, this.enemies, this.destroyEnemy, null, this);
                                this.time.addEvent({
                                    delay: 14000,
                                    callback: async () => {
                                        this.valaska.destroy();
                                        this.player.play("thrust");
                                        this.g = 0;
                                        this.p = 1;
                                        this.k = 0
                                        this.slovar.stop();
                                        this.music.play();
                                        this.orolindic = 0;
                                        this.orol.alpha = 0;
                                        this.orol.x = 97;
                                        this.orol.y = 390;
                                    },
                                    callbackScope: this,
                                });  
                            }
                        }
                    }   
                }  
                        
                
        
            if(this.valaska && this.valaska.y < 40 && this.p == 0 && this.bossindic == 0){
                this.valaska.destroy();
                this.valaska = new Valaska(this, this.player.x, this.player.y);
                this.valaska.setScale(0.5);
                    this.physics.add.overlap(this.valaska, this.enemies, this.destroyEnemy, null, this);
            }
           if(this.valaska && this.valaska.y > 40 && this.p == 0 && this.bossindic == 0) {
                this.valaska.update();
               
               
            }
            if(this.orolindic == 1){
                this.orol.y -= 40;
            }
            if(this.bossindic == 1 && this.boss && this.d == 0){
                this.boss.y += 10;
            }
        
               
                if(this.d == 1){
                    this.boss.y += 10;
                } 
                if(this.d == 3){
                    this.boss.y += 10;
                } 
                
                if(this.d == 1 && this.boss.y >= 80){
                    if(this.wave2indic == 1){
                        this.d = 2;
                    }
                    this.boss.y += 0;
                }
            
            /*if(this.bossindic == 1 && this.boss && this.c == 0){
                this.boss.y += 10;
            }*/
            if(this.c == 1){
                this.boss.y += 10;
            } 
            if(this.c == 3){
                this.boss.y += 10;
            } 
            if(this.c == 1 && this.boss.y >= 80){
                if(this.wave2indic == 2){
                    this.c = 2;
                }
                this.boss.y += 0;
            }
            if(this.bossindic == 0){
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
            }
            if(this.bossindic >= 1){
                this.boostActive = false;
                this.boostIndicator.visible = false;
                this.bgspeed = 0.5;
            }
            if (this.shieldActive) {
                this.shieldIndicator.visible = true;
               
                this.updateShieldIndicator();
                
            } 
            else {
                this.shieldIndicator.visible = false;
            
            }
            if(this.boostIndicator){
                if (this.boostActive) {
                    this.boostIndicator.visible = true;
                    this.updateBoostIndicator();
                } else {
                    this.boostIndicator.visible = false;
                }
            }
            if(this.bossindic == 0){
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
            }
           for(var i = 0; i < this.projectiles.getChildren().length; i++){
             var beam = this.projectiles.getChildren()[i];
             beam.update();
            }
           
           
   
            if(this.g == 0 && this.bossindic !== 1 && this.bossindic !== 2){
                this.bulletCountLabel.text = "BULLETS: " + globalBullets;
                this.livesLabel.x = 110
                this.livesLabel.y = 5
                this.livesLabel.setScale(1);
                this.livesLabel.text = "LIVES: " + globalHealth;
                this.scoreLabel.text = "SCORE: " + globalScoreFormated;
            }
            if(this.bossindic >= 1){
                this.livesLabel.x = 10
                this.livesLabel.text = "LIVES: " + globalHealth;
                this.bossHealthLabel.text = "BOSS: " + this.bossHealth;
            }
            if(this.g == 1 && this.bossindic == 0){
                this.bulletCountLabel.text = "PATRONY: " + globalBullets;
                this.livesLabel.x = 96
                this.livesLabel.y = 6
                this.livesLabel.setScale(0.93);
                this.livesLabel.text = "JESTVOVANIE: " + globalHealth;
                this.scoreLabel.text = "GROSE: " + globalScoreFormated;
            }
            if (globalHealth === 0){
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
           if(this.shopTimerDelay == 0){
             this.sound.stopAll();
             this.scene.start("Shop2");
           }
          
        }
        hurtPlayer(player, enemy){
            console.log("collision");
            if(this.bgspeed == 0.5){
                if(this.player.alpha == 1){
                    if (player.texture.key !== "shieldp") {
                        this.resetShipPos(enemy);
                        this.explosionSound.play({volume: 0.25});
                    
                        if(globalHealth > 0){
                            globalHealth -= 1;
                        }
                        
                    
                        if(this.bossindic == 0){
                            player.disableBody(true,true);
                        }
                    var explosion = new Explosion(this, player.x, player.y);
                    this.resetPlayer();
                    
                
                }
            }
        } 
       
    }
        speedbg(){
            if(this.bossindic == 0){
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
                            this.speeds1 = 2.5;
                            this.speeds2 = 3.5;
                            this.speeds3 = 4.5;
                        },
                        callbackScope: this,
                    }); 
                
                }
            }
            else{
                this.bgspeed = 0.5;
                this.speeds1 = 2.5;
                this.speeds2 = 3.5;
                this.speeds3 = 4.5;
            }
           
        }
       
        shootBeam(){
            if(this.canShoot == true){
                if (globalBullets > 0) {
                    var beam = new Beam(this);
                    this.beamSound.play({volume: 0.25});
                    globalBullets--;
                }
                else {
                    this.ammoSound.play({volume: 1});
                }
            }
           
        } 
        shootValaska(){
           
            // var valaska = new Valaska(this, this.player.x, this.player.y);
            // valaska.setScale(0.5);
            // valaska.update();
        } 

        movePlayerManager(){
            if(this.b == 0){
                if(this.bgspeed !== 5) {
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
        }
        resetShipPos(ship){
            if(this.bossindic == 0){
            ship.y = 0;
            var randomX = Phaser.Math.Between(0, config.width);
            ship.x = randomX;
            }
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
            globalScoreFormated = this.zeroPad(this.score, 6);
            this.scoreLabel.text = "SCORE " + globalScoreFormated;
            this.explosionSound.play({volume: 0.25});
            if (Phaser.Math.RND.between(0, 1) === 1){
                globalBullets += 2; 
            }    
        }
        hitEnemy3(projectile, enemy){
            
            this.bossHealth -= 0.5;
            projectile.destroy();
            this.bossHealthLabel.text = "BOSS: " + this.bossHealth;
            
        }
        destroyEnemy(valaska, enemy){
            if(this.bossindic == 0){
                var explosion = new Explosion(this, enemy.x, enemy.y);
                this.resetShipPos(enemy);
                this.score = globalScoreFormated;
                const intNumber = parseInt(this.score);
                this.score = intNumber;
                this.score += 4;
                globalScoreFull += 4;
                globalScoreFormated = this.zeroPad(this.score, 6);
                this.scoreLabel.text = "GROSE " + globalScoreFormated;
            }
           
        }
        hitEnemy1(player, enemy){

        var explosion = new Explosion(this, enemy.x, enemy.y);
        this.resetShipPos(enemy);
        globalScoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + globalScoreFormated;
        this.explosionSound.play({volume: 0.25});  
    }  
        zeroPad(number, size){
            var stringNumber = String(number);
            while(stringNumber.length < (size || 2)){
                stringNumber = "0" + stringNumber;
            }
            return stringNumber;
        }
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
                var remainingTime = Math.max(this.boostDuration - (this.time.now - this.boostStartTime), 0);
                const indicatorWidth = config.width * remainingTime / this.boostDuration;
                this.boostIndicator.setSize(indicatorWidth, 20);
                if (remainingTime <= 0) {
                    this.boostIndicator.visible = false;
                }
                if(this.bossindic >= 1){
                    this.boostActive = false;
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
             
                var remainingTime = Math.max(this.shieldDuration + 5000 - (this.time.now - this.shieldStartTime), 0);
                const indicatorWidth = config.width * remainingTime / (this.shieldDuration + 5000);
                this.shieldIndicator.setSize(indicatorWidth, 20);
                
                if (remainingTime <= 0) {
                    this.shieldIndicator.visible = false;
                }
                if(this.bossindic >= 1){
                    this.shieldActive = false
                    this.shieldIndicator.visible = false;
                }
            }
          
        }
        shieldik() {
            this.shieldIndicator.visible = true;
          
            this.shieldActive = true;
            if(this.bossindic >= 1){
                this.shieldActive = false
                this.shieldIndicator.visible = false;
            }
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
        
            this.tweens.add({
                targets: this.music,
                volume: 0,
                duration: 1000, 
                onComplete: () => {
                    this.sound.stopAll(); 
                    this.hudba = this.sound.add("bossfight",{volume: 0.25, loop: true});
                    this.hudba.play();
                }
            });
            this.canShoot = false;
            this.bossindic = 1;
            this.boss = this.add.sprite(128,-20, "boss");
            this.boss.angle = 180;
            this.boss.setScale(2);
            this.player.setTexture("player");
            this.player.play("thrust")
            this.ship1.destroy();
            this.ship2.destroy();
            this.ship3.destroy();
            this.graphics.destroy();
            this.scoreLabel.destroy();
            this.bulletCountLabel.destroy();
            this.livesLabel.text = "LIVES: " + globalHealth;
            this.livesLabel.x = 10;
            this.livesLabel.setScale(1.25);
            this.bossHealthLabel = this.add.bitmapText(180,5, "pixelFont", "BOSS: ", 16 );
            this.bossHealthLabel.setScale(1.25);
            
            globalBoost = 0;
            globalHalusky = 0;
            globalBullets = 0;
            globalShields = 0;
            globalHealth = 10;
            this.time.addEvent({
                delay: 500,
                callback: async () => {
                    this.speeds1 = 3;
                    this.boss.destroy();
                    this.speeds2 = 3;
                    this.speeds3 = 3;
                    this.ship1 = this.add.sprite(85, 25, "shipb3");
                    this.ship1.play("shipb3_anim");
                    this.ship2 = this.add.sprite(10, 25, "shipb3");
                    this.ship2.play("shipb3_anim");
                    this.ship3 = this.add.sprite(35, 25, "shipb3");
                    this.ship3.play("shipb3_anim");
                    this.ship4 = this.add.sprite(60, 25, "shipb3");
                    this.ship4.play("shipb3_anim");
                    this.ship5 = this.add.sprite(110, 25, "shipb3");
                    this.ship5.play("shipb3_anim");
                    this.ship6 = this.add.sprite(170, 25, "shipb3");
                    this.ship6.play("shipb3_anim");
                    this.ship7 = this.add.sprite(195, 25, "shipb3");
                    this.ship7.play("shipb3_anim");
                    this.ship8 = this.add.sprite(220, 25, "shipb3");
                    this.ship8.play("shipb3_anim");
                    this.ship9 = this.add.sprite(245, 25, "shipb3");
                    this.ship9.play("shipb3_anim");
                    this.enemies.add(this.ship4);
                    this.enemies.add(this.ship5);
                    this.enemies.add(this.ship6);
                    this.enemies.add(this.ship7);
                    this.enemies.add(this.ship8);
                    this.enemies.add(this.ship9);
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 2000,
                callback: async () => {
                    this.speeds1 = 3;
                    this.speeds2 = 3;
                    this.speeds3 = 3;
                    this.ship1 = this.add.sprite(85, 20, "shipb3");
                    this.ship1.play("shipb3_anim");
                    this.ship2 = this.add.sprite(10, 20, "shipb3");
                    this.ship2.play("shipb3_anim");
                    this.ship3 = this.add.sprite(35, 20, "shipb3");
                    this.ship3.play("shipb3_anim");
                    this.ship4 = this.add.sprite(60, 20, "shipb3");
                    this.ship4.play("shipb3_anim");
                    this.ship5 = this.add.sprite(110, 20, "shipb3");
                    this.ship5.play("shipb3_anim");
                    this.ship6 = this.add.sprite(135, 20, "shipb3");
                    this.ship6.play("shipb3_anim");
                    this.ship7 = this.add.sprite(195, 20, "shipb3");
                    this.ship7.play("shipb3_anim");
                    this.ship8 = this.add.sprite(220, 20, "shipb3");
                    this.ship8.play("shipb3_anim");
                    this.ship9 = this.add.sprite(245, 20, "shipb3");
                    this.ship9.play("shipb3_anim");
                    this.enemies.add(this.ship4);
                    this.enemies.add(this.ship5);
                    this.enemies.add(this.ship6);
                    this.enemies.add(this.ship7);
                    this.enemies.add(this.ship8);
                    this.enemies.add(this.ship9);
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 4000,
                callback: async () => {
                    
                    this.speeds1 = 3;
                    this.speeds2 = 3;
                    this.speeds3 = 3;
                    this.ship1 = this.add.sprite(90, 20, "shipb3");
                    this.ship1.play("shipb3_anim");
                    this.ship2 = this.add.sprite(10, 20, "shipb3");
                    this.ship2.play("shipb3_anim");
                    this.ship3 = this.add.sprite(35, 20, "shipb3");
                    this.ship3.play("shipb3_anim");
                    this.ship4 = this.add.sprite(240, 20, "shipb3");
                    this.ship4.play("shipb3_anim");
                    this.ship5 = this.add.sprite(115, 20, "shipb3");
                    this.ship5.play("shipb3_anim");
                    this.ship6 = this.add.sprite(140, 20, "shipb3");
                    this.ship6.play("shipb3_anim");
                    this.ship7 = this.add.sprite(165, 20, "shipb3");
                    this.ship7.play("shipb3_anim");
                    this.ship8 = this.add.sprite(190, 20, "shipb3");
                    this.ship8.play("shipb3_anim");
                    this.ship9 = this.add.sprite(215, 20, "shipb3");
                    this.ship9.play("shipb3_anim");
                    this.enemies.add(this.ship4);
                    this.enemies.add(this.ship5);
                    this.enemies.add(this.ship6);
                    this.enemies.add(this.ship7);
                    this.enemies.add(this.ship8);
                    this.enemies.add(this.ship9);
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 6000,
                callback: async () => {
                    this.speeds1 = 3;
                    this.speeds2 = 3;
                    this.speeds3 = 3;
                    this.ship1 = this.add.sprite(85, 20, "shipb3");
                    this.ship1.play("shipb3_anim");
                    this.ship2 = this.add.sprite(10, 20, "shipb3");
                    this.ship2.play("shipb3_anim");
                    this.ship3 = this.add.sprite(35, 20, "shipb3");
                    this.ship3.play("shipb3_anim");
                    this.ship4 = this.add.sprite(60, 20, "shipb3");
                    this.ship4.play("shipb3_anim");
                    this.ship5 = this.add.sprite(110, 20, "shipb3");
                    this.ship5.play("shipb3_anim");
                    this.ship6 = this.add.sprite(135, 20, "shipb3");
                    this.ship6.play("shipb3_anim");
                    this.ship7 = this.add.sprite(190, 20, "shipb3");
                    this.ship7.play("shipb3_anim");
                    this.ship8 = this.add.sprite(215, 20, "shipb3");
                    this.ship8.play("shipb3_anim");
                    this.ship9 = this.add.sprite(240, 20, "shipb3");
                    this.ship9.play("shipb3_anim");
                    this.enemies.add(this.ship4);
                    this.enemies.add(this.ship5);
                    this.enemies.add(this.ship6);
                    this.enemies.add(this.ship7);
                    this.enemies.add(this.ship8);
                    this.enemies.add(this.ship9);
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 8000,
                callback: async () => {

                    this.d = 1;
                    this.canShoot = true;
                    this.boss = this.add.sprite(128,-20, "boss");
                    this.boss.angle = 180;
                    this.boss.setScale(2);
                    this.bosses.add(this.boss);
                    this.physics.add.overlap(this.projectiles, this.bosses, this.hitEnemy3, this.hitEnemy3, this);
                    globalBullets += 3;
                    this.wave2indic = 1;
                },
                callbackScope: this,
            });
           
                
            
            
        }
        wave2(){
            
            if((this.bossHealth <= 8.5 &&this.wave2indic == 1) || (this.globalBullets == 0  && this.wave2indic == 1)){

                this.time.addEvent({
                    delay: 200,
                    callback: async () => {
                        this.d = 3;
                    },
                    callbackScope: this,
                });
                
                this.time.addEvent({
                    delay: 2000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                        this.boss.destroy();
                        this.canShoot = false;
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 95, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 120, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 145, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 215, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                      
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 5000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                       
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 140, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 165, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 190, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 215, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                      
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 8000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                       
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 140, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 165, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 190, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 215, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                      
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 11000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                       
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 95, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 120, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 145, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 170, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 14000,
                    callback: async () => {
                        this.d = 4;
                        this.c = 1;
                       this.wave2indic = 2;
                        this.boss = this.add.sprite(128,-20, "boss");
                        this.boss.angle = 180;
                        this.boss.setScale(2);
                        this.bosses.add(this.boss);
                        this.physics.add.overlap(this.projectiles, this.bosses, this.hitEnemy3, this.hitEnemy3, this);
                        globalBullets += 3;
                        this.canShoot = true;
                        this.player.angle = 0;
                    },
                    callbackScope: this,
                });
            }
            
        }
        wave3(){ 
            if((this.bossHealth <= 4 &&this.wave2indic == 2) || (this.globalBullets == 0  && this.wave2indic == 2) ){
                this.time.addEvent({
                    delay: 200,
                    callback: async () => {
                        this.c = 3;
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 2000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                        this.canShoot = false;
                        this.boss.destroy();
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 95, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 120, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 145, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 215, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 6000,
                    callback: async () => {
                        this.player.angle = 0;
                        this.bossindic = 1;
                        this.speeds1 = 1;
                        this.speeds2 = 1;
                        this.speeds3 = 1;
                        this.ship1 = this.add.sprite(85, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 20, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(35, 20, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(60, 20, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(110, 20, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(135, 20, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(160, 20, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(185, 20, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(210, 20, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship10 = this.add.sprite(235, 20, "shipb3");
                        this.ship10.play("shipb3_anim");
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                        this.enemies.add(this.ship10);
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 8000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 140, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 165, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 190, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 215, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);
                        
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 11000,
                    callback: async () => {
                        this.player.angle = -90
                        this.wave2indic = 0;
                        this.bossindic = 2;
                        this.speeds1 = 1.5;
                        this.speeds2 = 1.5;
                        this.speeds3 = 1.5;
                        this.ship1 = this.add.sprite(10, 20, "shipb3");
                        this.ship1.play("shipb3_anim");
                        this.ship2 = this.add.sprite(10, 45, "shipb3");
                        this.ship2.play("shipb3_anim");
                        this.ship3 = this.add.sprite(10, 70, "shipb3");
                        this.ship3.play("shipb3_anim");
                        this.ship4 = this.add.sprite(10, 95, "shipb3");
                        this.ship4.play("shipb3_anim");
                        this.ship5 = this.add.sprite(10, 120, "shipb3");
                        this.ship5.play("shipb3_anim");
                        this.ship6 = this.add.sprite(10, 145, "shipb3");
                        this.ship6.play("shipb3_anim");
                        this.ship7 = this.add.sprite(10, 170, "shipb3");
                        this.ship7.play("shipb3_anim");
                        this.ship8 = this.add.sprite(10, 240, "shipb3");
                        this.ship8.play("shipb3_anim");
                        this.ship9 = this.add.sprite(10, 265, "shipb3");
                        this.ship9.play("shipb3_anim");
                        this.ship1.angle = 270
                        this.ship2.angle = 270
                        this.ship3.angle = 270
                        this.ship4.angle = 270
                        this.ship5.angle = 270
                        this.ship6.angle = 270
                        this.ship7.angle = 270
                        this.ship8.angle = 270
                        this.ship9.angle = 270
                        this.enemies.add(this.ship4);
                        this.enemies.add(this.ship5);
                        this.enemies.add(this.ship6);
                        this.enemies.add(this.ship7);
                        this.enemies.add(this.ship8);
                        this.enemies.add(this.ship9);    
                    },
                    callbackScope: this,
                });
                this.time.addEvent({
                    delay: 14000,
                    callback: async () => {
                        this.ship1.destroy();
                        this.boss.destroy();
                        this.ship2.destroy();
                        this.ship3.destroy();
                        this.ship4.destroy();
                        this.ship5.destroy();
                        this.ship6.destroy();
                        this.ship7.destroy();
                        this.ship8.destroy();
                        this.ship9.destroy();
                        this.ship10.destroy();
                        this.c = 1;
                        this.wave4();
                    },
                    callbackScope: this,
                });
            }
        }
        wave4(){
            this.time.addEvent({
                delay: 2000,
                callback: async () => {
                this.c = 5;
                this.player.angle = 270;
                this.boss = this.add.sprite(20,200, "boss");
                this.boss.angle = 90;
                this.boss.setScale(2);
                this.bosses.add(this.boss);
                this.physics.add.overlap(this.projectiles, this.bosses, this.hitEnemy3, this.hitEnemy3, this);
                this.canShoot = true;
                this.b = 1;
                }
            });
            this.time.addEvent({
                delay: 3000,
                callback: async () => {
                    this.sound.stopAll();
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                        this.scene.start("finale")
                    });
                }
            }); 
        }
    }
