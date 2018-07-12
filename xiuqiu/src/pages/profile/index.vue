<template>
    <div>
        <toast :message=toastMsg :visible.sync="toastVisible"></toast>
    
        <div class="item_wrap" @click="goToMoney">
            <div class="left_wrap">
                <img :src="money" >
                <span>钱包</span>
            </div>
            <img :src="right">
        </div>

        <hr>


        <div class="item_wrap" @click="bindPhone">
            <div class="left_wrap">
                <img :src="phone" >
                <span>手机绑定</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <div class="item_wrap">
            <div class="left_wrap">
                <img :src="share" >
                <span>分享</span>
            </div>
            <img :src="right">
        </div>
        <button open-type="share"  class="shareBtn"></button>
        <hr>

        <div class="item_wrap" @click="apply">
            <div class="left_wrap" >
                <img :src="release_ball" >
                <span>发布绣球</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <div class="item_wrap" @click="watchball">
            <div class="left_wrap">
                <img :src="release_ball" >
                <span>绣球查看</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <div class="item_wrap" @click="aboutUs">
            <div class="left_wrap">
                <img :src="about" >
                <span>关于我们</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <div class="item_wrap" @click="contactUs">
            <div class="left_wrap">
                <img :src="contact" >
                <span>联系我们</span>
            </div>
            <img :src="right">
        </div>

        <hr>

        <button v-if="isShowUserInfoBtn" @getuserinfo="bindGetUserInfo"
            open-type="getUserInfo" class="getInfo"></button>

        <button v-if="isBindPhone" @getuserinfo="bindPhoneInfo"
            open-type="getUserInfo" class="bindPhoneClass"></button>    

    </div>
</template>

