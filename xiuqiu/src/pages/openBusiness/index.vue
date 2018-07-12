<template>

    <div :class="{'containWrap' : (!showCrop)}">
        <div v-if="showCrop" class="wrap">
                <input type="text" placeholder-class="phcolor" maxlength="20" v-model="title"
                placeholder="请在这里输入标题" class="title common_style">

            <div class="comment">活动内容：</div>

            <textarea class="content common_style" placeholder="请输入活动内容" v-model="content"></textarea>

            <div class="comment">联系方式：</div>

            <input type="text" placeholder-class="phcolor" maxlength="30"
                placeholder="000-000000" class="title common_style" v-model="contact">

            <div class="comment">活动时间：</div>

            <div class="date_wrap">
                <picker class="date_style" mode="date" :value="date" start="1949-10-01" end="2200-10-01" @change="bindStartDateChange">
                    <button class="start_date_btn">{{startDateValue}}</button>
                </picker>

                <span>至</span>

                <picker class="date_style" mode="date" :value="date" start="1949-10-01" end="2200-10-01" @change="bindEndDateChange">
                    <button class="end_date_btn">{{endDateValue}}</button>
                </picker>

            </div>

            

            <div class="comment">活动地点：</div>

            <input type="text" placeholder-class="phcolor" maxlength="30" v-model="address"
                placeholder="请输入活动地点" class="title common_style">

            <!-- <textarea class="content common_style" placeholder="请输入活动地点" v-model="address"></textarea>     -->

            <div class="comment">广告投放起始时间：</div>

            <div class="date_wrap" style="justify-content: center; margin-top: 20rpx;">
                <picker class="date_style" mode="date" :value="date" start="1949-10-01" end="2200-10-01" @change="bindStartTimeChange">
                    <button class="start_date_btn">{{startTimeValue}}</button>
                </picker>

            </div>


            

            <div class="comment">插入图片：</div>

            <!-- <img :src="commentPic" class="coupon" @click="choosePic(0)"> -->

            <div v-for="(item, index) in imageList" :key="index">
                <img :src="item" class="imageItemClass" mode="widthFix">
            </div>

            <img :src="wrapPic" class="getPic" @click="choosePic()" v-if="imageList.length < 3">

            <button class="submit" @click="submit">提交</button>
            <toast :message=toastMsg :visible.sync="toastVisible"></toast>
        </div>
           

    </div>

</template>

<script>
import toast from 'mpvue-toast'
import { BASE_IMAGE_URL,uploadKaiyeMuban,uploadFile } from '@/utils/api'
import { fmtDate } from '@/utils/index'

import MpvueCropper from 'mpvue-cropper'

let wecropper

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

