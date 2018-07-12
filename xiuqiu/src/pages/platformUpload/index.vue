<template>

    <div  class="wrap">

        
        <swiper class="swiper" @change="onSlideChangeEnd">
            <block v-for="(item, index) in images" :key="index">
                <swiper-item>
                    <image :src="item" class="slide-image" mode="aspectFit"/>
                </swiper-item>
            </block>

        </swiper>

        
        <button class="submit" @click="submit">保存</button>

    </div>

</template>

<script>
import { BASE_IMAGE_URL,uploadKaiyeMuban,uploadFile } from '@/utils/api'


export default {
    data: {
        images: [
            BASE_IMAGE_URL+'open_bg.png',
            BASE_IMAGE_URL+'pic_hongbao.png',
            BASE_IMAGE_URL+'hongbao.png'
            ],
        currentIndex: 0,    
    },
    methods: {
       onSlideChangeEnd: function(e){
           console.log(e.mp.detail.current);
            this.currentIndex = e.mp.detail.current;

       },

        async submit(){
            wx.showLoading({ title: '拼命加载中...' })

            wx.downloadFile({
                url: this.images[this.currentIndex],
                success: (res) => {
                    console.log(res);

                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: (res) => {
                            wx.showToast({
                                title: '保存成功',
                                icon: 'none',
                                duration: 1000
                            })
                            wx.hideLoading();
                            wx.navigateBack({
                                delta: 1
                            })
                        },

                        fail: () => {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'none',
                                duration: 1000
                            })
                            wx.hideLoading();
                        }
                    })
                },
                fail: () => {
                    wx.showToast({
                                title: '保存失败',
                                icon: 'none',
                                duration: 1000
                            })
                    wx.hideLoading();
                }
            })
            

        },
       
    },
    onLoad: function(){
       
        this.tags = this.$root.$mp.query.tags;  
        this.location = this.$root.$mp.query.location;
        console.log(this.location);
        
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
        background: #000;
        color: #fff;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .swiper{
        width: 100%;
        height: 100%;
    }

    .slide-image{
        width: 100%;
        height: 100%;
    }

  

    .submit{
        position: absolute;
        bottom: 0rpx;
        right: 10rpx;
        background: transparent;
        color: #fff;
        margin-bottom: 60rpx;
        border:0;
        z-index: 100;
    }



</style>


