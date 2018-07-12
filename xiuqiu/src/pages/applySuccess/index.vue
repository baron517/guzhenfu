<template>
  <div class="wrap">
    <img :src="success_tijiao" >
	<span style="margin: 20rpx auto 40rpx" >{{info}}</span>
	<span style="color: #959697" v-if="getCode != 1">审核需要3-7个工作日</span>
  </div>
</template>

<script>

import { BASE_IMAGE_URL } from '@/utils/api'

export default {
  data: {
    success_tijiao: BASE_IMAGE_URL+'success_tijiao.png',
    getCode: 0,
    info: '提交成功'
  },
  methods: {
    
  },

  onLoad: function(){
        this.getCode = this.$root.$mp.query.getCode;
        var that = this;
        if(this.getCode == 1){
          this.info = '绑定成功!';
        }
          setTimeout(function(){
              if(this.getCode == 1){
                wx.navigateBack({
                  delta: 10
                })
              }else{
                wx.navigateBack({
                    delta: 10
                })
              }
            

          }, 3000);
        
        
    }

}
  
</script>

<style>
.wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 100rpx;
  color: #000;
}

.wrap img{
	width: 200rpx;
	height: 200rpx;
}

page{
  background: #fff;
}




</style>
