function WorldState(stateName, canvasId, stateHandler, entityHandler, mapHandler, hud){
    State.apply(this, arguments);
    this.entityHandler = entityHandler;
    this.mapHandler = mapHandler;
    this.hud = hud;
    

    $(document).on("keydown", (e)=>{
        if(this.active){
            if(e.keyCode == 27){
                this.stateHandler.pushState("menuState");
            }
        }
    });
    this.render = ()=>{
        this.mapHandler.render();
        this.hud.render();
        this.entityHandler.render();
        
    };
    this.enter = ()=>{
        try{
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
        }catch (e){
        }
    };
    this.tick = ()=>{
        this.mapHandler.tick();
        this.hud.tick();
        this.entityHandler.tick();
        
        this.entities = this.entityHandler.entities;
    }
}