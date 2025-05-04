var config = {
    width: 256,
    height: 272,
    backgroundColor: '#4488aa',
}
class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene){

        var x = 205;
        var y = 236;
    
        super(scene, x,y, "bullet");
        scene.add.existing(this);
        this.play("bullet_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = - 250;
        scene.projectiles.add(this);
        this.angle = -90
    }
    update(){
        
    }
}
class finale extends Phaser.Scene {
    constructor(){
        super("finale");
        this.dialogik = 1;
        this.g = 0;
        this.d = 7;
    }
    create(){
        this.background = this.add.tileSprite(0,0, config.width, config.height, "endingbg");
        this.background.setOrigin(0,0);
        this.player = this.add.sprite(266, 240, "walk");
        this.character3 = this.add.sprite(-30, 230, "character1");
        this.characters = this.physics.add.group();
        this.characters.add(this.player);
        this.characters1 = this.physics.add.group();
        this.characters1.add(this.character3);
        this.dialogus = this.sound.add("finale", {volume: 0.25});
        var musicConfig2 = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.dialogus.play(musicConfig2);
        this.projectiles = this.add.group();
        this.physics.add.collider(this.projectiles, this.characters1, this.handleCollision, null, this);
      

        this.time.addEvent({
            delay: 250,
            callback: this.CharacterAnimation,
            callbackScope: this,
            loop: true
        });
        this.time.addEvent({
            delay: 250,
            callback: this.CharacterAnimation1,
            callbackScope: this,
            loop: true
        });
        this.time.addEvent({
            delay: 250,
            callback: this.CharacterAnimation2,
            callbackScope: this,
            loop: true
        });
        
        this.time.addEvent({
            delay: 250,
            callback: this.moveShip,
            callbackScope: this,
            loop: true,
            args: [this.characters, -4] 
        });
        this.time.addEvent({
            delay: 250,
            callback: this.moveShip1,
            callbackScope: this,
            loop: true,
            args: [this.characters1, 4] 
        });
        this.time.addEvent({
            delay: 5000,
            callback: this.dialogueStart,
            callbackScope: this,
            loop: false,
            
        });
        this.time.addEvent({
            delay: 9225,
            callback: this.dialogue2,
            callbackScope: this,
            loop: false,
            
        });
        this.time.addEvent({
            delay: 20140,
            callback: this.dialogue3,
            callbackScope: this,
            loop: false,
            
        });
        this.time.addEvent({
            delay: 23140,
            callback: this.dialogue4,
            callbackScope: this,
            loop: false,
            
        });
       

    }
    
    
    CharacterAnimation(){
        if(this.player.x >= 216){
            this.characters.children.iterate(function (child) {
                switch (child.texture.key) {
                    case "walk":
                        child.setTexture("stay");
                        break;
                        case "stay":
                            child.setTexture("walk");
                            break;
                
                }
            });
        }
    }
    CharacterAnimation1(){
        if(this.player.x >= 216 ){
            this.characters1.children.iterate(function (child) {
                 switch (child.texture.key) {
                    case "character1":
                        child.setTexture("character2");
                        break;
                    case "character2":
                        child.setTexture("character3");
                        break;
                    case "character3":
                        child.setTexture("character4");
                        break;
                    case "character4":
                        child.setTexture("character1");
                        break;
                
                }
            });
        }
    }
    CharacterAnimation2(){
        if(this.g == 1){
            
                this.characters.children.iterate(function (child) {
                    switch (child.texture.key) {
                        case "down":
                            child.setTexture("up");
                            break;
                        case "up":
                            child.setTexture("down");
                            break;
                    }
                });
        
        }
    }

