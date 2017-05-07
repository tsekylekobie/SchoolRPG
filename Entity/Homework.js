function Homework(x, y, stats, canvasID, handler){
    this.id = new ID().Homework;
    Entity.apply(this, arguments);
    this.health = this.stats.h;
    this.maxHealth = this.stats.h;
    this.energy = this.stats.e;
    this.maxEnergy = this.stats.e;
    this.strength = this.stats.s;
    this.defense = this.stats.d;
    this.level = this.stats.lvl;
    this.exp = this.stats.exp;
    this.type = this.stats.t;
}