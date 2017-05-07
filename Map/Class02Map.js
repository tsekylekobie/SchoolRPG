function Class02Map(mapName, canvasId, mapHandler, entityHandler, stateHandler, musicFilePath, doorX, doorY, teacher){
    Map.apply(this, arguments);
    this.doorX = doorX;
    this.doorY = doorY;
    this.teacher = teacher;
    this.doors = [
        new Door(this.doorX, this.doorY, true, true, this.g), new Door(this.doorX, this.doorY+100, true, false, this.g)
    ];
    this.BGM = new Audio(musicFilePath);
	this.BGM.loop = true;
    this.render = ()=>{
         //draw walls
        this.g.fillStyle = "#262626";
        this.g.fillRect(0,0,100,550);
        this.g.fillRect(900,0,100,550);
        this.g.beginPath();
        this.strokeStyle = "black";
        this.g.moveTo(100,0);
        this.g.lineTo(100,550);
        this.g.stroke();
        this.g.beginPath();
        this.g.moveTo(900,0);
        this.g.lineTo(900,550);
        this.g.stroke();
        //draw tiles
        this.g.fillStyle = "gray";
        for(var i = 100; i < 900; i+=50){
            for(var k = 0; k < 550; k+=50){
                this.g.beginPath();
                this.g.fillRect(i, k,50,50);
                this.g.strokeStyle = "black";
                this.g.strokeRect(i,k,50,50);
            }
        }
       //draw board
        this.g.fillStyle = "blue";
        this.g.beginPath();
        this.g.fillRect(250,0,500,50);
        this.g.lineWidth=3;
        this.g.strokeStyle = "white";
        this.g.strokeRect(250,0,500,50);
        //tables
        this.drawTable(300,150,"rectangle");
        this.drawTable(450,150,"rectangle");
        this.drawTable(600,150,"rectangle");
        this.drawTable(300,300,"rectangle");
        this.drawTable(450,300,"rectangle");
        this.drawTable(600,300,"rectangle");
        this.drawTable(300,450,"rectangle");
        this.drawTable(450,450,"rectangle");
        this.drawTable(600,450,"rectangle");
        //trash can
        this.drawTrash(200,0);
        this.drawTrash(750,0);
        for(var i = 0; i<this.doors.length; i++)
            this.doors[i].render();
    };
        
    this.tick = ()=>{
        this.player = this.entityHandler.entities[0];
        for(var i = 0; i<this.doors.length; i++)
            this.doors[i].tick();
        if(this.player.x >= this.doorX-90){
            if(this.player.y>=this.doorY&&this.player.y<=this.doorY+100){
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
        //player doesn't go through walls
        if(this.player.x < 100){
            this.player.x = 100;
        }else if(this.player.x + this.player.width> 900){
            this.player.x = 900-this.player.width;
        }
        if(this.player.y < 0){
            this.player.y = 0;
        }else if(this.player.y + this.player.height> 550){
            this.player.y = 550-this.player.height;
        }
        //player doesn't walk over objects
        this.objCollision(200,0,600,50);
        this.objCollision(300,150,100,50);
        this.objCollision(450,150,100,50);
        this.objCollision(600,150,100,50);
        this.objCollision(300,300,100,50);
        this.objCollision(450,300,100,50);
        this.objCollision(600,300,100,50);
        this.objCollision(300,450,100,50);
        this.objCollision(450,450,100,50);
        this.objCollision(600,450,100,50);
        this.objCollision(this.teacher.x,this.teacher.y,this.teacher.width,this.teacher.height);
        
        if(this.keys.indexOf(32)>=0||this.keys.indexOf(13)>=0){
            if(this.player.x+this.player.width>this.teacher.x-3&&this.player.x<this.teacher.x+this.teacher.width+5&&this.player.y>this.teacher.y+this.teacher.height-3&&this.player.y<this.teacher.y+this.teacher.height+5){
                if(!this.teacher.defeated){
                    this.BGM.pause();
                    this.BGM.currentTime = 0;
                    this.teacher.initBattle();
                }
            }
        }
        
        if(this.player.x== this.doorX&&this.player.y>this.doorY&&this.player.y<this.doorY+75){
            this.mapHandler.change("school");
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.player.x = 650;
            this.teacher.visible = false;
        }
        
        var num = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        if(this.keys.indexOf(38)>=0 || this.keys.indexOf(40)>=0 || this.keys.indexOf(37)>=0 || this.keys.indexOf(39)>=0){
            if(num<=1){
                this.BGM.pause();
                this.BGM.currentTime = 0;
                var num = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                if(num>75){
                    var enemy = new EnglishHomework(200, 300, false, {h:200, e:350, d:0, s:15, lvl:6, exp:35, t:"Paper"}, canvasId, this.entityHandler);
                }else if(num>50){
                    var enemy = new MathHomework(200, 300, false, {h:200, e:350, d:0, s:15, lvl:6, exp:35, t:"Paper"}, canvasId, this.entityHandler);
                }else if(num>25){
                    var enemy = new HistoryHomework(200, 300, false, {h:200, e:350, d:0, s:15, lvl:6, exp:35, t:"Paper"}, canvasId, this.entityHandler);
                }else{
                    var enemy = new ScienceHomework(200, 300, false, {h:200, e:350, d:0, s:15, lvl:6, exp:35, t:"Paper"}, canvasId, this.entityHandler);
                }
                this.stateHandler.pushState("battleState", enemy, '/Map/battle.mp3', '/Map/battleVictory.mp3');
            }
        }
    };
    
}