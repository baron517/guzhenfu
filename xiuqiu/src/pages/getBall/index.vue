<template>
    <view class="tips">
        <view style="width: 100%; background: #DB483A; height: 40rpx;"></view>
        <view class="head_wrap" v-for="(item, index) in radiusList" :key="index">
            <span class="item" v-bind:style="{left: index*44+'rpx'}"></span>
        </view>
        <view v-for="(item,index) in listData" :key="index" class="item_wrap clearfix">
            <image  :src="item.avatar"/>
            <div class="content_wrap">
                <span>{{item.nickname}} <br/>  <span style="color: #999;">{{item.ar_create_time}}</span>   </span>
            </div>
            <span class="item_addr">{{item.province}}</span>
        </view>
        <view v-if="hasMore" class="loading">
            <!-- <image class="tips-image" src="../../static/img/loading.gif"/> -->
            <text class="tips-text">正在加载中...</text>
        </view>

        <!-- <view v-else>
            <text>----- 我也是有底线的 -----</text>
        </view> -->
    </view>
</template>

<script>
    import { BASE_IMAGE_URL,getAdXiuqiu } from '@/utils/api'

    export default{
        data: {
            page: 1,
            hasMore: true,
            listData: [],
            radiusList: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0],
            headImg: '',
            name: '',
            mb_id: ''
        },
        onLoad () {
            let userInfo = JSON.parse(wx.getStorageSync('userInfo'));
            this.headImg = userInfo.avatarUrl;
            this.name = userInfo.nickName;
            this.mb_id = this.$root.$mp.query.mb_id;
            this.getAdXiuqiuApi();
        },

        methods: {
            async getAdXiuqiuApi(){
                var result = await getAdXiuqiu(this.mb_id, this.page);
                if(result.code == 1000){
                    if(this.page > 1){
                        this.listData = this.listData.concat(result.data);
                    }else{
                        this.listData = result.data;
                    }

                    if(result.data.length <= 5){
                        this.hasMore = false;
                    }else{
                        this.hasMore = true;
                    }
                    
                    console.log(this.listData);

                    setTimeout(function(){
                        wx.stopPullDownRefresh();
                    }, 1000);
                }


            }
        },

        onPullDownRefresh(){
            this.page = 1;
            this.getAdXiuqiuApi();
        },

        onReachBottom(){
            this.page++;
            this.getAdXiuqiuApi();
        },
        
    }
</script>

<style scoped>
    page{
        background: #f2f3f4;
    }
    .tips{
        text-align: center;
        color: #ccc;
    }

    .head_wrap{
        position: relative;
    }

    .head_wrap .item{
        position: absolute;
        width: 40rpx;
        height: 20rpx;
        top: -14rpx;
        border-radius: 20rpx 20rpx 0 0;
        background: #fff;
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
        height: 100rpx;
        background: #fff;
        border-bottom: 1px solid #f2f3f4;
        padding: 20rpx;
        text-align: center;
        line-height: 100rpx;
        /* box-shadow: 0 5rpx; */
    }

    .item_wrap image{
        width: 80rpx;
        height: 80rpx;
        margin: 16rpx 40rpx;
        float: left;
        border-radius: 50%;
    }
    .item_wrap .content_wrap{
        display: flex;
        flex-direction: column;
        float: left;
        text-align: left;
    }

    .item_wrap .content_wrap span{
        vertical-align: middle;
        display: inline-block;
        line-height: 60rpx;
        color: #333;
    }

    .item_wrap .item_addr{
        float: right;
        color: #999;
    }

    .clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
}

.clearfix {
    zoom: 1;
}

.loading{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20rpx;
    }

</style>

