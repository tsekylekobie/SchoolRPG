function Game(canvas){
	this.canvas = document.getElementById(canvas);
	this.g = this.canvas.getContext("2d");
    this.running = true;
    
    this.eHandler = new EntityHandler();
    this.sHandler = new StateHandler();
    this.mHandler = new MapHandler();
    this.hud = new HUD(this.eHandler, canvas);
    
    this.update = ()=>{
        if(this.running){
            this.tick();
            this.render();
        }
    };
    this.render = ()=>{
        this.g.fillStyle = "white";
        this.g.rect(0, 0, 1000, 650);
        this.g.fill();
        this.sHandler.render();
    };
    this.tick = ()=>{
        this.sHandler.tick();
    }
    this.fps = 60;
    this.start = ()=>{ 
        this.player = new Player(500, 250, true, {h:100, e:200, d:5, s:10, lvl:1, exp:0, t:"Paper"}, canvas, this.eHandler);
        this.player.name = "Player";
        this.initStates();
        this.initMaps();
        this.loop = setInterval(this.update, 1000/this.fps);
    }
    this.initStates = ()=>{
        new WorldState("worldState", canvas, this.sHandler, this.eHandler, this.mHandler, this.hud);
        new MainMenuState("mainMenuState", canvas, this.sHandler, this.eHandler, this.mHandler);
        new BattleState("battleState", canvas, this.sHandler, this.eHandler, this.mHandler, this.hud);
        new MenuState("menuState", canvas, this.sHandler, this.eHandler, this.mHandler);
        
        
        this.sHandler.pushState("worldState");
        this.sHandler.pushState("mainMenuState");
    }
    this.initMaps = ()=>{
        new HomeMap("home", canvas, this.mHandler, this.eHandler, this.sHandler);
        
        new SchoolMap("school", canvas, this.mHandler, this.eHandler, this.sHandler);
        
        var class01a = new Class01Map("class01a", canvas, this.mHandler, this.eHandler, this.sHandler, '/Map/class01.mp3', 900, 100);
        class01a.teacher =  new Teacher(700, 50, false, {h:100, e:200, l:5, mi:10, ei:10, s:10, lvl:1, exp:0, t:"Paper"}, canvas, this.eHandler, this.sHandler, [{name:"Bob", x:0, y:0, visible:false, stats:{h:150, e:1000, s:4, d:5, lvl:5, exp:55, t:"Rock"}, canvasID:canvas, handler:this.eHandler},{name:"Steve", x:0, y:0, visible:false, stats:{h:50, e:1000, d:5, s:4, lvl:5, exp:55, t:"Rock"}, canvasID:canvas, handler:this.eHandler}]);
        
        var class01b = new Class01Map("class01b", canvas, this.mHandler, this.eHandler, this.sHandler, '/Map/class01b.mp3', 900, 350);
        class01b.teacher =  new Teacher(700, 50, false, {h:100, e:200, l:5, mi:10, ei:10, s:10, lvl:1, exp:0, t:"Paper"}, canvas, this.eHandler, this.sHandler, [{name:"Bob", x:0, y:0, visible:false, stats:{h:250, e:1000, s:14, d:5, lvl:5, exp:55, t:"Rock"}, canvasID:canvas, handler:this.eHandler},{name:"Bob", x:0, y:0, visible:false, stats:{h:50, e:1000, s:400, d:5, lvl:5, exp:75, t:"Rock"}, canvasID:canvas, handler:this.eHandler}]);
        
        var class02a = new Class02Map("class02a", canvas, this.mHandler, this.eHandler, this.sHandler, '/Map/class02.mp3', 100, 100);
        class02a.teacher =  new Teacher(300, 50, false, {h:100, e:200, l:5, mi:10, ei:10, s:10, lvl:1, exp:0, t:"Paper"}, canvas, this.eHandler, this.sHandler, [{name:"English", x:0, y:0, visible:false, stats:{h:550, e:1000, s:24, d:15, lvl:15, exp:55, t:"Rock"}, canvasID:canvas, handler:this.eHandler},{name:"History", x:0, y:0, visible:false, stats:{h:450, e:1000, s:400, d:5, lvl:5, exp:75, t:"Scissors"}, canvasID:canvas, handler:this.eHandler}]);
        
        var class02b = new Class02Map("class02b", canvas, this.mHandler, this.eHandler, this.sHandler, '/Map/class02b.mp3', 100, 350);
        class02b.teacher =  new Teacher(300, 50, false, {h:100, e:200, l:5, mi:10, ei:10, s:10, lvl:1, exp:0, t:"Paper"}, canvas, this.eHandler, this.sHandler, [{name:"Science", x:0, y:0, visible:false, stats:{h:150, e:1000, s:104, d:5, lvl:25, exp:55, t:"Rock"}, canvasID:canvas, handler:this.eHandler},{name:"Math", x:0, y:0, visible:false, stats:{h:500, e:1000, s:400, d:5, lvl:5, exp:75, t:"Paper"}, canvasID:canvas, handler:this.eHandler}]);
        
        var finals = new FinalsMap("finals", canvas, this.mHandler, this.eHandler, this.sHandler, '/Map/finalsRoom.mp3');
        finals.teacher =  new Teacher(500, 10, false, {h:100, e:200, l:5, mi:10, ei:10, s:10, lvl:1, exp:0, t:"Paper"}, canvas, this.eHandler, this.sHandler, [{name:"English", x:0, y:0, visible:false, stats:{h:1550, e:11000, s:214, d:115, lvl:55, exp:555, t:"Rock"}, canvasID:canvas, handler:this.eHandler},{name:"History", x:0, y:0, visible:false, stats:{h:4550, e:10500, s:1400, d:0, lvl:50, exp:795, t:"Scissors"}, canvasID:canvas, handler:this.eHandler},{name:"Science", x:0, y:0, visible:false, stats:{h:150, e:100000, s:100, d:2000, lvl:25, exp:555, t:"Rock"}, canvasID:canvas, handler:this.eHandler},{name:"Math", x:0, y:0, visible:false, stats:{h:9999, e:99999, s:999, d:99, lvl:9, exp:9999, t:"Paper"}, canvasID:canvas, handler:this.eHandler}]);
        finals.teacher.finals = true;
        new CafeMap("cafe", canvas, this.mHandler, this.eHandler, this.sHandler);
        
        
        
        
        this.mHandler.initNames();
    }
    this.stop = ()=>{
        clearInterval(this.loop);
    }
    
}