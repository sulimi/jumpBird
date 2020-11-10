//水管  中间空隙都是一样的 一对对出现的 ，高度是多少是要看对面的水管来设置的，随机
// 要分成 水管类和水管对两个类处理

// 这是单个水管
const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {//未知的这里都有写形参  dom水管要不断的生成，所以不固定
        super(52, height, gameWidth, top, speed, 0, dom);//水管宽度是固定的，高度要依据水管对，gameWidth一开始的横坐标，从右边出现
    }

    onMove() {
        if (this.left < -this.width) {//当这个水管右边框要消失在游戏的左边框时，移除
            //水管的特点：是不断地往左边移动要不断地移除dom，右边不断地加dom  因为它不是一张大的背景图在移动
            this.dom.remove();
        }
    }
}

//水管对
// 思考：水管对怎么来确定每一个水管的高度呢？  能确定的是空隙位置是150px高度
function getRandom(min, max) {//随机函数
    return Math.floor(Math.random() * (max - min) + min);
}//整一个[min,max）的随机数

class PipePare {//创建一个水管对，是两个水管，中间还有空隙，所以就不是矩形类了，是一个单独的类，控制两个水管
    //水管对开始一定是出现在右边的
    constructor(speed) {
        this.spaceHeight = 150; //空隙位置的高度
        this.minHeight = 80; //设置水管最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;//一个水管最小值另一个水管就是最大值

        //上水管
        const upHeight = getRandom(this.minHeight, this.maxHeight);//随机一个上水管的高度
        const upDom = document.createElement("div");//自行创建DOM对象
        upDom.className = "pipe up";
        // new Pipe创建一个水管对象变成上水管  类中运用类  speed要跟大地统一
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);
        gameDom.appendChild(upDom)

        //下水管
        const downHeight = landTop - upHeight - this.spaceHeight;//下水管的高度
        const downTop = landTop - downHeight;
        const downDom = document.createElement("div");//自行创建DOM对象
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom)
        gameDom.appendChild(downDom)
    }


    /**
     * 该柱子对是否已经移出了视野
     */
    get useLess() {//访问器属性
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

/**
 * 又要创建一个类  用于不断的产生柱子对
 */
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];//有哪些柱子对
        this.timer = null;
        this.tick = 1500;
    }

    //开始产生柱子对
    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            //虽然上面的把dom元素移除了，但是数组里面还有，移除掉用不到的柱子  清数组里边的用不到的柱子
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if (pair.useLess) {  //没用的柱子对
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick)
    }
    //停止产生柱子对
    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}