const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1, pig3;
var BackgroundImg, platform;
var bird, slingshot;

var gameState = "onSling";
var score = 0;
var reload,reloadImage;
var Captain1,CaptainIMG;
var shieldSound;
var Galactus1;
var endIMG;

function preload() {
    getBackgroundImg();
    reload = loadImage ("sprites/reloadImage.jpg");
    CaptainIMG = loadImage ("sprites/captain.png");
    endIMG = loadImage ("sprites/endIMG.jpg");

    shieldSound = loadSound("audio/shield.wav");
}

function setup() {
    var canvas = createCanvas(1500, 450);

    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600, height, 1800, 20);
    platform = new Ground(150, 355, 350, 170);

    box1 = new Box(700, 370, 70, 70);
    box2 = new Box(920, 370, 70, 70);
    pig1 = new Pig(810, 400);
    log1 = new Log(810, 310, 300, PI / 2);

    box3 = new Box(700, 290, 70, 70);
    box4 = new Box(920, 290, 70, 70);
    pig3 = new Pig2(810, 270);

    log3 = new Log(810, 230, 300, PI / 2);

    box5 = new Box(810, 210, 70, 70);
    log4 = new Log(760, 170, 150, PI / 7);
    log5 = new Log(870, 170, 150, -PI / 7);

    reloadButton = new ReloadClass(1100,70,50,25);

    bird = new Bird(200, 50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, { x: 250, y: 100 });

    log5 = new Log(870, 170, 150, -PI / 7);

    Captain1 = new Captain(50,210,150,100 );

    Galactus1 = new Galactus(1400,400,350,300 );

    

   
}

function draw() {

    if (BackgroundImg) {
        background(BackgroundImg);
    }

    if(score == 400){
        fill("gold");
        textSize(50);
        text("You Won",650,200);
    }
    if(score == 200){
        fill("gold");
        textSize(50);
        text("Better Luck Next Time",500,50);
    }
    

    fill("white");
    text("Score: " + score, width - 300, 50);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    Captain1.display();

    bird.display();
    platform.display();

    reloadButton.display();

    slingshot.display();

    Galactus1.display();

}


function mouseDragged() {
    if (gameState !== "launched") {
        Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
    }
}


function mouseReleased() {
    slingshot.fly();
    gameState = "launched";
    shieldSound.play();
}

function keyPressed() {
    if (keyCode === ("p")) {
        slingshot.attach(Captain1.body);
    }
    if(keyCode === ("r")){
        window.location.reload();
    }
}

async function getBackgroundImg() {
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJson = await response.json();
    console.log(responseJson.datetime);
    var hour = responseJson.datetime.slice(11, 13);
    console.log(hour);

    if (hour >= 06 && hour <= 19) {
        bg = "sprites/bg.jpg"
    }
    else {
        bg = "sprites/bg.jpg"
    }
    BackgroundImg = loadImage(bg);
}
