function HomeMap(mapName, canvasId, mapHandler, entityHandler, stateHandler){
    Map.apply(this, arguments);
    this.BGM = new Audio('/Map/home.mp3');
	this.BGM.loop = true; 
    this.render = ()=>{
        
        this.g.lineWidth=2;
        this.g.fillStyle="#262626";
        this.g.fillRect(0,0,100,550);
        this.g.fillRect(900,0,100,550);
        this.drawFloor();
        this.drawBed(100,175);
        
        this.g.strokeStyle = "white";
        this.g.fillStyle = "white";
        this.g.font = "40px Corsiva";
        this.g.fillText("To School", 800, 260);
        this.g.lineWidth = 20;
        this.g.beginPath();
        this.g.moveTo(725, 300);
        this.g.lineTo(825, 300);
        this.g.stroke();
        this.g.beginPath();
        this.g.moveTo(825, 250);
        this.g.lineTo(900, 300);
        this.g.lineTo(825, 350);
        this.g.closePath();
        this.g.fill();
        
        
        this.drawShelf(150,0,700,50);
        this.drawShelf(150,500,700,50);
        this.g.rotate(Math.PI/2);
        this.drawShelf(125,-600,300,50);
        this.g.rotate(-Math.PI/2);
        this.drawTrash(850,0);
        
    };
    this.tick = ()=>{
        this.player = this.entityHandler.entities[0];
        if(this.player.y<0) this.player.y=0
        else if(this.player.y+this.player.height>550) this.player.y=550-this.player.height;
        
        if(this.player.x>850){
            this.mapHandler.change("school");
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.player.x = 300;
            this.player.y = 500;
            
        }
        
        if(this.keys.indexOf(32)>=0||this.keys.indexOf(13)>=0){
            if(this.player.x<410&&this.player.y>140&&this.player.y<380){
                for(var i = 0; i < this.player.students.length; i++){
                    this.player.students[i].health = this.player.students[i].maxHealth;
                    this.player.students[i].energy = this.player.students[i].maxEnergy;
                    this.player.students[i].dead = false;
                }
            }
            
        }
        
        
        this.objCollision(0,0,100,550);
        this.objCollision(100,175,300,200);
        this.objCollision(150,0,900,50);
        this.objCollision(150,500,700,50);
        this.objCollision(550,125,50,300);
    };
    this.drawFloor=()=>{
        this.g.fillStyle = "tan";
        this.g.lineWidth=2;
        for(var i=0;i<=525;i+=25){
            if(i%50==0){
                for(var k=100;k<=800;k+=100){
                    this.g.beginPath();
                    this.g.rect(k,i,100,25);
                    this.g.fill();
                    this.g.stroke();
                }
            }
            else{
                this.g.beginPath();
                this.g.rect(100,i,50,25);
                this.g.fill();
                this.g.stroke();
                for(var k=150;k<=750;k+=100){
                    this.g.beginPath();
                    this.g.rect(k,i,100,25);
                    this.g.fill();
                    this.g.stroke();
                }
                this.g.beginPath();
                this.g.rect(850,i,50,25);
                this.g.fill();
                this.g.stroke();
            }
        }
    };
    this.drawBed=(x,y)=>{
        this.g.translate(x,y);
        this.g.lineWidth=1;
        this.g.strokeStyle="black";
        this.g.fillStyle="white";
        this.g.fillRect(0,0,300,200);
        this.g.strokeRect(0,0,300,200);
        this.g.strokeRect(50,0,50,200);
        this.g.fillStyle="dodgerblue";
        this.g.fillRect(75,0,225,200);
        this.g.strokeRect(75,0,225,200);
        this.g.strokeRect(5,30,40,60);
        this.g.strokeRect(5,110,40,60);
        this.g.translate(-x,-y);
    };
    this.drawShelf = (x, y, dx, dy) =>{
        this.g.lineWidth=1;
        this.g.fillStyle = "#670A0A";
        this.g.fillRect(x,y,dx,dy);
        this.g.strokeStyle="black";
        this.g.strokeRect(x,y,dx,dy);
    };
}