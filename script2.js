
let w = window.innerWidth / 1.01
let h = window.innerHeight / 1.02
//Draws first canvas
function startGame (){

var canvas = document.getElementById('canvas');
canvas.width = w
canvas.height = h
canvas.height = h
var ctx = canvas.getContext('2d');



   //draws spaceship on first canvas
    function drawShip() {
            var img = new Image();
            var ang = 0; //angle
            var fps = 1000 / 60; //number of frames per sec
            img.onload = function () { //on image load do the following stuff
            var cache = this; //cache the local copy of image element for future reference
            setInterval(function () {

            ctx.save(); //saves the state of canvas
            ctx.clearRect(0,0 , w , h); //clear the canvas
            ctx.translate(w / 2, h - 150); //let's translate
            //ctx.rotate(Math.PI / 180 * (ang-=1));
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                  case 38:
                    ang+=20
                    break;
                    case 40:
                    ang-=20
                    break;
                }
            }
            console.log(ang)
            ctx.rotate(Math.PI  / 180 * (ang));
            ctx.drawImage(img, -cache.width , -cache.height ); //draw the image ;)
            

            ctx.restore(); //restore the state of canvas
        }, fps);
    };

    img.src = 'ship.png'; //img
}




drawShip()


// function starts second canvas w/ enviroment

    
let w = window.innerWidth / 1.06
let h = window.innerHeight / 1.06
  var myGamePiece;

  function startCanvas() {
      myGamePiece = new component(30, 30, "red", 80, 75);
      myGameArea.start();
  }
  
  var myGameArea = {
      canvas : document.getElementById("canvas2"),
      start : function() {
          this.canvas.width = w;
          this.canvas.height = h;
          this.context = this.canvas.getContext("2d");
          document.body.insertBefore(this.canvas, document.body.childNodes[0]);
          this.interval = setInterval(updateGameArea, 20);        
      },
      stop : function() {
          clearInterval(this.interval);
      },    
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
  }
  
  function component(width, height, color, x, y, type) {
      this.type = type;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;    
      this.speedX = 0;
      this.speedY = 0;    
      this.gravity = 0.05;
      this.gravitySpeed = 0;
      this.update = function() {
          ctx = myGameArea.context;
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      this.newPos = function() {
          this.gravitySpeed += this.gravity;
          this.x += this.speedX;
          this.y += this.speedY + this.gravitySpeed;        
      }
  }
  
  function updateGameArea() {
      myGameArea.clear();
      myGamePiece.newPos();
      myGamePiece.update();
  }
  
    
startGame()
  startCanvas()
    
    }




