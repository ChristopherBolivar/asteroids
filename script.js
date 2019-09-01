
let w = window.innerWidth / 1.02
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
            var fps = 1000 / 25; //number of frames per sec
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
                    ang+=25
                    break;
                    case 40:
                    ang-=25
                    break;
                }
            }
            ctx.rotate(Math.PI / 180 * (ang));
            ctx.drawImage(img, -cache.width , -cache.height ); //draw the image ;)
            

            ctx.restore(); //restore the state of canvas
        }, fps);
    };

    img.src = 'ship.png'; //img
}




drawShip()


// function starts second canvas w/ enviroment
function startCanvas2(){
    
        var canvas2 = document.getElementById('canvas2');
        var ctx2 = canvas2.getContext('2d');
        canvas2.width = w
        canvas2.height = h

    //drawing background
        function drawBG() {
        ctx2.fillStyle = "#000"
        ctx2.fillRect(0, 0 , w, h)
    }
    drawBG()

    //drawing stars
    function drawStars() {
        let count = 0
        while(count < h){
        ctx2.fillStyle = "#fff"
        ctx2.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h)  , 1, 1)
        count++
        }
        
    }
    drawStars()
    //drawing asteroids
    function drawRocks() {
        let count = -100
        var fps = 1000 / 25; //number of frames per sec
        window.onload = function () { //on image load do the following stuff
        setInterval(function () {
        while(count < 35){
        ctx.save(); //saves the state of canvas
        ctx.clearRect(0, 0, canvas.width , canvas.height); //clear the canvas
        ctx2.fillStyle = "red"
        ctx2.fillRect(Math.floor(Math.random() * w) , Math.floor(Math.random() * h / count) , 25, 25)
        ctx.restore(); //restore the state of canvas
        count++
        }
    }, fps)
        }
        
    }
    drawRocks()
    
   
    }

    startCanvas2()
}





    
    startGame()