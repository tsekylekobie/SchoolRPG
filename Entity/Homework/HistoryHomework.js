function HistoryHomework(x, y, stats, canvasID, handler){
    Homework.apply(this, arguments);
    this.name = "History Homework";
    this.img = new Image();
    this.img.src = 'Entity/Homework/historyhw.jpg';
    this.dead = false;
    this.health = this.stats.h;
    this.maxHealth = this.stats.h;
    this.energy = this.stats.e;
    this.maxEnergy = this.stats.e;
    this.strength = this.stats.s;
    this.defense = this.stats.d;
    this.level = this.stats.lvl;
    this.exp = this.stats.exp;
    //this.maxExp = (1.25 *(this.level ^ 3))*25;
    this.type = this.stats.t;
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
        {name:"History", type:"Scissors", energy:100, baseDamage:100}
    ];
    this.render = ()=> {
        if(this.visible){
            this.g.drawImage(this.img,this.x-100,this.y-50,175,200);
        }
    };
    this.tick = ()=>{
        
    }
}