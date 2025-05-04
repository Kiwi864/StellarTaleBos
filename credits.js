var config = {
    width: 256,
    height: 272,
    backgroundColor: '#4488aa',
}
class Credits extends Phaser.Scene {
    constructor(){
        super("credits");
        this.gameConfig = config;
        this.allowTypewrite8 = true;
        this.dialogik = 1;
    }
    create(){
        this.shop = this.add.sprite(128,106, "finalshop");
        this.shop.setScale(0.6);
        this.cut = this.sound.add("credits");
       
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
        

        this.phonedialog = this.add.bitmapText(22,202, "pixelFont", "After the death of Stuhleck 008", 19);
        this.phonedialog2 = this.add.bitmapText(35,222, "pixelFont", "lady Paka sold her shop to ", 19);
        this.phonedialog3 = this.add.bitmapText(20,242, "pixelFont", "experience life for the first time ", 19);
        this.time.addEvent({
            delay: 10000,
            callback: async () => {
                this.phonedialog.destroy();
                this.phonedialog2.destroy();
                this.phonedialog3.destroy();
                this.shop.destroy();
                this.shop = this.add.sprite(128,106, "sergo");
                this.shop.setScale(0.5);
                this.phonedialog = this.add.bitmapText(22,202, "pixelFont", "After the death of Stuhleck 008", 19);
                this.phonedialog2 = this.add.bitmapText(30,222, "pixelFont", "Sergej Govic became a mayor ", 19);
                this.phonedialog3 = this.add.bitmapText(80,242, "pixelFont", "of a small village ", 19);
            },
            callbackScope: this,
        });
        this.time.addEvent({
            delay: 20000,
            callback: async () => {
                this.phonedialog.destroy();
                this.phonedialog2.destroy();
                this.phonedialog3.destroy();
                this.shop.destroy();
                this.shop = this.add.sprite(128,106, "strass");
                this.shop.setScale(0.5);
             
                this.phonedialog = this.add.bitmapText(22,202, "pixelFont", "After the death of Stuhleck 008", 19);
                this.phonedialog2 = this.add.bitmapText(50,222, "pixelFont", "Station Kalna Roztoka ", 19);
                this.phonedialog3 = this.add.bitmapText(55,242, "pixelFont", "has been abandoned", 19);
            },
            callbackScope: this,
        });
        this.time.addEvent({
            delay: 30000,
            callback: async () => {
                this.phonedialog.destroy();
                this.phonedialog2.destroy();
                this.phonedialog3.destroy();
                this.shop.destroy();
                this.phonedialog = this.add.bitmapText(20,96, "pixelFont", "STELLAR TALE", 50);
                this.phonedialog2 = this.add.bitmapText(56,130, "pixelFont", "Thanks for playing!", 20);
                this.finalScoreLabel = this.add.bitmapText(75,150, "pixelFont", "TOTAL SCORE: ", 20);
                this.phonedialog3 = this.add.bitmapText(20,294, "pixelFont", "MADE BY: Samuel Tamas\nCODE: Samuel Tamas, Ansimuz\n   BACKGROUND DESIGN:\n             Ansimuz\n             Toby Fox\n             Samuel Tamas\nSHOP DESIGN: ???\nIDEA: Samuel Tamas, Ansimuz\nDIALOGUES: Samuel Tamas\nCHARACTERS: Samuel Tamas\n MADE WITH: Phaser Engine \nMUSIC:\n    LIBET'S DELAY\n     By Caretaker\n \n    THE HINDSIGHT\n     By Jorn Lavoll\n \n    GET UP N' Fight!\n      By Nexsard"  , 20);
                this.phonedialog4 = this.add.bitmapText(20,660, "pixelFont", "    DRAMATIC_V2\n     By Wolfgang_\n \n    SMILES AND TEARS\n   From EarthBound\n \n    DETERMINATION\n     By Toby Fox\n \n    CHINESE SHOP\n     By Derek Fiechter\n \n    IN DREAMS\n     By Scott Buckley\n \n    SCI-FI_PLATFORMER12\n     By PASCAL BELISLE\n \n    ELEVATOR JAM\n     By LSplash\n \n    V SLOVENSKYCH DOLINACH\n     By Karol Duchon\n\n     INSPIRATION:\n Game Timelles Travels\n\n     SPECIAL THANKS\n Ansimuz       Deep-Fold\n Peter Harcar     Jablkovy Muz\n      Katarina Liskova\n          Karci Duchci\n\n\n   -SCHODIKY-", 20);
                this.text = this.physics.add.group();
                this.text.add(this.phonedialog);
                this.text.add(this.phonedialog2);
                this.text.add(this.phonedialog3);
                this.text.add(this.phonedialog4);
               /* this.text.add(this.phonedialog5);
                this.text.add(this.phonedialog6); 
                this.text.add(this.phonedialog7); */
            },
            callbackScope: this,
        });
        this.time.addEvent({
            delay: 35000,
            callback: async () => {
               this.moveText(this.phonedialog, 1);
               this.moveText(this.finalScoreLabel, 1)
               this.moveText(this.phonedialog2, 1);
               this.moveText(this.phonedialog3, 0.5);
               this.moveText(this.phonedialog4, 0.5);
               /*this.moveText(this.phonedialog5, 0.5);
               this.moveText(this.phonedialog6, 0.5);
               this.moveText(this.phonedialog7, 0.5);*/
            },
            callbackScope: this,
        });
    
        
       
    }
    update(){
        let formattedScore = String(globalScoreFull).padStart(6, '0');
        if(this.finalScoreLabel){
            this.finalScoreLabel.text = "SCORE: " + formattedScore;
        } 
    }
    moveText(text, speed){
        this.time.addEvent({
            delay: 10,
            callback: () => {
                text.y -= speed;
            },
            loop: true
        });
        
           
    }
    
}