<template>
    <div class="head-wrap">

        <div class="contain">
            <img :src="open_bg" >
        </div>

        <div class="wrap">

            <div class="head">
                <img :src="zhuangshi">
                <span>{{params.mb_title}}</span>
            </div>

            <div class="content-wrap">
                <div class="comment">活动内容：</div>

                <span class="content common_style">{{params.mb_content}}</span>
            </div>
            <hr > 
            <div class="content-wrap">
                <div class="comment">优惠券：</div>

                <img :src="params.mb_youhuiquan" class="coupon">
            </div>
            <hr > 
            <div class="content-wrap">
                <div class="comment">插入图片：</div>

                <div class="pic_wrap">
                    <img :src="params.mb_charu_img" class="getPic">
                    
                </div>
            </div>
            <hr > 
            <div class="content-wrap">
                <div class="comment">联系方式：</div>

                <span  class="common_style">{{params.mb_lianxi}}</span>
            </div>
            <hr > 
            <div class="content-wrap">
                <div class="comment">活动时间：</div>

                <div class="date_wrap">
                    <span>{{params.mb_time_start}}</span>

                    <span>至</span>

                    <span>{{params.mb_time_end}}</span>

                </div>
            </div>
            <hr > 
            <div class="content-wrap">
                <div class="comment">活动地点：</div>

                <span style="color: #545556;">{{params.mb_didian}}</span>

            </div>
        </div>

        <div class="btnWrap">
                <img :src="fabuguanggao" class="submit" @click="submit">
        </div>
    </div>
    

</template>

<script>
import { BASE_IMAGE_URL } from '@/utils/api'
    
export default {
    data: {
        startDateValue: '2018-01-01',
        endDateValue: '2018-01-01',
        params: '',
        open_bg: BASE_IMAGE_URL+"open_bg.png",
        zhuangshi: BASE_IMAGE_URL+"zhuangshi.png",
        fabuguanggao: BASE_IMAGE_URL+"fabuguanggao.png",
    },
    methods: {
        bindStartDateChange: function(e){
            console.log(e.mp.detail.value);
            this.startDateValue = e.mp.detail.value;

        },
        bindEndDateChange: function(e){
            console.log(e.mp.detail.value);
            this.endDateValue = e.mp.detail.value;
        },
        submit: function(){
            const url = '../promiseMoney/main';
            wx.navigateTo({ url });
        }
    },

    onLoad: function(){
        var paramsJson = wx.getStorageSync("params");
        if(paramsJson){
            this.params = JSON.parse(paramsJson);
            console.log(this.params);
        }
        
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

    .head-wrap{
        width:100%; 
        height: 100%; 
        padding: 100rpx 0rpx;
    }

    .head{
        height: 200rpx;
        width: 100%;
        text-align: center;
        line-height: 200rpx;
        position: relative;
    }

    .head img{
        width: 50%;
        position: absolute;
        top: 50rpx;
        left: 0;
        height: 100rpx;
    }
    .wrap{
        margin: auto 40rpx;
        background: #FFF;
        color: #F00;
        border-radius: 30rpx;
        padding-bottom: 100rpx;
    }

    .content-wrap{
        padding: 0rpx 60rpx 10rpx;
        background: #FFF;
        color: #F00;
        border-radius: 30rpx;
    }

    .common_style{
        border-radius: 10rpx;
        border: 2rpx solid #fff;
        background: #fff;
        color: #545556;
    }

    .comment{
        margin: 20rpx 0rpx;
    }

    .wrap .title{
        width: 94%;
        height: 80rpx;
    }

    .phcolor{
        color: #E34342;
        text-align: center;
    }

    .content{
        height: 260rpx;
        width: 94%;
        
    }

    .coupon{
        width: 400rpx;
        height: 200rpx;
    }

    .pic_wrap{
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .getPic{
        width: 160rpx;
        height: 160rpx;
    }

    .pic_wrap span{
        position: absolute;
        bottom: 0;
        left: 170rpx;
    }

    .date_wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        color: #545556;
    }

    .date_style{
        width: 40%;
    }

    .submit{
        width: 80%;
        height: 100rpx;
    }

    hr{
        width: 100%;
        height: 1rpx;
        border-top: 1rpx dashed #EABCBE
    }



    .btnWrap{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 50rpx;
    }
</style>


