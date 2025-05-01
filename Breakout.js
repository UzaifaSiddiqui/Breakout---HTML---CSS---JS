const grid = document.querySelector(".grid");
const block =  document.createElement("div");
let startPosition = [205,10]
const ball = document.createElement("div");
ball.classList.add("ball");
grid.append(ball);
ball.style.left = 238+"px";
ball.style.bottom = 35+"px";

function baseBlock(){
    block.classList.add("block");
    grid.append(block);
    block.style.left = startPosition[0]+"px";
    block.style.bottom = startPosition[1]+"px";
}

let position = 205;
document.addEventListener("keydown",blockMovement)
    

function blockMovement(event){
        if (event.key === "ArrowRight"){
            if(position < 415){
                position = position + 3
                console.log("right : ",position);
                block.style.left = position+"px";
            }
        }
        if (event.key === "ArrowLeft"){
            if(position > 1){
                position = position - 3;
                console.log("left : ",position);
                block.style.left = position+"px"; 
            }
        }
}


baseBlock();


let xDirection = 238 ;
let yDirection = 76 ;

let xpos = 2;
let ypos = 2;

let interval = setInterval(ballMove,30);

function ballMove(){
    xDirection = xDirection + xpos;
    yDirection = yDirection + ypos;
    console.log("xDirection : ",xDirection);
    console.log("yDirection : ",yDirection);   
    ball.style.left = xDirection+"px";
    ball.style.bottom = yDirection+"px";
    catchBall();
    checkCollision();
    checkBallCollision();
}

function checkCollision(){
    if (yDirection > 280 || yDirection <= 0){
            ypos = -ypos;
    }
    if (xDirection > 480 || xDirection <= 0){
            xpos = -xpos;
    }
}

function catchBall(){
    console.log("catch ball running");
    if(xDirection + 20 <= position + 80 && xDirection+20 >=position){
        if (yDirection+20 <= 55){
            ypos = -(ypos)
            yDirection += ypos;
        }
    }
    else if (xDirection + 20 > position + 80 || xDirection+20 <position){
        if (yDirection <= 0){
            clearInterval(interval);
        }
    }
} 

//creating blocks

let blockposition = {
    1 : [25,260] , 2: [195,260] , 3:[365,260] ,
    4 : [25,220] , 5 : [195,220] , 6 : [365,220]
}

for(let i = 1 ; i<=Object.keys(blockposition).length ; i++){
    let blocks = document.createElement("div");
    blocks.classList.add("tile");
    blocks.style.left=(blockposition[i][0])+"px";
    blocks.style.bottom=(blockposition[i][1])+"px";
    grid.append(blocks);
} 


//checking for hit
function checkBallCollision(){
    let tileWidth = 120;
    let tileHeight = 25;
    let ballSize = 20;

    for (let i = 1; i <= Object.keys(blockposition).length; i++) {
        console.log("hello");
        let tileX = blockposition[i][0];
        let tileY = blockposition[i][1];

        // Check overlap
        if (
            xDirection + ballSize > tileX &&      // ball's right edge > tile's left edge
            xDirection < tileX + tileWidth &&     // ball's left edge < tile's right edge
            yDirection + ballSize > tileY &&      // ball's top edge > tile's bottom edge
            yDirection < tileY + tileHeight       // ball's bottom edge < tile's top edge
        ) {
            // Collision happened!
            console.log("Hit tile:", i);
            ypos = -ypos;  // bounce
            // remove tile from DOM (optional):
            document.querySelectorAll(".tile")[i - 1].remove();
            // remove tile from blockposition so it doesn’t get checked again:
            delete blockposition[i];
            break;
        }
    }
}