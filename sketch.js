
let dataServer;
let pubKey = "pub-c-8023b38b-b78d-4dc5-80cb-ea56808e1983";
let subKey = "sub-c-1c02ba5e-e002-4851-9f24-cb7062034440";
let secretKey = "sec-c-Y2FjZjRmMTktMzdmYS00ZjY5LTk1Y2EtMWJhYzI3MmY3YjEz";

let channelName = "Wonderland";

let you;


let place1 = 100;
let place2 = 200;
let place3 = 300;
let place4 = 100;
let place5 = 400;
let place6 = 200;
let place7 = 300;
let place8 = 100;
let CircleSize = 25;
let ticketShade = ('#FFEB3B');
let backgroundColor = (255, 179, 236);

//initialize variables for buttons
let RollerCoasterButtonX = place5;
let RollerCoasterButtonY = place6;
let FerrisWheelButtonX = place1;
let FerrisWheelButtonY = place2;
let sizeX = 200;
let sizeY = 100;

//decare variables for mouse clicked locations
let xClicked;
let yClicked;

//initialize/declare variables for sun movement
let xCoord1 = 35;
let yCoord1 = 80;
let xCoord2 = 120;
let yCoord2 = 33;
let distanceX;
let distanceY;
let exponent = 3;
let x = 0.0;
let y = 0.0;
let step = 0.01;
let pct = 0.00;

//initialize variables to use for the boat
let boatRec1 = 120;
let boatRec2 = 300;
let boatRec3 = 100;
let boatRec4 = 20;
let boatRec5 = 20;
let boatRec6 = 0;
let boatRec7 = 170;
let boatRec8 = 210;
let boatRec9 = 10;
let boatRec10 = 110;
let boatSail1 = 165;
let boatSail2 = 295;
let boatSail3 = 140;
let boatSail4 = 225;
let boatSail5 = 185;
let boatSail6 = 215;
let boatSail7 = 210;
let boatSail8 = 295;
let boatSail9 = 295;
let boatSail10 = 295;
let boatSail11 = 165;

//declare array for rain
let drops = [];

//use the setup function to draw the canvas and add the text
function setup() {
  //set the canvas size
  createCanvas(680, 500);
  //make the background blue
  background(255, 179, 236);
  //draw the text on the canvas
  textSize(24);
  text('WELCOME to WONDERLAND !', 160, 100);

  dataServer = new PubNub({
    subscribeKey: subKey,
    publishKey: pubKey,
    uuid: you,
    secretKey: secretKey,
    heartbeatInterval: 0,
  }); 
  dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
}

//use the draw function to draw the tickets and call the scene functions 
//depeding on where the user clicks 
function draw() {
  //call the drawTicket function for the lake ticket
  drawTicket(CircleSize, place1, place2, place3, place4, ticketShade, backgroundColor);
  //write Lake on the ticket
  textSize(18);
  text('Ferris Wheel', (place1 + 50), (place2 + 55));
  //call the drawTicket function for the city take
  drawTicket(CircleSize, place5, place6, place7, place8, ticketShade, backgroundColor);
  textSize(18);
  //write city on the ticket
  text('Roller Coaster', (place5 + 45), (place6 + 55));

  //make the remaining cuts in the tickets 
  ellipseMode(RADIUS);
  fill(66, 134, 244);
  noStroke();
  ellipse((place5 + place6), place7, CircleSize);
  ellipse((place5 + place6), place6, CircleSize);

  //check if the lake ticket is clicked
  let FerrisWheelPressed = checkFerrisWheelButtonPressed();
  if (FerrisWheelPressed == true) { // lake button is pressed
    //call the lake scene
    takeToFerrisWheel();
  }
  //check if the city ticket is clicked
  let RollerCoasterPressed = checkRollerCoasterButtonPressed();
  if ( RollerCoasterPressed == true) { // city button is pressed
    //set the framerate for the rain to fall appropriately 
    frameRate(35);
    //draw the background
    background(220);
    //draw the buildings using the drawBuildings function
    drawBuildings();
    //Create 100 rain drops using a for loop. 
    for (i = 0; i < 100; i++) {
      rain1 = drops[i];
      //call the show funciton on the object rain1 to draw the raindrops
      rain1.show();
      //call the move function on the object rain1 to move the raindrops down the canvas
      rain1.move();
    }
  }
}

//checkLakeButtonPressed checks to see if the lake button was clicked 
//Input:n/a
//Output:true or false value
function checkFerrisWheelButtonPressed() {
  if (xClicked >= FerrisWheelButtonX &&
    xClicked <= FerrisWheelButtonX + sizeX &&
    yClicked >= FerrisWheelButtonY &&
    yClicked <= FerrisWheelButtonY + sizeY) { // button is pressed
    return true;
  } else {
    return false;
  }
}

