import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '开张类',
        backgroundColor: '#ff0000'
    }
}