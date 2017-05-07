function StateHandler(){
    this.states = {};
    this.currentStates = [];
    var object = this;
    this.tick = ()=>{
        this.currentStates[this.currentStates.length-1].tick();
    }
    this.render = ()=>{
        this.currentStates[this.currentStates.length-1].render();
    }
    this.pushState = function(stateName){
        try{
            object.currentStates[object.currentStates.length-1].exit();
            object.currentStates[object.currentStates.length-1].active = false;
        }catch(e){}
        object.currentStates.push(object.states[stateName]);
        object.currentStates[object.currentStates.length-1].enter(arguments);
        object.currentStates[object.currentStates.length-1].active = true;
    }
    this.popState = ()=>{
        this.currentStates[object.currentStates.length-1].exit();
        this.currentStates[this.currentStates.length-1].active = false;
        this.currentStates.pop();
        this.currentStates[this.currentStates.length-1].active = true;
        object.currentStates[object.currentStates.length-1].enter(arguments);
    }
}