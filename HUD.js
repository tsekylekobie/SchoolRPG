function HUD(entityHandler, canvasID){
    this.eHandler = entityHandler;
    this.g = document.getElementById(canvasID).getContext("2d");
    this.hp = [];
    this.energy = []; 
    this.maxHP = [];
    this.maxEnergy = [];
    this.level = [];
    this.exp = [];
    this.maxExp = []; 
    this.name = [];
    this.render = ()=>{
            this.g.beginPath();
            this.g.strokeStyle="black";
            this.g.lineWidth = 3;
            this.g.rect(0, 550, 1000, 125);
            this.g.stroke();
        for(var i = 0; i < this.player.students.length; i++){
    
            this.g.textAlign = "center";
    
            //HEALTH
            this.g.beginPath();
            this.g.lineWidth = 2;
            this.g.rect(i*350+75, 578, 200, 20);
            this.g.stroke();
            this.g.fillStyle = "red";
            this.g.fillRect(i*350+76, 579, (this.hp[i]/this.maxHP[i])*200-2, 18);
            
            this.g.beginPath();
            this.g.fillStyle = "black";
            this.g.font = "20px Arial";
            this.g.textBaseline="alphabetic";
            this.g.fillText("Health:", i*350+40, 595);
            //
            
            //ENERGY
            this.g.beginPath();
            this.g.lineWidth = 2;
            this.g.rect(i*350+75, 603, 200, 20);
            this.g.stroke();
            this.g.fillStyle = "yellow";
            this.g.fillRect(i*350+76, 604, (this.energy[i]/this.maxEnergy[i])*200-2, 18);
            
            this.g.beginPath();
            this.g.fillStyle = "black";
            this.g.font = "18px Arial";
            this.g.fillText("Energy:", i*350+40, 618);
            
            //EXP
            this.g.beginPath();
            this.g.lineWidth = 2;
            this.g.rect(i*350+75, 628, 200, 20);
            this.g.stroke();
            this.g.fillStyle = "green";
            this.g.fillRect(i*350+76, 629, (this.exp[i]/this.maxExp[i])*200-2, 18);
            
            this.g.beginPath();
            this.g.fillStyle = "black";
            this.g.font = "18px Arial";
            this.g.fillText("Exp:", i*350+40, 643);
            
            //NAME + LEVEL
            this.g.fillText("Level "+this.level[i],i*350+50,571);
            this.g.fillText(this.name[i],i*350+150,571);
        }
    };
    this.tick = ()=>{
        this.player = this.eHandler.entities[0];
        for(var i = 0; i<this.player.students.length; i++){
            this.hp[i] = this.eHandler.clamp(this.player.students[i].health, this.player.students[i].maxHealth/100, this.player.students[i].maxHealth);
            this.energy[i] = this.eHandler.clamp(this.player.students[i].energy, this.player.students[i].maxEnergy/100, this.player.students[i].maxEnergy);
            this.maxHP[i] = this.player.students[i].maxHealth;
            this.maxEnergy[i] = this.player.students[i].maxEnergy;
            this.level[i] = this.player.students[i].level;
            this.exp[i] = this.eHandler.clamp(this.player.students[i].exp, this.player.students[i].maxExp/100, this.player.students[i].maxExp);
            this.maxExp[i] = this.player.students[i].maxExp;
            this.name[i] = this.player.students[i].name;
        }
    };
    
}