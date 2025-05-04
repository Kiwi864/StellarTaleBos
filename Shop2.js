class Shop2 extends Phaser.Scene {
    constructor(){
        super("Shop2");
         
        this.gameConfig = config;
        this.ammoindicator = 0;
        this.boostindicator = 0;
    }
    create(){
        
        this.shopbg = this.add.tileSprite(0,0, config.width, config.height, "shop2");
        var graphics = this.add.graphics();
        
    
        graphics.fillStyle("Black");
        graphics.fillRect(0,0,115,20);
       this.lukrat = this.add.sprite(110,225, "lukrat").setInteractive();
        
        this.lukrat3 = this.add.sprite(200,225, "lukrat").setInteractive();
        this.ammobox = this.add.sprite(110,230, "ammobox");
        
        this.boost = this.add.sprite(200,230, "halusky");
       this.score = this.add.bitmapText(5,5,"pixelFont3", "SCORE: ", 20);
       this.zelezo = this.add.sprite(210,25, "zelezo").setInteractive();
    

        this.shopbg.setOrigin(0,0);
        this.musik = this.sound.add("china", {volume: 0.25});
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.musik.play(musicConfig);
       
       
      
        this.lukrat.on('pointerover', () => {
            this.zelezo.destroy();
            this.textbg = this.add.sprite(205,70, "textbg");
            this.textbg.setScale(1.4);
            this.textbg.setAlpha(0.8);
            this.lukrat.setScale(1.1);
            this.ammobox.setScale(1.1);
            this.amoo = this.add.bitmapText(180,20, "pixelFont", "AMMOBOX", 16 );
            this.amooo = this.add.bitmapText(180,35, "pixelFont", "This item ", 14 );
            this.amo = this.add.bitmapText(180,50, "pixelFont", "gives you a   ", 14 );
            this.amom = this.add.bitmapText(175,65, "pixelFont", " bonus of 10  ", 14 );
            this.mol = this.add.bitmapText(185,80, "pixelFont", " bullets ", 14 );
            this.a = this.add.bitmapText(167,110, "pixelFont", " COST: 100 points", 14 );
        });
        this.lukrat.on('pointerdown', () => {
            if(globalScoreFormated >= 100){
                globalScoreFormated -= 100
                globalScoreFormated = this.zeroPad(globalScoreFormated, 6);
                globalBullets += 10;
            }
            else {
                this.tweens.add({
                    targets: [this.lukrat, this.ammobox],
                    x: this.lukrat.x + 5, 
                    y: this.lukrat.y + 5,
                    duration: 50, 
                    yoyo: true,
                    repeat: 5, 
                });
                this.lukrat.setTint(0xff0000); 
                this.time.delayedCall(500, () => { 
                    this.lukrat.clearTint();
                });
            }
        });


        this.lukrat.on('pointerout', () => {
            this.zelezo = this.add.sprite(215,25, "zelezo").setInteractive();
            this.setupZelezoListeners();
            this.lukrat.setScale(1); 
            this.textbg.destroy();
            this.ammobox.setScale(1);
            this.amoo.destroy();
            this.amooo.destroy();
            this.amo.destroy();
            this.amom.destroy();
            this.mol.destroy();
            
            this.a.destroy();
            this.zelezo.visible = true;
        });

       

        this.lukrat3.on('pointerover', () => {
            this.zelezo.destroy();
            this.textbg = this.add.sprite(205,70, "textbg");
            this.textbg.setScale(1.4);
            this.textbg.setAlpha(0.8);
            this.lukrat3.setScale(1.1);
            this.boost.setScale(1.1);
            this.amoo = this.add.bitmapText(180,20, "pixelFont", "HALUSKY", 16 );
            this.amooo = this.add.bitmapText(180,35, "pixelFont", "This item ", 14 );
            this.amo = this.add.bitmapText(177,50, "pixelFont", " turns you ", 14 );
            this.amom = this.add.bitmapText(177,65, "pixelFont", "into a proud ", 14 );
            this.amomf = this.add.bitmapText(180,80, "pixelFont", "Slovak man", 14 );
            this.mol = this.add.bitmapText(170,95, "pixelFont", "  ", 14 );
            this.amol = this.add.bitmapText(163,110, "pixelFont", "Activated by G", 15 );
            this.a = this.add.bitmapText(170,95, "pixelFont", " COST: 1000 points", 14 );
        });
        this.lukrat3.on('pointerdown', () => {
            if(globalScoreFormated >= 1000){
                globalScoreFormated -= 1000
                globalScoreFormated = this.zeroPad(globalScoreFormated, 6);
                globalHalusky += 1;
            }  else {
                this.tweens.add({
                    targets: [this.lukrat3, this.boost],
                    x: this.lukrat3.x + 5, 
                    y: this.lukrat3.y + 5,
                    x: this.boost.x + 5,
                    y: this.boost.y + 5, 
                    duration: 50, 
                    yoyo: true,
                    repeat: 5, 
                });
                this.lukrat3.setTint(0xff0000); 
                this.time.delayedCall(500, () => { 
                    this.lukrat3.clearTint();
                });
            }
        });


        this.lukrat3.on('pointerout', () => {   
            this.zelezo = this.add.sprite(215,25, "zelezo").setInteractive();
            this.setupZelezoListeners();
            this.lukrat3.setScale(1); 
            this.boost.setScale(1);
            this.textbg.destroy();
            this.amoo.destroy();
            this.amooo.destroy();
            this.amo.destroy();
            this.amom.destroy();
            this.mol.destroy();
            this.amol.destroy();
            this.a.destroy();
            this.amomf.destroy();
        });
       this.setupZelezoListeners();
      
      
    }
    update(){
        this.score.text = "SCORE: " + globalScoreFormated;  
        if(this.ammobox.y > 272){
            globalBullets += 100;
            this.ammobox.destroy();

        }
        if(this.boost.y > 272){
            
            this.boost.destroy();

        }
       
        
    }
    setupZelezoListeners() {
        this.zelezo.on('pointerdown', () => {
            this.sound.stopAll();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start("level3");
            });
        });
    }
    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}