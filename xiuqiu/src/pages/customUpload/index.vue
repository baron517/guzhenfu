<template>

    <div  class="wrap">

        <img :src="wrapPic" class="coupon" @click="choosePic">

        <div class="comment">广告投放起始时间：</div>

            <div class="date_wrap" style="justify-content: center;                  margin-top: 20rpx;">
                <picker class="date_style" mode="date" :value="date" start="1949-10-01" end="2200-10-01" @change="bindStartDateChange">
                    <button class="start_date_btn">{{startDateValue}}</button>
                </picker>

            </div>

        <button class="submit" @click="submit">提交</button>

        </div>

</template>

<script>
import { BASE_IMAGE_URL,uploadKaiyeMuban,uploadFile } from '@/utils/api'


export default {
    data: {
        index: 0,
        wrapPic: BASE_IMAGE_URL+'add_pic.png',
        tags: '',
        location: '',
        startDateValue: '',
        endDateValue: ''
    },
    methods: {
        bindStartDateChange: function(e){
            console.log(e.mp.detail.value);
            this.startDateValue = e.mp.detail.value;

        },
        bindEndDateChange: function(e){
            console.log(e.mp.detail.value);
            let endValue = e.mp.detail.value;
            endValue = endValue.replace("-","");
            endValue = endValue.replace("-","");

            let startValue = this.startDateValue.replace("-","");
            startValue = startValue.replace("-","");

            if(parseInt(endValue) < parseInt(startValue)){
                wx.showToast({
                    title: '不能超过起始日期',
                    icon: 'none',
                    duration: 1000
                })
                return;
            }
            this.endDateValue = e.mp.detail.value;
        },
        choosePic: function(){
            let that = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    const src = res.tempFilePaths[0]
                    //  获取裁剪图片资源后，给data添加src属性及其值
                    wx.uploadFile({
                            url: 'https://game.junjunit.cn/index.php?g=Api&m=CommonApi&a=uploadFile',
                            filePath: src,
                            name: 'file',
                            header: {"Content-Type":"multipart/form-data"},
                            formData: {},
                            success: function(data){
                            console.log(JSON.parse(data.data).data.url);
                            
                            wx.showToast({
                                title: '上传成功',
                                icon: 'none',
                                duration: 1000
                            })
                            var url = 'https://game.junjunit.cn/'+JSON.parse(data.data).data.url;
                            that.wrapPic = url;
                        }
                    })
                }
            })
        },

        async submit(){

            console.log(this.wrapPic);
            if(this.wrapPic.indexOf("add_pic") != -1){

                wx.showToast({
                        title: '请上传模板图片',
                        icon: 'none',
                        duration: 1000
                    })

                return;
            }

          
            console.log(this.tags);
            var params = {
                mb_title: '',
                mb_content: '',
                mb_youhuiquan: '',
                mb_charu_img: this.wrapPic,
                mb_lianxi: '',
                mb_didian: '',
                mb_time_start: '',
                mb_time_end: '',
                mb_type: 0,
                mb_openid: wx.getStorageSync('openid'),
                mb_create_time: '',
                mb_location: this.location,
                tags: this.tags,
                mb_start_time: this.startDateValue,
            }

            var jsonParams = JSON.stringify(params);
            console.log(jsonParams);
            //wx.setStorageSync("params", jsonParams);

            var result = await uploadKaiyeMuban(params);
            console.log(result);
            if(result.code == 1000){
                const url = '../promiseMoney/main';
                wx.navigateTo({ url });
            }else{
                wx.showToast({
                    title: '上传失败!',
                    icon: 'none',
                    duration: 1000
                })
            }

            

        },
       
    },
    onLoad: function(){
       
        this.tags = this.$root.$mp.query.tags;  
        this.location = this.$root.$mp.query.location;
        console.log(this.location);

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
        
    }

}

</script>

<style scoped>

    .wrap{
        position:fixed; 
        /*下面的是关键的设置100%显示*/ 
        background-size: 100% 100%; 
        width: 100%;
        height: 100%;
        z-index: -100;
        top: 0rpx;
        background: #E34342;
        color: #fff;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .coupon{
        width: 90%;
        min-height: 70%;
    }

  

    .submit{
        width: 80%;
        margin: 20rpx auto;
        background: #FCF8E0;
        color: #f00;
        border-radius: 60rpx;
    }

    .comment{
        margin: 20rpx;
        width: 100%;
        padding-left: 80rpx;
    }

    .date_wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 90%;
    }

    .date_style{
        width: 50%;
        height: 100rpx;
    }



</style>


