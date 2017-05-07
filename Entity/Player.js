function Player(x, y, visible, stats, canvasID, handler){
    Student.apply(this, arguments);
    this.id = new ID().Player;
    this.width = 30;
    this.height = 30;
    this.dy = 3;
    this.dx = 3;
    this.lastX = this.x;
    this.lastY = this.y;
    this.keys = [];
    this.currentStudent = 0;
    this.students = [this];
    this.canMove = true;
    this.dead = false;
    this.money = 0;
    this.items = [  {object:new Apple(0, 0, canvasID, this), name:"Apple", amount:10},
                    {object:new JuiceBox(0, 0, canvasID, this), name:"Juice Box", amount:10},
                    {object:new Coffee(0, 0, canvasID, this), name:"Coffee", amount:10},
                    {object:new Candy(0, 0, canvasID, this), name:"Candy", amount:50}];
    this.passes = 0;
    
    this.levelUp = ()=>{
        this.level++;
        console.log(this.maxExp);
		this.exp = this.exp-this.maxExp; 
        this.maxExp += (5.25 *(this.level ^ 3));
        console.log(this.maxExp);
		this.health += 200; 
        this.maxHealth += 200;
        this.energy += 50; 
        this.maxEnergy += 50;
        this.strength += 15;
        this.defense += 10;
        if(this.level == 10)
            this.moves[0] = {name:"Do Homework", type:"Scissors", energy:100, baseDamage:200};
    };
    
    this.moves = [
        //{name:"Kick", type:"Paper", energy:35, baseDamage:15},
        //{name:"Punch", type:"Rock", energy:200, baseDamage:49},
        {name:"Cut", type:"Scissors", energy:10, baseDamage:10},
        {name:"Slap", type:"Paper", energy:25, baseDamage:15},
        {name:"Headbutt", type:"Rock", energy:0, baseDamage:5},
        {name:"Scratch", type:"Scissors", energy:45, baseDamage:25}
    ];
    
    $(document).on("keydown", (e)=>{
        this.handleKeyDown(e);
    });
    $(document).on("keyup", (e)=>{
        this.handleKeyUp(e);
    });
    this.handleKeyDown = (e)=>{
        //console.log(e.keyCode);
        if(this.keys.indexOf(e.keyCode)==-1){
		    this.keys.push(e.keyCode);
	    }
    }
    this.handleKeyUp = (e)=>{
 	    this.keys.splice(this.keys.indexOf(e.keyCode), 1);
    }
    this.render = ()=>{
        this.g.beginPath();
        
        this.g.fillStyle="black";
        this.g.fillRect(this.x, this.y, this.width, this.height);
        
        this.g.beginPath();
    };
    this.tick = ()=>{
        if(this.canMove){
            if(this.keys.indexOf(38)>=0){
                this.y -= this.dy;
            }
            if(this.keys.indexOf(40)>=0){
                this.y += this.dy;
            }
            if(this.keys.indexOf(37)>=0){
                this.x -= this.dx;
            }
            if(this.keys.indexOf(39)>=0){
                this.x += this.dx;
            }
        }
    }
    
}