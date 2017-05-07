function Entity(x, y, visible, stats, canvasID, handler){
    this.x = x;
    this.y = y;
    this.visible = visible;
    this.name;
    this.dx = 0;
    this.dy = 0;
    this.width = 0;
    this.height = 0;
    this.stats = stats;
    this.handler = handler;
    this.g = document.getElementById(canvasID).getContext("2d");
    this.render = ()=>{};
    this.tick = ()=>{};
    this.levelUp = ()=>{};
    
    this.handler.addEntity(this);
}