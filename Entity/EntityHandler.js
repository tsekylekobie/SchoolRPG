function EntityHandler(){
    this.entities = [];
    this.render = ()=>{
        for(var i = 0; i < this.entities.length; i++){
            this.entities[i].render();
        }
    };
    this.tick = ()=>{
        for(var i = 0; i < this.entities.length; i++){
            this.entities[i].tick();
        }
    };
    this.addEntity = (entity)=>{
        this.entities.push(entity);
    };
    this.removeEntity = (entity)=>{
        this.entities.splice(this.entities.indexOf(entity), 1);
    };
    
    this.clamp = (v, min, max)=>{
        if(v>max)
            return max;
        if(v<min)
            return min;
        return v;
    };
}