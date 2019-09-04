//Draws first canvas
function startGame() {
    let w = window.innerWidth / 1.02
    let h = window.innerHeight / 1.02

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
        w: 20,
        h: 55,
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
        //var fps = 1000 / 25; //number of frames per sec
        img.onload = function () { //on image load do the following stuff
            ctx.drawImage(img, craft.x, craft.y, craft.w,  craft.h);
            ctx.rotate(Math.PI / 180 * (ang))
           };
        img.src = 'ship.png'; //img

    //ctx.rotate(Math.PI / 180 * (ang-=1));

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
                let tan = Math.tan(ang)
                barr.push(new Bullet(craft.x, craft.y, 15, 25, tan))
                break;
        }
    }

   
    class Bullet {
        constructor(x, y, width, height, angle) {
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this.angle = angle
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

        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

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
                ctx2.fillStyle = "red";
                ctx2.fillRect(this.x, this.y, this.w, this.h);
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

        let arr = []
        let sArr = []

        for (let i = 0; i < 100; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 50, 50))
        }
        for (let i = 0; i <= canvas2.height; i++) {
            sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 1, 1))
        }


        function updateCanvas() {
            
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx.clearRect(0, 0, w,h);
            ctx.drawImage(img, craft.x, craft.y, craft.w, craft.h);
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
            //console.log(rect1)
        
            arr.forEach(block => {
        
                var rock = block;
        
                if (ship.x < rock.x + rock.w &&
                    ship.x + ship.w > rock.x &&
                    ship.y < rock.y + rock.h &&
                    ship.y + ship.h > rock.y) {
                    // collision detected!
                    console.log('GAME OVER')
                    window.cancelAnimationFrame() 
                }
            })
            arr.forEach(block => {
            barr.forEach(lazer =>{
            
                
                    if (lazer.x < block.x + block.w &&
                        lazer.x + lazer.w > block.x &&
                        lazer.y < block.y + block.h &&
                        lazer.y + lazer.h > block.y) {
                        // collision detected!
                        console.log(arr.indexOf(block))
                        console.log(arr)
                        arr.splice(arr.indexOf(block), 1)
                        barr.splice(arr.indexOf(lazer), 1)
                        console.log(arr)
                        console.log('collision')
                    }
                })
            })
        
        }
         
    }
  

  //  startCanvas2()
//}






startGame()