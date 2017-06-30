var myRobot;

function setup() {
  createCanvas(600, 600, WEBGL);
  myRobot = new Robot();
  angleMode(DEGREES);
}

function draw() {
  background(100);
  push();
  rotateX(-90);
  translate(100, 0, 0);
  myRobot.display();
  pop();
}


function Robot() {
  this.linkOne = new link(90,0,75,0);
  this.linkTwo = new link(0,0,50,22);
  this.linkThree = new link(90,0,50,75);
  this.linkFour = new link(-90,0,80,0);
  this.linkFive = new link(90,0,30,0);
  this.linkSix = new link(0,0,20,0);

  this.display = function() {
    fill(255,0,0);
    box(10);
    fill(0,255,0);
    translate(0,0,this.linkOne.d/2);
    cylinder(4,this.linkOne.d);
    translate(0,this.linkOne.a,this.linkOne.d/2);
    rotateZ(this.linkOne.theta);
    rotateX(this.linkOne.alpha);
    fill(255,0,0);
    sphere(10);
    fill(0,255,0);
    translate(0,0,this.linkTwo.d/2);
    cylinder(4,this.linkTwo.d);
    translate(0,this.linkTwo.a,this.linkTwo.d/2);
    rotateZ(this.linkTwo.theta);
    rotateX(this.linkTwo.alpha);
    fill(255,0,0);
    sphere(10);
    fill(0,255,0);
    translate(0,0,this.linkThree.d/2);
    cylinder(4,this.linkThree.d);
    translate(0,this.linkThree.a,this.linkThree.d/2);
    rotateZ(this.linkThree.theta);
    rotateX(this.linkThree.alpha);
    fill(255,0,0);
    sphere(10);
    fill(0,255,0);
    translate(0,0,this.linkFour.d/2);
    cylinder(4,this.linkFour.d);
    translate(0,this.linkFour.a,this.linkFour.d/2);
    rotateZ(this.linkFour.theta);
    rotateX(this.linkFour.alpha);
    fill(255,0,0);
    sphere(10);
    fill(0,255,0);
    translate(0,0,this.linkFive.d/2);
    cylinder(4,this.linkFive.d);
    translate(0,this.linkFive.a,this.linkFive.d/2);
    rotateZ(this.linkFive.theta);
    rotateX(this.linkFive.alpha);
    fill(255,0,0);
    sphere(10);
    fill(0,255,0);
    translate(0,0,this.linkSix.d/2);
    cylinder(4,this.linkSix.d);
    translate(0,this.linkSix.a,this.linkSix.d/2);
    rotateZ(this.linkSix.theta);
    rotateX(this.linkOne.alpha);
    fill(255,0,0);
    sphere(10);
  };
  }

function link(alpha, a, d, theta) {
  this.alpha = alpha;
  this.a = a;
  this.d = d;
  this.theta = theta;
}
