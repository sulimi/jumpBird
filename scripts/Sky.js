//这是天空
//也要移动，所以要继承父类：可移动矩形

const skyDom = document.querySelector(".sky");
const skyStyles = getComputedStyle(skyDom);//？  获取所有的样式数据
const skyWidth = parseFloat(skyStyles.width);// parseFloat() 函数可解析一个字符串，并返回一个浮点数 parseIn()是取整数
const skyHeight = parseFloat(skyStyles.height);

// 继承
class Sky extends Rectangle {
    constructor() {
        //(width, height, left, top, xSpeed, ySpeed, dom)
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
    }

    onMove() {//天空自己特有的特点：要滚动 要还原  
        if (this.left <= -skyWidth / 2) {
            this.left = 0;//右边要出现空白是就拉回来
        }
    }
}
// 天空搞定了 大地也是一样的做法