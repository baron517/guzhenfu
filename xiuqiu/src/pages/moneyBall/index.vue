<template>
<div>
    <toast :message=toastMsg :visible.sync="toastVisible"></toast>
    <div class="contain">
        <img :src="jiexiuqiu_bg" >
    </div>

    <img :src="xiuqiu" class="ball animation_show"
         :class="{'left_show' : (animationType == 1),
                    'right_show': (animationType == 3),
                    'center_show': (animationType == 2),
                    '': (animationType == 0)}">
    
    <div class="people_wrap">
        <img :src="people_center" v-if="showPeopleType == 3" class="people" 
         :class="{
            'peopleLeftAnimation': (animationType == 1),
            'peopleRightAnimation': (animationType == 3),
            'peopleCenterAnimation': (animationType == 2),
            }">
        <img src="../../../static/img/btn_jie.png" v-else-if="showPeopleType == 1" class="jie" @click="gameStart"  >

        <img :src="people" v-else class="zhengmianClass" 
        :animation="zhengmianAnimation">

    </div>
    
    
    <div class="modal_mask" v-if="isShowModal" @click="againGetBall">
    </div>

    <div class="guanggao" v-if="(openType == -1) && isShowModal" @click="againGetBall">
        <img :src="guanggaoimg" mode="widthFix">
        <span></span>
    </div>
    
    

    <img :src="chai_hongbao" v-if="isShowModal && (openType != -1)"  @click="openMoney"
        :class="{
            'moneyDialogClass': (isMoneyModal && openType!=4),
            'openMoneyDialog': (!isMoneyModal),
            'moneyDialogClass2':(openType==4)
            }">

    <img :src="btn_share" v-if="isShowModal && isMoneyModal && (openType == 4 || openType ==5)" class="btnShare"> 
    <button open-type="share" v-if="isShowModal && isMoneyModal && (openType == 4 || openType ==5)" class="btnShareHide"></button> 

    <div v-if="isShowModal && isMoneyModal && (openType == 1 || openType ==2 || openType==3 || openType==4)" class="moneyText">
        <span style="color: #DB483C; font-size: 100rpx;">{{moneyType.xr_money}}
            <span style="font-size: 50rpx;">元</span>
        </span>
    </div>

                
    
</div>
    
    
</template>

