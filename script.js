//Draws first canvas
function startGame() {
    let w = window.innerWidth / 1.01
    let h = window.innerHeight / 1.01
    var canvas = document.getElementById('canvas');
    canvas.width = w
    canvas.height = h
    canvas.height = h
    var ctx = canvas.getContext('2d');

    //ctx.rotate(45 * Math.PI / 180);
    var barr = []
    var ang = 0; //angle




    var craft = {
        x: w / 2,
        y: h - 150,
        w: 85,
        h: 100,
        moveUp: function () {
            ang += 25
        },
        moveDown: function () {
            ang -= 25
        },
        moveLeft: function () {
            this.x -= 55
        },
        moveRight: function () {
            this.x += 55
        },
        
    }
    var img = new Image();
        img.onload = function () { //on image load do the following stuff
            ctx.drawImage(img, craft.x, craft.y, craft.w,  craft.h);
           };
        img.src = 'ship.png'; //img
       


    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38:
                craft.moveUp()
                break;
            case 40:
                craft.moveDown()
                break;
            case 37:
                craft.moveLeft()
                break;
                case 39: 
                craft.moveRight()
                break;
            case 32:
                barr.push(new Bullet(craft.x + 35 , craft.y - 50, 15, 25))
                break;
        }
    }

   
    class Bullet {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
        }
        shoot() {
            
            this.y-=10
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.w, this.h);


        }
        draw() {

            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }


    // function starts second canvas w/ enviroment
    //function startCanvas2() {

        var canvas2 = document.getElementById('canvas2');
        var ctx2 = canvas2.getContext('2d');
        canvas2.width = window.innerWidth / 1.02
        canvas2.height = window.innerHeight / 1.02

      
        //drawing background
        function drawBG() {
            ctx2.fillStyle = "#000"
            ctx2.fillRect(0, 0, canvas2.width, canvas2.height)
        }



        class Rectangle {
            constructor(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.w = width;
                this.h = height;
            }
            
            down() {
                this.y += 5
                var myImage = new Image();
                myImage.src = 'asteroid.png';
               ctx2.drawImage(myImage, this.x, this.y, this.w,  this.h);
            }
            downSlowly() {
                this.y += 1
                ctx2.fillStyle = "white";
                ctx2.fillRect(this.x, this.y, this.w, this.h);
            }
            draw() {
                ctx2.fillRect(this.x, this.y, this.w, this.h);
            }
            ast(){
                
            }
        }
        
        

        let arr = []
        let sArr = []
        let mAmount = 200
        let c = 0
        for (let i = 0; i < 200; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 50, 49))
            c++
        }
        for (let i = 0; i < 50; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 100, 99))
            c++
        }
       
        for (let i = 0; i <= canvas2.height; i++) {
            sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 1, 1))
        
        }
        
        function scoreTracker() {
            ctx.fillStyle = 'white';
            ctx.font = '18px serif';
            ctx.fillText("Score: " + score, 1000, 50);
            ctx.fillText("Health: " + lifePoints.toFixed(0), 1000, 70);
        }

        let score = 0
        let lifePoints = 5
        function updateCanvas() {
            
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx.clearRect(0, 0, w,h);
            ctx.drawImage(img, craft.x, craft.y, craft.w, craft.h);
            
            scoreTracker()
            drawBG()
            arr.forEach(block => {
                block.down()
            })
            sArr.forEach(block => {
                block.downSlowly()
            })
            barr.forEach(lazer => {
                lazer.shoot()

            })
            checkCollision()
            window.requestAnimationFrame(updateCanvas)
        }
        let www = window.requestAnimationFrame(updateCanvas)

        
        function checkCollision() {
            var ship = craft;
        
            arr.forEach(block => {
        
                var rock = block;
        
                if (ship.x < rock.x + rock.w &&
                    ship.x + ship.w > rock.x &&
                    ship.y < rock.y + rock.h &&
                    ship.y + ship.h > rock.y) {
                        lifePoints -= .0549
                    // collision detected!
                    // if(rock.h === 49){
                    //     lifePoints -= 1;
                    // }
                    // if(rock.h === 99){
                    //     lifePoints -= 2;
                    // }
                    if(lifePoints <= 0){
                    window.cancelAnimationFrame() 
                    }
                }
               

                
               

            })
            arr.forEach(block => {
            barr.forEach(lazer =>{
            
                
                    if (lazer.x < block.x + block.w &&
                        lazer.x + lazer.w > block.x &&
                        lazer.y < block.y + block.h &&
                        lazer.y + lazer.h > block.y) {
                        arr.splice(arr.indexOf(block), 1)
                        barr.splice(arr.indexOf(lazer), 1)
                        if(block.h >= 101){
                        score += 20
                        }
                        if(block.h >= 51){
                            score += 10
                            }
                    }
                    if(lazer.y <= 0){
                        barr.splice(arr.indexOf(lazer), 1)
                    }
                })
            })
        
        }
         
    }
  

  






startGame()