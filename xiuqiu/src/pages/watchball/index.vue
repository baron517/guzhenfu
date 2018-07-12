<template>
    <view class="tips">
        <view v-for="(item,index) in listData" :key="index" class="item_wrap" >
            <img :src="kuangkuang" class="item_bg">
            <div class="time">
                {{item.mb_create_time}}
            </div>
            <div class="content">{{item.mb_content}}</div>
            <div class="btn_wrap">

                
                <img :src="btn_yijie" class="left_btn" @click="goToNext(item.mb_id)">
                <img :src="btn_weijie" class="left_btn">
            </div>
            
        </view>
        <view v-if="hasMore" class="loading">
            <!-- <image class="tips-image" src="../../static/img/loading.gif"/> -->
            <text class="tips-text">正在加载中...</text>
        </view>

        <!-- <view v-else style="margin-top: 20rpx;">
            <text>----- 我也是有底线的 -----</text>
        </view> -->
    </view>
</template>

<script>
    import { BASE_IMAGE_URL,getBoardData, getMuban} from '@/utils/api'

    export default{
        data: {
            page: 1,
            hasMore: true,
            listData: [],
            btn_weijie: BASE_IMAGE_URL+'btn_weijie.png',
            btn_yijie: BASE_IMAGE_URL+'btn_yijie.png',
            kuangkuang: BASE_IMAGE_URL+'kuangkuang.png',
        },
        onLoad () {
            this.getMubanApi();
        },

        methods: {
            goToNext: function(mb_id){
                const url = '../getBall/main?mb_id='+mb_id;
                wx.navigateTo({ url });
            },
            async getMubanApi(){
                var that = this;
                var openid = wx.getStorageSync('openid');
                var result = await getMuban(openid, this.page);
                if(result.code == 1000){
                    if(this.page > 1){
                        this.listData = this.listData.concat(result.data);
                    }else{
                        this.listData = result.data;
                    }

                    if(result.data.length <= 5){
                        console.log(result.data.length);
                        this.hasMore = false;
                    }else{
                        this.hasMore = true;
                    }
                
                    console.log(this.listData);
                }

                setTimeout(function(){
                    wx.stopPullDownRefresh();
                }, 1000);
                
            }
        },

        onPullDownRefresh(){
            this.page = 1;
            this.getMubanApi();
        },

        onReachBottom(){
            this.page++;
            this.getMubanApi();
        },
        
    }
</script>

<style scoped>
    .tips{
        text-align: center;
        padding: 40rpx;
        color: #ccc;
        background: #F3F3F3;
        top: 0;
        left: 0;
        width: 100%;
    }

    .tips image{
        width: 60rpx;
        height: 60rpx;
        vertical-align: middle;
    }

    .tips text{
        vertical-align: middle;
    }

    .item_wrap{
        width: 90%;
        height: 260rpx;
        /* background: #fff;
        border-radius: 40rpx;
        border: 1px solid #f2f3f4;
        margin: 40rpx auto; */
        background: no-repeat center top;
        background-size: contain;
        /* box-shadow: 0 5rpx; */
        position: relative;
        
    }

    .item_wrap .item_bg{
        width: 100%; 
        height: 100%; 
        position: absolute;
        top: 0;
        left: 0;
    }

    .item_wrap .time{
        height: 60rpx;
        text-align: left;
        padding-left: 30rpx;
        padding-top: 30rpx;
        z-index: 100;
        position: relative;
        color: #fff;
        font-size: 30rpx;
    }

    .item_wrap .content{
        text-align: left;
        padding-left: 30rpx;
        padding-top: 30rpx;
        z-index: 100;
        position: relative;
        color: #A33E00;
        font-size: 30rpx;
    }

    .item_wrap .btn_wrap{
        float: right;
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-top: 30rpx;
        z-index: 100;
        position: relative;
        margin-right: 30rpx;
    }

    .item_wrap .btn_wrap .left_btn{
        height: 60rpx;
        width: 140rpx;
    }

    .item_wrap .btn_wrap .right_btn{
        height: 60rpx;
        width: 140rpx;
    }

    .loading{
        width: 100%;
        margin:40rpx 0rpx 40rpx -50rpx;
    }
</style>

