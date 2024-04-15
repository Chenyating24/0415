let bg = "#F2EDEC"; // 背景色
let c = ["#E26761", "#6693A0", "#EBC06F", "#605951"]; // 圖案顏色

var balls = []; // 所有球的資料內容

class ball_class { 
  constructor(args) { 
    this.p = args.p || {x: windowWidth/2, y: windowHeight/2}; // 產生物件的位置
    this.w = args.w || random(30,50); // 寬度
    this.h = args.h || random(30,50); // 高度
    this.v = args.v || {x: random(-2,2), y: random(-2,2)}; // 速度
    this.a = args.a || {x: 0, y: random(1,1)}; // 加速度
    this.color = args.color; // 分配固定的顏色給每個球體
    this.dashPattern = args.dashPattern; // 固定虛線樣式
  }

  draw() {  
    push();
    translate(this.p.x, this.p.y);
    
    stroke(this.color);
    fill(this.color);

    let d = this.w / 1.5;
    let sw = this.w / 3.5;

    noFill();

    if (random(100)) {
      drawingContext.setLineDash(this.dashPattern);
      strokeCap(SQUARE);   
      strokeWeight(sw);
      circle(0 , 0, d);      
    } else {
      strokeWeight(sw / 1.3);      
      drawingContext.setLineDash([1, sw]);
      strokeCap(ROUND);        
      circle(0 , 0, d); 
      noStroke();
      fill(this.color);
      circle(0 , 0, d/3); 
    }   
    pop();
  }

  update() {
    this.p.x = this.p.x + this.v.x;
    this.p.y = this.p.y + this.v.y;
    this.v.y = this.v.y + this.a.y;
    if(this.p.x < 0 || this.p.x > width) this.v.x = -this.v.x;
    if(this.p.y < 0 || this.p.y > height) this.v.y = -this.v.y;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(42); // 使用相同的隨機數種子
  for(let i = 0; i < 50; i++) {
    let dashPattern = [random(1,10), random(1,10), random(1,10), random(1,10)];
    let ballColor = c[i % c.length]; // 使用模數運算使得顏色循環
    let ball = new ball_class({
      v: {x: random(-2, 2), y: random(-2, 2)},
      p: {x: random(0, width), y: random(0, height)}, // 將圖案的初始位置隨機分配在整個畫布上
      a: {x: 0, y: 0},
      color: ballColor,
      dashPattern: dashPattern
    });
    balls.push(ball);
  }
}

function draw() {
  background(bg);
  for(let j = 0; j < balls.length; j++) {
    let ball = balls[j];
    ball.draw();
    ball.update();
  }
}
s