export default {
    components: {
        toast,MpvueCropper
    },
    data: {
        index: 0,
        startDateValue: '2018-01-01',
        endDateValue: '2018-01-01',
        startTimeValue: '2018-01-01',
        endTimeValue: '2018-01-01',
        commentPic: BASE_IMAGE_URL+'pic_quan.png',
        wrapPic: BASE_IMAGE_URL+'add_pic.png',
        toastMsg: "toastMsg",
        toastVisible: false,
        tags: '',
        mb_type: 0,
        showCrop: true,
        location: '',
        imageList: []
    },
    methods: {
        async submit(){
            if(!this.title){
                this.toastMsg = '标题不能为空';
                this.toastVisible = true;
                return;
            }

            if(!this.content){
                this.toastMsg = '内容不能为空';
                this.toastVisible = true;
                return;
            }

            console.log(this.commentPic);
            if(this.imageList.length == 0){
                this.toastMsg = '请插入图片';
                this.toastVisible = true;
                return;
            }

            // if(this.commentPic.indexOf("pic_quan") != -1){
            //     this.toastMsg = '请上传优惠券';
            //     this.toastVisible = true;
            //     return;
            // }

            // if(this.wrapPic.indexOf("add_pic") != -1){
            //     this.toastMsg = '请插入图片';
            //     this.toastVisible = true;
            //     return;
            // }

            if(!this.contact){
                this.toastMsg = '联系方式不能为空';
                this.toastVisible = true;
                return;
            }

            if(!this.address){
                this.toastMsg = '活动地点不能为空';
                this.toastVisible = true;
                return;
            }
            console.log(this.tags);
            var params = {
                mb_title: this.title,
                mb_content: this.content,
                mb_youhuiquan: this.commentPic,
                mb_charu_img: this.wrapPic,
                mb_lianxi: this.contact,
                mb_didian: this.address,
                mb_time_start: this.startDateValue,
                mb_time_end: this.endDateValue,
                mb_type: this.mb_type,
                mb_openid: wx.getStorageSync('openid'),
                mb_create_time: fmtDate(),
                mb_location: this.location,
                tags: this.tags,
                mb_start_time: this.startTimeValue,
            }

            var jsonParams = JSON.stringify(params);
            console.log(jsonParams);
            wx.setStorageSync("params", jsonParams);

            var result = await uploadKaiyeMuban(params);
            console.log(result);
            if(result.code == 1000){
                // const url = '../businessFinish/main'
                // wx.navigateTo({ url });
            }else{
                this.toastMsg = '上传失败!';
                this.toastVisible = true;
            }

            

        },
        bindStartDateChange: function(e){
            console.log(e.mp.detail.value);
            this.startDateValue = e.mp.detail.value;

        },
        bindStartTimeChange: function(e){
            console.log(e.mp.detail.value);
            this.startTimeValue = e.mp.detail.value;

        },
        bindEndDateChange: function(e){
            console.log(e.mp.detail.value);
            let endValue = e.mp.detail.value;
            endValue = endValue.replace("-","");
            endValue = endValue.replace("-","");

            let startValue = this.startDateValue.replace("-","");
            startValue = startValue.replace("-","");

            if(parseInt(endValue) < parseInt(startValue)){
                this.toastMsg = '不能超过起始日期!';
                this.toastVisible = true;
                return;
            }
            this.endDateValue = e.mp.detail.value;
        },
        bindEndTimeChange: function(e){
            console.log(e.mp.detail.value);
            let endValue = e.mp.detail.value;
            endValue = endValue.replace("-","");
            endValue = endValue.replace("-","");

            let startValue = this.startTimeValue.replace("-","");
            startValue = startValue.replace("-","");

            if(parseInt(endValue) < parseInt(startValue)){
                this.toastMsg = '不能超过起始日期!';
                this.toastVisible = true;
                return;
            }
            this.endTimeValue = e.mp.detail.value;
        },

        getCropperImage () {
            wecropper.getCropperImage()
                .then((src) => {
                wx.previewImage({
                    current: '', // 当前显示图片的http链接
                    urls: [src] // 需要预览的图片http链接列表
                })
                })
                .catch(e => {
                console.error('获取图片失败')
                })
        },

        choosePic: function(){
            const url = '../cropper/main';
            wx.navigateTo({ url });
        }
    },
    onLoad: function(){
        var dateValue = new Date();
        let month = dateValue.getMonth()+1;
        if(month < 10){
            month = "0"+month;
        }

        let day = dateValue.getDate();
        if(day<10){
            day = "0"+day;
        }

        this.startDateValue = dateValue.getFullYear()+"-"+
                        month+"-"+day; 
        this.endDateValue = this.startDateValue;
        this.startTimeValue = this.startDateValue;
        this.endTimeValue = this.endDateValue;
        this.tags = this.$root.$mp.query.tags;  
        this.mb_type = this.$root.$mp.query.mb_type;
        this.location = this.$root.$mp.query.location;
        console.log(this.location);
        let that = this;
        this.imageList = [];
        // wx.setNavigationBarTitle({
        //     title: that.titles[that.mb_type-1]//页面标题为路由参数
        // })

        console.log(this.tags); 
        wx.removeStorageSync("cropImage");
    },

    onShow: function(){
        let src = wx.getStorageSync("cropImage");
        console.log("---"+src);
        let that = this;
        if(src){
            wx.uploadFile({
                    url: 'https://game.junjunit.cn/index.php?g=Api&m=CommonApi&a=uploadFile',
                    filePath: src,
                    name: 'file',
                    header: {"Content-Type":"multipart/form-data"},
                    formData: {},
                    success: function(data){
                    console.log(JSON.parse(data.data).data.url);
                    
                    that.toastMsg = '上传成功';
                    that.toastVisible = true;
                    var url = 'https://game.junjunit.cn/'+JSON.parse(data.data).data.url;

                    that.imageList.push(url);
                    wx.removestoragesync("cropImage");
                    // if(that.index == 0){
                    //     that.commentPic = url;
                    // }else{
                    //     that.wrapPic = url;
                    // }
                }
            })
        }
        

    }

}

</script>

<style scoped>
    .wrap{
        padding: 60rpx 30rpx;
        background: #E34342;
        color: #fff;
    }

    .common_style{
        border-radius: 10rpx;
        border: 2rpx solid #fff;
        background: #fff;
        color: #ADAEAF;
        padding:5rpx 20rpx;
    }

    .comment{
        margin: 20rpx 0rpx 0rpx;
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
        width: 300rpx;
        height: 160rpx;
    }

    .getPic{
        width: 160rpx;
        height: 150rpx;
    }

    .date_wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .date_style{
        width: 50%;
    }

    .submit{
        width: 80%;
        margin: 100rpx auto;
        background: #FCF8E0;
        color: #f00;
        border-radius: 60rpx;
    }

    textarea,input{
        color: #333;
    }

    .cropper-wrapper{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #e5e5e5;
    }

    .cropper{
        position: absolute;
        top: 0;
        left: 0;
    }

    .cropper-buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: rgba(0, 0, 0, 0.95);
        color: #04b00f;
    }

    .containWrap{
        position:fixed; 
        /*下面的是关键的设置100%显示*/ 
        background-size: 100% 100%; 
        width: 100%;
        height: 100%;
        z-index: -100;
        top: 0rpx;
    }

    .imageItemClass{
        width: 100%;
    }


</style>


