<template>
  <div class="wrap">
	  <toast :message=toastMsg :visible.sync="toastVisible"></toast>
    <div class="header_wrap">
      <div class="item_wrap" @click="chooseImage(0)">
        <img  :src="licencePic">
        <span>提交营业执照照片</span>
      </div>

      <div class="item_wrap" @click="chooseImage(1)">
        <img :src="certificatePic">
        <span>提交法人身份证照片</span>
      </div>

    </div>
    <div style="margin-top: 100rpx; text-align: left; margin-left: 10%;">
      <input type="radio" :checked="radioChecked" @click="agreeClick"/>
        <span style="color: #858585">同意广告协议，</span>
        <span style="text-decoration:underline; color:#4f4F4F">查看协议</span>  
    </div>
    
    <button class="submit" @click="submitSuccess">提交</button>
  </div>
</template>

<script>
import toast from 'mpvue-toast'
import { BASE_IMAGE_URL,shenHe,uploadFile } from '@/utils/api'

export default {
  data: {
    radioChecked: false,
	licencePic: BASE_IMAGE_URL+'add_pic.png',
	certificatePic: BASE_IMAGE_URL+'add_pic.png',
	toastMsg: "toastMsg",
	toastVisible: false,
  },
  components: {
    toast
  },
  methods: {
    async submitSuccess(){
		if(!this.radioChecked){
			this.toastMsg = '未同意广告协议';
			this.toastVisible = true;
			return;
		}

		if(this.licencePic.indexOf("add_pic.png") != -1){
			this.toastMsg = '请上传营业执照';
			this.toastVisible = true;
			return;
		}

		if(this.certificatePic.indexOf("add_pic.png") != -1){
			this.toastMsg = '请上传法人身份证';
			this.toastVisible = true;
			return;
    }

    var params = {
      s_shenfenzheng: this.certificatePic,
      s_zhizhao: this.licencePic,
      s_openid : wx.getStorageSync('openid')
    }

    var result = await shenHe(params);
    console.log(result);
    if(result.code == 1000){
      const url = '../applySuccess/main'
      wx.navigateTo({ url });
    }
      
    },
    agreeClick : function(){
      this.radioChecked = !this.radioChecked;
    },
     chooseImage: function(index){
		 	var that = this;
			wx.chooseImage({
				count: 1, // 默认9  
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
					console.log(res.tempFilePaths[0]);
					

          wx.uploadFile({
            url: 'https://game.junjunit.cn/index.php?g=Api&m=CommonApi&a=uploadFile',
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {"Content-Type":"multipart/form-data"},
            formData: {},
            success: function(data){
              console.log(JSON.parse(data.data).data.url);
              
              that.toastMsg = '上传成功';
              that.toastVisible = true;
              var url = 'https://game.junjunit.cn/'+JSON.parse(data.data).data.url;
              if(index == 0){
                that.licencePic = url;
              }else{
                that.certificatePic = url;
              }
            }
          })
				}
			})
     },


  }
}
  
</script>

<style>
.wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 20rpx;
  padding: 40rpx;
  color: #c7c8c9;
}

page{
  background: #fff;
}

.header_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 400rpx;
}

.item_wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
}

.item_wrap img{
  width: 180rpx;
  height: 180rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}

.submit{
  width: 90%;
  background: #f00;
  color: #fff;
  border-radius: 80rpx;
  margin-top: 40rpx;
}


</style>