<script>
    import { BASE_IMAGE_URL,faxiuqiu,lingquhongbao } from '@/utils/api'
    import toast from 'mpvue-toast'
    import { fmtDate } from '@/utils/index'
    import peopleUrl from '@/img/people.png'
    import peopleLeftUrl from '@/img/people_left.png'
    import peopleCenterUrl from '@/img/people_center.png'
    import peopleRightUrl from '@/img/people_right.png'

    export default{
        
        data: {
            showPeopleType: 1,
            isShowModal: false,
            animationType: 0,
            jiexiuqiu_bg: BASE_IMAGE_URL+'jiexiuqiu_bg.png',
            people_center: peopleCenterUrl,
            people: peopleUrl,
            chai_hongbao: BASE_IMAGE_URL+'chai_hongbao.png',
            pic_hongbao: BASE_IMAGE_URL+'pic_18.8.png',
            xiuqiu: BASE_IMAGE_URL+'xiuqiu.png',
            screenWidth: 0,
            screenHeight: 0,
            isMoneyModal: false,
            wuhongbao: BASE_IMAGE_URL+'wuhongbao.png',
            btn_share: BASE_IMAGE_URL+'btn_share.png',
            openid: '',
            toastMsg: "网络错误，稍后重试!",
            toastVisible: false,
            interval: "",
            moneyType: "",
            tags: '',
            openType: -1,       //广告 还是红包以及  红包类型
            guanggaoimg: '',
            btn_jie: BASE_IMAGE_URL+'btn_jie.png',
            zhengmian: BASE_IMAGE_URL+'hongniang_btn.png',
            zhengmianAnimation: {},
        },
        components: {
            toast
        },

        methods: {
            gameStart: function(){
                this.showPeopleType = 2;
                   let that = this;
                    setTimeout(function(){
                        let animationData = wx.createAnimation({
                            duration: 600,
                            timingFunction: 'ease',
                        })
                        animationData.scale(2,2).step();
                        // animationData.rotateY(180).step();
                        that.zhengmianAnimation = animationData.export();
                        
                        setTimeout(function(){
                            that.getAction();
                        },800)
                    },100)
            },
           async getAction(){
                let result = await faxiuqiu(this.openid, this.tags, wx.getStorageSync("location"));
                if(result.code == 1000){
                    if(result.hongbao == 0){
                        //广告
                        this.openType = -1;
                        this.guanggaoimg = result.data.mb_youhuiquan;
                        
                        console.log(this.guanggaoimg);
                    }else{
                        //红包
                        this.openType = result.data.xr_type;
                    }
                    this.moneyType = result.data;
                    console.log(this.openType);
                    console.log(this.moneyType);

                    this.showPeopleType = 3;
                    this.changeType();
                }else{
                    this.toastVisible = true;
                    this.showPeopleType = 1;
                    console.log(result.msg);
                    console.log(this.openid+"---"+this.tags+"------"+wx.getStorageSync("location"));
                }
               
               
               
           },

           changeType: function(){
               var that = this;
                that.animationType ++;
                if(that.animationType == 4){
                    that.animationType = 1;
                }
                if(that.animationType == 1){
                    //左边
                    that.people_center = peopleLeftUrl;
                    
                }else if(that.animationType == 2){
                    //中间
                    that.people_center = peopleCenterUrl;
                }else if(that.animationType == 3){
                    //右边
                    that.people_center = peopleRightUrl;
                }else{

                }
                setTimeout(function(){
                    that.isShowModal = true;
                    switch(that.openType){
                        case -1:
                            //广告
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            //小额
                            that.isMoneyModal = false;
                            that.chai_hongbao = BASE_IMAGE_URL+'chai_hongbao.png';
                            break;
                    }
                    
                },800);
                   
           },

           againGetBall: function(){
            
            this.isShowModal = false;
            this.isMoneyModal = false;
            this.chai_hongbao = BASE_IMAGE_URL+'chai_hongbao.png';
            this.getAction();
           },

            async openMoney(){
               if(!this.isMoneyModal){
                   //是拆红包
                   let params = {};
                   //模板类型1,2,3
                   params.xr_mb_type = this.moneyType.xr_mb_type;
                   //金额
                   params.xr_money = this.moneyType.xr_money;
                   params.xr_openid = this.openid;
                   params.xr_create_time = this.moneyType.xr_create_time;
                   //模板类型 id
                   params.xr_mb_id = this.moneyType.xr_mb_id;
                   //红包类型 1,2,3,4,5
                   params.xr_type = this.moneyType.xr_type;


                   var result = await lingquhongbao(params);
                   if(result.code == 1000){
                       this.isMoneyModal = true;
                       console.log(this.openType);
                       switch(this.openType){
                            case -1:
                                //广告
                                break;
                            case 1:
                            case 2:
                            case 3:
                                this.chai_hongbao = BASE_IMAGE_URL+'pic_hongbao.png';
                                break;
                            case 4:
                                this.chai_hongbao = BASE_IMAGE_URL+'hongbao.png';
                                break;
                            case 5:
                                //大额
                                this.chai_hongbao = BASE_IMAGE_URL+'pic_18.8.png';
                                break;
                        }

                        
                   }else{
                       this.toastVisible = true;
                   }
                   
                    
               }else{
                   this.againGetBall();
               }
               
           },
           onShareAppMessage: function(){
            return {
                title: '分享',
                path: '/pages/splash/main',
                imageUrl: BASE_IMAGE_URL+'splash.png',
                success(e){
                    console.log("success");
                },
                fail(e){
                    console.log("fail");
                }
            }
        },
           
        },

        onLoad: function(){
            this.screenWidth = wx.getSystemInfoSync().windowWidth;
            this.screenHeight = wx.getSystemInfoSync().windowHeight;
            console.log(this.screenWidth);
            console.log(this.screenHeight);
            this.openid = wx.getStorageSync('openid');
            this.tags = this.$root.$mp.query.tags;
        },
        onShow: function(){
            this.showPeopleType = 1;
            this.isShowModal = false;
            this.animationType = 0;
            this.isMoneyModal = false;
            this.openType = -1;       //广告 还是红包以及  红包类型
        }
        
    }
</script>

