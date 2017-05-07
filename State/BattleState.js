function BattleState(stateName, canvasId, stateHandler, entityHandler, mapHandler, hud){
	State.apply(this,arguments);
	this.entityHandler = entityHandler;
	this.mapHandler = mapHandler;
	//Change hud into battle menu
	this.hud = hud;
	this.playerTurn = true;
	this.select = {selectionNumber:0, moveSelection:0, itemSelection:0, pokemanSelection: 0, selections:-1};
	this.battleText = ["", "", ""];
	this.enemyDead = false;
	this.blackOut = false;
	
	this.render = ()=>{
		this.entityHandler.entities[0].students[this.entityHandler.entities[0].currentStudent].render();
		this.enemy.render();
		this.hud.render();
		
		this.g.beginPath();
		this.g.strokeStyle = "black";
		this.g.rect(75,50,400,100);
		this.g.stroke();
		this.g.rect(525,300,400,100);
		this.g.stroke();
		this.g.beginPath();
		
		
		//Selection Box
		this.g.beginPath();
		this.g.rect(0, 450, 1000, 100);
		this.g.stroke();
		
		//ITEM ATTACK CHANGE
		if(this.select.selections<0){
			this.g.textAlign = "center";
			this.g.textBaseline = "middle"; 
			this.g.font = "50px Gill Sans Ultra Bold";
			this.g.fillText("Item", 150, 505);
			this.g.fillText("Attack", 500, 505);
			this.g.fillText("Change", 850, 505);
			//Box
			this.g.beginPath();
			this.g.strokeStyle = "#33ccff";
			this.g.lineWidth = 10;
			this.g.lineCap = "round";
			this.g.moveTo(this.select.selectionNumber*350+25, 450);
			this.g.lineTo(this.select.selectionNumber*350+275, 450);
			this.g.moveTo(this.select.selectionNumber*350+25, 550);
			this.g.lineTo(this.select.selectionNumber*350+275, 550);
			this.g.stroke();
			this.g.beginPath();
		}
		//items
		if(this.select.selections == 0){
			this.g.beginPath();
			for(var i = 0; i < this.player.items.length; i++){
				this.g.font = "35px Gill Sans Ultra Bold";
				this.g.fillText(this.player.items[i].name, 125+i*250, 495);
				this.g.font = "10px Gill Sans Ultra Bold";
				this.g.fillText("Health: "+this.player.items[i].object.healthRestored, 125+i*250, 510);
				this.g.fillText("Energy: "+this.player.items[i].object.energyRestored, 125+i*250, 520);
				this.g.fillText("Amount: "+this.player.items[i].amount, 125+i*250, 530);
			}
			this.g.beginPath();
			this.g.lineWidth = 10;
			this.g.lineCap = "round";
			this.g.strokeStyle = "#33ccff";
			this.g.moveTo(this.select.itemSelection*250+25, 450);
			this.g.lineTo(this.select.itemSelection*250+225, 450);
			this.g.moveTo(this.select.itemSelection*250+25, 550);
			this.g.lineTo(this.select.itemSelection*250+225, 550);
			this.g.stroke();
			this.g.beginPath();
		}
		
		//Attacks
		if(this.select.selections == 1){
			this.g.beginPath();
			for(var i = 0; i < this.currentBattler.moves.length; i++){
				this.g.font = "35px Gill Sans Ultra Bold";
				this.g.fillText(this.currentBattler.moves[i].name, 125+i*250, 495);
				this.g.font = "10px Gill Sans Ultra Bold";
				this.g.fillText("Base Damage: "+this.currentBattler.moves[i].baseDamage, 125+i*250, 510);
				this.g.fillText("Energy: "+this.currentBattler.moves[i].energy, 125+i*250, 520);
				this.g.fillText("Type: "+this.currentBattler.moves[i].type, 125+i*250, 530);
			}
			this.g.beginPath();
			this.g.lineWidth = 10;
			this.g.lineCap = "round";
			this.g.strokeStyle = "#33ccff";
			this.g.moveTo(this.select.moveSelection*250+25, 450);
			this.g.lineTo(this.select.moveSelection*250+225, 450);
			this.g.moveTo(this.select.moveSelection*250+25, 550);
			this.g.lineTo(this.select.moveSelection*250+225, 550);
			this.g.stroke();
			this.g.beginPath();
		}
		
		//Pokemans
		if(this.select.selections == 2){
			this.g.beginPath();
			for(var i = 0; i < this.player.students.length; i++){
				this.g.font = "35px Gill Sans Ultra Bold";
				this.g.fillText(this.player.students[i].name, 125+i*250, 495);
				this.g.font = "10px Gill Sans Ultra Bold";
				this.g.fillText("Health: "+this.player.students[i].health, 125+i*250, 510);
				this.g.fillText("Energy: "+this.player.students[i].energy, 125+i*250, 520);
				//this.g.fillText("Type: "+this.currentBattler.moves[i].type, 125+i*250, 530);
			}
			this.g.beginPath();
			this.g.lineWidth = 10;
			this.g.lineCap = "round";
			this.g.strokeStyle = "#33ccff";
			this.g.moveTo(this.select.pokemanSelection*250+25, 450);
			this.g.lineTo(this.select.pokemanSelection*250+225, 450);
			this.g.moveTo(this.select.pokemanSelection*250+25, 550);
			this.g.lineTo(this.select.pokemanSelection*250+225, 550);
			this.g.stroke();
			this.g.beginPath();
		}
		
		//BattleLog
		
		this.g.beginPath();
		this.g.strokeStyle = "black";
		this.g.lineWidth = 2;
		this.g.rect(100, 175, 510, 100);
		this.g.stroke();
		this.g.beginPath();
		this.g.font="30px Adobe Arabic";
		this.g.textBaseline = "middle";
		this.g.textAlign = "left";
		this.g.fillText(this.battleText[0], 110, 200);
		this.g.fillText(this.battleText[1], 110, 225);
		this.g.fillText(this.battleText[2], 110, 250);
		
		
		this.stats(75,50,this.enemy);
		this.stats(525,300,this.currentBattler);
	};  
	this.enter = (enemy)=>{
		
		this.BGM = new Audio(enemy[2]);
		this.BGM.loop = true;
		this.BGM.volume = 0.7;
		this.BGM.play();
		
		this.victoryMusic = new Audio(enemy[3]);
		this.victoryMusic.loop = true;
		
		this.player = this.entityHandler.entities[0];
		this.select.selectionNumber = 1;
		this.select.selections = -1;
		this.select.pokemanSelection = 0;
		this.enemyDead = false;
		this.teacher = 0;
		
		for(var i = 0; i < this.player.students.length; i++){
			if(!this.player.students[i].dead){
				this.player.currentStudent = i;
				this.currentBattler = this.player.students[i];
				i = 100;
			}
		}
		
		this.player.lastX = this.player.x;
		this.player.lastY = this.player.y;
		this.currentBattler.visible = true;
		this.currentBattler.x = 200;
		this.currentBattler.y = 350;
		
		
		this.enemy = enemy[1];
		if(this.enemy.id == new ID().Student||this.enemy.id == new ID().Homework){
			this.battleText[0] = "A wild "+ this.enemy.name + " has appeared!";
			this.battleText[1] = "What will "+ this.currentBattler.name + " do?";
			this.enemy.x = 800;
			this.enemy.y = 100;
			this.enemy.visible = true;
		}else if(this.enemy.id == new ID().Teacher){
			this.teacher = this.enemy;
			if(!this.teacher.finals){
				this.battleText[0] = "You have challenged a teacher!";
				this.battleText[1] = "What will "+ this.currentBattler.name + " do?";
				this.enemy = this.teacher.students[this.teacher.currentStudent];
				this.enemy.x = 800;
				this.enemy.y = 100;
				this.enemy.visible = true;
			}else{
				this.battleText[0] = "You have challenged the final exam!";
				this.battleText[1] = "What will "+ this.currentBattler.name + " do?";
				this.enemy = this.teacher.students[this.teacher.currentStudent];
				this.enemy.x = 800;
				this.enemy.y = 100;
				this.enemy.visible = true;
			}
		}
		
	};
	this.exit = ()=>{
		if(this.teacher == 0){
			this.player.money += 20;
			this.player.x = this.player.lastX;
			this.player.y = this.player.lastY;
			this.entityHandler.entities.splice(this.entityHandler.entities.indexOf(this.enemy), 1);
		}else{
			if(!this.teacher.finals){
				this.player.money += 200;
				this.player.x = this.player.lastX;
				this.player.y = this.player.lastY+10;
				this.teacher.defeated = true;
				for(var i = 0; i < this.teacher.students.length; i++)
					this.entityHandler.entities.splice(this.entityHandler.entities.indexOf(this.teacher.students[i]), 1);
				this.player.passes++;
			}else{
				this.victoryMusic.pause(); 
				this.victoryMusic.currentTime = 0; 
            	this.mapHandler.change("home");
            	this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
            	this.player.x = 800;
            	this.player.y = 300;
				this.player.money += 20000;
				this.teacher.defeated = true;
				for(var i = 0; i < this.teacher.students.length; i++)
					this.entityHandler.entities.splice(this.entityHandler.entities.indexOf(this.teacher.students[i]), 1);
			}
		}
		for(var i = 1; i < this.player.students.length; i++){
			this.player.students[i].visible = false;
		}
		this.enemy.visible = false;
		this.victoryMusic.pause(); 
		this.victoryMusic.currentTime = 0; 
	}
	this.useItem = ()=>{
		if(this.player.items[this.select.itemSelection].amount>0){
			if(this.player.items[this.select.itemSelection].name!="Candy"){
				this.player.items[this.select.itemSelection].object.use();
				var num = Math.floor(Math.random() * this.enemy.moves.length);
				var enemyMove = this.enemy.moves[num];
				var enemyEffectiveness = this.moveEffectiveness(enemyMove, this.currentBattler);
				if(this.enemy.energy>=enemyMove.energy){
					this.enemy.energy -= enemyMove.energy;
					
					this.currentBattler.health -= Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense));
					if(this.currentBattler.health>0){
						this.battleLog(null, enemyMove, null, enemyEffectiveness, false, true);	
					}else{
						this.currentBattler.dead = true;
						var i;
						for(i = 0; i<this.player.students.length; i++){
							if(!this.player.students[i].dead){
								this.player.currentStudent = i;
								this.currentBattler = this.player.students[this.player.currentStudent];
								this.player.students[this.player.currentStudent].x = 200;
								this.player.students[this.player.currentStudent].y = 350;
								this.player.students[this.player.currentStudent].visible = true;
								i=100;
							}
						}
						if(i<100){
							this.currentBattler.visible = false;
							this.enemyDead = true;
							this.blackOut = true;
							this.battleText[0] = "You have blacked out!";
							this.battleText[1] = "";
							this.battleText[2] = "";
						}
					}
				}
			}else{
				if(this.enemy.id == new ID().Student){
					if(this.player.students.length<3){
		        		var num = Math.floor(Math.random() * this.enemy.health);
						if(num<5){
							this.BGM.pause();
							this.BGM.currentTime = 0;
							this.victoryMusic.play(); 
							this.player.students.push(this.enemy);
							this.enemy.visible = false;
							this.enemyDead = true;
							this.battleText[0] = this.enemy.name+" gave in to the sweetness.";
							this.battleText[1] = this.enemy.name+" has joined your team!";
							this.battleText[2] = "";
						}else{
							var num2 = Math.floor(Math.random() * this.enemy.moves.length);
							var enemyMove = this.enemy.moves[num2];
							var enemyEffectiveness = this.moveEffectiveness(enemyMove, this.currentBattler);
							if(this.enemy.energy>=this.enemy.moves[num2].energy){
								this.enemy.energy -= enemyMove.energy;
				
								this.currentBattler.health -= Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense));
								if(this.currentBattler.health>0){
								}else{
									this.currentBattler.dead = true;
									var i;
									for(i = 0; i<this.player.students.length; i++){
										if(!this.player.students[i].dead){
											this.player.currentStudent = i;
											this.currentBattler = this.player.students[this.player.currentStudent];
											this.player.students[this.player.currentStudent].x = 200;
											this.player.students[this.player.currentStudent].y = 350;
											this.player.students[this.player.currentStudent].visible = true;
											i=100;
										}
									}
									if(i<100){
										this.currentBattler.visible = false;
										this.enemyDead = true;
										this.blackOut = true;
										this.battleText[0] = "You have blacked out!";
										this.battleText[1] = "";
										this.battleText[2] = "";
									}
								}
							}
							this.battleText[0] = this.enemy.name+" refused to be swayed!";
							this.battleText[1] = this.enemy.name+" used "+this.enemy.moves[num2].name+". "+this.currentBattler.name+" took "+this.enemy.moves[num2].baseDamage+" damage!";
							this.battleText[2] = "";
						}
					}else{
						this.battleText[0] = this.enemy.name+" refused to be swayed!";
						this.battleText[1] = "";
						this.battleText[2] = "";
					}
				}else{
					this.battleText[0] = this.enemy.name+" refused to be swayed!";
					this.battleText[1] = "";
					this.battleText[2] = "";
					
				}
			}
			this.player.items[this.select.itemSelection].amount--;
		}
		
	};
	
	this.battle = ()=>{
		var num = Math.floor(Math.random() * this.enemy.moves.length);
		var playerMove = this.currentBattler.moves[this.select.moveSelection];
		var playerEffectiveness = this.moveEffectiveness(playerMove, this.enemy);
		var enemyMove = this.enemy.moves[num];
		var enemyEffectiveness = this.moveEffectiveness(enemyMove, this.currentBattler);
		
		
		if(this.currentBattler.energy>=playerMove.energy){
			this.currentBattler.energy -= playerMove.energy;
			
			this.enemy.health -= Math.floor(playerMove.baseDamage*0.10*this.currentBattler.strength*playerEffectiveness-(0.10*this.enemy.defense));
			
			if(this.enemy.health <= 0){
				if(this.teacher == 0){
					this.BGM.pause();
					this.BGM.currentTime = 0;
					this.victoryMusic.play(); 
					this.enemy.visible = false;
					this.enemyDead = true;
					this.currentBattler.exp += this.enemy.exp;
					this.battleText[0] = this.enemy.name+" has been defeated!";
					this.battleText[1] = this.currentBattler.name+ " has gained "+this.enemy.exp+" EXP!";
					this.battleText[2] = "";
					if(this.currentBattler.exp>=this.currentBattler.maxExp){
						this.currentBattler.levelUp();
						this.battleLog(playerMove, enemyMove, playerEffectiveness, enemyEffectiveness, true, false);
					}
				}else{
					this.currentBattler.exp += this.enemy.exp;
					this.battleText[0] = this.enemy.name+" has been defeated!";
					this.battleText[1] = this.currentBattler.name+ " has gained "+this.enemy.exp+" EXP!";
					this.battleText[2] = "";
					this.teacher.currentStudent++;
					while(this.currentBattler.exp>=this.currentBattler.maxExp){
						this.currentBattler.levelUp();
						this.battleLog(playerMove, enemyMove, playerEffectiveness, enemyEffectiveness, true, false);
					}
					if(this.teacher.currentStudent==this.teacher.students.length){
						this.BGM.pause();
						this.BGM.currentTime = 0;
						this.victoryMusic.play(); 
						this.enemy.visible = false;
						this.enemyDead = true;
						if(!this.teacher.finals){
							this.battleText[0] = "Teacher has been defeated!";
							this.battleText[1] = "You have passed the test!";
							this.battleText[2] = "";
						}else{
							this.battleText[0] = "You have passed the final exam!";
							this.battleText[1] = "Congratulations!";
							this.battleText[2] = "";
						}
					}else{
						this.enemy = this.teacher.students[this.teacher.currentStudent];
						this.battleText[2] = "Teacher sent out " + this.enemy.name + "!";
						this.enemy.x = 800;
						this.enemy.y = 100;
						this.enemy.visible = true;
					}
				}
			}else if(this.enemy.energy>=enemyMove.energy){
				this.enemy.energy -= enemyMove.energy;
				
				this.currentBattler.health -= Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense));
				if(this.currentBattler.health>0){
					this.battleLog(playerMove, enemyMove, playerEffectiveness, enemyEffectiveness, false, false);
				}else{
					this.currentBattler.dead = true;
					var i;
					for(i = 0; i<this.player.students.length; i++){
						if(!this.player.students[i].dead){
							this.player.currentStudent = i;
							this.currentBattler = this.player.students[this.player.currentStudent];
							this.player.students[this.player.currentStudent].x = 200;
							this.player.students[this.player.currentStudent].y = 350;
							this.player.students[this.player.currentStudent].visible = true;
							i=100;
						}
					}
					if(i<100){
						this.currentBattler.visible = false;
						this.enemyDead = true;
						this.blackOut = true;
						this.battleText[0] = "You have blacked out!";
						this.battleText[1] = "";
						this.battleText[2] = "";
					}
				}
			}
		}
	};
	this.moveEffectiveness = (move, entity)=>{
		if(move.type == "Rock"){
			if(entity.type == "Rock")
				return 1;
			if(entity.type == "Paper")
				return 0.5;
			if(entity.type == "Scissors")
				return 2;
		}
		if(move.type == "Paper"){
			if(entity.type == "Rock")
				return 2;
			if(entity.type == "Paper")
				return 1;
			if(entity.type == "Scissors")
				return 0.5;
		}
		if(move.type == "Scissors"){
			if(entity.type == "Rock")
				return 0.5;
			if(entity.type == "Paper")
				return 2;
			if(entity.type == "Scissors")
				return 1;
		}
	}
	
	this.tick = ()=>{
		this.hud.tick();
	};
	$(document).on("keydown", (e)=>{
		if(this.active){
			if(e.keyCode == 39){
				if(!this.enemyDead){
					if(this.select.selections == -1){
						this.select.selectionNumber++;
						if(this.select.selectionNumber>2)
							this.select.selectionNumber = 0;
					}
					if(this.select.selections == 0){
						this.select.itemSelection++;
						if(this.select.itemSelection>3)
							this.select.itemSelection = 0;
					}
					if(this.select.selections == 1){
						this.select.moveSelection++;
						if(this.select.moveSelection>3)
							this.select.moveSelection = 0;
					}
					if(this.select.selections == 2){
						this.select.pokemanSelection++;
						if(this.select.pokemanSelection>3)
							this.select.pokemanSelection = 0;
					}
				}
			}
			if(e.keyCode == 37){
				if(!this.enemyDead){
					if(this.select.selections == -1){
						this.select.selectionNumber--;
						if(this.select.selectionNumber<0)
							this.select.selectionNumber = 2;
					}
					if(this.select.selections == 0){
						this.select.itemSelection--;
						if(this.select.itemSelection<0)
							this.select.itemSelection = 3;
					}
					if(this.select.selections == 1){
						this.select.moveSelection--;
						if(this.select.moveSelection<0)
							this.select.moveSelection = 3;
					}
					if(this.select.selections == 2){
						this.select.pokemanSelection--;
						if(this.select.pokemanSelection<0)
							this.select.pokemanSelection = 3;
					}
				}
			}
			if(e.keyCode == 32|| e.keyCode == 13){
				if(this.blackOut){
					
					this.BGM.pause();
					this.BGM.currentTime = 0;
                	for(var i = 0; i < this.player.students.length; i++){
                	    this.player.students[i].health = this.player.students[i].maxHealth;
                	    this.player.students[i].energy = this.player.students[i].maxEnergy;
                	    this.player.students[i].dead = false;
                	}
            		this.mapHandler.change("home");
            		this.mapHandler.maps[this.mapHandler.mapNumber].BGM.play();
				}
				if(!this.enemyDead){
					if(this.select.selections == 0)
						this.useItem();
					if(this.select.selections == 1)
						this.battle();
					if(this.select.selections == 2){
						if(!this.player.students[this.select.pokemanSelection].dead){
							this.player.currentStudent = this.select.pokemanSelection;
							this.currentBattler = this.player.students[this.player.currentStudent];
							this.player.students[this.player.currentStudent].x = 200;
							this.player.students[this.player.currentStudent].y = 350;
							this.player.students[this.player.currentStudent].visible = true;
						}
					}
					if(this.select.selections == -1)
						this.select.selections = this.select.selectionNumber;
				}else{
					this.stateHandler.popState();
				}
			}
			if(e.keyCode == 27){
				this.select.selections = -1;
			}
		}
	});
	this.battleLog = (playerMove, enemyMove, playerEffectiveness, enemyEffectiveness, levelUp, item)=>{
		if(!item){
			if(!levelUp){
					if(playerEffectiveness == 1){
						this.battleText[0] = this.currentBattler.name+" used "+playerMove.name+". "+this.enemy.name+" took "+Math.floor(playerMove.baseDamage*0.10*this.currentBattler.strength*playerEffectiveness-(0.10*this.enemy.defense))+" damage!";
						this.battleText[1] = this.enemy.name+" used "+enemyMove.name+". "+this.currentBattler.name+" took "+Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense))+" damage!";
						this.battleText[2] = "";
					}else if(playerEffectiveness == 2){
						this.battleText[0] = this.currentBattler.name+" used "+playerMove.name+". Super effective!";
						this.battleText[1] = this.enemy.name+" took "+Math.floor(playerMove.baseDamage*0.10*this.currentBattler.strength*playerEffectiveness-(0.10*this.enemy.defense))+" damage!";
						this.battleText[2] = this.enemy.name+" used "+enemyMove.name+". "+this.currentBattler.name+" took "+Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense))+" damage!";
					}else if(playerEffectiveness == 0.5){
						this.battleText[0] = this.currentBattler.name+" used "+playerMove.name+". Not very effective.";
						this.battleText[1] = this.enemy.name+" took "+Math.floor(playerMove.baseDamage*0.10*this.currentBattler.strength*playerEffectiveness-(0.10*this.enemy.defense))+" damage!";
						this.battleText[2] = this.enemy.name+" used "+enemyMove.name+". "+this.currentBattler.name+" took "+Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense))+" damage!";
					}
				
			}else{
				this.battleText[0] = this.currentBattler.name+" has leveled up!";
				this.battleText[1] = this.currentBattler.name+"'s stats have increased!";
				this.battleText[2] = "";
			}
		}else{
			if(this.player.items[this.select.itemSelection].name != "Candy"){
				if(this.player.items[this.select.itemSelection].name == "Apple"){
					this.battleText[0] = this.player.name+" used an "+this.player.items[this.select.itemSelection].name+"!";
				}else{
					this.battleText[0] = this.player.name+" used an "+this.player.items[this.select.itemSelection].name+"!";
				}
				this.battleText[1] = "Health has been restored by "+this.player.items[this.select.itemSelection].object.healthRestored+" and energy by "+this.player.items[this.select.itemSelection].object.energyRestored+".";
				this.battleText[2] = this.enemy.name+" used "+enemyMove.name+". "+this.currentBattler.name+" took "+Math.floor(enemyMove.baseDamage*0.10*this.enemy.strength*enemyEffectiveness-(0.10*this.currentBattler.defense))+" damage!";
			}else{
				
			}
		}
	};

	this.stats=(x,y,entity)=>{
		this.g.translate(x,y);
		this.g.lineCap="round";
		this.g.lineWidth=10;
		this.g.font = "22px Arial";
		this.g.textBaseline="alphabetic";
		this.g.textAlign="start";
		//NAME
		this.g.font ="20px Arial Black"
		this.g.fillText(entity.name,10,25);
		//HP
		this.g.font = "12px Arial";
		entity.health = this.entityHandler.clamp(entity.health,0,entity.maxHealth);
		this.g.beginPath();
		this.g.strokeStyle="red";
		this.g.moveTo(75,40);
		this.g.lineTo(75+entity.health/entity.maxHealth*260,40);
		this.g.stroke();
		this.g.fillText(entity.health+"/"+entity.maxHealth,350,45,50);
		//ENERGY
		entity.energy = this.entityHandler.clamp(entity.energy,0,entity.maxEnergy);
		this.g.beginPath();
		this.g.strokeStyle="yellow";
		this.g.moveTo(75,50);
		this.g.lineTo(75+entity.energy/entity.maxEnergy*260,50);
		this.g.stroke();
		this.g.fillText(entity.energy+"/"+entity.maxEnergy,350,55,50);
		//Black Line
		this.g.beginPath();
		this.g.lineCap="square";
		this.g.lineWidth=4;
		this.g.strokeStyle="black";
		this.g.moveTo(70,35);
		this.g.lineTo(70,56);
		this.g.stroke();
		this.g.beginPath();
		this.g.moveTo(70, 56);
		this.g.lineTo(345,56);
		this.g.stroke();
		
		this.g.translate(-x,-y);
	};
}