function MenuState(stateName, canvasId, stateHandler, entityHandler, mapHandler){
    State.apply(this, arguments);
    this.entityHandler = entityHandler;
    this.mapHandler = mapHandler;
    this.select = {selectionN: 0, selectN: -1};
    
    this.render = ()=>{
        this.g.beginPath();
        if(this.select.selectN == -1){
            this.g.textAlign = "center";
            this.g.font = "75px Corsiva";
            this.g.lineWidth = 1;
            this.g.fillStyle = "black";
            this.g.fillText("Students", 500, 125);
            this.g.fillText("Items", 500, 275);
            this.g.fillText("Save", 500, 425);
            this.g.fillText("Exit Menu", 500, 575);
            
            this.g.strokeStyle = "#33ccff";
            this.g.lineWidth = 15;
            this.g.beginPath();
            this.g.rect(10, this.select.selectionN*150+30, 980, 140);
            this.g.stroke();
            
            
            this.g.font = "25px Corsiva";
            this.g.fillText("Number of passes: "+this.player.passes, 150, 600);
            this.g.fillText("You have $"+this.player.money, 850, 600);
        }
        if(this.select.selectN == 0){
            for(var i = 0; i < this.player.students.length; i++){
                this.g.beginPath();
                this.g.textAlign = "center";
                this.g.font = "50px Corsiva";
                this.g.fillStyle = "black";
                this.g.fillText(this.player.students[i].name, i*325+175, 100);
                this.g.font = "30px Corsiva";
                this.g.fillText("Health: "+this.player.students[i].health+"/"+this.player.students[i].maxHealth, i*325+175, 150);
                this.g.fillText("Energy: "+this.player.students[i].energy+"/"+this.player.students[i].maxEnergy , i*325+175, 200);
                this.g.fillText("Strength: "+this.player.students[i].strength, i*325+175, 250);
                this.g.fillText("Defense: "+this.player.students[i].defense, i*325+175, 300);
                this.g.font = "35px Corsiva";
                this.player.students[i].x = i*325+175;
                this.player.students[i].y = 400;
                this.player.students[i].visible = true;
                this.player.students[i].render();
            
            }
            
        }
        if(this.select.selectN == 1){
            for(var i = 0; i < this.player.items.length; i++){
                this.g.beginPath();
                this.g.textAlign = "center";
                this.g.font = "50px Corsiva"; 
                this.g.fillStyle = "black";
                this.g.fillText(this.player.items[i].name, i*250+125, 100);
                this.g.font = "20px Corsiva";
                this.g.fillText("Amount: "+this.player.items[i].amount, i*250+125, 150);
                this.g.fillText("Health Restored: "+this.player.items[i].object.healthRestored, i*250+125, 200);
                this.g.fillText("Energy Restored: "+this.player.items[i].object.energyRestored, i*250+125, 250);
                
            }
            this.g.font = "25px Corsiva"; 
            this.g.fillText("Catches wild students.", 3*250+125, 300);
            
        }
        
        this.g.beginPath();
    };
    this.tick = ()=>{
        this.player = this.entityHandler.entities[0];
    };
    this.enter = ()=>{
        this.player = this.entityHandler.entities[0];
        this.player.lastX = this.player.x;
        this.player.lastY = this.player.y;
    };
    this.exit = ()=>{
        this.player.x = this.player.lastX;
        this.player.y = this.player.lastY;
        for(var i = 1; i<this.player.students.length; i++)
            this.player.students[i].visible = false;
    };
    this.writeCookie = (cname, cvalue)=>{
        var d = new Date();
        d.setTime(d.getTime() + (31*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname+"=" + cvalue + "; " + expires;
    }
    this.save = (cname) =>{
        
            var playerData;
            playerData = this.player.x+"~"+this.player.y+"~"+this.player.health+"~"+this.player.maxHealth+"~"+this.player.energy+"~"+this.player.maxEnergy+"~"+this.player.strength+"~"+this.player.defense+"~"+this.player.level+"~"+this.player.exp+"~"+this.player.maxExp+"~"+this.player.items[0].amount+"~"+this.player.items[1].amount+"~"+this.player.items[2].amount+"~"+this.player.items[3].amount+"~"+this.player.passes+"~"+this.player.money+"~"+this.player.students.length;
            this.writeCookie("player", playerData);
            
            var studentData = "";
            for(var i = 1; i<this.player.students.length; i++){
                studentData+= this.player.students[i].name+"~"+this.player.students[i].x+"~"+this.player.students[i].y+"~"+this.player.students[i].health+"~"+this.player.students[i].maxHealth+"~"+this.player.students[i].energy+"~"+this.player.students[i].maxEnergy+"~"+this.player.students[i].strength+"~"+this.player.students[i].defense+"~"+this.player.students[i].level+"~"+this.player.students[i].exp+"~"+this.player.students[i].maxExp+"~"+this.player.students[i].type+"~"+this.player.students[i].dead;
                if(i+1<this.player.students.length)
                    studentData+="%";
            }
            this.writeCookie("students", studentData);
            
            var map = this.mapHandler.mapNumber;
            this.writeCookie("map", map);
        }
        
        
        
        
        
        
    $(document).on("keydown", (e)=>{
        if(this.active){
            if(e.keyCode == 32||e.keyCode == 13){
                this.select.selectN = this.select.selectionN;
                if(this.select.selectionN == 3)
                    this.stateHandler.popState();
                if(this.select.selectionN == 2){
                    this.save();
                    alert("Your progress has been saved.");
                    this.select.selectN = -1;
                }
            }
            if(e.keyCode == 40){
                if(this.select.selectN == -1){
                    this.select.selectionN++;
                    if(this.select.selectionN>3)
                        this.select.selectionN = 0;
                }
                
            }
            if(e.keyCode == 38){
                if(this.select.selectN == -1){
                    this.select.selectionN--;
                    if(this.select.selectionN<0)
                        this.select.selectionN = 3;
                }
            }
			if(e.keyCode == 27){
				this.select.selectN = -1;
			}
        }
    });
   
}