<style>
    .contain{
        position:fixed; 
        /*下面的是关键的设置100%显示*/ 
        background-size: 100% 100%; 
        width: 100%;
        height: 100%;
        z-index: -100;
        top: 0rpx;
    }
    .contain img{
        width: 100%;
        height: 100%;
    }

    .ball_wrap{
        width: 100%;
        margin-top: 200rpx;
        height: 200rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ball{
        width: 300rpx;
        height: 300rpx;
        margin: auto;
        position: absolute;
        left: 50%;
        margin-left: -150rpx;
        top: 0rpx;
        display: inline-block;
    }

    .jie{
        width: 200rpx;
        height: 256rpx;
        margin: auto;
        position: absolute;
        left: 50%;
        margin-left: -100rpx;
        bottom: -20rpx;
        display: inline-block;
    }

    .people_wrap{
        width: 300rpx;
        height: 380rpx;
        margin: auto;
        position: absolute;
        left: 50%;
        margin-left: -150rpx;
        bottom: 50rpx;
        display: inline-block;
    }

    .people{
        position: relative;
        left: 0;
        width: 300rpx;
        height: 380rpx;
        
    }

    .peopleLeftAnimation{
        animation:peopleLeftMove 0.8s 1;
        left: -200rpx;
        bottom: 700rpx;
    }

    .peopleRightAnimation{
        animation:peopleRightMove 0.8s 1;
        left: 140rpx;
        bottom: 700rpx;
    }

    .peopleCenterAnimation{
        animation:peopleCenterMove 0.8s 1;
        left: 0rpx;
        bottom: 700rpx;
    }


    .guanggao{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        overflow: hidden;
        z-index: 2000;
        color: #fff;
    }

    .guanggao img{
        width: 100%;
        vertical-align: middle;
        z-index: 2200;
        position: relative;
    }

    .guanggao span{
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        position: relative;
        z-index: 2200;
    }

    @keyframes peopleLeftMove{
        from {left:0; bottom: 0rpx}
        to {left:-200rpx; bottom: 700rpx}
    }

    @keyframes peopleRightMove{
        from {left:0; bottom: 0rpx}
        to {left:140rpx; bottom: 700rpx}
    }

    @keyframes peopleCenterMove{
        from {left:0; bottom: 0rpx}
        to {left:0rpx; bottom: 700rpx}
    }


    .modal_mask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        overflow: hidden;
        z-index: 10;
        color: #fff;
    }

    .moneyDialogClass2{
        width: 760rpx;
        height: 760rpx;
        overflow: hidden;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -380rpx;
        margin-top: -410rpx;
        z-index: 999;
        opacity: 1;
    }

    .openMoneyDialog{
        width: 800rpx;
        height: 800rpx;
        overflow: hidden;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -400rpx;
        margin-top: -400rpx;
        z-index: 999;
        opacity: 1;
    }

    .moneyDialogClass{
        width: 760rpx;
        height: 900rpx;
        overflow: hidden;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -380rpx;
        margin-top: -400rpx;
        z-index: 999;
        opacity: 1;
    }

    .noMoneyDialog{
        width: 600rpx;
        height: 800rpx;
        overflow: hidden;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -300rpx;
        margin-top: -500rpx;
        z-index: 999;
        opacity: 1;
    }

    .btnShare{
        width: 600rpx;
        height: 100rpx;
        overflow: hidden;
        position: fixed;
        bottom: 0%;
        left: 50%;
        margin-left: -300rpx;
        margin-bottom: 180rpx;
        z-index: 800;
        opacity: 1;
    }

    .btnShareHide{
        width: 600rpx;
        height: 100rpx;
        overflow: hidden;
        position: fixed;
        bottom: 0%;
        left: 50%;
        margin-left: -300rpx;
        margin-bottom: 180rpx;
        z-index: 999;
        opacity: 1;
        background: none;
        border:0;
    }

    .moneyText{
        width: 600rpx;
        height: 140rpx;
        overflow: hidden;
        position: fixed;
        bottom: 45%;
        left: 50%;
        margin-left: -300rpx;
        text-align: center;
        z-index: 999;
        opacity: 1;
    }

    .left_show{
        animation-name: left-keyframes;
    }
    
    .animation_show {
        animation-duration: 1000ms;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        transform-origin: 0 0;
    }
    
    @keyframes left-keyframes {
        0% {transform: translate(50px, 0px) translate(-50%, -50%);}
        10% {transform: translate(40px, 15px) translate(-50%, -50%);}
        20% { transform: translate(30px, 30px) translate(-50%, -50%);}
        30% {transform: translate(20px, 45px) translate(-50%, -50%);}
        40% {transform: translate(10px, 60px) translate(-50%, -50%);}
        50% { transform: translate(0px, 75px) translate(-50%, -50%);}
        60% {transform: translate(-10px, 90px) translate(-50%, -50%);}
        70% {transform: translate(-20px, 105px) translate(-50%, -50%);}
        80% {transform: translate(-30px, 120px) translate(-50%, -50%);}
        90% {transform: translate(-40px, 135px) translate(-50%, -50%);}
        100% {transform: translate(-50px, 150px) translate(-50%, -50%);}
    }

    .right_show{
        animation-name: right-keyframes;
    }

@keyframes right-keyframes {
  0% {transform:translate(50px, 0px) translate(-50%, -50%);}
  10% {transform:translate(60px, 15px) translate(-50%, -50%);}
  20% {transform:translate(70px, 30px) translate(-50%, -50%);}
  30% {transform:translate(80px, 45px) translate(-50%, -50%);}
  40% {transform:translate(90px, 60px) translate(-50%, -50%);}
  50% {transform:translate(100px, 75px) translate(-50%, -50%);}
  60% {transform:translate(110px, 90px) translate(-50%, -50%);}
  70% {transform:translate(120px, 105px) translate(-50%, -50%);}
  80% {transform:translate(130px, 120px) translate(-50%, -50%);}
  90% {transform:translate(140px, 135px) translate(-50%, -50%);}
  100% {transform:translate(150px, 150px) translate(-50%, -50%);}
  }

.center_show{
    animation-name: center-transform-keyframes;
}

@keyframes center-transform-keyframes {
  0% {transform:translate(50px, 0px)  translate(-50%, -50%);}
  100% {transform:translate(50px, 120px) translate(-50%, -50%);}
}

    .zhengmianClass{
        width: 140rpx;
        height: 160rpx;
        margin: auto;
        position: absolute;
        left: 50%;
        margin-left: -70rpx;
        bottom: 80rpx;
        display: inline-block;
    }

</style>

