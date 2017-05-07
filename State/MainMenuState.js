function MainMenuState(stateName, canvasId, stateHandler, entityHandler, mapHandler){
    State.apply(this, arguments);
    this.entityHandler = entityHandler;
    this.mapHandler = mapHandler;
    
    this.selectionNumber = 0;
    this.newGameSelected = true;
    this.loadGameSelected = false;
    this.optionsSelected = false;
    this.BGM = new Audio('/State/loadingScreen.mp3');
	this.BGM.loop = true;
    this.render = ()=>{
        this.g.beginPath();
        
        this.g.fillStyle = "#33ccff";
        this.g.strokeStyle = "red";
        this.g.lineWidth = 15;
        
        
        this.g.beginPath();
        this.g.rect(400, this.selectionNumber*100+150, 200, 75);
        this.g.stroke();
        this.g.beginPath();
      
        this.g.fillRect(400, 150, 200, 75);
        this.g.fillRect(400, 250, 200, 75);
        this.g.fillRect(400, 350, 200, 75);
        
        this.g.fillStyle = "black";
        this.g.font="30px Cooper Black";
        this.g.textAlign = "center";
        this.g.textBaseline = "middle";
        this.g.fillText("Start Game",500,150+75/2);
        this.g.fillText("Load Game",500,250+75/2);
        this.g.fillText("Options",500,350+75/2);
        
        this.g.beginPath();
    };
    this.tick = ()=>{
        if(this.selectionNumber==0)
            this.newGameSelected = true;
        else
            this.newGameSelected = false;
        if(this.selectionNumber==1)
            this.loadGameSelected = true;
        else
            this.loadGameSelected = false;
        if(this.selectionNumber==2)
            this.optionsSelected = true;
        else
            this.optionsSelected = false;
    };
    this.enter = ()=>{
        this.BGM.play();
    };
    this.exit = ()=>{
        this.BGM.pause();
        this.BGM.currentTime = 0;
        
    };
    
    this.readCookie = (cname)=>{
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    this.loadGame = ()=>{
        this.player = this.entityHandler.entities[0];
        //////////////////////////////PLAYER DATA///////////////////////////////////
        var playerData = this.readCookie("player").split('~');
        //console.log(playerData);
        this.player.x = parseInt(playerData[0]);
        this.player.y = parseInt(playerData[1]);
        this.player.health = parseInt(playerData[2]);
        this.player.maxHealth = parseInt(playerData[3]);
        this.player.energy = parseInt(playerData[4]);
        this.player.maxEnergy = parseInt(playerData[5]);
        this.player.strength = parseInt(playerData[6]);
        this.player.defense = parseInt(playerData[7]);
        this.player.level = parseInt(playerData[8]);
        this.player.exp = parseInt(playerData[9]);
        this.player.maxExp = parseInt(playerData[10]);
        for(var i = 11; i< 15; i++)
            this.player.items[i-11].amount = parseInt(playerData[i]);
        this.player.passes = parseInt(playerData[15]);
        this.player.money = parseInt(playerData[16]);
        var numOfStudents = parseInt(playerData[17]);
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////STUDENT DATA///////////////////////////////////////
        if(numOfStudents>1){
            if(numOfStudents == 3){
                var studentData = this.readCookie("students").split('%');
                var student1 = studentData[0].split("~");
                var student2 = studentData[1].split("~");
                
                
                if(student1[0] == "Bob"){
                    this.player.students.push(new BobStudent(parseInt(student1[1]), parseInt(student1[2]), false, {h:parseInt(student1[3]), e:parseInt(student1[5]), d:parseInt(student1[8]), s:parseInt(student1[7]), lvl:parseInt(student1[9]), exp:parseInt(student1[10]), t:student1[12]}, canvasId, this.entityHandler));
                }else if(student1[0] == "Steve"){
                    this.player.students.push(new SteveStudent(parseInt(student1[1]), parseInt(student1[2]), false, {h:parseInt(student1[3]), e:parseInt(student1[5]), d:parseInt(student1[8]), s:parseInt(student1[7]), lvl:parseInt(student1[9]), exp:parseInt(student1[10]), t:student1[12]}, canvasId, this.entityHandler));
                }
                this.player.students[1].maxHealth = parseInt(student1[4]);
                this.player.students[1].maxEnergy = parseInt(student1[7]);
                this.player.students[1].maxExp = parseInt(student1[11]);
                
                if(student1[13] == "true")
                    this.player.students[1].dead = true;
                
                this.entityHandler.removeEntity(this.player.students[1]);
                
                if(student2[0] == "Bob"){
                    this.player.students.push(new BobStudent(parseInt(student2[1]), parseInt(student2[2]), false, {h:parseInt(student2[3]), e:parseInt(student2[5]), d:parseInt(student2[8]), s:parseInt(student2[7]), lvl:parseInt(student2[9]), exp:parseInt(student2[10]), t:student2[12]}, canvasId, this.entityHandler));
                }else if(student2[0] == "Steve"){
                    this.player.students.push(new SteveStudent(parseInt(student2[1]), parseInt(student2[2]), false, {h:parseInt(student2[3]), e:parseInt(student2[5]), d:parseInt(student2[8]), s:parseInt(student2[7]), lvl:parseInt(student2[9]), exp:parseInt(student2[10]), t:student2[12]}, canvasId, this.entityHandler));
                }
                this.player.students[2].maxHealth = parseInt(student2[4]);
                this.player.students[2].maxEnergy = parseInt(student2[6]);
                this.player.students[2].maxExp = parseInt(student2[11]);
                
                if(student2[13] == "true")
                    this.player.students[2].dead = true;
                    
                this.entityHandler.removeEntity(this.player.students[2]);
            }else{
                var student1 = this.readCookie("students").split('~');
                if(student1[0] == "Bob"){
                    this.player.students.push(new BobStudent(parseInt(student1[1]), parseInt(student1[2]), false, {h:parseInt(student1[3]), e:parseInt(student1[5]), d:parseInt(student1[8]), s:parseInt(student1[7]), lvl:parseInt(student1[9]), exp:parseInt(student1[10]), t:student1[12]}, canvasId, this.entityHandler));
                }
                if(student1[0] == "Steve"){
                    this.player.students.push(new SteveStudent(parseInt(student1[1]), parseInt(student1[2]), false, {h:parseInt(student1[3]), e:parseInt(student1[5]), d:parseInt(student1[8]), s:parseInt(student1[7]), lvl:parseInt(student1[9]), exp:parseInt(student1[10]), t:student1[12]}, canvasId, this.entityHandler));
                }
                this.player.students[1].maxHealth = parseInt(student1[4]);
                this.player.students[1].maxEnergy = parseInt(student1[7]);
                this.player.students[1].maxExp = parseInt(student1[11]);
                
                if(student1[13] == "true")
                    this.player.students[1].dead = true;
                    
                this.entityHandler.removeEntity(this.player.students[1]);
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////MAP///////////////////////////////////////////
        this.mapHandler.mapNumber = parseInt(this.readCookie("map"));
        if(this.mapHandler.mapNames[this.mapHandler.mapNumber] == "class01a"||this.mapHandler.mapNames[this.mapHandler.mapNumber] == "class01b"||this.mapHandler.mapNames[this.mapHandler.mapNumber] == "class02a"||this.mapHandler.mapNames[this.mapHandler.mapNumber] == "class01b"||this.mapHandler.mapNames[this.mapHandler.mapNumber] == "finals")
            this.mapHandler.maps[this.mapHandler.mapNumber].teacher.visible = true;
        /////////////////////////////////////////////////////////////////////////////////////
        
        this.stateHandler.popState();
    }
    
    $(document).on("keydown", (e)=>{
        if(this.active){
            if(e.keyCode == 32||e.keyCode == 13){
                if(this.newGameSelected)
                    this.stateHandler.popState();
                if(this.loadGameSelected)
                    this.loadGame();
                
            }
            if(e.keyCode == 40){
                this.selectionNumber++;
                if(this.selectionNumber>2)
                    this.selectionNumber = 0;
            }
            if(e.keyCode == 38){
                this.selectionNumber--;
                if(this.selectionNumber<0)
                    this.selectionNumber = 2;
            }
        }
    });
   
}