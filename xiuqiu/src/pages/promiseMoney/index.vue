<template>
<div class="contain">
    <toast :message=toastMsg :visible.sync="toastVisible"></toast>

    <div class="item" v-if="baozhengjin == 1">
        <span>保证金</span>
        <span> {{promiseMoney}}元</span>
    </div>

    <hr/>

    <div class="item">
        <span>1000条广告价</span>
        <span>{{price}} <span>元</span>  </span>
    </div>

    <div class="numWrap">
        <img :src="reduce" @click="reduceClick" :disabled="number <= 0">
        <span>{{number}}</span>
        <img :src="add" @click="addClick" :disabled="number > 999999">
    </div>

    <hr/>

    <div class="item">
        <span>投放数量:</span>
        <span>{{number*1000}} 条  </span>
    </div>

<hr/>

    <div class="item">
        <span>实付金额:</span>
        <span style="color: #DB483A; font-size: 40rpx;">￥ {{price*number}}  </span>
    </div>

<hr/>

    <div class="payItem" style="margin: 200rpx auto;">
        <img :src="btn_pay" @click="pay">
    </div>

</div>
    
    
</template>

<script>
    import { BASE_IMAGE_URL,getConfig } from '@/utils/api'
    import toast from 'mpvue-toast'

    export default{
        data: {
            reduce: BASE_IMAGE_URL+'reduce.png',
            add: BASE_IMAGE_URL+'add.png',
            promiseMoney: 80,
            price: 50,
            number: 1,
            btn_pay: BASE_IMAGE_URL+"btn_pay.png",
            toastMsg: "最小为1!",
            toastVisible: false,
            baozhengjin: 0
        },
        components: {
            toast
        },
        methods: {
            reduceClick: function(){
                this.number--;
                if(this.number <= 1){
                    this.number = 1;
                    this.toastVisible = true;
                }
            },

            addClick: function(){
                this.number++;
            },

            async getConfigApi(){
                let result = await getConfig();
                //保证金
                this.promiseMoney = result.c_baozhengjin;
                //1000条 广告价格
                this.price = result.c_hongbao_money;
            },

            pay: function(){
                wx.requestPayment({
                    'timeStamp': '',
                    'nonceStr': '',
                    'package': '',
                    'signType': 'MD5',
                    'paySign': '',
                    'success':function(res){
                        },
                    'fail':function(res){
                        }
                })
            }

        },

        onLoad: function(){
            let userInfo = JSON.parse(wx.getStorageSync('userInfo'));
            this.baozhengjin = userInfo.baozhengjin;
            //是否交过保证金 0 没有 1 有
            this.getConfigApi();
        }
    }
</script>

<style scoped>
    .contain{
        background-color: #FFF;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: auto 20rpx;
        width: 90%;
        height: 160rpx;
    }

    hr{
        background: #D8D8D8;
        width: 100%;
        height: 2rpx;
    }

    .numWrap{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 90%;
        height: 70rpx;
        margin-bottom: 10rpx;
    }

    .numWrap input{
        width: 120rpx;
        border-top: 1rpx solid #ddd;
        border-bottom: 1rpx solid #ddd;
        height: 66rpx;
        min-height: 66rpx;
        padding-left: 10rpx;
        font-size: 30rpx;
    }

    .numWrap span{
        width: 70rpx;
        height: 68rpx;
        text-align: center;
        line-height: 68rpx;
        border-top: 1rpx solid #ddd;
        border-bottom: 1rpx solid #ddd;
    }

    .numWrap img{
        width: 70rpx;
        height: 70rpx;
    }

    .payItem{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 90rpx;
        width: 100%;
        margin-bottom: 20rpx;
    }

    .payItem img{
        height: 100%;
        width: 80%;
    }


    
</style>