//checkCityButtonPressed checks to see if the city button was clicked 
//Input:n/a
//Output:true or false value
function checkRollerCoasterButtonPressed() {
  if (xClicked >= RollerCoasterButtonX &&
    xClicked <= RollerCoasterButtonX + sizeX &&
    yClicked >= RollerCoasterButtonY &&
    yClicked <= RollerCoasterButtonY + sizeY) { // button is pressed
    return true;
  } else {
    return false;
  }
}

//drawTicket fucntion draws the tickets on the canvas. 
//input:sizeCircle, the size of the ellipse used for cuts; ticketSpot1,
//ticketSpot2, ticketSpot3, and ticketSpot4, the locations, length
//and width variables for the tickets and inner rectangle; ticketColor,
//the color of the ticket
//output:tickets on the canvas 
function drawTicket(sizeCircle, ticketSpot1, ticketSpot2, ticketSpot3, ticketSpot4, ticketColor) {
  fill(ticketColor);
  noStroke();
  rect(ticketSpot1, ticketSpot2, ticketSpot2, ticketSpot4);
  ellipseMode(RADIUS);
  fill(66, 134, 244);
  ellipse(ticketSpot1, ticketSpot3, sizeCircle);
  ellipse(ticketSpot1, ticketSpot2, sizeCircle);
  ellipse(ticketSpot3, ticketSpot2, sizeCircle);
  ellipse(ticketSpot3, ticketSpot3, sizeCircle);
  noFill();
  stroke('black');
  strokeWeight(2);
  rect((ticketSpot1 + 30), (ticketSpot2 + 20), (ticketSpot2 - 60), (ticketSpot4 - 40));
}

//the mouseClicked function is used to determine where the user clicks
function mouseClicked() {
  //xClicked and yClicked are variables for location of the mouse click
  xClicked = mouseX;
  yClicked = mouseY;
  
  //cityPressed is the output of checkCityButtonPressed
  let cityPressed = checkCityButtonPressed();
  
  //if the city ticket is pressed, launch the city scene
  if (cityPressed == true) { // city button is pressed
    takeToCity();
  }
}

//function takeToLake takes the user to the lake scene
//input:n/a
//output:the lake scene
function takeToFerrisWheel() {
  let floatdayNight = 0;
  let colorday, night, currentTime;

function setup() {
  background(255);
  size(800, 800, P2D);
  ellipseMode(CENTER);
  //rectMode(CENTER);
  smooth(32);

  day = color(188, 242, 245);
  night = color(11, 16, 26);
  currentTime = color(0, 0, 0);
}

//ellipse(x-coord,y-coord, width, height)
//translate(x,y)
function draw1() {
  pushMatrix();
    //----------------BACKGROUND TRANSITION----------------
    //dayNight = float(mouseY)/height;
    //println(dayNight);
    currentTime = lerpColor(day, night, dayNight);
    background(currentTime);
  popMatrix();

  //ground
  //strokeWeight(1);
  //pushMatrix();
  //  fill(#717171);
  //  rect(0, 770, 800, 800);
  //popMatrix();

  //----------------CARRIAGES/SPOKES----------------
  pushMatrix();
    fill(255);
    translate(400, 400);
    for (inti = 0; i < 360; i+=15)
      pushMatrix();
        //spokes
        rotate(radians(i+frameCount/20.0));
        strokeWeight(2);
        if (dayNight >= 0.7) {
            stroke(random(255), random(255), random(255));
        } else {
            stroke(255);
        }
        line(0, 0, 300, 0);
        
        strokeWeight(1.5);
        translate(300, 0);
    
        pushMatrix();
          stroke(0);
          rotate(radians(-i+90-frameCount/20.0));
          //change carriage color at evening/nighttime
          if (dayNight < 0.7) {
            fill(lerpColor(color(49, 104, 196), color(25, 51, 95), dayNight));
          }
          //carriage roofs
         pushMatrix();
            if (dayNight >= 0.7) {
              fill(random(255), random(255), random(255));
            } else {
              fill(lerpColor(color(49, 104, 196), color(25, 51, 95), dayNight));
            }
            translate(5, 0);
            rotate(radians(90));
            quad(-20, -5, 20, -5, 10, 5, -10, 5);
          popMatrix();
      
          //carriage body
          pushMatrix();
            translate(25, -15);
            rect(0, 0, 20, 30);
          popMatrix();
        popMatrix();
      popMatrix();
    }
  popMatrix();

  //----------------FERRIS WHEEL STRUCTURE----------------
  pushMatrix();
    translate(width/2, height/2);
    pushMatrix();
      //outside frame
      noFill();
      stroke(0);
      strokeWeight(10);
      ellipse(0, 0, 600, 600); //border
      
      if (dayNight >= 0.7) {
        stroke(random(255), random(255), random(255));
      } else {
        stroke(255);
      }
      strokeWeight(7);
      ellipse(0, 0, 600, 600); //actual
  
      //outer support frame
      noFill();
      stroke(0);
      strokeWeight(10);
      ellipse(0, 0, 400, 400); //border
      
      if (dayNight >= 0.7) {
        stroke(random(255), random(255), random(255));
      } else {
        stroke(255);
      }
      strokeWeight(7);
      ellipse(0, 0, 400, 400); //actual

      //inner support frame
      noFill();
      stroke(0);
      strokeWeight(10);
      ellipse(0, 0, 175, 175); //border
      
      if (dayNight >= 0.7) {
        stroke(random(255), random(255), random(255));
      } else {
        stroke(255);
      }
      strokeWeight(7);
      ellipse(0, 0, 175, 175); //actual
    popMatrix();
  
    //supports
    pushMatrix();
      fill(255);
      strokeWeight(1.5);
      stroke(0);
      pushMatrix();
      rotate(radians(120));
      rect(0, -6, 450, 12);
    popMatrix();
  
    pushMatrix();
      rotate(radians(60));
      rect(0, -6, 450, 12);
    popMatrix();
    
    if (dayNight >= 0.7) {
        strokeWeight(3);
        stroke(random(255), random(255), random(255));
     } else {
        stroke(0);
     }
    ellipse(0, 0, 50, 50); //centerpiece
  popMatrix();
  popMatrix();
}
  
  
  
  
  
