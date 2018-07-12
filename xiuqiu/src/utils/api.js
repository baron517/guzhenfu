import request from './request'
var qs = require('qs');

export const BASE_IMAGE_URL = 'https://game.junjunit.cn/images/';

export function getBoardData(page = 1, limit = 20) {
    console.log("start");
    let params = {}
    return request.get('?page=' + page + '&limit=' + limit, params)
}

/**
 * 选择标签
 */
export function getTagList() {
    return request.get('index.php?g=Api&m=CommonApi&a=getTagList');
}

/**
 * 获取验证码
 */
export function getPhoneCode(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=sendCode', qs.stringify(params));
}

/**
 * 绑定手机
 */
export function bindPhone(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=bindPost', qs.stringify(params));
}

/**
 * 绑定用户
 */
export function bindUser(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=userInfoSave', qs.stringify(params));
}

/**
 * 获取openid
 */
export function getOpenid(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=getUserInfo', qs.stringify(params));
}


/**
 * 打折文案
 */
export function getConfig() {
    return request.get('index.php?g=Api&m=CommonApi&a=getConfig');
}

/**
 * 提交审核
 */
export function shenHe(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=shenhe', qs.stringify(params));
}

/**
 * 获取审核状态
 */
export function getShenhe(openid) {
    return request.get('index.php?g=Api&m=CommonApi&a=getShenhe&openid=' + openid);
}

/**
 * 模板提交审核
 */
export function uploadKaiyeMuban(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=uploadKaiyeMuban', qs.stringify(params));
}

/**
 * 领取红包
 */
export function lingquhongbao(params) {
    request.isShowLoading = false;
    return request.post('index.php?g=Api&m=CommonApi&a=lingquhongbao', qs.stringify(params));
}

/**
 * 发绣球
 */
export function faxiuqiu(openid, types, mb_location) {
    request.isShowLoading = false;
    return request.get('index.php?g=Api&m=CommonApi&a=faxiuqiu&openid=' + openid + "&tags=" + types + "&mb_location=" + mb_location);
}

/**
 * 是否有红包
 */
export function hasHongbao(types, mb_location) {
    return request.get('index.php?g=Api&m=CommonApi&a=hasHongbao&tags=' + types + "&mb_location=" + mb_location);
}

/**
 * 获取模板列表
 */
export function getMuban(openid, page_index) {
    return request.get('index.php?g=Api&m=CommonApi&a=getMuban&openid=' + openid + '&page_size=10&page_index=' + page_index);
}

/**
 * 领取广告列表
 */
export function getAdXiuqiu(mb_id, page_index) {
    return request.get('index.php?g=Api&m=CommonApi&a=getAdXiuqiu&mb_id=' + mb_id + '&page_size=10&page_index=' + page_index);
}

/**
 * 是否绑定手机号
 */
export function getUser(openid) {
    return request.get('index.php?g=Api&m=CommonApi&a=getUser&openid=' + openid);
}

/**
 * 得到城市列表
 */
export function getCityJson() {
    return request.get(BASE_IMAGE_URL+'city.json');
}