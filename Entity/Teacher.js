function Teacher(x, y, visible, stats, canvasID, handler, stateHandler, students){
    this.id = new ID().Teacher;
    Entity.apply(this, arguments);
    this.stateHandler = stateHandler;
    this.width = 30;
    this.height = 30;
    this.lastX = this.x;
    this.lastY = this.y;
    this.finals = false;
    this.studentData = students;
    this.currentStudent = 0;
    this.students = [];
    this.defeated = false;
    this.initBattle =()=>{
        for(var i = 0; i < this.studentData.length;i++){
            if(this.studentData[i].name == "Bob"){
                this.students[i] = new BobStudent(this.studentData[i].x, this.studentData[i].y, this.studentData[i].visible, this.studentData[i].stats, this.studentData[i].canvasID, this.studentData[i].handler);
            }
            if(this.studentData[i].name == "Steve"){
                this.students[i] = new SteveStudent(this.studentData[i].x, this.studentData[i].y, this.studentData[i].visible, this.studentData[i].stats, this.studentData[i].canvasID, this.studentData[i].handler);
            }
            if(this.studentData[i].name == "English"){
                this.students[i] = new EnglishHomework(this.studentData[i].x, this.studentData[i].y, this.studentData[i].visible, this.studentData[i].stats, this.studentData[i].canvasID, this.studentData[i].handler);
            }
            if(this.studentData[i].name == "Math"){
                this.students[i] = new MathHomework(this.studentData[i].x, this.studentData[i].y, this.studentData[i].visible, this.studentData[i].stats, this.studentData[i].canvasID, this.studentData[i].handler);
            }
            if(this.studentData[i].name == "History"){
                this.students[i] = new HistoryHomework(this.studentData[i].x, this.studentData[i].y, this.studentData[i].visible, this.studentData[i].stats, this.studentData[i].canvasID, this.studentData[i].handler);
            }
            if(this.studentData[i].name == "Science"){
                this.students[i] = new ScienceHomework(this.studentData[i].x, this.studentData[i].y, this.studentData[i].visible, this.studentData[i].stats, this.studentData[i].canvasID, this.studentData[i].handler);
            }
        
        }
        if(!this.finals)
            this.stateHandler.pushState("battleState", this, '/Map/teacherBattle.mp3', '/Map/teacherVictory.mp3');
        else
            this.stateHandler.pushState("battleState", this, '/Map/finalsBattle.mp3', '/Map/finishedGame.mp3');
    };
    this.render = ()=>{
        if(this.visible){
            this.g.beginPath();
            
            this.g.fillStyle="white";
            this.g.fillRect(this.x, this.y, this.width, this.height);
            
            this.g.beginPath();
        }
    };
}