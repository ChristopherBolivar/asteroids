let w = window.innerWidth / 1.2
let h = window.innerHeight / 1.2
var myGame = {
    canvas: document.createElement("canvas"),
    ship: document.createElement("canvas"),
    start: function(width,height,border) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.canvas.style.border = "2px solid #000"
      this.canvas.style.margin = "2rem"
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    
    
  };
  
  myGame.start()
  myGame.sail()