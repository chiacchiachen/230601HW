class Eyes{
    constructor(args){ //預設值，基本資料(包含有物件的顏色，位置速度大小)
        this.r = args.r || 10  //如果飛彈有傳回直徑的大小，就以參數為直徑，否則預設為10
        this.p = args.p || createVector(width/2,height/2) //飛彈起始的位置(以向量方式表示該座標)，要以中間炮台發射，所以座標為(width/2,height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10) //飛彈的速度
        this.color = args.color || "red" //飛彈顏色
    }
    draw(){  //劃出眼睛
        push()
            translate(this.p.x,this.p.y)
            
            noStroke()
            fill("#7f5539")
            ellipse(-25,0,20) //左鼻孔
            ellipse(25,0,20) //右鼻孔
            fill("#000814")
            ellipse(-25,0,10) //小眼珠
            ellipse(25,0,10) //小眼珠
            // //-------以中心點畫(20,40)的框
            // rectMode(CENTER)
            // rect(0,0,20,40)
            // triangle()
        pop()
    }
    update(){  //計算移動後的位置
        this.p.add(this.v)
    }
}