<template>


  <div class="phonenum-show">
     <toast :message=toastMsg :visible.sync="toastVisible"></toast>
    
     <div class="header_center">输入验证码</div>
     <div class="header_phone_center">已发送至 {{phone}}</div>
     <div class="write-phonenum">
        
        <div style="display: flex; flex-direction: row; justify-content: center;" @click="chageFocus">
            <div class="dot" v-for="(item, index) in inputValue" :key="index">
                <span v-if="item != -1" >{{item}}</span>
                <view v-if="showCursor == index" class="cursor"></view>
            </div>
        </div>


          <input type="tel" maxlength="6" class="realInput" focus="focusState" bindfocus="focusState"
          v-model="realInput"  v-on:input ="inputFunc" auto-focus="focusState">

      </div>

      <div class="header_center footer_class" v-if="time > 0" >{{time}}s后重新发送</div>
      <div class="header_center footer_class" v-else  @click="sendCode">点击重新发送</div>
</div>



</template>

<script>
  import { BASE_IMAGE_URL,getPhoneCode,bindPhone } from '@/utils/api'
  import toast from 'mpvue-toast'

export default {
    components: {
        toast
    },
    data(){
       return{
        realInput:'',
        phone: '',
        time: 60,
        focusState: true,
        inputValue: [-1,-1,-1,-1,-1,-1],
        toastMsg: "发送成功",
        toastVisible: false,
        showCursor: 0,
       }
    },
    methods:{
        async inputFunc(){
            console.log(this.realInput);
            this.inputValue = [-1,-1,-1,-1,-1,-1];
			if(this.realInput){
                let length = this.realInput.length;
                this.showCursor = length;
                for(let i=0; i<length; i++){
                    this.inputValue[i] = this.realInput[i];
                }

                if(length == 6){
                    var params = {
                        phone: this.phone,
                        code: this.realInput,
                        openid: wx.getStorageSync('openid')
                    }
                    var result = await bindPhone(params);
                    console.log(result.code);
                    if(result.code == 1000){
                        wx.setStorageSync('phone', this.phone);
                        // const url = '../applySuccess/main?getCode=1';
                        // wx.navigateTo({ url });
                        wx.navigateBack({
                            delta: 10
                        })
                    }else{
                        this.toastMsg = result.msg;
                        this.toastVisible = true;
                    }
                    
                }
			}else{
                this.showCursor = -1;
            }
			
        },
        
        sendCode: function(){
            this.time = 60;
            console.log("重新发送");
            //x-www-form-urlencoded
            this.getCode();
        },

        focusState: function(){
            this.focusState = true;
        },

        async getCode(){
            //x-www-form-urlencoded
            var result = await getPhoneCode({phone: this.phone});
            console.log(result);
            if(result.code == 1000){
                this.toastMsg = "发送成功";
                this.toastVisible = true;
            }else{
                this.toastMsg = "发送失败";
                this.toastVisible = true;
            }
        },

        async bindCode(){
            var params = {
                phone: this.phone,
                code: this.realInput,
                openid: wx.getStorageSync('openid')
            }
            var result = await bindPhone(params);
            return result;
        }
    },

    onLoad: function(){
        this.phone = this.$root.$mp.query.phone;
        var that = this;
        setInterval(function(){
            that.time --;
        }, 1000);
        //x-www-form-urlencoded
        this.getCode();
    }
}

</script>

<style scoped>
.dot{
    width:100rpx; 
    height:100rpx; 
    border-top: 2rpx solid #999; 
    border-bottom: 2rpx solid #999;
    border-left: 2rpx solid #999;
    text-align:center;
    line-height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dot:last-child{border-right: 2rpx solid #999;}

.write-phonenum{position: relative;}
.footer_class{font-size: 40rpx!important; color: #CCCDCE}
.header_center{margin: 100rpx auto 10rpx; width: 300rpx; font-size: 50rpx;text-align: center;}
.header_phone_center{margin: 5px auto 40px; width: 200px;text-align: center; color: #727374;}
.phonenum-show{padding:5px;background: #fff;}


.clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
}

.clearfix {
    zoom: 1;
}

/* .realInput{
    height: 0;
    width: 0;
    min-height: 0;
    position: relative;
    left: -100%;
    text-indent: -999em;
} */

.realInput{
    height: 100rpx;
    width: 100%;
    min-height: 0;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.1px;
}

.cursor {
  width: 4rpx;
  height: 50rpx;
  background-color: #000;
  animation: focus 0.7s infinite;
}

@keyframes focus {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>


