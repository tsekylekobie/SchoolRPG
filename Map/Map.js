function Map(mapName, canvasId, mapHandler, entityHandler, stateHandler){
    this.mapName = mapName;
    this.active = false;
    this.entityHandler = entityHandler;
    this.stateHandler = stateHandler;
    this.doors = [];
    this.render = ()=>{
    };
    this.tick = ()=>{
    };
    
    this.keys = [];
    $(document).on("keydown", (e)=>{
        this.handleKeyDown(e);
    });
    $(document).on("keyup", (e)=>{
        this.handleKeyUp(e);
    });
    this.handleKeyDown = (e)=>{
        if(this.keys.indexOf(e.keyCode)==-1){
		    this.keys.push(e.keyCode);
	    }
    }
    this.handleKeyUp = (e)=>{
 	    this.keys.splice(this.keys.indexOf(e.keyCode), 1);
    }
    this.mapHandler = mapHandler;
    this.g = document.getElementById(canvasId).getContext("2d");
    
    this.mapHandler.maps.push(this);
    this.objCollision = (x,y,w,h)=>{
        if(this.player.y<y+h && this.player.y+this.player.height>y){
            if(this.player.x+this.player.width>x && this.player.x+this.player.width<=x+3)
                this.player.x = x-3-this.player.width;
            else if(this.player.x<x+w && this.player.x>=x+w-3)
                this.player.x = x+w;
        }
        if(this.player.x+this.player.width>x&&this.player.x<x+w){
            if(this.player.y<y+h && this.player.y>=y+h-3)
                this.player.y = y+h;
            else if(this.player.y+this.player.height>y && this.player.y+this.player.height<=y+3)
                this.player.y=y-this.player.height;
        }
    };
    this.drawTable = (x,y,style)=>{
        this.g.beginPath();
        var length,width;
        if(style == "rectangle"){
            width=100;
            length=50;
        }else if(style=="square"){
            width=100;
            length=100;
        }
        this.g.fillStyle = "#6B4700";
        this.g.fillRect(x,y,width,length);
        this.g.strokeStyle="black";
        this.g.strokeRect(x,y,width,length);
        //seats
        this.drawSeat(x,y+length);
        this.drawSeat(x+50,y+length);
    };
    this.drawSeat = (x,y)=>{
        this.g.fillStyle = "skyblue";
        this.g.strokeStyle="black";
        this.g.fillRect(x+8,y+8,34,34);
        this.g.strokeRect(x+8,y+8,34,34);
        this.g.beginPath();
        this.g.arc(x+25,y+25,4,0,2*Math.PI);
        this.g.stroke();
        this.g.fillStyle = "dodgerblue";
        this.g.fill();
    };
    this.drawTrash = (x,y)=>{
        this.g.translate(x,y);
        this.g.beginPath();
        this.g.fillStyle = "#0066cc";
        this.g.arc(25,25,20,0,Math.PI*2);
        this.g.stroke();
        this.g.fill();
        this.g.beginPath();
        this.g.fillStyle = "black";
        this.g.arc(25,25,15,0,Math.PI*2);
        this.g.stroke();
        this.g.fill();
        this.g.translate(-x,-y);
    };
}