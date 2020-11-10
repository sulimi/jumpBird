//这是整合代码  写一个类把功能整合起来------这也能用类
var Div = document.getElementsByTagName("div")[0];
class Game {//最后一个类，把之前的功能整合起来
    constructor() {
        //游戏里面要有什么：天空、大地、小鸟、柱子对
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProducer = new PipePareProducer(-100);//柱子对生成器

        this.timer = null;
        this.tick = 16; //移动时间间隔，毫秒
        this.gameOver = false;
    }

    start() {//游戏开始
        Div.className = "game";
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            //重新开始游戏
            window.location.reload();//？刷新页面
        }

        this.pipeProducer.startProduce(); //开始生成柱子  为什么不是放在计时器里面
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;//变成秒
            // 各种动
            this.sky.move(duration)
            this.land.move(duration)
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration);//移动柱子对
            })

            if (this.isGameOver()) {
                this.stop();
                Div.className = "game gameover";
                this.gameOver = true;
            }
        }, this.tick);
    }

    /**
     * 判断两个矩形是否碰撞
     * rec1 
     * rec2 
     */
    isHit(rec1, rec2) {
        // 矩形碰撞的规则
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半

        // 中心点
        var centerX1 = rec1.left + rec1.width / 2;// 中心点横坐标
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        // 中心点的横向距离
        var disX = Math.abs(centerX1 - centerX2); //Math.abs求绝对值
        // 中心点的纵向距离
        var disY = Math.abs(centerY1 - centerY2);

        if (disX < (rec1.width + rec2.width) / 2 &&//如果小鸟进入了两个柱子之间
            disY < (rec1.height + rec2.height) / 2//如果小鸟撞到了柱子   肯定要进入到柱子之间才会撞到柱子的切面，装懂柱子侧面的话会撞到地面才结束
        ) {
            return true;
        }
        return false;
    }

    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            //鸟碰到了大地
            Div.className = "game gameover";
            return true;
        }
        //碰到柱子
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                Div.className = "game gameover";
                return true;
            }
        }
        return false;
    }

    // 游戏暂停
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
        Div.className = "game stop";
    }

    /**
     * 注册关联键盘事件
     */
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                }else {
                    this.start();
                }
            }else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }
}

var g = new Game();
g.regEvent();