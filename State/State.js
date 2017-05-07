function State(stateName, canvasId, stateHandler){
    this.canvasId = canvasId;
    this.g = document.getElementById(this.canvasId).getContext("2d");
    this.stateName = stateName;
    this.stateHandler = stateHandler;
    this.active = false;
    this.change = ()=>{};
    this.render = ()=>{};
    this.tick = ()=>{};
    this.enter = (args)=>{};
    this.exit = ()=>{};
    
  
    
    
    this.stateHandler.states[stateName] = this;
}