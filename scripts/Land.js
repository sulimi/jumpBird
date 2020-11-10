//这是大地

const landDom = document.querySelector(".land");
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle {
    constructor(speed) {//为什么这里又有参数  因为大地的速度要跟水管的统一，所以定义一个参数传入外面可以获取？
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }

    onMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}