//function takeToCity launches the city scene 
//input:n/a
//output: the city scene is drawn with falling rain
function takeToRollerCoaster() {
let Carc1, c2, c3, c4, c5;
let floatx1, y1, x2, y2, x3, y3, x4, y4, x5, y5;
let floattheta1, theta2, theta3, theta4, theta5;
let floataxisX, axisY;
}

function setup() {
  size(1000, 400);
  background(239, 200, 196);

  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  x3 = 0;
  y3 = 0;
  x4 = 0;
  y4 = 0;
  x5 = 0;
  y5 = 0;
  c1 = new Car(x1, y1+200, 1);
  c2 = new Car(x2, y2+200, 3);
  c3 = new Car(x3, y3+200, 1);
  c4 = new Car(x4, y4+200, 3);
  c5 = new Car(x5, y5, 4);

  theta1 = -PI/6;
  theta2 = (2*PI)-(PI/6)-(PI/50); // 5.696
  theta3 = PI-(PI/9.2);
  theta4 = 2*PI/3 + (PI/50);
  theta5 = 2*PI/3 + (PI/50); 
}

function draw2() {  
  background(239, 200, 196);
  
  noStroke();
  fill(236,172,172);
  bezier(0,225,100,100,200,100,255,225);
  rect(0,225,255,200);
  
  fill(236,172,172);
  rect(600,230,200,150);
  fill(239, 200, 196);
  ellipse(700,239,205,100);
  
  
  fill(236,172,172);
  rect(250,205,60,250);
  fill(239, 200, 196);
  ellipse(285,205,65,100);
  
  
  
  // small car track
  noFill();
  stroke(200, 200, 200);
  strokeWeight(5);
  bezier(0, 250, width/3, 190, width*2/3, 190, width, 250);
  
  // small car
  pushMatrix();
  translate(width/2, 355);
  scale(.5);
  c5.x = axisX + sin(theta5) *1400; // sin(a)
  c5.y = axisY + cos(theta5) *300; 
  c5.display();
  popMatrix();
  
  noStroke();
  fill(236,172,172);
  bezier(800,250,880,100,920,130,width,250);
  rect(800,250,200,height-250);
  
  fill(236,172,172);
  bezier(300,250,400,50,500,100,600,250);
  rect(300,250,300,150);
  
  // water
  fill(119, 195, 242);
  noStroke();
  rect(0, height-30, width, 30);

  // poles
  pushMatrix();
  noStroke();
  fill(255);
  rect(10, height-257, 5, 257-20,5);
  rect(70, height-320, 5, 320-20,5);
  rect(130, height-345, 5, 345-20,5);
  rect(190, height-350, 5, 350-20,5);
  rect(250, height-336, 5, 336-20,5);
  rect(310, height-300, 5, 300-20,5);
  rect(370, height-225, 5, 225-20,5);
  rect(430, height-180, 5, 180-20,5);
  rect(490, height-160, 5, 160-20,5);
  rect(550, height-160, 5, 160-20,5);;
  rect(610, height-180, 5, 180-20,5);
  rect(670, height-200, 5, 200-20,5);
  rect(730, height-200, 5, 200-20,5);
  rect(790, height-180, 5, 180-20,5);
  rect(850, height-130, 5, 130-20,5);
  rect(910, height-75, 5, 75-20,5);
  rect(970, height-55, 5, 55-20,5);
  popMatrix();

  noFill();
  strokeWeight(6);
  stroke(10,10,100);
  arc(179, 250, 400, 400, PI, 2*PI-(PI/6)-(PI/50));
  arc(520, 40, 400, 400, PI/3, PI -(PI/6));
  arc(699, 398, 400, 400, PI+(PI/2.7), 2*PI-(PI/4.5));
  arc(1013, 150, 400, 400, PI/3, PI -(PI/4.8));

  pushMatrix();
  translate(180, 250);
  rotate(theta1);
  if (theta1 < 4.2 && theta1 > 2) {
    c1.display();
  }
  popMatrix();

  pushMatrix();
  translate(520, 40);
  rotate(theta2);
  if (theta2 < 1 || theta2 >5.9) {
    c2.display();
  }
  popMatrix();

  pushMatrix();
  translate(699, 397);
  rotate(theta3);
  if (theta3 > 2.59 && theta3 < 4.11) {
    c3.display();
  }
  popMatrix();

  pushMatrix();
  translate(1013, 150);
  rotate(theta4);
  if (theta4 < .85 || theta4 >4) {
    c4.display();
  }
  popMatrix();

  if (theta1 > 2*PI) theta1 = 0;
  if (theta2 < 0) theta2 = 2*PI;
  if (theta3 > 2*PI) theta3 = 0;
  if (theta4 < 0) theta4 = 2*PI;
  theta1+= .01;
  theta2-= .01;
  theta3+= .01;
  theta4-= .01;
  theta5+= .008;
}

  let classCar
  let floatX, Y;
  let floatOrientation;

  //Car(floatX, floatY, intOrientation)
   // x = _x;
   // y = _y;
   // orientation = orientation;
  

  display()
    
    if (orientation == 1){
      // car 
      fill(3, 90, 166);
      noStroke();
      rect(x-1,y,31,15);
      rect(x+10,y,+20,30,5);
      rect(x,y,-30,15);
      ellipse(x-20,y+15,20,20);
      
      //person
      fill(251,224,137);
      ellipse(x,y+20,20,18);
      
      //wheels
      fill(19,37,54);
      ellipse(x-20,y,10,10);
      ellipse(x+20,y,10,10);
    }
    if (orientation == 2){
      // car 
      fill(3, 90, 166);
      noStroke();
      rect(x,y,31,15);
      rect(x-30,y,20,30,5);
      rect(x,y,-30,15);
      ellipse(x+20,y+15,20,20);
      
      //person
      fill(251,224,137);
      ellipse(x,y+20,20,18);
      
      //wheels
      fill(19,37,54);
      ellipse(x-20,y,10,10);
      ellipse(x+20,y,10,10);
    }
    if (orientation == 3){
      //car
      fill(3, 90, 166);
      noStroke();
      rect(x,y,-30,-15);
      rect(x-10,y,-20,-30,5);
      rect(x,y,30,-15);
      ellipse(x+20,y-15,20,20);
      
      //person
      fill(251,224,137);
      ellipse(x,y-20,20,18);
      
      //wheels
      fill(19,37,54);
      ellipse(x-20,y,10,10);
      ellipse(x+20,y,10,10);
    }
    if (orientation == 4){
      //car
      fill(3, 90, 166);
      noStroke();
      rect(x,y,-30,-15);
      rect(x+30,y,-20,-30,5);
      rect(x,y,30,-15);
      ellipse(x-20,y-15,20,20);
      
      //person
      fill(251,224,137);
      ellipse(x,y-20,20,18);
      
      //wheels
      fill(19,37,54);
      ellipse(x-20,y,10,10);
      ellipse(x+20,y,10,10);
    }

    function fetchMessages() {
      console.log("fetching");
      
        dataServer.fetchMessages(
          {
              channels: [channelName],
              end: '15343325004275466',
              count: 100
          },
          (status, response) => {
          // console.log(response.channels.history);
            drawMessages(response.channels.history);
          }
        );
         
      }

        // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: params,
  });

}

function readIncoming(inMessage) {
  console.log(inMessage);
}


//