<template>
    <div class="contain">
        <img :src="splashSrc" alt="" srcset="">
    </div>
</template>

<script>
    import { BASE_IMAGE_URL } from '@/utils/api'

    export default{
        data: {
            splashSrc: BASE_IMAGE_URL+'splash.png'
        },
        methods: {
            goToNextPage(){
                setTimeout(function(){
                    // const url = '../home/main'
                    // wx.redirectTo({ url });

                    wx.switchTab({
                        url: '../home/main'
                    })
                }, 2000);
            }
        },
        mounted(){
            this.goToNextPage();
        }
    }
</script>

<style scoped>
    .contain{
        position:fixed; 
        /*下面的是关键的设置100%显示*/ 
        background-size: 100% 100%; 
        width: 100%;
        height: 100%;
    }
    .contain img{
        width: 100%;
        height: 100%;
    }
</style>

