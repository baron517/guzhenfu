<template>
  <div>
	  <div class="head_wrap">
		  <span style="font-size: 70rpx;">1.68</span>
		  <div style="font-size: 30rpx; color: #97989A; margin: 10rpx auto 20rpx">账户余额 &nbsp; (元)</div>
		  <button class="get_money_btn">提现</button>
	  </div>

	  <div class="item_wrap">
		<div class="left_wrap">
			<img :src="baozhengjin" >
			<span>保证金</span>
		</div>
		<span>50元</span>
	</div>
	<hr>

	<div class="item_wrap">
		<div class="left_wrap">
			<img :src="pay_wangyin" >
			<span>网银支付</span>
		</div>
		<img :src="right">
	</div>

	<hr>

	<div class="item_wrap">
		<div class="left_wrap">
			<img :src="pay_weichat" >
			<span>微信支付</span>
		</div>
		<img :src="right">
	</div>

	<hr>

  </div>
</template>

<script>
import { BASE_IMAGE_URL } from '@/utils/api'

export default {
  data: {
	  right: BASE_IMAGE_URL+'right.png',
	  pay_weichat: BASE_IMAGE_URL+'pay_weichat.png',
	  pay_wangyin: BASE_IMAGE_URL+'pay_wangyin.png',
	  baozhengjin: BASE_IMAGE_URL+'baozhengjin.png',
  }
}
</script>

<style scoped>
	.head_wrap{
		width: 100%;
		height: 560rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.get_money_btn{
		width: 80%;
		background: #D7542F;
		color: #fff;
		border-radius: 40rpx;
	}


	.item_wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 120rpx;
		margin: auto 40rpx;
    }

    .item_wrap img{
        width: 80rpx;
        height: 80rpx;
    }

    .left_wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    hr{
        width: 85%; 
        margin-left: 15%; 
        border-bottom: 0.5px solid #b1b2b3;
        opacity: 0.2;
    }

</style>
