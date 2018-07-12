<template>
  <div class="wrap">
    <toast :message=toastMsg :visible.sync="toastVisible"></toast>
    
    <img :src="bind_phone" >
    <div class="wrap_item">
      <input type="number" placeholder="点击输入手机号" v-model="telVal" auto-focus="true"
        placeholder-class="phcolor" maxlength="11" v-on:input="inputChange">
    </div>

    <span :class="{'haveNumClass': telVal.length == 11, 'noNumClass': telVal.length != 11}" @click="getCode">获取验证码</span>
  </div>
</template>

<script>
import toast from 'mpvue-toast'
import { BASE_IMAGE_URL,getPhoneCode } from '@/utils/api'

export default {
  data: {
    telVal: '',
    toastMsg: "请输入正确的手机号",
    toastVisible: false,
    bind_phone: BASE_IMAGE_URL+"bind_phone.png",
  },
  components: {
    toast
  },

  methods: {
    async getCode(){
      if(this.telVal.length != 11){
        this.toastVisible = true;
        return;
      }

      const url = '../getCode/main?phone='+this.telVal;
      wx.navigateTo({ url });
    },

    inputChange: function(){
      
    }
  }
}
  
</script>

<style>
.wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 100rpx;
  color: #c7c8c9;
}


page{
  background: #f2f3f4;
}

.wrap_item{
  text-align: center;
  margin: 50rpx auto;
  border: 1px solid #d1d2d3;
  background: #ffffff;
  width: 70%;
  border-radius: 10rpx;
}

.wrap_item input{
  height: 100rpx;
}

.phcolor{
  color: #c3c4c5;
}

input{
  color: #000;
}

.wrap img{
  width: 60rpx; 
  height: 110rpx;
  margin: auto;
}

.haveNumClass{
  color: #00C70B;
}

.noNumClass{
  color: #c7c8c9;
}
</style>
