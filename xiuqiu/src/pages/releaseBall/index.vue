<template>
<div>
    <div class="contain">
        <img :src="release_ball_bg" >
       
    </div>

    <!-- <div class="content_bg">
         <img :src="release_bg" >
    </div> -->

    <div class="img_wrap">
        <img :src="open_img" @click="openBusiness">
        
        <img :src="discount_img" @click="discountType">
        <img :src="activity_img" @click="activityBusiness">

        <!-- <span style="position: absolute; top: 250rpx; left: 60rpx; font-size: 34rpx;">从这里进入可自行编辑文字和插入图片
            <br>（注：图片需竖屏）
        </span>

        <span style="position: absolute; top: 640rpx; left: 60rpx; font-size: 34rpx;">从这里进入可插入已经设计好的全屏
            <br>广告图片，提交生成广告页面直接发布。
        </span>

        <span style="position: absolute; top: 1020rpx; left: 60rpx; font-size: 34rpx;">从这里进入可见更多的品牌广告案例，激发
            <br>你的设计灵感。让你的品牌营销做到最好！
        </span> -->
    </div>

    
</div>
    
    
</template>

<script>
    import { BASE_IMAGE_URL } from '@/utils/api'
    export default{
        data: {
            release_bg: BASE_IMAGE_URL+'release_bg.png',
            release_ball_bg: BASE_IMAGE_URL+'release_ball_bg.png',
            open_img: BASE_IMAGE_URL+'template.png',
            discount_img: BASE_IMAGE_URL+'custom_template.png',
            activity_img: BASE_IMAGE_URL+'template_ex.png',
            tags:'',
            selectCity:''
        },

        methods: {
           openBusiness: function(){
               const url = '../openBusiness/main?tags='+this.tags +
                '&mb_type='+1+'&location='+this.selectCity;
                wx.navigateTo({ url });
           },
           discountType: function(){
               const url = '../customUpload/main?tags='+this.tags+
               '&mb_type='+2+'&location='+this.selectCity;
                wx.navigateTo({ url });
           },
           activityBusiness: function(){
               const url = '../platformUpload/main?tags='+this.tags+
               '&mb_type='+3+'&location='+this.selectCity;
                wx.navigateTo({ url });
           }
        },

        onLoad: function(){
            this.tags = this.$root.$mp.query.tags;  
            this.selectCity = this.$root.$mp.query.selectCity;  
            console.log(this.tags);              
            console.log(this.selectCity);              
        }
        
    }
</script>

<style scoped>
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

    .content_bg{
        position:fixed; 
        /*下面的是关键的设置100%显示*/ 
        background-size: 100% 100%; 
        width: 100%;
        height: 100%;
        z-index: -10;
        top: 100rpx;
    }

    .content_bg img{
        width: 100%;
        height: 80%;
        margin-left: 1%;
    }

    .img_wrap{
        position:fixed;
        width: 100%;
        height: 100%;
        z-index: 0;
        top: 4%;
    }

    .img_wrap img{
        width: 90%;
        height: 30%;
        margin-left: 5%;
        margin-top: 1%;
    }

</style>

