function Item(x, y, canvasID){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.g = document.getElementById(canvasID).getContext("2d");
    this.render = ()=>{};
    this.tick = ()=>{};
    this.use = ()=>{};
    
}