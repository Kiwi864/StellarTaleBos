var config = {
    width: 256,
    height: 272,
    backgroundColor: '#4488aa',
}
class cutscene extends Phaser.Scene {
    constructor(){
        super("cutscene");
        this.gameConfig = config;
        this.allowTypewrite8 = true;
        this.dialogik = 1;
    }
    create(){
        this.background = this.add.tileSprite(0,0, config.width, config.height, "backgroundcut");
        this.background.setOrigin(0,0);
        this.skip = this.add.bitmapText(146,10, "pixelFont", "PRESS Z TO SKIP ", 19);
        this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.character3 = this.add.sprite(-80, 230, "character1");
        this.character1 = this.add.sprite(-100, 220, "character2");
        this.character2 = this.add.sprite(-90, 240, "character3");
        this.character4 = this.add.sprite(-120, 210, "character4");
      
        this.characters = this.physics.add.group();
        this.characters.add(this.character1);
        this.characters.add(this.character2);
        this.characters.add(this.character3);
        this.characters.add(this.character4);
        this.time.addEvent({
            delay: 250,
            callback: this.CharacterAnimation,
            callbackScope: this,
            loop: true
        });
        this.cut = this.sound.add("cutsound");
        this.cut.on("complete",function(){this.startNextSound();}, this);
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.cut.play(musicConfig)
        console.log("cut");
        this.time.addEvent({
            delay: 250,
            callback: this.moveShip,
            callbackScope: this,
            loop: true,
            args: [this.characters, 4] 
        });
        this.time.addEvent({
            delay: 24000,
            callback: this.dialogueStart,
            callbackScope: this,
            loop: false,
            
        });
        this.time.addEvent({
            delay: 35300,
            callback: this.dialogue2,
            callbackScope: this,
            loop: true,
            
        });
        this.time.addEvent({
            delay: 47300,
            callback: this.dialogue3,
            callbackScope: this,
            loop: true,
            
        });
        this.time.addEvent({
            delay: 52300,
            callback: this.dialogue4,
            callbackScope: this,
            loop: true,
            
        });
        this.time.addEvent({
            delay: 57300,
            callback: this.dialogue5,
            callbackScope: this,
            loop: true,
            
        });
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.ZKey)){
            this.sound.stopAll();
            this.scene.start("playGame");
        }
    }
    startNextSound(){
        this.nextSound = this.sound.add("sirens");
        this.emergency = this.sound.add("emergency");
        this.emergency.setLoop(true);
       
        this.emergency.play();
        this.nextSound.play();
        
    }
    moveShip(characters, speed){
        characters.children.iterate(function (child) {
            child.x += speed;
        });
       
    }
    CharacterAnimation(){
        this.characters.children.iterate(function (child) {
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
    delay(ms) {
        return new Promise(resolve => {
            this.time.delayedCall(ms, resolve, [], this);
        });
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


    async dialogueStart(){
        
        this.background.destroy();
        this.character1.destroy();
        this.character2.destroy();
        this.character3.destroy();
        this.character4.destroy();
        this.sound.stopAll();
        this.dialogus = this.sound.add("dialogb", {volume: 0.25});
        var musicConfig2 = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.dialogus.play(musicConfig2);
        await this.delay(1000);
        this.dialog = this.add.tileSprite(0,170, config.width, 96, "dialogue");
        this.dialog.setOrigin(0,0);
        this.phone = this.add.sprite(40, 220, "phone");
        this.phonedialog = this.add.bitmapText(82,176, "pixelFont", " ", 19);
        this.phonedialog2 = this.add.bitmapText(82,193, "pixelFont", "", 19);
        this.phonedialog3 = this.add.bitmapText(82,210, "pixelFont", "", 19);
        this.phonedialog4 = this.add.bitmapText(82,227, "pixelFont", "", 19);
        this.phonedialog5 = this.add.bitmapText(82,244, "pixelFont", " ", 19);
        this.typewriteBitmapText( "    Good Evening mr ");
        this.time.addEvent({
            delay: 1000,
            callback: async () => {
                await this.typewriteBitmapText2("Sergej Govic. We need to ");
               
            },
            callbackScope: this,
        });
        this.time.addEvent({
            delay: 2225,
            callback: async () => {
             this.typewriteBitmapText3( "inform you that 4 robots ");
               
            },
            callbackScope: this,
        });
        this.time.addEvent({
            delay: 3500,
            callback: async () => {
                await this.typewriteBitmapText4( "escaped the facility this ");
               
            },
            callbackScope: this,
        });
       
        this.time.addEvent({
            delay: 4000,
            callback: async () => {
                await this.typewriteBitmapText5( "                evening. ");
               
            },
            callbackScope: this,
        });   
       
           
       this.dialogik = 2
        
        }   
    dialogue2(){
        if(this.dialogik === 2){  
            this.phonedialog.destroy();
            this.phonedialog2.destroy();
            this.phonedialog3.destroy();
            this.phonedialog4.destroy();
            this.phonedialog5.destroy();
            this.phonedialog6 = this.add.bitmapText(82,193, "pixelFont", "", 19);
            this.phonedialog7 = this.add.bitmapText(82,210, "pixelFont", "", 19);
            this.phonedialog8 = this.add.bitmapText(82,227, "pixelFont2", "", 19);
            this.time.addEvent({
                delay: 200,
                callback: async () => {
                    this.typewriteBitmapText6( "We need you to bring ");
                
                },
                callbackScope: this,
            });  
            this.time.addEvent({
                delay: 1400,
                callback: async () => {
                    this.typewriteBitmapText7( "supply to the station ");
                
                },
                callbackScope: this,
            });  
            this.time.addEvent({
                delay: 2500,
                callback: async () => {
                    this.typewriteBitmapText8( "     Kalna Roztoka ");
                
                },
                callbackScope: this,
            });  
            
            
            this.dialogik = 3;
        }
    }
    dialogue3(){
        if(this.dialogik === 3){
            this.phone.destroy();
            this.phonedialog6.destroy();
            this.phonedialog7.destroy();
            this.phonedialog8.destroy();
            this.phonedialog9 = this.add.bitmapText(103,210, "pixelFont", "", 19);
            this.admiral = this.add.sprite(40, 220, "admiralcak");
            this.time.addEvent({
                delay: 200,
                callback: async () => {
                    this.typewriteBitmapText9( "ok ");
                
                },
                callbackScope: this,
            });
            this.dialogik = 4;
        }  
    }
    dialogue4(){
        if(this.dialogik === 4){
            this.admiral.destroy();
            this.phonedialog9.destroy();
            this.dialog.destroy();
            this.skip.destroy();
            this.gameStart = this.add.bitmapText(20,96, "pixelFont", "STELLAR TALE", 50);
            this.dialogik = 5;
        }
    }
    dialogue5(){
        if(this.dialogik === 5){
            this.sound.stopAll();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start("playGame")
            });
        }
    }
}