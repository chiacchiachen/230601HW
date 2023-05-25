var monster_colors= "ffbc42-d81159-8f2d56-218380-73d2de".split("-").map(a=>"#"+a)
class Bigeye{
    constructor(args){ //預設值，基本資料(包含有物件的顏色，位置速度大小)
        this.r = args.r || (50,70)  //怪物的外緣
        this.p = args.p || createVector(random(width),random(height)) //飛彈起始的位置(以向量方式表示該座標)，要以中間炮台發射，所以座標為(width/2,height/2)
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //飛彈的速度
        this.color = args.color || random(monster_colors) //怪物顏色
        this.mode = random(["happy","bad"])
    }
    draw(){  //劃出怪物
        push()
            translate(this.p.x,this.p.y) //物件放至視窗原點
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            if(this.mode == "happy"){
                fill("#90be6d")
                triangle(-20,20,20,20,0,-100)
                fill(255) //眼白
                ellipse(0,0,this.r/2)
                fill(0) //黑眼珠
                ellipse(0,0,this.r/3)
                arc(0,20,50,15,0,PI)
                
            }else{
                fill(255)
                arc(0,10,50,15,0,PI)
                // arc(0,0,this.r/3,this.r/2,0,PI)
                fill(255)
                ellipse(0,0,5,-5)
                // arc(0,0,this.r/5,this.r/3,0,PI)
            }
        
        pop()
    }
    update(){  //計算移動後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x >= width){ //<0碰到左邊， >width為碰到右邊
            this.v.x = -this.v.x
          }
          if(this.p.y<=0 || this.p.y >= height){ //<0碰到右邊， >height為碰到左邊
            this.v.y = -this.v.y
          }
        }
    }
    