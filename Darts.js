class Darts{  //粒子 類別
    constructor(args){ //預設值，基本資料(包含有物件的顏色，位置、速度、大小)
      this.p = args.p || createVector(random(width),random(height))
      this.v = createVector(random(-1,1),random(-1,1))  
      this.size = random(5,10)
      this.color = random(fill_colors)
      this.stroke = random(stroke_colors)
    }
    draw() //畫圖 畫物件的函數
    {
      push()
        translate(this.p.x,this.p.y)  //原點設定在物件所在位置
        // scale是放大縮小指令，上下翻轉(1是1倍 -1是放大縮小)
        scale((this.v.x<0?1:-1),-1)  // ((this.v.x<0?1:-1),-1)代表 this.v.x<0 條件成立的話則值為1 否則為-1
  
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(3)
  
        beginShape()
          for(var i =0;i<points.length;i=i+1){
            // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)  //*this.size是乘放大倍率
            // vertex(points[i][0]*this.size,points[i][1]*this.size)
            curveVertex(points[i][0]*this.size,points[i][1]*this.size)
          }
        endShape()
      pop()
    }
  
    //移動的處理程式
    update(){ //讓圖案會跑 移動後設定位置資料值為何
      // this.p.x =this.p.x = this.v.x
      // this.p.y =this.p.y = this.v.y
  //-------------------改為向量寫法-----------------------------    
      this.p.add(this.v)  //此行效果跟上面兩行一樣，add為加
  
      //算出滑鼠位置的向量
      let mouseV = createVector(mouseX,mouseY) //把目前滑鼠的位置轉成向量值
      // let delta = mouseV.sub(this.p).limit(3)   //delta值紀錄與滑鼠方向移動的"單位"距離，sub為向量減法，limit是每次移動單位
      let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //與原本的物件速度有關，.limit(this.v.mag()*2)是取得物件的速度值
      this.p.add(delta)
  
      //碰壁的處理程式
      if(this.p.x<=0 || this.p.x >= width){ //<0碰到左邊， >width為碰到右邊
        this.v.x = -this.v.x
      }
      if(this.p.y<=0 || this.p.y >= height){ //<0碰到右邊， >height為碰到左邊
        this.v.y = -this.v.y
      }
    }
    isBallInRanger(){  //判斷有沒有被滑鼠按到
      let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算滑鼠按下的點與此物件位置之間的距離
      if(d<this.size*4){ //4的由來:去看作標點最大的值，以此作為方框的高與寬
        return true  //代表距離有在範圍內
      } 
      else{
        return false  //代表距離沒有在範圍內
      }
    }
  }