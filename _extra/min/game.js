;(function(exports) {
  var Game = function(canvasId, width, height, autoFocus) {
    var coq = new Coquette(this, canvasId, width, height, "#000", autoFocus);

    var wht = new Image();
    wht.src = 'images/whtcats.png'
    var blk = new Image();
    blk.src = 'images/blkcats.png'
    
    coq.entities.create(Cat, { pos:{ x:0, y:100 }, img:wht, 
      update: function() {
        if (coq.inputter.state(coq.inputter.UP_ARROW)) {
          this.pos.y -= 1.5;
        }
        if (coq.inputter.state(coq.inputter.DOWN_ARROW)) {
          this.pos.y += 1.5;
        }
        if (coq.inputter.state(coq.inputter.LEFT_ARROW)) {
          this.pos.x -= 1.5;
        }
        if (coq.inputter.state(coq.inputter.RIGHT_ARROW)) {
          this.pos.x += 1.5;
        }
        if (this.frame == 15)
            this.frame = 0;
        else 
            this.frame++;
      }
    });
  };

  var Cat = function(_, settings) {
    self = this;
    for (var i in settings) {
      this[i] = settings[i];
    }
    this.frame = 0;
    this.states = {
        walk: 1
    }
    this.size = { x:9, y:9 };
    this.draw = function(ctx) {
      ctx.drawImage(self.img,Math.floor(this.frame / 4) * 23,0,23,14,self.pos.x,self.pos.y,23,14);
    };
  };

  exports.Game = Game;
})(this);
