function MapHandler(){
    
    this.mapNumber = 0;
    this.maps = [/*"school", "home", "classroom_01", "classroom_02", "finalsRoom", "cafe"*/];
    this.mapNames = [];
    this.initNames = ()=>{
        for(var i = 0; i < this.maps.length; i++)
            this.mapNames.push(this.maps[i].mapName);
        this.maps[0].active = true;
    }
    
    this.render = ()=>{
        this.maps[this.mapNumber].render();
    };
    this.tick = ()=>{
        this.maps[this.mapNumber].tick();
    };
    this.change = (mapName)=>{
        this.maps[this.mapNumber].active = false;
        this.mapNumber = this.mapNames.indexOf(mapName);
        this.maps[this.mapNumber].active = true;
    };
}