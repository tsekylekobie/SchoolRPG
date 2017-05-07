function Door(x, y, left, top, g){
    this.x = x;
    this.y = y;
    this.left = left;
    this.top = top;
    if(this.left)
        this.width = -10;
    else
        this.width = 10;
    if(this.top)
        this.height = 50;
    else
        this.height = -50;
    
    
    this.g = g;
    this.doorOpen = false;
    this.doorRotation = 0;
    this.tick = ()=>{
        
        
        
        
        if(this.doorOpen){
            if(this.left){
                if(this.top){
                    if(this.doorRotation<Math.PI/2)
                        this.doorRotation += 0.1;
                }else{
                    if(this.doorRotation>-Math.PI/2)
                        this.doorRotation -= 0.1;
                }
            }else{
                if(this.top){
                    if(this.doorRotation>-Math.PI/2)
                        this.doorRotation -= 0.1;
                }else{
                    if(this.doorRotation<Math.PI/2)
                        this.doorRotation += 0.1;
                }
            }
        }else{
            if(this.left){
                if(this.top){
                    if(this.doorRotation>0.1)
                        this.doorRotation -= 0.1;
                }else{
                    if(this.doorRotation<-0.1)
                        this.doorRotation += 0.1;
                }
            }else{
                if(this.top){
                    if(this.doorRotation<-0.1)
                        this.doorRotation += 0.1;
                }else{
                    if(this.doorRotation>0.1)
                        this.doorRotation -= 0.1;
                }
            }
        }
    }
    this.render = ()=>{
        this.g.translate(this.x, this.y);
        this.g.rotate(this.doorRotation);
        
        this.g.beginPath();
        this.g.strokeStyle = "black";
        this.g.fillStyle = "brown";
        this.g.lineWidth = 2;
        this.g.fillRect(0, 0, this.width, this.height);
        this.g.rect(0, 0, this.width, this.height);
        
        this.g.stroke();
        
        this.g.rotate(-this.doorRotation);
        this.g.translate(-this.x, -this.y);
    }
    
}