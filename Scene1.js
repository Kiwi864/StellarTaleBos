    class Scene1 extends Phaser.Scene {
        constructor(){
            super("bootGame");
        }
       
        
       preload(){
            this.load.image("background", "assets/images/background.png");
            this.load.image("background2", "assets/images/background2.png");
            this.load.image("dialogue", "assets/images/dialogueM.png");
            this.load.image("backgroundcut", "assets/images/backgroundcut.png");
            this.load.image("shopijk", "assets/images/shopgb.png");
            this.load.image("shopijk2", "assets/images/shopgb2.png");
            this.load.image("shop2", "assets/images/secondshop.png");
            this.load.image("space", "assets/images/Space.png");
            this.load.image("endingbg", "assets/images/endingbg.png");
           
            this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
                frameWidth: 16,
                frameHeight: 16
            });
            this.load.spritesheet("shipk", "assets/spritesheets/shipk.png",{
                frameWidth: 16,
                frameHeight: 16
            });
            this.load.spritesheet("shipb", "assets/spritesheets/shipb.png",{
                frameWidth: 16,
                frameHeight: 16
            });
            this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
                frameWidth: 32,
                frameHeight: 16
            });
            this.load.spritesheet("shipb2", "assets/spritesheets/shipb2.png",{
                frameWidth: 32,
                frameHeight: 16
            });
            this.load.spritesheet("shipk2", "assets/spritesheets/shipk2.png",{
                frameWidth: 32,
                frameHeight: 16
            });
            this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
                frameWidth: 32,
                frameHeight: 32
            });
            this.load.spritesheet("shipb3", "assets/spritesheets/shipb3.png",{
                frameWidth: 32,
                frameHeight: 32
            });
            this.load.spritesheet("shipk3", "assets/spritesheets/shipk3.png",{
                frameWidth: 32,
                frameHeight: 32
            });
            this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
                frameWidth: 16,
                frameHeight: 16
            });
            this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
                frameWidth: 16,
                frameHeight: 16
            });
            this.load.spritesheet("player", "assets/spritesheets/player.png",{
                frameWidth: 16,
                frameHeight: 24
            });
            this.load.spritesheet("slovak", "assets/spritesheets/slovak.png",{
                frameWidth: 16,
                frameHeight: 24
            });
            this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
                frameWidth: 16,
                frameHeight: 16
            });
            this.load.spritesheet("bullet", "assets/spritesheets/bullet.png",{
                frameWidth: 16,
                frameHeight: 16
            });
           
            this.load.spritesheet("boss", "assets/spritesheets/finalenemy.png",{
                frameWidth: 48,
                frameHeight: 48
            });
            this.load.spritesheet("character1", "assets/spritesheets/maincharacter1.png", {
                frameWidth: 21,
                frameHeight: 43
            });
            this.load.spritesheet("character2", "assets/spritesheets/maincharacter2.png", {
                frameWidth: 21,
                frameHeight: 43
            });
            this.load.spritesheet("character3", "assets/spritesheets/maincharacter3.png", {
                frameWidth: 21,
                frameHeight: 43
            });
            this.load.spritesheet("character4", "assets/spritesheets/maincharacter3.png", {
                frameWidth: 21,
                frameHeight: 43
            });
            this.load.spritesheet("phone", "assets/spritesheets/phone.png", {
                frameWidth: 84,
                frameHeight: 84
            });
            this.load.spritesheet("admiralcak", "assets/spritesheets/sun.png", {
                frameWidth: 54,
                frameHeight: 54
            });
            this.load.spritesheet("ammobox", "assets/spritesheets/ammobox.png", {
                frameWidth: 84,
                frameHeight: 64
            });
            this.load.spritesheet("lukrat", "assets/spritesheets/idk.png", {
                frameWidth: 60,
                frameHeight: 40
            });
            this.load.spritesheet("shield", "assets/spritesheets/shield.png", {
                frameWidth: 84,
                frameHeight: 64
            });
            this.load.spritesheet("boost", "assets/spritesheets/boost.png", {
                frameWidth: 84,
                frameHeight: 64
            });
            this.load.spritesheet("zelezo", "assets/spritesheets/zelezo.png", {
                frameWidth: 60,
                frameHeight: 30
            });
            this.load.spritesheet("shieldp", "assets/spritesheets/playershielda.png",{
                frameWidth: 31,
                frameHeight: 33
            });
            this.load.spritesheet("textbg", "assets/spritesheets/textbg.png",{
                frameWidth: 70,
                frameHeight: 124
            });
            this.load.spritesheet("halusky", "assets/spritesheets/halusky.png",{
                frameWidth: 84,
                frameHeight: 64
            });
            this.load.spritesheet("orol", "assets/spritesheets/orol.png",{
                frameWidth: 300,
                frameHeight: 168
            });
            this.load.spritesheet("valaska", "assets/spritesheets/valaska.png",{
                frameWidth: 100,
                frameHeight: 100
            });
            this.load.spritesheet("walk", "assets/spritesheets/walk.png",{
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("stay", "assets/spritesheets/stay.png",{
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("shut", "assets/spritesheets/shoot.png",{
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("load", "assets/spritesheets/load.png",{
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("down", "assets/spritesheets/down6.png",{
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("up", "assets/spritesheets/down7.png",{
                frameWidth: 64,
                frameHeight: 64
            });
            this.load.spritesheet("mlok", "assets/spritesheets/mlok.png",{
                frameWidth: 54,
                frameHeight: 54
            });
            this.load.spritesheet("6", "assets/spritesheets/6.png", {
                frameWidth: 22,
                frameHeight: 43
            });
            this.load.spritesheet("5", "assets/spritesheets/5.png", {
                frameWidth: 22,
                frameHeight: 43
            });
            this.load.spritesheet("4", "assets/spritesheets/4.png", {
                frameWidth: 22,
                frameHeight: 43
            });
            this.load.spritesheet("3", "assets/spritesheets/3.png", {
                frameWidth: 22,
                frameHeight: 43
            });
            this.load.spritesheet("2", "assets/spritesheets/2.png", {
                frameWidth: 22,
                frameHeight: 43
            });
            this.load.spritesheet("1", "assets/spritesheets/1.png", {
                frameWidth: 22,
                frameHeight: 43
            });
            this.load.spritesheet("0", "assets/spritesheets/0.png", {
                frameWidth: 60,
                frameHeight: 43
            });
            this.load.spritesheet("finalshop", "assets/spritesheets/finaleshop.png", {
                frameWidth: 256,
                frameHeight: 272
            });
            this.load.spritesheet("sergo", "assets/spritesheets/konec.png", {
                frameWidth: 256,
                frameHeight: 272
            });
            this.load.spritesheet("strass", "assets/images/strass.png", {
                frameWidth: 256,
                frameHeight: 272
            });
            
            
            this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
            this.load.bitmapFont("pixelFont2", "assets/font/font2.png", "assets/font/font2.xml");
            this.load.bitmapFont("pixelFont3", "assets/font/font3.png", "assets/font/font3.xml");
            this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
            this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
            this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
            this.load.audio("audio_respawn", ["assets/sounds/respawn.ogg", "assets/sounds/respawn.mp3"]);
            this.load.audio("audio_no_ammo", ["assets/sounds/no ammo.ogg", "assets/sounds/no ammo.mp3"]);
            this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);
            this.load.audio("game_over", ["assets/sounds/game_over.ogg", "assets/sounds/game_over.mp3"]);
            this.load.audio("intro", ["assets/sounds/intro.ogg", "assets/sounds/intro.mp3"]);
            this.load.audio("cutsound", ["assets/sounds/cutscene.ogg", "assets/sounds/cutscene.mp3"]);
            this.load.audio("sirens", ["assets/sounds/sirens.ogg", "assets/sounds/sirens.mp3"]);
            this.load.audio("emergency", ["assets/sounds/emergency.ogg", "assets/sounds/emergency.mp3"]);
            this.load.audio("dialogb", ["assets/sounds/Dramatic_V2.ogg", "assets/sounds/Dramatic_V2.mp3"]);
            this.load.audio("shopm", ["assets/sounds/shop.ogg", "assets/sounds/shop.mp3"]);
            this.load.audio("china", ["assets/sounds/China.ogg", "assets/sounds/China.mp3"]);
            this.load.audio("slovar", ["assets/sounds/slovar.ogg", "assets/sounds/slovar.mp3"]);
            this.load.audio("space", ["assets/sounds/space.ogg", "assets/sounds/space.mp3"]);
            this.load.audio("finale", ["assets/sounds/finale.ogg", "assets/sounds/finale.mp3"]);
            this.load.audio("shootend", ["assets/sounds/shootend.ogg", "assets/sounds/shootend.mp3"]);
            this.load.audio("credits", ["assets/sounds/credits.ogg", "assets/sounds/credits.mp3"]);
            this.load.audio("bossfight", ["assets/sounds/bossfight.ogg", "assets/sounds/bossfight.mp3"]);
        }


    create() {
        this.score = this.add.bitmapText(5,5,"pixelFont3", "Loading... ", 20);
        this.scene.start("level3");

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shipb1_anim",
            frames: this.anims.generateFrameNumbers("shipb"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shipk1_anim",
            frames: this.anims.generateFrameNumbers("shipk"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shipb2_anim",
            frames: this.anims.generateFrameNumbers("shipb2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shipk2_anim",
            frames: this.anims.generateFrameNumbers("shipk2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shipb3_anim",
            frames: this.anims.generateFrameNumbers("shipb3"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shipk3_anim",
            frames: this.anims.generateFrameNumbers("shipk3"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up",{
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up",{
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "slovakanim",
            frames: this.anims.generateFrameNumbers("slovak"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "shieldthrust",
            frames: this.anims.generateFrameNumbers("shieldp"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "bullet_anim",
            frames: this.anims.generateFrameNumbers("bullet"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "character_anim",
            frames: this.anims.generateFrameNumbers("character"),
            frameRate: 5,
            repeat: -1
        });
    
        //this.intro = this.sound.add("intro", {volume: 0})
    }
}
