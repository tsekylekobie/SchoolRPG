function SchoolMap(mapName, canvasId, mapHandler, entityHandler, stateHandler){
    Map.apply(this, arguments);
    this.BGM = new Audio('/Map/school.mp3');
    this.BGM.volume = 0.7;
	this.BGM.loop = true;
    this.doors = [
        new Door(250, 100, true, true, this.g), new Door(250, 200, true, false, this.g),
        new Door(250, 350, true, true, this.g), new Door(250, 450, true, false, this.g),
        new Door(750, 100, false, true, this.g), new Door(750, 200, false, false, this.g),
        new Door(750, 350, false, true, this.g), new Door(750, 450, false, false, this.g)
    ];
    
    this.player = this.entityHandler.entities[0];
    this.wall = true;
    this.render = ()=>{
        //draw tiles
        var counter = true;
        for(var i = 250; i < 750; i+=50){
            for(var k = 0; k < 525; k+=50){
                if(counter)
                    this.g.fillStyle = "tan";
                else
                    this.g.fillStyle = "orange";
                this.g.fillRect(i,k,50,50);
                counter = !counter;
            }
        }
        //draw walls
        this.g.fillStyle = "#262626";
        this.g.fillRect(0,0,250,550);
        this.g.fillRect(750,0,250,550);
        this.g.beginPath();
        this.strokeStyle = "black";
        this.g.moveTo(250,0);
        this.g.lineTo(250,550);
        this.g.stroke();
        this.g.beginPath();
        this.g.moveTo(750,0);
        this.g.lineTo(750,550);
        this.g.stroke();
        
        
        if(this.wall){
            this.g.beginPath();
            this.g.fillStyle = "red";
            this.g.strokeStyle = "black";
            this.g.fillRect(450, 0, 100, 550);
            this.g.strokeRect(450, 0, 100, 550);
        }else{
            this.g.beginPath();
            this.g.fillStyle = "red";
            this.g.strokeStyle = "black";
            this.g.fillRect(450, 0, 100, 200);
            this.g.strokeRect(450, 0, 100, 200);
            this.g.fillRect(450, 350, 100, 200);
            this.g.strokeRect(450, 350, 100, 200);
        }
        
        this.g.font = "30px Adobe Arabic";
        this.g.textAlign = "center";
        this.g.fillStyle = "black";
        this.g.strokeStyle = "black";
        this.g.fillText("Finals Room", 500, 50);
        this.g.fillText("Home", 350, 500);
        this.g.fillText("Cafe", 650, 500);
        this.g.beginPath();
        this.g.lineWidth = 7;
        this.g.moveTo(600, 55);
        this.g.lineTo(600, 30);
        this.g.stroke();
        this.g.beginPath();
        this.g.moveTo(585, 30);
        this.g.lineTo(615, 30);
        this.g.lineTo(600, 10);
        this.g.fill();
        
        this.g.font = "20px Adobe Arabic";
        this.g.fillText("Required Passes: "+this.player.passes+"/4", 510, 70);
        //draw doors
        
        for(var i = 0; i<this.doors.length; i++){
            this.doors[i].render();
        }
        
    };
    this.tick = ()=>{
        this.player = this.entityHandler.entities[0];
        if(this.player.passes >1)
            this.wall = false;
        
        if(this.player.x <=290){
            if(this.player.y>=100&&this.player.y<=200){
                this.doors[0].doorOpen = true;
                this.doors[1].doorOpen = true;
            }else{
                this.doors[0].doorOpen = false;
                this.doors[1].doorOpen = false;
            } 
        }else{
            this.doors[0].doorOpen = false;
            this.doors[1].doorOpen = false;
        } 
        
        if(this.player.x <=290){
            if(this.player.y>=350&&this.player.y<=450){
                    this.doors[2].doorOpen = true;
                    this.doors[3].doorOpen = true;
            }else{
                this.doors[2].doorOpen = false;
                this.doors[3].doorOpen = false;
            }
        }else{
            this.doors[2].doorOpen = false;
            this.doors[3].doorOpen = false;
        }
        
        if(this.player.x >=660){
            if(this.player.y>=100&&this.player.y<=200){
                    this.doors[4].doorOpen = true;
                    this.doors[5].doorOpen = true;
            }else{
                this.doors[4].doorOpen = false;
                this.doors[5].doorOpen = false;
            }
        }else{
            this.doors[4].doorOpen = false;
            this.doors[5].doorOpen = false;
        }
        
        if(this.player.x >=660){
            if(this.player.y>=350&&this.player.y<=450){
                    this.doors[6].doorOpen = true;
                    this.doors[7].doorOpen = true;
            }else{
                this.doors[6].doorOpen = false;
                this.doors[7].doorOpen = false;
            }
        }else{
            this.doors[6].doorOpen = false;
            this.doors[7].doorOpen = false;
        }
        for(var i = 0; i<this.doors.length; i++){
            this.doors[i].tick();
        }
        
        if(this.wall)
            this.objCollision(450, 0, 100, 550);
        else{
            this.objCollision(450, 0, 100, 200);
            this.objCollision(450, 350, 100, 200);
            
        }
        
        //player doesn't go through walls
        if(this.player.x < 250){
            this.player.x = 250;
        }else if(this.player.x + this.player.width> 750){
            this.player.x = 750-this.player.width;
        }
        if(this.player.y < 0){
            if(this.player.passes<4)
                this.player.y = 50;
            else{
                this.BGM.pause();
                this.BGM.currentTime = 0;
                this.mapHandler.change("finals");
                this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
                this.mapHandler.maps[this.mapHandler.mapNumber].teacher.visible = true;
                this.player.y = 500;
                this.player.x = 500;
            }
                
        }
        if(this.player.y + this.player.height> 550&&this.player.x>450){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("cafe");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.player.y = 10;
        }
        if(this.player.y + this.player.height> 550&&this.player.x<450){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("home");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.player.x = 800;
            this.player.y = 300;
        }
        if(this.player.x==250&&this.player.y>100&&this.player.y<175){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("class01a");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.mapHandler.maps[this.mapHandler.mapNumber].teacher.visible = true;
            this.player.x = 850;
        }
        if(this.player.x==250&&this.player.y>350&&this.player.y<425){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("class01b");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.mapHandler.maps[this.mapHandler.mapNumber].teacher.visible = true;
            this.player.x = 850;
        }
        if(this.player.x+this.player.width==750&&this.player.y>100&&this.player.y<175){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("class02a");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.mapHandler.maps[this.mapHandler.mapNumber].teacher.visible = true;
            this.player.x = 150;
        }
        if(this.player.x+this.player.width==750&&this.player.y>350&&this.player.y<425){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("class02b");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.mapHandler.maps[this.mapHandler.mapNumber].teacher.visible = true;
            this.player.x = 150;
        }
        
        var num = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
        if(this.keys.indexOf(38)>=0 || this.keys.indexOf(40)>=0 || this.keys.indexOf(37)>=0 || this.keys.indexOf(39)>=0){
            if(num<=1){
                this.BGM.pause();
                this.BGM.currentTime = 0;
                var enemy = new BobStudent(200, 300, true, {h:25, e:3000, d:2, s:14, lvl:2, exp:10, t:"Scissors"}, canvasId, this.entityHandler);
                this.stateHandler.pushState("battleState", enemy,'/Map/battle.mp3', '/Map/battleVictory.mp3');
            }
        }
        
    };
    
    
}