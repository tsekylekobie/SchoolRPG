function CafeMap(mapName, canvasId, mapHandler, entityHandler, stateHandler){
    Map.apply(this, arguments);
    this.BGM = new Audio('/Map/cafe.mp3');
	this.BGM.loop = true;
    this.shopOpen = false;
    this.itemSelection = {selectN:-2, selections:0, selectionN:0};
    this.render = ()=>{
        this.g.fillStyle = "#262626";
        this.g.fillRect(0,0,100,550);
        this.g.fillRect(900,0,100,550);
        this.g.beginPath();
        this.strokeStyle = "black";
        this.g.moveTo(100,0);
        this.g.lineTo(100,550);
        this.g.stroke();
        this.g.beginPath();
        this.g.moveTo(900,0);
        this.g.lineTo(900,550);
        this.g.stroke();
        
        this.g.fillStyle = "#E0E0E0";
        for(var i = 100; i < 900; i+=50){
            for(var k = 0; k < 550; k+=50){
                this.g.beginPath();
                this.g.fillRect(i, k,50,50);
                this.g.strokeStyle = "black";
                this.g.strokeRect(i,k,50,50);
            }
        }
        
        this.g.fillStyle = "#000066";
        for(i = 350; i<650; i+=50){
            for(var k = 350; k < 550; k+=50){
                this.g.beginPath();
                this.g.fillRect(i, k,50,50);
                this.g.strokeStyle = "black";
                this.g.strokeRect(i,k,50,50);
            }
        }
        this.g.fillStyle = "#E0E0E0";
        for(var i = 400; i < 600; i+=50){
            for(var k = 400; k < 550; k+=50){
                this.g.beginPath();
                this.g.fillRect(i, k,50,50);
                this.g.strokeStyle = "black";
                this.g.strokeRect(i,k,50,50);
            }
        }
        
        this.drawShelf(250, 100);
        this.drawShelf(650, 100);
        this.drawShelf(250, 250);
        this.drawShelf(650, 250);
        this.drawShelf(450, 500);
        
        this.g.fillStyle = "blue";
        this.g.fillRect(485, 400, 30, 30);
        
        if(this.shopOpen){
            this.g.beginPath();
            this.g.fillStyle = "white";
            this.g.fillRect(150, 50, 200, 350);
            
            this.g.fillRect(400, 50, 100, 50);
            
            this.g.strokeStyle = "black";
            this.g.strokeRect(150, 50, 200, 350);
            this.g.strokeRect(400, 50, 100, 50);
            this.g.fillStyle = "black";
            this.g.font = "30px Corvina";
            this.g.fillText("$"+this.player.money, 440, 85);
            
            if(this.itemSelection.selectN == -1){
                this.g.fillStyle = "black";
                this.g.font = "70px Corvina";
                this.g.fillText("Buy", 250, 120);
                this.g.fillText("Sell", 250, 220);
                this.g.fillText("Exit", 250, 320);
                this.g.strokeRect(160, this.itemSelection.selections*100+60, 180, 80);
                
            }
            if(this.itemSelection.selectN == 0){
                this.g.fillStyle = "black";
                this.g.font = "50px Corvina";
                this.g.fillText("Apple", 250, 100);
                this.g.fillText("Juice", 250, 180);
                this.g.fillText("Coffee", 250, 260);
                this.g.fillText("Candy", 250, 340);
                this.g.font = "25px Corvina";
                this.g.fillText("$10", 250, 130);
                this.g.fillText("$10", 250, 210);
                this.g.fillText("$10", 250, 290);
                this.g.fillText("$50", 250, 370);
                this.g.strokeRect(160, this.itemSelection.selectionN*80+55, 180, 80);
                
            }
            if(this.itemSelection.selectN == 1){
                this.g.fillStyle = "black";
                this.g.font = "50px Corvina";
                this.g.fillText("Apple", 250, 100);
                this.g.fillText("Juice", 250, 180);
                this.g.fillText("Coffee", 250, 260);
                this.g.fillText("Candy", 250, 340);
                this.g.font = "25px Corvina";
                this.g.fillText("$5", 250, 130);
                this.g.fillText("$5", 250, 210);
                this.g.fillText("$5", 250, 290);
                this.g.fillText("$25", 250, 370);
                this.g.strokeRect(160, this.itemSelection.selectionN*80+55, 180, 75);
                
            }
            
        }
        
    };
    this.tick = ()=>{
        this.player = this.entityHandler.entities[0];
        this.objCollision(350, 350, 300, 200);
        if(this.player.x < 100){
            this.player.x = 100;
        }else if(this.player.x + this.player.width> 900){
            this.player.x = 900-this.player.width;
        }
        if(this.player.y < 0){
            this.BGM.pause();
            this.BGM.currentTime = 0;
            this.mapHandler.change("school");
            this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            this.player.y = 500;
            this.player.x = 600;
        }else if(this.player.y + this.player.height> 550){
            this.player.y = 550-this.player.height;
        }
        if(this.keys.indexOf(32)>=0||this.keys.indexOf(13)>=0){
            if(this.player.x+this.player.width>350&&this.player.x<650&&this.player.y+this.player.height>347&&this.player.y<355){
                if(!this.shopOpen){
                    this.player.canMove = false;
                    this.itemSelection.selectN = -1;
                    this.shopOpen = true;
                }
            }
        }
    };
    
    this.drawShelf = (x, y) =>{
        this.g.fillStyle = "#6B4700";
        this.g.fillRect(x,y,100,50);
        this.g.strokeStyle="black";
        this.g.strokeRect(x,y,100,50);
    };
    
    
    $(document).on("keydown", (e)=>{
        if(this.active){
            if(e.keyCode == 32||e.keyCode == 13){
                    
                if(this.itemSelection.selectN == 0){
                    if(this.itemSelection.selectionN == 0){
                        if(this.player.money>=10){
                            this.player.money-=10;
                            this.player.items[0].amount++;
                        }
                    }
                    if(this.itemSelection.selectionN == 1){
                        if(this.player.money>=10){
                            this.player.money-=10;
                            this.player.items[1].amount++;
                        }
                    }
                    if(this.itemSelection.selectionN == 2){
                        if(this.player.money>=10){
                            this.player.money-=10;
                            this.player.items[2].amount++;
                        }
                    }
                    if(this.itemSelection.selectionN == 3){
                        if(this.player.money>=50){
                            this.player.money-=50;
                            this.player.items[3].amount++;
                        }
                    }
                    
                }
                if(this.itemSelection.selectN == 1){
                    if(this.itemSelection.selectionN == 0){
                        if(this.player.items[0].amount>0){
                            this.player.money+=5;
                            this.player.items[0].amount--;
                        }
                    }
                    if(this.itemSelection.selectionN == 1){
                        if(this.player.items[1].amount>0){
                            this.player.money+=5;
                            this.player.items[1].amount--;
                        }
                    }
                    if(this.itemSelection.selectionN == 2){
                        if(this.player.items[2].amount>0){
                            this.player.money+=5;
                            this.player.items[2].amount--;
                        }
                    }
                    if(this.itemSelection.selectionN == 3){
                        if(this.player.items[3].amount>0){
                            this.player.money+=25;
                            this.player.items[3].amount--;
                        }
                    }
                    
                }
                if(this.itemSelection.selectN == -1)
                    this.itemSelection.selectN = this.itemSelection.selections;
                if(this.itemSelection.selectN == 2){
                    this.player.canMove = true;
                    this.itemSelection.selectN = -2;
                    this.shopOpen = false;
                    this.player.y -=10;
                }
            }
            if(e.keyCode == 40){
                if(this.itemSelection.selectN == -1){
                    this.itemSelection.selections++;
                    if(this.itemSelection.selections>2)
                        this.itemSelection.selections = 0;
                }
                if(this.itemSelection.selectN == 0){
                    this.itemSelection.selectionN++;
                    if(this.itemSelection.selectionN>3)
                        this.itemSelection.selectionN = 0;
                }
                if(this.itemSelection.selectN == 1){
                    this.itemSelection.selectionN++;
                    if(this.itemSelection.selectionN>3)
                        this.itemSelection.selectionN = 0;
                }
                
            }
            if(e.keyCode == 38){
                if(this.itemSelection.selectN == -1){
                    this.itemSelection.selections--;
                    if(this.itemSelection.selections<0)
                        this.itemSelection.selections = 2;
                }
                
                if(this.itemSelection.selectN == 0){
                    this.itemSelection.selectionN--;
                    if(this.itemSelection.selectionN<0)
                        this.itemSelection.selectionN = 3;
                }
                
                if(this.itemSelection.selectN == 1){
                    this.itemSelection.selectionN--;
                    if(this.itemSelection.selectionN<0)
                        this.itemSelection.selectionN = 3;
                }
            }
			if(e.keyCode == 27){
			    if(this.itemSelection.selectN>-1){
				    this.itemSelection.selectN = -1;
			    }
                if(this.itemSelection.selectN>=-1)this.stateHandler.popState();
			}
        }
    });
}