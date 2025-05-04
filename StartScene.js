var config = {
    width: 256,
    height: 272,
    backgroundColor: '#4488aa',
}
class Start extends Phaser.Scene {
    constructor(){
        super("start");
        this.gameConfig = config;
       
        
        
    }
    //preload(){
    //    this.load.audio("intro", ["assets/sounds/intro.ogg", "assets/sounds/intro.mp3"]);
   // }
    create(){
        this.gameStart = this.add.bitmapText(57,96, "pixelFont", "STELLAR TALE", 30);
        this.startinstruciton = this.add.bitmapText(45,126, "pixelFont", "PRESS SPACE TO CONTINUE ", 18);
        this.movement = this.add.bitmapText(10,256, "pixelFont", "MOVEMENT - ARROWS ", 18);
        this.shooting = this.add.bitmapText(10,236, "pixelFont", "SHOOTING - SPACE ", 18);
        this.credits = this.add.bitmapText(10, 10, "pixelFont", "MADE BY: SAMUEL TAMAS ", 18);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.intro = this.sound.add("intro");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.intro.play(musicConfig)
        console.log(this.cache.audio.entries);
        
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("cutscene");
            this.sound.stopAll();
        }
        
    }
}