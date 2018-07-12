<template>
<div class="contain">
    <img :src="wuhongbao" >
    <span>期待下次有更多的红包发出 </span>
    <span>祝你好运</span>
</div>
    
    
</template>

<script>
    import { BASE_IMAGE_URL } from '@/utils/api'
    

    export default{
        data: {
            wuhongbao: BASE_IMAGE_URL+'wuhongbao.png',
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
        z-index: -100;
        top: 0rpx;
        background-color: #F9EBD6;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .contain img{
        width: 75%;
        height: 800rpx;
        margin: 0rpx auto 50rpx;
    }

    .contain span{
        color: #DB483C;
    }

    
</style>

