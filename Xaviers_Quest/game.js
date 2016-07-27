//**************** HTML5 setup ******************


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width="600";
canvas.height="600";

ctx.fillStyle='black';
ctx.fillRect(0,0, canvas.width, canvas.height);



//*************** THE SPRITE CLASS **************


function Sprite(spriteSheet, x, y, speed)
{
    this.image = new Image();
    this.image.src = 'images/sprites/' + spriteSheet;
    this.direction = 'up';
    this.activity = 'idle';
    this.spriteSheetRowPixel = 512;
    this.spriteSheetColumnPixel = 0;
    this.imageIndex = 0;
    this.slowDownIndex = 0;
    this.isMoving = false;
    this.x = x;
    this.y = y;
    this.speed = speed;
    
    this.update = function() {

        if (keyState[KEY_W]) {
            this.spriteSheetRowPixel = 512;
            this.y -= this.speed;
        } 
        if (keyState[KEY_S]) {
            this.spriteSheetRowPixel = 640; 
            this.y += this.speed;
        }
        if (keyState[KEY_A]) { 
            this.spriteSheetRowPixel = 576; 
            this.x -= this.speed;
        }
        if (keyState[KEY_D]) {
            this.spriteSheetRowPixel = 704; 
            this.x += this.speed;
        }
           
        if ((keyState[KEY_W] || keyState[KEY_A] 
          || keyState[KEY_D] || keyState[KEY_S]))
        {
            this.isMoving = true;
        }
        else
            this.isMoving = false;
        
        if (this.isMoving)
        {    
           switch(this.imageIndex)
            {
                case 0: this.spriteSheetColumnPixel =   0; 
                break;
                case 1: this.spriteSheetColumnPixel =  64; 
                break;
                case 2: this.spriteSheetColumnPixel = 128; 
                break;
                case 3: this.spriteSheetColumnPixel = 192; 
                break;
                case 4: this.spriteSheetColumnPixel = 256; 
                break;
                case 5: this.spriteSheetColumnPixel = 320; 
                break;
                case 6: this.spriteSheetColumnPixel = 384; 
                break;
                case 7: this.spriteSheetColumnPixel = 448; 
                break;
                case 8: this.spriteSheetColumnPixel = 512; 
                break;      
            };
        }
        else
            this.spriteSheetColumnPixel = 0;
        this.slowDownIndex++;
        if (this.slowDownIndex > 3)
        {
            this.imageIndex++;
            if (this.imageIndex > 8)
               this.imageIndex = 0;
            this.slowDownIndex = 0;  
        };
    };
    this.render = function()
    {
     // ctx.drawImage(img,                 sx,                            sy,          swidth,sheight,    x,     y,   width,height);
        ctx.drawImage(this.image, this.spriteSheetColumnPixel, this.spriteSheetRowPixel, 64,    64,   this.x, this.y,  64,    64);
    };
};



//**************** game Loop ***********************


var update = function(modifier) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    xavier.update();
};

var render = function() {
    xavier.render();
};

var main = function() {
    
    var then = Date.now();
    var delta = then - now;

    update(delta/1000);
    render();
    requestAnimationFrame(main);

};



//****************** KEYBOARD EVENTS **********************

var keyState = [];
const KEY_W = 87;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;

var keyLogger = function(e) {
    keyState[e.keyCode] = e.type == 'keydown'; 
};
window.addEventListener("keydown", keyLogger, false);
window.addEventListener("keyup", keyLogger, false);



//******************* setup **************************


requestAnimationFrame = window.requestAnimationFrame 
                     || window.webkitRequestAnimationFrame
                     || window.mozRequestAnimationFrame
                     || window.msRequestAnimationFrame;

var xavier = new Sprite('xavier_no_shield.png', (canvas.width - 64)/2 , (canvas.height - 64)/2, 3);
var now = Date.now();
main();     // GO