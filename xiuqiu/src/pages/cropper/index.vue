<template>
  <div>
    <mpvue-cropper 
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
      ></mpvue-cropper>
    <div class="cropper-buttons">
      <div
        class="upload"
        @tap="uploadTap">
        选择图片
      </div>
      <div
        class="getCropperImage"
        @tap="getCropperImage">
        上传图片
      </div>
    </div>
  </div>
</template>

<script>
import MpvueCropper from 'mpvue-cropper'

let wecropper

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

export default {
  data () {
    return {
      cropperOpt: {
        id: 'cropper',
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: width/20,
          y: height/20,
          width: width*9/10,
          height: height*8/10
        }
      },
      
      imageSrc: '',
    }
  },

  components: {
    MpvueCropper
  },

  methods: {
    cropperReady (...args) {
      console.log('cropper ready!')
    },
    cropperBeforeImageLoad (...args) {
      console.log('before image load')
    },
    cropperLoad (...args) {
      console.log('image loaded')
    },
    cropperBeforeDraw (...args) {
      // Todo: 绘制水印等等
    },
    uploadTap () {
      let that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const src = res.tempFilePaths[0]
          //  获取裁剪图片资源后，给data添加src属性及其值
          that.imageSrc = src;
          wecropper.pushOrigin(src)
        }
      })
    },
    getCropperImage () {
      let that = this;
      wecropper.getCropperImage()
        .then((src) => {
          console.log(src);
          if(that.imageSrc){
            wx.removeStorageSync("cropImage");
            wx.setStorageSync("cropImage", src);
            //返回上一级页面
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showToast({
                title: '请选择图片',
                icon: 'none',
                duration: 1000
            })
          }
          
          // wx.previewImage({
          //   current: '', // 当前显示图片的http链接
          //   urls: [src] // 需要预览的图片http链接列表
          // })
        })
        .catch(e => {
          console.error('获取图片失败')
        })
    }
  },

  mounted () {
    wecropper = this.$refs.cropper
  },

  onShow: function(){
    let src = this.$root.$mp.query.src;
    console.log("----"+src);
    if(src){
      wecropper.pushOrigin(src)
    }
    
  }
}
</script>

<style>
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
    height: 160rpx;
    line-height: 160rpx;
}

.cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
}

.cropper{
    position: absolute;
    top: 0;
    left: 0;
    height: 1100rpx;
}

.cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
}
</style>