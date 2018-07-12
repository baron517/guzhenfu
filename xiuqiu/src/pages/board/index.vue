<template>
    <view class="tips">
        <view v-for="(item,index) in listData" :key="index">
            <text>{{index}}---{{item.title}}</text>
        </view>
        <view v-if="hasMore">
            <!-- <image class="tips-image" src="../../static/img/loading.gif"/> -->
            <text class="tips-text">正在加载中...</text>
        </view>

        <view v-else>
            <text>----- 我也是有底线的 -----</text>
        </view>
    </view>
</template>

<script>
    import { getBoardData } from '@/utils/api'

    export default{
        data: {
            page: 1,
            hasMore: true,
            listData: []
        },
        onLoad () {
            this.getListData();
        },

        methods: {
            async getListData(){
                var result = await getBoardData(this.page);
                if(this.page > 1){
                    if(result.length == 0){
                        this.hasMore = false;
                    }
                    this.listData = this.listData.concat(result);
                }else{
                    this.listData = result;
                }
                
                console.log(this.listData);
            }
        },

        async onPullDownRefresh(){
            this.page = 1;
            await this.getListData();
            wx.stopPullDownRefresh();
        },

        onReachBottom(){
            this.page++;
            this.getListData();
        },
        
    }
</script>

<style scoped>
    .tips{
        text-align: center;
        padding: 40rpx;
        color: #ccc;
    }

    .tips image{
        width: 60rpx;
        height: 60rpx;
        vertical-align: middle;
    }

    .tips text{
        vertical-align: middle;
    }
</style>

