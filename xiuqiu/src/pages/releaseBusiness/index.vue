<template>

    <div>
        <div class="contain">
            <img :src="open_bg" >
        </div>

        <canvas canvas-id="myCanvas"
            :class="{
            'canvalClass': (imageLength == 1),
            'canvalClassMiddle': (imageLength == 2),
            'canvalClassBig':(imageLength == 3)
            }"/>

        <div class="btnWrap">
            <img :src="fabuguanggao" class="submit" @click="submit">
        </div>
    </div>
</template>

<script>
import { BASE_IMAGE_URL,uploadKaiyeMuban,uploadFile } from '@/utils/api'

        const device = wx.getSystemInfoSync()
        const windowWidth = device.windowWidth
        const height = device.windowHeight - 50;

export default {
    data: {
        windowHeight: 0,
        text: '',
        textSize: 18,
        textColor: '#000',
        textAlign: 'center',
        cursorY: 0,
        cursoX: 0,
        open_bg: BASE_IMAGE_URL+"open_bg.png",
        fabuguanggao: BASE_IMAGE_URL+"fabuguanggao.png",
        imageList: [BASE_IMAGE_URL+"zhuangshi.png"],
        imageLength: 0,
    },
    methods: {
        drawCanvas: function(){
            let pixelRatio = 2;

            const canvasContext = wx.createCanvasContext('myCanvas');

            canvasContext.drawImage(BASE_IMAGE_URL+"zhuangshi.png",
                     0, 20, windowWidth/2, 40);
            this.cursorY = 40;         
            this.textColor = '#C53436';
            this.textSize = 40/pixelRatio;
            this.text = "开业大吉";
            this.cursoX = (windowWidth*0.8)/2-canvasContext.measureText(this.text).width/2;
            this.drawTextView(canvasContext);

            this.cursorY += 60;
            this.text = "活动内容:";
            this.cursoX = 10;
            this.textSize = 18;
            this.drawTextView(canvasContext);

            this.textColor = '#444444';
            this.cursorY += 16;
            this.textSize = 16;
            this.text = "开始活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容结束";
            this.drawTextView(canvasContext);

            this.drawLine(canvasContext);

            this.cursorY += 30;
            this.textColor = '#C53436';
            this.text = "联系方式:";
            this.cursoX = 10;
            this.textSize = 18;
            this.drawTextView(canvasContext);

            this.textColor = '#444444';
            this.cursorY += 16;
            this.textSize = 16;
            this.text = "075-1234567";
            this.drawTextView(canvasContext);

            this.cursorY += 30;
            this.textColor = '#C53436';
            this.text = "活动时间:";
            this.cursoX = 10;
            this.textSize = 18;
            this.drawTextView(canvasContext);

            this.textColor = '#444444';
            this.cursorY += 16;
            this.textSize = 16;
            this.text = "2018-08-01 至 2018-09-01";
            this.drawTextView(canvasContext);

            this.cursorY += 30;
            this.textColor = '#C53436';
            this.text = "活动地点:";
            this.cursoX = 10;
            this.textSize = 18;
            this.drawTextView(canvasContext);

            this.textColor = '#444444';
            this.cursorY += 16;
            this.textSize = 16;
            this.text = "深圳美食街";
            this.drawTextView(canvasContext);

            this.cursorY += 30;
            console.log(windowWidth*16/9);

            for(var i=0; i<this.imageLength; i++){
                canvasContext.drawImage(this.imageList[i],
                     0, this.cursorY, windowWidth, windowWidth);
                this.cursorY += windowWidth+20;     
            }

            canvasContext.draw(false, wx.canvasToTempFilePath({
                    canvasId: 'mycanvas',
                    success: function (res) {
                        console.log(res);
                    },
                    fail: function (e) {
                        console.log(e);
                    }
                }));

            // setTimeout(() => {
            //     wx.canvasToTempFilePath({
            //         canvasId: 'mycanvas',
            //         success: function (res) {
            //             console.log(res);
            //         },
            //         fail: function (e) {
            //             console.log(e);
            //         }
            //     })
            // }, 2000);
      },

        drawTextView: function(context){
            var chr =this.text.split("");//这个方法是将一个字符串分割成字符串数组
            var temp = "";
            var row = [];
            context.setFontSize(this.textSize)
            context.setFillStyle(this.textColor)
            for (var a = 0; a < chr.length; a++) {
                if (context.measureText(temp).width < windowWidth*0.8) {
                    temp += chr[a];
                }else {
                    row.push(temp);
                    temp = "";
                }
            }
            row.push(temp);
            for (var b = 0; b < row.length; b++) {
                context.fillText(row[b], this.cursoX, this.cursorY + b * 24, windowWidth*0.8);
            }

            this.cursorY += (row.length-1)*24+10;
        },

        drawLine: function(ctx){
            for(let i=0; i<100; i=i+4){
                ctx.moveTo(i*5, this.cursorY);
                ctx.lineTo((i+1)*5, this.cursorY);
                ctx.moveTo((i+2)*5, this.cursorY);
                ctx.setStrokeStyle('#C22618');
                ctx.lineTo((i+3)*5, this.cursorY);
            }
            
            ctx.stroke()
            // ctx.draw()
        }
    },
    onLoad: function(){
        
        console.log(windowWidth+"------"+height);
        this.imageLength = this.imageList.length;
        this.drawCanvas();

    }

}

</script>

<style scoped>
    .contain{
        position:fixed; 
        /*下面的是关键的设置100%显示*/ 
        background-size: 100% 100%; 
        width: 100%;
        height: 120%;
        z-index: -100;
        top: 0rpx;
    }
    .contain img{
        width: 100%;
        height: 100%;
    }

    .canvalClass{
        width: 90%;
        height: 1800rpx;
        margin: 100rpx 5% 100rpx;
        border-radius: 20rpx;
        background: #FFF;
    }

    .canvalClassMiddle{
        width: 90%;
        height: 2600rpx;
        margin: 100rpx 5% 100rpx;
        border-radius: 20rpx;
        background: #FFF;
    }

    .canvalClassBig{
        width: 90%;
        height: 3400rpx;
        margin: 100rpx 5% 100rpx;
        border-radius: 20rpx;
        background: #FFF;
    }

    .btnWrap{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin: 50rpx auto;
    }

    .submit{
        width: 80%;
        height: 100rpx;
    }

</style>


