//Create variables here
var dog, happyDog,database,foodS,foodStock,dogImg;
function preload()
{
  //load images here
  happyDog=loadImage("images/dogImg1.png");
  dogImg=loadImage("images/dogImg.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  textSize(30);
  fill("black");
  text("Food Remaining: "+ foodS, 100,100);

}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}