    moveShip(characters, speed){
        if(this.player.x >= 216){
            characters.children.iterate(function (child) {
                child.x += speed;
            });
        }
    }
    moveShip1(characters1, speed){
        if(this.player.x >= 216){
            characters1.children.iterate(function (child) {
                child.x += speed;
            });
        }
    }
    typewriteBitmapText(text)
    {
        this.phonedialog.setText(text)
    
        const bounds = this.phonedialog.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText2(text)
    {
        this.phonedialog2.setText(text)
    
        const bounds = this.phonedialog2.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog2.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog2.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText3(text)
    {
        this.phonedialog3.setText(text)
    
        const bounds = this.phonedialog3.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog3.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog3.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText4(text)
    {
        this.phonedialog4.setText(text)
    
        const bounds = this.phonedialog4.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog4.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog4.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText5(text)
    {
        this.phonedialog5.setText(text)
    
        const bounds = this.phonedialog5.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog5.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog5.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText6(text)
    {
        this.phonedialog6.setText(text)
    
        const bounds = this.phonedialog6.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog6.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog6.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText7(text)
    {
        this.phonedialog7.setText(text)
    
        const bounds = this.phonedialog7.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog7.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog7.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteBitmapText8(text) {
        if (!this.allowTypewrite8) {
            return;
        }
    
        this.phonedialog8.setText(text);
    
        const bounds = this.phonedialog8.getTextBounds(false);
        const wrappedText = bounds['wrappedText'] || text;
    
        this.phonedialog8.setText('');
    
        const length = wrappedText.length;
        let i = 0;
        const shakeConfig = {
            duration: 50,
            repeat: -1,
            ease: 'Power0',
            yoyo: true
        };
    
        const shakeTween = this.tweens.add({
            targets: this.phonedialog8,
            x: '-=2',
            y: '-=2',
            paused: true,
            ...shakeConfig
        });
    
        this.time.addEvent({
            callback: () => {
                shakeTween.play();
                this.phonedialog8.text += wrappedText[i];
                ++i;
            },
            repeat: length - 1,
            delay: 500,
            onComplete: () => {
                shakeTween.stop();
                this.allowTypewrite8 = false;
            }
        });
    }
    typewriteBitmapText9(text)
    {
        this.phonedialog9.setText(text)
    
        const bounds = this.phonedialog9.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog9.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.phonedialog9.text += wrappedText[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    dialogueStart(){
        this.dialog = this.add.tileSprite(0,10, config.width, 96, "dialogue");
        this.dialog.setOrigin(0,0);
        this.admiral = this.add.sprite(40, 60, "admiralcak");
        this.phonedialog = this.add.bitmapText(82,32, "pixelFont", " ", 19);
        this.phonedialog2 = this.add.bitmapText(82,52, "pixelFont", "", 19);
        this.phonedialog3 = this.add.bitmapText(82,40, "pixelFont", "", 19);
        this.phonedialog4 = this.add.bitmapText(82,67, "pixelFont", "", 19);
        this.phonedialog5 = this.add.bitmapText(82,84, "pixelFont", " ", 19);
       
        this.typewriteBitmapText( " What happened he- ");
        this.time.addEvent({
            delay: 1000,
            callback: async () => {
                await this.typewriteBitmapText2("Wait.. who are you? ");
               
            },
            callbackScope: this,
        });
   
        
        this.dialogik = 2

    }
    dialogue2(){
        if(this.dialogik = 2){
            this.admiral.destroy();
            this.phonedialog.destroy();
            this.phonedialog2.destroy();
            this.admiral = this.add.sprite(40, 60, "mlok");
            this.admiral.setScale(1);
            this.phonedialog = this.add.bitmapText(82,32, "pixelFont", " ", 19);
            this.phonedialog2 = this.add.bitmapText(100,32, "pixelFont", "", 19);
            this.phonedialog3 = this.add.bitmapText(82,52, "pixelFont", "", 19);
            this.phonedialog4 = this.add.bitmapText(82,67, "pixelFont", "", 19);
            this.phonedialog5 = this.add.bitmapText(82,84, "pixelFont", " ", 19);
            this.time.addEvent({
                delay: 1000,
                callback: async () => {
                    await this.typewriteBitmapText2("Stuhleck 008 ");
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 2225,
                callback: async () => {
                    await this.typewriteBitmapText3("And I am here to ki-");
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 3445,
                callback: async () => {
                    
                    
                    this.player.setTexture("load");
                    this.shuut = this.sound.add("shootend", {volume: 1});
                    this.shuut.play();
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 4492,
                callback: async () => {
                    
                    
                    this.player.setTexture("shut");
                    var bullet = new Bullet(this);
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 5192,
                callback: async () => {
                    
                    
                    this.player.setTexture("shut");
                    var bullet = new Bullet(this);
                   
                },
                callbackScope: this,
            });
             this.time.addEvent({
                delay: 5568,
                callback: async () => {
                    
                    
                    var bullet = new Bullet(this);
                    
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 5809,
                callback: async () => {
                    
                    
                    var bullet = new Bullet(this);
                   
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 6387 ,
                callback: async () => {
                    
                    
                    var bullet = new Bullet(this);
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 6629,
                callback: async () => {
                    
                    
                    var bullet = new Bullet(this);
                    
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 6862,
                callback: async () => {
                    
                    
                    var bullet = new Bullet(this);
                    
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 7092,
                callback: async () => {
                    
                    this.character3.setTexture("0");
                    this.player.setTexture("load");
                    
                   
                },
                callbackScope: this,
            });
            this.dialogik=3;
        }
    }
    dialogue3(){
        if(this.dialogik == 3){
            this.admiral.destroy();
            this.phonedialog.destroy();
            this.phonedialog2.destroy();
            this.phonedialog3.destroy();
            this.admiral = this.add.sprite(40, 60, "admiralcak");
            this.admiral.setScale(1);
            this.phonedialog = this.add.bitmapText(82,32, "pixelFont", " ", 19);
            this.phonedialog2 = this.add.bitmapText(100,32, "pixelFont", "", 19);
            this.phonedialog3 = this.add.bitmapText(82,52, "pixelFont", "", 19);
            this.phonedialog4 = this.add.bitmapText(82,67, "pixelFont", "", 19);
            this.phonedialog5 = this.add.bitmapText(82,84, "pixelFont", " ", 19);
            this.time.addEvent({
                delay: 1000,
                callback: async () => {
                    await this.typewriteBitmapText2("Bye Bye ");
                   
                },
                callbackScope: this,
            });
            this.dialogik = 4;
        }
    }
    dialogue4(){
        if(this.dialogik == 4){
            this.admiral.destroy();
            this.phonedialog.destroy();
            this.phonedialog2.destroy();
            this.phonedialog3.destroy();
            this.dialog.destroy();
            this.time.addEvent({
                delay: 1000,
                callback: async () => {
                    this.player.setTexture("down");
                    this.player.y -= 10 
                    this.g = 1;
                    
                   
                },
                callbackScope: this,
            });
            this.time.addEvent({
                delay: 3000,
                callback: async () => {
                    this.sound.stopAll()
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                       this.scene.start("credits")
                    });
                },
                callbackScope: this,
            });
           
        }
    }
    
 
    handleCollision(bullet, characters) {
        this.d -= 1;
       this.v = 1;
        bullet.destroy(); 
    }
    update(){
        if(this.d == 6){
            this.character3.setTexture("6")
        }
        if(this.d == 5){
            this.character3.setTexture("5")
        }
        if(this.d == 4){
            this.character3.setTexture("4")
        }
        if(this.d == 3){
            this.character3.setTexture("3")
        }
        if(this.d == 2){
            this.character3.setTexture("1")
        }
        if(this.d == 1){
            this.character3.setTexture("0")
        }
        if(this.d <= 0){
            this.character3.setTexture("0")
        }
        if(this.v == 1){
            this.character3.x = 20;
        }
    }

    
    
}