<script>
import { BASE_IMAGE_URL,getShenhe,bindUser,getUser } from '@/utils/api'
import toast from 'mpvue-toast'

    export default{
        components: {
            toast
        },
        data: {
            money: BASE_IMAGE_URL+'money.png',
            contact: BASE_IMAGE_URL+'contact.png',
            right: BASE_IMAGE_URL+'right.png',
            phone: BASE_IMAGE_URL+'phone.png',
            share: BASE_IMAGE_URL+'share.png',
            about: BASE_IMAGE_URL+'about.png',
            release_ball: BASE_IMAGE_URL+'release_ball.png',
            toastMsg: "发送成功",
            toastVisible: false,
            baozhengjin: 0,
            isShowUserInfoBtn: true,
            isBindPhone: true,
            openid: ''
        },
        methods: {
            goToMoney: function(){
                const url = '../money/main'
                wx.navigateTo({ url });
            },
            async bindPhone(){
                
                let result = await getUser(wx.getStorageSync('openid'));
                console.log(result);
                if(result.code == 1000){
                    if(result.data.phone){
                        this.toastMsg = '已成功绑定过';
                        this.toastVisible = true;
                    }else{
                        const url = '../bindPhone/main'
                        wx.navigateTo({ url });
                    }
                }
                
            },
            async apply(){

                let r = await getUser(this.openid);
                console.log(r);
                if(r.code == 1000){
                    if(r.data.phone){
                    }else{
                        this.toastMsg = '请先绑定手机号！';
                        this.toastVisible = true;
                        return;
                    }
                }
                
                var result = await getShenhe(this.openid);
                console.log(result);
                var url = '';
                if(result == null){
                    //没有审核 去审核页面
                    url = '../apply/main'
                    wx.navigateTo({ url });
                }else{
                    //审核通过 直接发布绣球
                    if(result.s_status == 0){
                        //审核中
                        this.toastMsg = '审核中';
                        this.toastVisible = true;
                    }else if(result.s_status == 1){
                        //审核通过 调到选择类别页面
                        url = '../chooseType/main?type=1'
                        wx.navigateTo({ url });
                    }else{
                        //审核拒绝
                        this.toastMsg = '审核拒绝,请重新提交审核';
                        this.toastVisible = true;
                        url = '../apply/main'
                        wx.navigateTo({ url });
                    }
                    
                }
                
            },
            releaseBall: function(){
                const url = '../releaseBall/main'
                wx.navigateTo({ url });
            },
            watchball: function(){
                if(baozhengjin == 0){
                    this.toastMsg = '还未发布绣球';
                    this.toastVisible = true;
                }else{
                    const url = '../watchball/main'
                    wx.navigateTo({ url });
                }
                
            },

            getUserParams: function(e){
                var userInfo = e.mp.detail.userInfo;
                
                var userInfoJsonString = JSON.stringify(userInfo);
                wx.setStorageSync("userInfo", userInfoJsonString);

                var myDate = new Date();
                var year = myDate.getFullYear();
                var month = myDate.getMonth()+1;
                var day = myDate.getDate();
                var hour = myDate.getHours();
                var minutes = myDate.getMinutes();

                var params = {
                    nickname: userInfo.nickName,
                    openid: this.openid,
                    create_time: year+'-'+month+'-'+day+' '+hour+':'+minutes,
                    avatar: userInfo.avatarUrl,
                    city: this.city,
                    country: this.country,
                    province: this.province,
                    gender: (userInfo.gender == 1 ? '男' : '女'),
                }

                return params;
            },

            async bindGetUserInfo(e){
                if (e.mp.detail.userInfo){
                    //用户点击了 同意
                    this.isShowUserInfoBtn = false;
                    var params = this.getUserParams(e);

                    var result = await bindUser(params);
                    console.log("object"+JSON.stringify(result));
                    if(result.code == 1000){
                        this.apply();
                    }else{
                        this.toastMsg = '获取用户信息失败！';
                        this.toastVisible = true;
                    }
                }else {
                    //用户按了拒绝按钮
                    console.log("error");
                    this.isShowUserInfoBtn = true;
                }
            },

            async bindPhoneInfo(e){
                if (e.mp.detail.userInfo){
                    //用户点击了 同意
                    this.isBindPhone = false;
                    var params = this.getUserParams(e);

                    var result = await bindUser(params);
                    console.log("object"+JSON.stringify(result));
                    if(result.code == 1000){
                        this.bindPhone();
                    }else{
                        this.toastMsg = '获取用户信息失败！';
                        this.toastVisible = true;
                    }
                }else {
                    //用户按了拒绝按钮
                    console.log("error");
                    this.isBindPhone = true;
                }
            },

            contactUs: function(){
                wx.downloadFile({
                    url: BASE_IMAGE_URL+'contact.doc',
                    success: function (res) {
                        var filePath = res.tempFilePath
                        wx.openDocument({
                            filePath: filePath,
                            fileType:'doc',
                            success: function (res) {
                                console.log(res);
                                console.log('打开文档成功'+res)
                            }
                        })
                    }
                })
            },

            aboutUs: function(){
                wx.downloadFile({
                    url: BASE_IMAGE_URL+'about.doc',
                    success: function (res) {
                        var filePath = res.tempFilePath
                        wx.openDocument({
                            filePath: filePath,
                            fileType:'doc',
                            success: function (res) {
                                console.log(res);
                                console.log('打开文档成功'+res)
                            }
                        })
                    }
                })
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
        onLoad: function(){
            let info = wx.getStorageSync('userInfo');
            if(info){
                let userInfo = JSON.parse(info);
                this.baozhengjin = userInfo.baozhengjin;
                //是否交过保证金 0 没有 1 有
            }

            this.openid = wx.getStorageSync('openid');
            
        }
    }
</script>

<style scoped>
    .item_wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 120rpx;
        margin: auto 40rpx;
    }

    .item_wrap img{
        width: 80rpx;
        height: 80rpx;
    }

    .left_wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    hr{
        width: 85%; 
        margin-left: 15%; 
        border-bottom: 0.5px solid #b1b2b3;
        opacity: 0.2;
    }

    .shareBtn{
        position: absolute; width: 90%; background: none; height: 120rpx; z-index:100;border:0; top:245rpx;
    }

    .shareBtn::after{
        border: 0;
    }

    .getInfo{
        position: absolute;
        top: 360rpx;
        left: 20rpx;
        width: 100%;
        height: 120rpx;
        background: none;
        border:0;
    }

    .getInfo::after{
        border: 0;
    }

    .bindPhoneClass{
        position: absolute;
        top: 120rpx;
        left: 20rpx;
        width: 100%;
        height: 120rpx;
        background: none;
        border:0;
    }

    .bindPhoneClass::after{
        border: 0;
    }

</style>

