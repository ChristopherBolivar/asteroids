
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
        shoot:  function () {
            barr.push(new Bullet(craft.x + 35 , craft.y - 50, 15, 35,limg))
            lazerSFX.play()
           
},
        
    }
        //getting image for spaceship
        var img = new Image();
        img.onload = function () { //on image load do the following stuff
            ctx.drawImage(img, craft.x, craft.y, craft.w,  craft.h);
           };
        img.src = 'ship.png'; //img
       
        var lazerSFX = new Audio()
        lazerSFX.volume = 1
        lazerSFX.src = "lazersfx.mp3";
    //Key functions for spaceship
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                craft.moveLeft()
                break;
                case 39: 
                craft.moveRight()
                break;
            case 32:
                craft.shoot()   
                break;
        }
    }
    var limg = 'lazer.png'
    //constructor for lazer   
    class Bullet {
        constructor(x, y, width, height, img,sfx) {
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this.img = img
        }
        shoot() {
            this.y-=10
            var lazershot = new Image();
            lazershot.src = 'lazer.png'
           
            ctx.drawImage(lazershot, this.x, this.y, this.w,  this.h);
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
           
        }
        
        
        //Arr is meteor array,tarr is second wave, sArr is the array for stars
        let arr = []
        let tarr = []
        let sArr = []
        //looping pushing to rectangle components to draw the meteors and stars onto canvas
        
        for (let i = 0; i < 100; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 50, 49, exp))
           
        }
        for (let i = 0; i < 80; i++) {
            arr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 100, 99, exp))
        }
        for (let i = 0; i <= canvas2.height; i++) {
            sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() *  1000, 1, 1))
        
        }
        for (let i = 0; i <= canvas2.height; i++) {
            sArr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * 1000, 1.5, 1.5))
        
        }
       
        
        let score = 0
        let lifePoints = 5
        var html = document.querySelector("#result")
       

        var star = new Image();
        star.width = "1rem"
        star.height = "1rem"
        star.src = 'star.png'
        var lpArr = [star,star,star,star,star]
         //function to keep track of score
         function scoreTracker() {
            ctx.fillStyle = 'white';
            ctx.font = '24px Audiowide';
            ctx.fillText("Score: " + score, 1000, 40);
            ctx.fillStyle = 'red';
            ctx.fillText("Health: " + lifePoints.toFixed(0), 150, 40);
            // let cr = 0
            // lpArr.forEach(a =>{
            //     ctx.drawImage(a, 150 + cr , 50);
            //     cr += 50
            // })

        }
        //animate function
        var bgSFX = new Audio()
        bgSFX.volume = 1
        bgSFX.src = "bg.mp3";
        function updateCanvas() {
            bgSFX.play()
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx.clearRect(0, 0, w,h);
            ctx.drawImage(img, craft.x, craft.y, craft.w, craft.h);
            
            
            addMore()
            
            scoreTracker()
            drawBG()
            arr.forEach(block => {
                block.down()
                
            })
            tarr.forEach(block => {
                block.down()
                
            })
            
            sArr.forEach(block => {
                block.downSlowly()
            })
            
            barr.forEach(lazer => {
                lazer.shoot()

            })
            checkCollision()
            if(arr.length === 0 && tarr.length === 0 ){
                html.innerHTML = `
                
                <h1>Congratulations!</h1>
                <h2>You have cleared the asteroid fields!</h2>
                <h3>Highscore: <span id="highscore2">${score}</span></h3>
                <button id="playAgain2" type="button" class="btn btn-light btn-lg">Play Again</button>
                
                `

                document.querySelector('#result-tab').click()
                
                document.querySelector("#playAgain2").addEventListener('click', () => {
                    document.querySelector('#canvas-tab').click()
                    startGame() 
                }) 
                
                window.cancelAnimationFrame() 
                }
            
            window.requestAnimationFrame(updateCanvas)
        }
        let www = window.requestAnimationFrame(updateCanvas)

        
        var srSFX = new Audio()
        srSFX.volume = 1
        srSFX.src = "rockshipcrash.mp3";
        var expSFX = new Audio()
        expSFX.volume = 1
        expSFX.src = "exp.mp3";
        function checkCollision() {
            var ship = craft;

          let counter;
            arr.forEach(block => {
                var rock = block;
                 counter = 0
                if (ship.x < rock.x + rock.w &&
                    ship.x + ship.w > rock.x &&
                    ship.y < rock.y + rock.h &&
                    ship.y + ship.h > rock.y) {
                    srSFX.play()
                    counter++
                    if(rock.h === 49){
                        lifePoints -= .0549
                  
                    //lpArr.splice(0,1)

                    }
                    if(rock.h === 99){
                        lifePoints -= .07;

                   // lpArr.splice(0, 1)
                    }
                    if(lifePoints < .9){
                    
                    html.innerHTML = `
                    
                    <h1>You Suck!</h1>
                    <h2>You have <u>failed</u> to clear the asteroid fields!</h2>
                    <h3>Highscore: <span>${score}</span></h3>
                    <button id="playAgain" type="button" class="btn btn-light btn-lg">Play Again</button>
                    `


                    document.querySelector("#playAgain").addEventListener('click', () => {
                        document.querySelector('#canvas-tab').click()
                        startGame() 
                    }) 
                    document.querySelector('#result-tab').click()

                    window.cancelAnimationFrame() 

                    }
                    
                       
                
                    console.log(counter)

                }
                
                if(block.y > canvas2.height){
                    arr.splice(arr.indexOf(block), 1)
                }
            })
            tarr.forEach(block => {
         
                var rock = block;

                if (ship.x < rock.x + rock.w &&
                    ship.x + ship.w > rock.x &&
                    ship.y < rock.y + rock.h &&
                    ship.y + ship.h > rock.y) {
                    srSFX.play()
                    lpArr.splice(lpArr.length - 1, 1)

                    if(rock.h === 49){
                        lifePoints -= .0549
                    }
                    if(rock.h === 99){
                        lifePoints -= .07;
                    }
                    if(lifePoints < .2){
                        html.innerHTML = `
                    
                        <h1>You Suck!</h1>
                        <h2>You have <u>failed</u> to clear the asteroid fields!</h2>
                        <h3>Highscore: <span>${score}</span></h3>
                        <button id="playAgain" type="button" class="btn btn-light btn-lg">Play Again</button>
                        `
                        document.querySelector("#playAgain").addEventListener('click', () => {
                            document.querySelector('#canvas-tab').click()
                            startGame() 
                        }) 
                        document.querySelector('#result-tab').click()
                        window.cancelAnimationFrame() 
                    }
                    
                       
                }
               
                if(block.y > canvas2.height){
                    tarr.splice(tarr.indexOf(block), 1)
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
                        
                        expSFX.play()
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
            tarr.forEach(met => {
                barr.forEach(lazer =>{
                
                    
                        if (lazer.x < met.x + met.w &&
                            lazer.x + lazer.w > met.x &&
                            lazer.y < met.y + met.h &&
                            lazer.y + lazer.h > met.y) {
                            expSFX.play()
                            barr.splice(arr.indexOf(lazer), 1) 
                            tarr.splice(tarr.indexOf(met), 1)
                            
                            if(met.h >= 99){
                            score += 20
                            }
                            
                            if(met.h >= 49){
                                score += 10
                                }
                            
                        }
                        if(lazer.y <= 0){
                            barr.splice(tarr.indexOf(lazer), 1)
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

       let  arrEmpty = false; 
       let  firstWaveOver = false; 
       function addMore(){
           if(arr.length <= 20) {
                arrEmpty = true
           }
           if(arrEmpty && !firstWaveOver){
                firstWaveOver = true
            for (let i = 0; i <= 200; i++) {
                tarr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 50, 49, exp))
               
            }
            for (let i = 0; i <= 100; i++) {
                tarr.push(new Rectangle(Math.random() * canvas2.width, Math.random() * -10000, 100, 99, exp))
               
            }


           }
       
       }
         
    }
    
  

  


   
