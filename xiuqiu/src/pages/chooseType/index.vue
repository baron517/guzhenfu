<template>
<div>
  <toast :message=toastMsg :visible.sync="toastVisible"></toast>

  <div class="wrap">
    <div class="item_wrap" v-for="(item, index) in listData" @click="selectStyle(item, $index) "
      :key="index" :class="{'active':item.active,'unactive':!item.active}">
      <span>{{item.t_name}}</span>
    </div>
  </div>
  <button @click="geToNext">确定</button>
</div>
  
  
</template>

<script>
import toast from 'mpvue-toast'
import { getTagList,hasHongbao } from '@/utils/api'

export default {
	data: {
    listData : [],
    page: 1,
    tags: "",
    toastMsg: "请选择类别",
    toastVisible: false,
    type: 0,
  },
  components: {
    toast
  },
  methods: {
    selectStyle: function(item, index){
      let that = this;
      this.listData.map(function(cur, i){
        cur.active = false;
      })
      item.active = true;

    },
    async geToNext(){
      let that = this;
      that.tags = "";
      this.listData.map(function(item, index){
        if(item.active){
          that.tags=item.t_name;
        }
      })

      if(this.tags && this.tags.length > 0){
        if(this.type == 1){
          //发布绣球
          // let url = '../releaseBall/main?tags='+this.tags;
          let url = '../chooseCity/main?tags='+this.tags;
          wx.navigateTo({ url });
        }else{
          var result = await hasHongbao(this.tags, wx.getStorageSync("location"));
          console.log(this.tags+"----"+wx.getStorageSync("location")+"----"+result.code);
          if(result.code == 1000){
            let url = '../moneyBall/main?tags='+this.tags;
            wx.navigateTo({ url });
          }else{
            let url = '../noMoneyBall/main';
            wx.navigateTo({ url });
          }
        }
        
        
      }else{
        this.toastVisible = true;
      }
      
    },

    async getTagData(){
      var that = this;
      var result = await getTagList(this.page);
      if(result.length > 0){
        if(this.page == 1){
          this.listData = [];
        }
        result.map(function(item, index){
          item.active = false;
          that.listData.push(item);
        })
        console.log(this.listData);
      }
    }
  },

  onLoad(){
    //1 发布绣球 其他 接绣球
    this.type = this.$root.$mp.query.type;
    
    this.getTagData();
  }
}
  
</script>

<style>


page{
  background: #DB483A;
}

.wrap{
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-around;
  margin: 120rpx 40rpx;
  border: 2rpx solid #F8A324;
  border-radius: 20rpx;
  background: #fff;
  padding: 20rpx 20rpx 400rpx;
  height: 400rpx;
}

.wrap .item_wrap{
	width: 28%;
	height: 70rpx;
	border: 2rpx solid #DB483A;
	border-radius: 30rpx;
  margin: 10rpx;
  text-align: center;
  line-height: 70rpx;
}

.unactive{
  color: #FFB5B5;
  background: #fff;
}

.active{
  color: #fff;
  background: #DB483A;
}

button{
  position: absolute;
  top: 760rpx;
  width: 80%;
  margin-left: 10%;
  border: 2rpx solid #DB483A;
	border-radius: 60rpx;
  color: #fff;
  background: #DB483A;
}


</style>
