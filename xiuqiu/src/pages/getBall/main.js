import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '已接',
        enablePullDownRefresh: true,
        backgroundTextStyle: "dark", //下拉背景字体、loading 图的样式，仅支持 dark/light，默认light不可见
        onReachBottomDistance: 50, //页面上拉触底事件触发时距页面底部距离，单位为px

    }
}