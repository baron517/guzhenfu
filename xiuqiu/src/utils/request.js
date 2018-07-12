var Fly = require("flyio/dist/npm/wx")
var request = new Fly();

request.config.timeout = 10 * 1000
request.config.baseURL = 'https://game.junjunit.cn'

request.isShowLoading = true;

request.interceptors.request.use((request) => {
    if (request.isShowLoading) {
        wx.showLoading({ title: '拼命加载中...' })
    }

    return request
})

request.interceptors.response.use(
    (response, promise) => {
        wx.hideLoading();
        request.isShowLoading = true;
        return promise.resolve(response.data)

    },
    (err, promise) => {
        wx.hideLoading();
        request.isShowLoading = true;
        wx.showToast({
            title: err.message,
            icon: 'none'
        })
        return promise.reject()
    }
)

export default request