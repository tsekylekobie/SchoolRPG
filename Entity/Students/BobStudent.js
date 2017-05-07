function BobStudent(x, y, visible, stats, canvasID, handler){
    Student.apply(this, arguments);
    this.name = "Bob";
    this.img = new Image();
    this.img.src = 'Bob.jpg';
    this.dead = false;
    this.levelUp = ()=>{
        this.level++;
        console.log(this.maxExp);
		this.exp = this.exp-this.maxExp; 
        this.maxExp += (5.25 *(this.level ^ 3));
        console.log(this.maxExp);
		this.health += 2; 
        this.maxHealth += 2;
        this.energy += 2; 
        this.maxEnergy += 2;
        this.strength += 2;
        this.defense += 2;
    };
    this.moves = [
        {name:"Slap", type:"Paper", energy:25, baseDamage:5},
        {name:"Headbutt", type:"Rock", energy:50, baseDamage:10}
    ];
    this.render = ()=> {
        if(this.visible){
            this.g.drawImage(this.img,this.x-100,this.y-100,200,200);
        }
    };
    this.tick = ()=>{
        
    }
}