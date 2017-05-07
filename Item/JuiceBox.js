function JuiceBox(x, y, canvasID, player){
    this.id = new ID().JuiceBox;
    Item.apply(this, arguments);
    this.player = player;
    this.healthRestored = 100;
    this.energyRestored = 0;
    this.use = ()=>{
        this.player.students[0].health += this.healthRestored;
        this.player.students[0].energy += this.energyRestored;
        if(this.player.students[0].health>this.player.students[0].maxHealth)
            this.player.students[0].health = this.player.students[0].maxHealth;
        if(this.player.students[0].energy>this.player.students[0].maxEnergy)
            this.player.students[0].energy = this.player.students[0].maxEnergy;
    }
    this.render = () =>{
        this.g.beginPath();
        
        this.g.beginPath();
    }
}