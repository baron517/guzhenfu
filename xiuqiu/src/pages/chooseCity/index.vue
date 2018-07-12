<template>
<div class="wrap">
    
    <div class="head">
        <span @click="cancle" :class="{'active': (allSelected)}" >全国</span>
        <div>选择地区</div>
        <span @click="sure">确定</span>
    </div>

    <div class="selectCityClass" v-if="selectCities.length">{{showSelectCities}}</div>
    <div class="selectCityClass" v-else>暂无数据</div>

    <div class="content">
        <div class="content_item">
            <span v-for="(item, index) in provinces" :key="index" class="content_item_text" :class="{'active': (cityActiveIndex == index)}"
            @click="selectProvinces(item,index)">{{item}}</span>
        </div>

        <div class="cities_item">
            <span v-for="(item, index) in cities" :key="index" class="content_item_text" :class="{'active': (activeIndex == index)}"
                @click="selectCity(item, index)">{{item}}</span>
        </div>

        <div class="cities_item">
            <span v-for="(item, index) in districts" :key="index" class="content_item_text" :class="{'active': (item.active)}"
                @click="selectDistrict(item, index)">{{item.name}}</span>
        </div>
        
    </div>
    
</div>
    
    
</template>

<script>
    import { BASE_IMAGE_URL,getCityJson } from '@/utils/api'

    export default{
        data: {
            cities: [],
            provinces: [],
            resultData: [],
            districts: [],
            districtTmp: [],
            cityActiveIndex: 0,
            activeIndex: 0,
            selectCities: '',
            showSelectCities: '',
            tags: '',
            allSelected: false
        },

        methods: {

           async getCityJsonApi(){
               var result = await getCityJson();
                let that = this;
                that.resultData = result;
                this.provinces = [];
               result.map(function(item){
                   that.provinces.push(item.name);0
               });0

               that.cities = [];
                this.districtTmp = this.resultData[0].city;
                this.resultData[0].city.map(function(item){
                    that.cities.push(item.name);
                })

                that.districts = [];
                this.districtTmp[0].area.map(function(itm){
                    var temp = {
                        name: itm,
                        active: false,
                    }

                    if(that.selectCities.indexOf(itm) >= 0){
                        temp.active = true;
                    }
                    that.districts.push(temp);
                })

               console.log(this.provinces);
           },

           selectProvinces: function(item, index){
               let that = this;
                if(this.showSelectCities == '全国'){
                    wx.showToast({
                        title: '已经选择全国，不可以选择其他城市',
                        icon: 'none',
                        duration: 1000
                    })
                    console.log("直接返回");
                    this.cityActiveIndex = 0;
                    this.cities = [];
                    that.districts = [];
                    return;
                }else{
                    this.cityActiveIndex = index;
                    this.activeIndex = 0;
                    that.cities = [];
                    this.districtTmp = this.resultData[index].city;
                    this.resultData[index].city.map(function(item){
                        that.cities.push(item.name);
                    })

                    that.districts = [];
                    this.districtTmp[0].area.map(function(itm){
                        var temp = {
                            name: itm,
                            active: false,
                        }

                        if(that.selectCities.indexOf(itm) >= 0){
                            temp.active = true;
                        }
                        that.districts.push(temp);
                    })
                    console.log(this.districts);
                }

                
           },

           selectCity: function(item, index){
               let that = this;
                this.activeIndex = index;
                that.districts = [];
                this.districtTmp[index].area.map(function(itm){
                    var temp = {
                       name: itm,
                       active: false,
                   }

                   if(that.selectCities.indexOf(itm) >= 0){
                       temp.active = true;
                   }

                    that.districts.push(temp);
                })
           },

           selectDistrict: function(item, index){
               if(this.showSelectCities == '全国'){
                    wx.showToast({
                        title: '已经选择全国，不可以选择其他城市',
                        icon: 'none',
                        duration: 1000
                    })
                    console.log("直接返回");
                    return;
                }

               if(this.selectCities.indexOf(item.name) >= 0){
                   this.selectCities=this.selectCities.replace("|"+item.name,"");
                   item.active = false;
               }else{

                   let len = this.showSelectCities.split("|").length;
                    console.log(len);
                    if(len == 8){
                        wx.showToast({
                            title: '最多选择8个',
                            icon: 'none',
                            duration: 1000
                        })
                        return;
                    }

                   this.selectCities += "|"+item.name;
                   item.active = true;
               }

                if(this.selectCities.length > 0){
                    this.showSelectCities = this.selectCities.substring(1, this.selectCities.length);
                }
               
           },

           cancle: function(){
            //    wx.navigateBack({
            //            delta: 1
            //        })

                if(this.showSelectCities == '全国'){
                    this.showSelectCities = this.selectCities = '';
                    this.allSelected = false;
                }else{
                    this.showSelectCities = this.selectCities = '全国';
                    this.allSelected = true;
                }

           },

           sure: function(){
               if(this.showSelectCities.length == 0){
                   wx.showToast({
                        title: '没有选择任何地区',
                        icon: 'none',
                        duration: 1000
                    })
               }else{
                   wx.setStorageSync("selectCity", this.showSelectCities);

                   let url = '../releaseBall/main?tags='+this.tags+"&selectCity="+this.showSelectCities;
                   wx.navigateTo({ url });
               }
           }
        },

        onLoad: function(){
            this.tags = this.$root.$mp.query.tags; 
            this.getCityJsonApi();
        },

        onUnload: function(){

        }
        
    }
</script>

<style >

    .wrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .head{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100rpx;
        background: #fff;
        width: 90%;
        margin: auto 5%;
    }

    .content{
        display: flex;
        flex-direction: row;
        border-top: #ddd 1rpx solid;
    }

    .content_item{
        display: flex;
        flex: 1;
        flex-direction: column;
        background: #f2f2f2;
        color: #000;
    }

    .content_item_text{
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        border-bottom: 1rpx solid #ddd;
        max-width: 250rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; /*超出部分用...代替*/
    }

    .cities_item{
        display: flex;
        flex: 1;
        flex-direction: column;
        background: #fff;
        color: #000;
        border-right: #ddd 1rpx solid;
    }

    .active{
        color: #DD4B41;
        background: #fff;
    }

    .selectCityClass{
        width: 100%;
        background: #ddd;
        padding: 20rpx;
        text-align: center;
    }

</style>

