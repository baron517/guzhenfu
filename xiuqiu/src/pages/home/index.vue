<template>
    <div class="app">
        <img :src="home_pic" alt="">

        <div class="row_wrap">
            <div class="item_wrap" @click="releaseMoneyBall">
                <img :src= 'money_btn' >
                <text>红包绣球</text>
            </div>
            <div class="item_wrap" @click="futureFunction" style="visibility:hidden">
                <img :src="hongniang_btn" >
                <text>红娘绣球</text>
            </div>
            <div class="item_wrap" @click="futureFunction" style="visibility:hidden">
                <img :src="jiaoyou_btn" >
                <text>绣球交友</text>
            </div>
        </div>

        <div class="row_wrap" style="visibility:hidden">
            <div class="item_wrap" @click="futureFunction">
                <img :src="youxi_btn" >
                <text>游戏绣球</text>
            </div>
            <div class="item_wrap" @click="futureFunction">
                <img :src="shipin_btn" >
                <text>视频绣球</text>
            </div>
            <div class="item_wrap" @click="futureFunction">
                <img :src="toutiao_btn" >
                <text>头条绣球</text>
            </div>
        </div>
        <toast :message=toastMsg :visible.sync="toastVisible"></toast>
    
        <button v-if="isShowUserInfoBtn" @getuserinfo="bindGetUserInfo"
            open-type="getUserInfo" class="getInfo"></button>
    </div>
</template>

    

<script>
import toast from 'mpvue-toast'
import { BASE_IMAGE_URL,bindUser,getOpenid } from '@/utils/api'

    var amapFile = require('../../../static/js/amap-wx.js');

    export default {
        components: {
            toast
        },
        data: {
            markersData: {
                latitude: '',
                longitude: '',
                key: 'd3d776293e437a8ff3a67a418ae04820'
            },
            toastMsg: "敬请期待",
            toastVisible: false,
            isShowUserInfoBtn: true,
            home_pic: BASE_IMAGE_URL+'home_pic.png',
            money_btn: BASE_IMAGE_URL+'money_btn.png',
            hongniang_btn: BASE_IMAGE_URL+'hongniang_btn.png',
            jiaoyou_btn: BASE_IMAGE_URL+'jiaoyou_btn.png',
            youxi_btn: BASE_IMAGE_URL+'youxi_btn.png',
            shipin_btn: BASE_IMAGE_URL+'shipin_btn.png',
            toutiao_btn: BASE_IMAGE_URL+'toutiao_btn.png',
            province: '',
            district: '',
            country: '',
            openid: '',
        },

        methods: {
            futureFunction: function(){
                this.toastVisible = true;
                return;
            },
            releaseMoneyBall: function(){
                const url = '../chooseType/main'
                wx.navigateTo({ url });
            },
            loadCity: function(){
                var that = this;
                var myAmapFun = new amapFile.AMapWX({ key: this.markersData.key });
                //console.log(object);
                myAmapFun.getRegeo({
                    location: '' + that.markersData.longitude + ',' + that.markersData.latitude + '',//location的格式为'经度,纬度'
                    success: function (data) {
                        var address = data[0].regeocodeData.addressComponent;
                        console.log(address);
                        that.province = address.province;
                        that.district = address.district;
                        that.country = address.country;
                        wx.setStorageSync("location", that.district);
                    },
                    fail: function (info) {
                        console.log(info);
                     }
                });
            },
            //用户授权 并且绑定用户信息
            bindGetUserInfo: function(e) {
                console.log(e.mp.detail.userInfo)
                if (e.mp.detail.userInfo){
                    //用户按了允许授权按钮
                    console.log("okok");
                    this.isShowUserInfoBtn = false;
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

                    this.bindUser(params);
                } else {
                    //用户按了拒绝按钮
                    console.log("error");
                    this.isShowUserInfoBtn = true;
                }
            },

            async bindUser(params){
                var result = await bindUser(params);
                console.log("object"+JSON.stringify(result));
                if(result.code == 1000){
                    this.releaseMoneyBall();
                }
            },

            async getOpenid(params){
                var result = await getOpenid(params);
                console.log("---"+JSON.stringify(result));
                if(result && result.openid){
                    this.openid = result.openid;
                    wx.setStorageSync('openid', result.openid);
                    if(result.user_info && result.user_info.phone){
                        wx.setStorageSync('phone', result.user_info.phone);
                    }
                    wx.setStorageSync('lahei', result.user_info.lahei);
                    
                    console.log(result.user_info.phone);
                }
            }

        },
        onLoad: function(){
            var that=this;
            wx.clearStorage();
            wx.getLocation({
                type: 'wgs84', //返回可以用于wx.openLocation的经纬度
                success: function (res) {
                    that.markersData.latitude = res.latitude//维度
                    that.markersData.longitude = res.longitude//经度
                    console.log(res);
                    that.loadCity();
                }
            });

            wx.login({
                success: function(res){
                    console.log(res.code);

                    var params = {
                        //小程序唯一标识
                        appid: 'wxe2a03d2740667ab1',
                　　 　　//小程序的 app secret
                        secret: 'd7f108920c68e1389d0ba6f4205cc38d',
                        code: res.code
                    }
                    that.getOpenid(params);
                }
            })

                    

            // 查看是否授权
            wx.getSetting({
                success: function(res){
                    console.log(res);
                    if (res.authSetting['scope.userInfo']) {
                        that.isShowUserInfoBtn = false;
                        wx.getUserInfo({
                            success: function(res) {
                            //console.log(res.userInfo)
                            //用户已经授权过
                            }
                        })
                    }else{
                        //如果没有授权
                        that.isShowUserInfoBtn = true;

                    }
                }
            })
        
        },

    }
</script>

<style scoped>
    .app >img{
        width: 100%;
        height: 400rpx;
    }

    .row_wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .item_wrap{
        display: flex; 
        flex-direction: column;
        text-align: center;
        margin-top: 20rpx;
    }

    .item_wrap img{
        margin: auto;
        width: 140rpx;
        height: 140rpx;
        margin-bottom: 20rpx;
    }

    .getInfo{
        position: absolute;
        top: 420rpx;
        left: 20rpx;
        width: 200rpx;
        height: 240rpx;
        background: none;
        border:0;
    }

    .getInfo::after{
        border: 0;
    }
</style>

