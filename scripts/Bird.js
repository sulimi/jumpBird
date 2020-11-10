//这是鸟

const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);

const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);//0, 0,一开始没有速度 通过加速度来改变速度
        this.g = 1000; //重力加速度，向下的加速度，单位：像素/毫秒²
       
        this.maxY = gameHeight - landHeight - this.height; //小鸟最大的y坐标    landHeight大地那里有了，原来是可以通用的
        this.swingStatus = 1; //小鸟的翅膀状态 开始是1
        this.timer = null; //翅膀煽动的计时器
        this.render();//？为什么这里要写render函数   因为自己重写了
    }


    move(duration) {//有加速度才能动，父级没有，因此要重写move方法加入g， 也可以写onMove方法
        super.move(duration); //先调用父类方法继承
        //根据加速度改变速度
        this.ySpeed += this.g * duration;//只有横向速度（加速运动） 速度=初速度+加速度*时间
    }
    onMove() {//控制下落
        //每次移动过后控制纵坐标范围
        if (this.top < 0) {
            this.top = 0;//不能超过顶部   注意Y轴Y坐标的走向
        }
        else if (this.top > this.maxY) {
            this.top = this.maxY;//不能超过大地
        }
    }
//控制游戏进行时的向上跳，直接给一个向上的速度 负数
    jump() {
        this.ySpeed = -400;
    }
    //游戏开始，开始煽动翅膀  改变雪碧图位置
    startSwing() {
        if (this.timer) {//如果计时器已经存在就不再开启另一个计时器
            return;
        }
        this.timer = setInterval(() => {
            // this.swingStatus = (this.swingStatus + 1) % 3 + 1;
            this.swingStatus++;//3种状态
            if (this.swingStatus === 4) {
                this.swingStatus = 1;
            }
            this.render();//重新渲染
        }, 200)
    }
    //游戏暂停，停止煽动翅膀
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
    render() {
        super.render(); //重用父类渲染逻辑   父类没有翅膀的东西所以要自己加
        this.dom.className = `bird swing${this.swingStatus}`;
    }
}