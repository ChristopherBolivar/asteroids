document.querySelector("#startEngine").addEventListener('click', () => {
    document.querySelector('#canvas-tab').click()
    startGame()
})

//Draws first canvas
function startGame() {
    let w = window.innerWidth / 1.01
    let h = window.innerHeight / 1.05
    var canvas = document.getElementById('canvas');
    canvas.width = w
    canvas.height = h
    canvas.height = h
    var ctx = canvas.getContext('2d');
    //lazer array
    var barr = []
    var ang = 0; //angle



    //spaceship object
    var craft = {
        x: w / 2,
        y: h - 150,
        w: 90,
        h: 90,
        moveUp: function () {
            ang += 25
        },
        moveDown: function () {
            ang -= 25
        },
        moveLeft: function () {
            this.x -= 55
            if(this.x <= 1){
                this.x += 100
            }
        },
        moveRight: function () {
            this.x += 55
            if(this.x >= 1238){
                this.x -= 100
            }
        },
        
    }
        //getting image for spaceship
        var img = new Image();
        img.onload = function () { //on image load do the following stuff
            ctx.drawImage(img, craft.x, craft.y, craft.w,  craft.h);
           };
        img.src = 'ship.png'; //img
       
   
    //Key functions for spaceship
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
                barr.push(new Bullet(craft.x + 35 , craft.y - 50, 15, 35,limg))
                break;
        }
    }
    var limg = 'lazer.png'
    //constructor for lazer   
    class Bullet {
        constructor(x, y, width, height, img) {
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this.img = img
        }
        shoot() {
            this.y-=10
            var lazershot = new Image();
            lazershot.src = this.img
               ctx.drawImage(lazershot, this.x, this.y, this.w,  this.h);
           }
       


        
        draw() {

            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }


    // second canvas w/ enviroment
    

        var canvas2 = document.getElementById('canvas2');
        var ctx2 = canvas2.getContext('2d');
        canvas2.width = window.innerWidth / 1.01
        canvas2.height = window.innerHeight / 1.05

      
        //drawing background
        function drawBG() {
            ctx2.fillStyle = "#000"
            ctx2.fillRect(0, 0, canvas2.width, canvas2.height)
        }

        var exp = 'asteroid.png'

        class Rectangle {
            constructor(x, y, width, height,img) {
                this.x = x;
                this.y = y;
                this.w = width;
                this.h = height;
                this.img = img
            }
            
            down() {
                this.y += 4
                var myImage = new Image(); 
                myImage.src = this.img
                ctx2.drawImage(myImage, this.x, this.y, this.w,  this.h);
                //console.log(this.y)
            }
            downSlowly() {
                this.y += 1
                ctx2.fillStyle = "white";
                ctx2.fillRect(this.x, this.y, this.w, this.h);
            }
            draw() {
                ctx2.fillRect(this.x, this.y, this.w, this.h);
            }
        }
        
        
        //Arr is meteor array, sArr is the array for stars
        let arr = []
        let sArr = []
        let mAmount = 200
        //looping pushing to rectangle components to draw the meteors and stars onto canvas
        for (let i = 0; i < 100; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 50, 49, exp))
           
        }
        for (let i = 0; i < 50; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 100, 99, exp))
           
        }
        for (let i = 0; i <= canvas2.height; i++) {
            sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() *  1000, 1, 1))
        
        }
        for (let i = 0; i <= canvas2.height; i++) {
            sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * 1000, 1.5, 1.5))
        
        }
        //function to keep track of score
        function scoreTracker() {
            ctx.fillStyle = 'white';
            ctx.font = '24px Audiowide';
            ctx.fillText("Score: " + score, 1000, 50);
            ctx.fillText(sArr.length, 1000, 100);
            ctx.fillText("Health: " + lifePoints.toFixed(0), 1000, 75);
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
            if(arr.length === 0){
                // for (let i = 0; i < 300; i++) {
                //     arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 50, 49, exp))
                   
                // }
                // for (let i = 0; i < 100; i++) {
                //     arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 100, 99, exp))
                   
                // }
                document.querySelector('#win-tab').click()

               
            }
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
                        
                    if(rock.h === 49){
                        lifePoints -= .0549
                    }
                    if(rock.h === 99){
                        lifePoints -= .07;
                    }
                    if(lifePoints < .2){
                    
                    document.querySelector('#lose-tab').click()
                    window.cancelAnimationFrame() 

                    }

                }
               
                let cw = 0
                if(block.y > canvas2.height){
                    arr.splice(arr.indexOf(block), 1)
                }
               

            })
            arr.forEach(block => {
            barr.forEach(lazer =>{
            
                var mHp = 2
                var smHp = 1
                
                    if (lazer.x < block.x + block.w &&
                        lazer.x + lazer.w > block.x &&
                        lazer.y < block.y + block.h &&
                        lazer.y + lazer.h > block.y) {
                        barr.splice(arr.indexOf(lazer), 1) 
                        arr.splice(arr.indexOf(block), 1)
                        
                        if(block.h >= 99){
                        score += 20
                        mHp -=1
                        }
                        
                        if(block.h >= 49){
                            score += 10
                            smHp -=1
                            }
                        
                    }
                    if(lazer.y <= 0){
                        barr.splice(arr.indexOf(lazer), 1)
                    }
                   
                })
                
            })
            sArr.forEach(star =>{
                if(star.y > 800){
                    sArr.splice(sArr.indexOf(star), 1)
                }
                if(sArr.length  <= 1000){
                    for (let i = 0; i <= canvas2.height; i++) {
                        sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -1000, 1, 1))
                    
                    }
                    for (let i = 0; i <= canvas2.height; i++) {
                        sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -1000, 1.5, 1.5))
                    
                    }
                }
            })
        
        }
        
                
    }
    
  

  


   
