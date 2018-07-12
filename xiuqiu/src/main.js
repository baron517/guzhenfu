import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['pages/bindPhone/main',
            'pages/money/main',
            'pages/splash/main',
            'pages/getCode/main',
            'pages/apply/main',
            'pages/applySuccess/main',
            'pages/watchball/main',
            'pages/getBall/main',
            'pages/chooseType/main',
            'pages/openBusiness/main',
            'pages/businessFinish/main',
            'pages/releaseBall/main',
            'pages/chooseCity/main',
            'pages/moneyBall/main',
            'pages/profile/main',
            'pages/home/main',
            'pages/noMoneyBall/main',
            'pages/promiseMoney/main',
            'pages/cropper/main',
            'pages/customUpload/main',
            'pages/platformUpload/main',
            '^pages/releaseBusiness/main',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#DD4B41',
            navigationBarTitleText: '绣球抛抛抛',
            navigationBarTextStyle: '#F9B534',
        },
        tabBar: {
            color: '#A9AAAB',
            selectedColor: '#D93730',
            borderStyle: '#D8D9D9',
            backgroundColor: '#FFFFFF',
            list: [{
                    text: '首页',
                    pagePath: 'pages/home/main',
                    iconPath: 'static/img/home.png',
                    selectedIconPath: 'static/img/home_selected.png'
                },
                {
                    text: '我的',
                    pagePath: 'pages/profile/main',
                    iconPath: 'static/img/wo.png',
                    selectedIconPath: 'static/img/wo_selected.png'
                }
            ]
        }
    }
}