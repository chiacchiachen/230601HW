let points = [[-4,4],[-2,3],[2,3],[4,4],[3,2],[3,-2],[4,-4],[2,-3],[-2,-3],[-4,-4],[-3,-2],[-3,2],[-4,4],[-2,3],[2,3]]
var stroke_colors = "cad2c5-84a98c-52796f-354f52-2f3e46".split("-").map(a=>"#"+a)
var fill_colors= "335c67-fff3b0-e09f3e-9e2a2b-540b0e".split("-").map(a=>"#"+a)

function preload(){  //最早執行的程式碼
  coin_sound = loadSound("sound/coin.wav")
  bigeye_sound = loadSound("sound/bigeye.wav")
}
var thing //飛鏢物件，代表單一物件，利用這個變數來做正在處理的物件
var things =[] //陣列 放所有的物件資料
var eye  //飛彈
var eyes =[]
var bigeye //bigeye
var bigeyes=[]
var score =0

function setup() {
  createCanvas(windowWidth,windowHeight);
  // 產生隨機物件
  for(var j=0;j<20;j=j+1)
  {
    thing = new Darts({}) //產生一個新的物件，暫時放入到ball變數中
    things.push(thing) //把thing物件放入到things物件群(陣列)中
  }
  for(var j=0;j<10;j=j+1)
  {
    bigeye = new Bigeye({}) //產生一個新的物件，暫時放入到ball變數中
    bigeyes.push(bigeye) //把物件放入到物件群(陣列)中
  }
}

function draw() {
  background("#d5c6e0");
  for(let thing of things){ //針對陣列變數，取出陣列內一個一個的物件
    thing.draw()
    thing.update()
    //由此判斷，每個臉有沒有接觸每一個飛鏢
    for (let eye of eyes){
      if(thing.isBallInRanger(eye.p.x,eye.p.y))  //判斷有沒有碰觸
      {
        score =score+1 //分數+1
        things.splice(things.indexOf(thing),1)  //從face倉庫刪除
        eyes.splice(eyes.indexOf(eye),1) //讓eye從eye倉庫刪除
      }
    }
  }

  for(let eye of eyes){ //針對eye倉庫內資料
    eye.draw()
    eye.update()
    bigeye_sound.play()
  }
  for(let bigeye of bigeyes){ //針對eye倉庫內資料
    bigeye.draw()
    bigeye.update()
  }
    textSize(50)
    text(score,50,50)
  //--------------畫出中間face圖形------------
    push()
      let dx = mouseX-width/2    //滑鼠座標到中心點座標的X軸距離
      let dy = mouseY-height/2   //滑鼠座標到中心點座標的Y軸距離
      let angle = atan2(dy,dx)   //利用反tan算出角度

      translate(width/2,height/2)
      rotate(angle)
      translate(width/50,height/50)
      fill("#ddb892")
      ellipse(0,0,80) //face
      fill(0)
      ellipse(-25,0,-20,20) //左邊眼睛
      ellipse(25,0,-20,20)
      fill("#bf0603")
      arc(0,25,50,15,0,PI) //arc是弧度
    pop()
}
function mousePressed(){
  //新增一筆飛彈資料(還沒顯示)
  eye = new Eyes({})
  eyes.push(eye)
  coin_sound.play()
}