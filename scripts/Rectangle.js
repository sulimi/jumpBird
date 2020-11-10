//这是Rectangle矩形父类


/**
 * // 面对对象编程，先划分对象
 * 把移动的鸟、水管归类为可移动的矩形，可移动的物体，
 * 设置一个父类，把他们共同的特征提到父类里面
 * 
 * 
 * 矩形类，可以移动
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象（对应的页面对象）
 * 
 * 移动要有速度，速度有快慢方向
 * xSpeed：横向速度，单位（像素/秒），正数是向右，负数向左
 * ySpeed：纵向速度，单位（像素/秒），正数是向下，负数向上
 */
class Rectangle {//定义一个类
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();//渲染方法 设置方法
    }

    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    /**
     * 开一个定时器就行
     * 按照矩形的速度，和指定的时间，移动矩形
     *  duration 单位：秒   给我一个时间我去移动 根据速度改变位置
     */
    // 移动  算距离  duration时间
    move(duration) {
        //算距离=速度*时间
        const xDis = this.xSpeed * duration; //横向的距离
        const yDis = this.ySpeed * duration; //纵向的距离
        //设置新的位置
        this.left = this.left + xDis;
        this.top = this.top + yDis;//这里可以让游戏结束时小鸟不下落

        //可能会发生一些事  可能会重新修改坐标
        if (this.onMove) {//判断自己的属性里面有没有onMove//是否存在onMove方法，如果存在，则调用
            //如果有的话每次移动后，渲染前，均会调用该方法
            this.onMove(); 
        }

        this.render(); //重新渲染
    }
}

// 上面的判断自己的属性里面有没有onMove，这个自己this指的是创建的子类，如天空，他自己加上了onMove方法，这个自己this指的不是父类哦
// 父类只是充当一个模板，不会自己调用，只有用父类创建了一个子类，去调用子类，而子类继承了父类的所有代码，所以调用时this指的都是子类