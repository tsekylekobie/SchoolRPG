function MathHomework(x, y, stats, canvasID, handler){
    Homework.apply(this, arguments);
    this.name = "Math Homework";
    this.img = new Image();
    this.img.src = 'Entity/Homework/mathhw.jpg';
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
        {name:"Assign", type:"Paper", energy:10, baseDamage:25},
        {name:"Procrastinate", type:"Scissors", energy:50, baseDamage:50},
        {name:"Math", type:"Scissors", energy:100, baseDamage:100}
    ];
    this.render = ()=> {
        if(this.visible){
            this.g.drawImage(this.img,this.x-100,this.y-50,175,200);

        }
    };
    this.tick = ()=>{
        
    }
}