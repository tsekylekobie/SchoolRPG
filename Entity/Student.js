function Student(x, y, visible, stats, canvasID, handler){
    this.id = new ID().Student;
    Entity.apply(this, arguments);
    this.health = this.stats.h;
    this.maxHealth = this.stats.h;
    this.energy = this.stats.e;
    this.maxEnergy = this.stats.e;
    this.strength = this.stats.s;
    this.defense = this.stats.d;
    this.level = this.stats.lvl;
    this.exp = this.stats.exp;
    this.maxExp = (1.25 *(this.level ^ 3))*25;
    this.type = this.stats.t;
    this.moves = [];
}