function FinalsMap(mapName, canvasId, mapHandler, entityHandler, stateHandler, musicFilePath){
    Map.apply(this, arguments);
    this.BGM = new Audio(musicFilePath);
	this.BGM.loop = true;
    this.render = ()=>{
        this.g.fillStyle = "black";
        this.g.fillRect(0,0,490,550);
        this.g.fillRect(540,0,475,550);
        this.g.beginPath();
        
        var counter = true;
        for(var i = 0; i< 550; i+= 50){
            if(counter)
                this.g.fillStyle = "gray";
            else
                this.g.fillStyle = "#909090";
            this.g.beginPath();
            this.g.fillRect(490, i, 50, 50);
            this.g.strokeStyle = "black";
            this.g.moveTo(490,i);
            this.g.lineTo(540,i);
            this.g.stroke();
            counter = !counter;
        }
    };
    this.tick = ()=>{
        this.player = this.entityHandler.entities[0];
        if(this.player.x < 490){
            this.player.x = 490;
        }else if(this.player.x + this.player.width> 540){
            this.player.x = 540-this.player.width;
        }
        if(this.player.y+this.player.height>550){
            this.player.y = 540- this.player.height;
        }
        this.objCollision(this.teacher.x-10,this.teacher.y,this.teacher.width+20,this.teacher.height);
        
        if(this.keys.indexOf(32)>=0||this.keys.indexOf(13)>=0){
            if(this.player.x+this.player.width>this.teacher.x-3&&this.player.x<this.teacher.x+this.teacher.width+5&&this.player.y>this.teacher.y+this.teacher.height-3&&this.player.y<this.teacher.y+this.teacher.height+5){
                if(!this.teacher.defeated){
                    this.BGM.pause();
                    this.BGM.currentTime = 0;
                    this.teacher.initBattle();
                }
            }
        }
        
    };
    
    
}