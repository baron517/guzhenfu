// (function($){var win=window;var doc=document;var $win=$(win);var $doc=$(doc);$.fn.dropload=function(options){return new MyDropLoad(this,options)};var MyDropLoad=function(element,options){var me=this;me.$element=element;me.upInsertDOM=false;me.loading=false;me.isLockUp=false;me.isLockDown=false;me.isData=true;me._scrollTop=0;me._threshold=0;me.init(options)};MyDropLoad.prototype.init=function(options){var me=this;me.opts=$.extend(true,{},{scrollArea:me.$element,domUp:{domClass:"dropload-up",domRefresh:'<div class="dropload-refresh">↓下拉刷新</div>',domUpdate:'<div class="dropload-update">↑释放更新</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>'},domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">↑上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">暂无数据</div>'},autoLoad:true,distance:50,threshold:"",loadUpFn:"",loadDownFn:""},options);if(me.opts.loadDownFn!=""){me.$element.append('<div class="'+me.opts.domDown.domClass+'">'+me.opts.domDown.domRefresh+"</div>");me.$domDown=$("."+me.opts.domDown.domClass)}if(!!me.$domDown&&me.opts.threshold===""){me._threshold=Math.floor(me.$domDown.height()*1/3)}else{me._threshold=me.opts.threshold}if(me.opts.scrollArea==win){me.$scrollArea=$win;me._scrollContentHeight=$doc.height();me._scrollWindowHeight=doc.documentElement.clientHeight}else{me.$scrollArea=me.opts.scrollArea;me._scrollContentHeight=me.$element[0].scrollHeight;me._scrollWindowHeight=me.$element.height()}fnAutoLoad(me);$win.on("resize",function(){if(me.opts.scrollArea==win){me._scrollWindowHeight=win.innerHeight}else{me._scrollWindowHeight=me.$element.height()}});me.$element.on("touchstart",function(e){if(!me.loading){fnTouches(e);fnTouchstart(e,me)}});me.$element.on("touchmove",function(e){if(!me.loading){fnTouches(e,me);fnTouchmove(e,me)}});me.$element.on("touchend",function(){if(!me.loading){fnTouchend(me)}});me.$scrollArea.on("scroll",function(){me._scrollTop=me.$scrollArea.scrollTop();if(me.opts.loadDownFn!=""&&!me.loading&&!me.isLockDown&&(me._scrollContentHeight-me._threshold)<=(me._scrollWindowHeight+me._scrollTop)){loadDown(me)}})};function fnTouches(e){if(!e.touches){e.touches=e.originalEvent.touches}}function fnTouchstart(e,me){me._startY=e.touches[0].pageY;me.touchScrollTop=me.$scrollArea.scrollTop()}function fnTouchmove(e,me){me._curY=e.touches[0].pageY;me._moveY=me._curY-me._startY;if(me._moveY>0){me.direction="down"}else{if(me._moveY<0){me.direction="up"}}var _absMoveY=Math.abs(me._moveY);if(me.opts.loadUpFn!=""&&me.touchScrollTop<=0&&me.direction=="down"&&!me.isLockUp){e.preventDefault();me.$domUp=$("."+me.opts.domUp.domClass);if(!me.upInsertDOM){me.$element.prepend('<div class="'+me.opts.domUp.domClass+'"></div>');me.upInsertDOM=true}fnTransition(me.$domUp,0);if(_absMoveY<=me.opts.distance){me._offsetY=_absMoveY;me.$domUp.html(me.opts.domUp.domRefresh)}else{if(_absMoveY>me.opts.distance&&_absMoveY<=me.opts.distance*2){me._offsetY=me.opts.distance+(_absMoveY-me.opts.distance)*0.5;me.$domUp.html(me.opts.domUp.domUpdate)}else{me._offsetY=me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2}}me.$domUp.css({"height":me._offsetY})}}function fnTouchend(me){var _absMoveY=Math.abs(me._moveY);if(me.opts.loadUpFn!=""&&me.touchScrollTop<=0&&me.direction=="down"&&!me.isLockUp){fnTransition(me.$domUp,300);if(_absMoveY>me.opts.distance){me.$domUp.css({"height":me.$domUp.children().height()});me.$domUp.html(me.opts.domUp.domLoad);me.loading=true;me.opts.loadUpFn(me)}else{me.$domUp.css({"height":"0"}).on("webkitTransitionEnd mozTransitionEnd transitionend",function(){me.upInsertDOM=false;$(this).remove()})}me._moveY=0}}function fnAutoLoad(me){if(me.opts.autoLoad){if((me._scrollContentHeight-me._threshold)<=me._scrollWindowHeight){loadDown(me)}}}function fnRecoverContentHeight(me){if(me.opts.scrollArea==win){me._scrollContentHeight=$doc.height()}else{me._scrollContentHeight=me.$element[0].scrollHeight}}function loadDown(me){me.direction="up";me.$domDown.html(me.opts.domDown.domLoad);me.loading=true;me.opts.loadDownFn(me)}MyDropLoad.prototype.lock=function(direction){var me=this;if(direction===undefined){if(me.direction=="up"){me.isLockDown=true}else{if(me.direction=="down"){me.isLockUp=true}else{me.isLockUp=true;me.isLockDown=true}}}else{if(direction=="up"){me.isLockUp=true}else{if(direction=="down"){me.isLockDown=true;me.direction="up"}}}};MyDropLoad.prototype.unlock=function(){var me=this;me.isLockUp=false;me.isLockDown=false;me.direction="up"};MyDropLoad.prototype.noData=function(flag){var me=this;if(flag===undefined||flag==true){me.isData=false}else{if(flag==false){me.isData=true}}};MyDropLoad.prototype.resetload=function(){var me=this;if(me.direction=="down"&&me.upInsertDOM){me.$domUp.css({"height":"0"}).on("webkitTransitionEnd mozTransitionEnd transitionend",function(){me.loading=false;me.upInsertDOM=false;$(this).remove();fnRecoverContentHeight(me)})}else{if(me.direction=="up"){me.loading=false;if(me.isData){me.$domDown.html(me.opts.domDown.domRefresh);fnRecoverContentHeight(me);fnAutoLoad(me)}else{me.$domDown.html(me.opts.domDown.domNoData)}}}};function fnTransition(dom,num){dom.css({"-webkit-transition":"all "+num+"ms","transition":"all "+num+"ms"})}})(window.Zepto||window.jQuery);
/*封面*/
//$(function(){$("#course_ajax ul").find("li").on("click",function(){$(this).addClass("current").siblings().removeClass("current");$(".xx_wap_course").empty();var id=parseInt($(this).find("a").attr("id"));$(".but_hyh").attr("type",id);$(".but_hyh").attr("data-page",0);$.courseApp.get_course();dropload.unlock();dropload.noData(false);dropload.resetload()});$("#index_ajex ul").find("li").on("click",function(){$(this).addClass("current").siblings().removeClass("current");$(".xx_wap_course").empty();var id=parseInt($(this).find("a").attr("id"));$(".but_hyh").attr("type",id);$(".but_hyh").attr("bid",id);$(".but_hyh").attr("data-page",0);$.courseApp.get_course();dropload.unlock();dropload.noData(false);dropload.resetload()});var dropload=$(".in_bot_tab").dropload({scrollArea:window,domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData"><a id="search" href="https://search.m.xialingying.cc/list">点击查看更多课程</a></div>'},threshold:"1000",loadDownFn:function(me){setTimeout(function(){var page=parseInt($(".but_hyh").attr("data-page")),type=parseInt($(".but_hyh").attr("type")),bid=parseInt($(".but_hyh").attr("bid")),jx=parseInt($(".but_hyh").attr("jingxuan")),model=parseInt($(".but_hyh").attr("model"));var search;if(!page||!model){return}$.ajax({type:"get",url:"/gateway/wap_gate/index.php?model="+model+"&page="+page+"&type="+type+"&bid="+bid+"&jingxuan="+jx,dataType:"json",cache:false,async:false,success:function(data){var text=data.data;search=data.search;if(text.length!=0){var t=0;var html="";$.each(text,function(n,value){html+='<li class="brand-item"><a href="'+value.course_path+'"><div class="bot_img"><img src="'+value.course_cover+'"><span class="sp_01">'+value.course_day+" 丨 "+value.start_place+'出发</span><div class="bot_img_d"><span class="bot_o1">'+value.course_price+'</span><span class="bot_o2">预约报名'+value.baoming_num+'人</span></div></div><div class="bot_con"><h3>'+value.s_name+" | "+value.name+"</h3><span>"+value.course_jianjie+'</span><div class="bot_a">'+value.course_zt+'<div class="clear"></div></div></div></a></li>';t++});$(".xx_wap_course").append(html);me.resetload();page++}else{me.lock();me.noData();me.resetload();$("#search").attr("href",search.path);return}},error:function(xhr,type){me.lock();me.noData();me.isData=false;me.resetload();return false}});$(".but_hyh").attr("data-page",page)},300)}})});(function($){$.extend({courseApp:{get_course:function(){var page=parseInt($(".but_hyh").attr("data-page")),type=parseInt($(".but_hyh").attr("type")),bid=parseInt($(".but_hyh").attr("bid")),jx=parseInt($(".but_hyh").attr("jingxuan")),model=parseInt($(".but_hyh").attr("model"));$.ajax({url:"/gateway/wap_gate/index.php?model="+model+"&page="+page+"&type="+type+"&bid="+bid+"&jingxuan="+jx,type:"get",dataType:"json",success:function(data){var text=data.data;search=data.search;if(text.length!=0){var t=0;var html="";$.each(text,function(n,value){html+='<li class="brand-item"><a href="'+value.course_path+'"><div class="bot_img"><img src="'+value.course_cover+'"><span class="sp_01">'+value.course_day+" 丨 "+value.start_place+'出发</span><div class="bot_img_d"><span class="bot_o1">'+value.course_price+'</span><span class="bot_o2">预约报名'+value.baoming_num+'人</span></div></div><div class="bot_con"><h3>'+value.s_name+" | "+value.name+"</h3><span>"+value.course_jianjie+'</span><div class="bot_a">'+value.course_zt+'<div class="clear"></div></div></div></a></li>';t++});$(".xx_wap_course").append(html);page++;$(".but_hyh").attr("data-page",page)}else{$("#search").attr("href",search.path);return}}})},}})})(jQuery);
/*搜索ajax*/
//$(function(){if($("#yk-ss-list-screen").length<=0){return}$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});function a(){$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});$(".filter-more-switch").on("click",function(){$(this).parent(".filter-title").next(".filter-sub-ul").toggleClass("on");if(pageConfig.screen){scrollSwiper01.update()}$(this).next($(".filter-more")).toggleClass("filter-more-up")})}function f(e){var t=$("#yk-ss-list-screen");if(e.hasClass("hj_wc")){return}var n=e.attr("data-href"),r=$("#J-course-navbar-filter-wrap-loader");r.removeClass("g-hidden"),$.ajax({url:n,type:"get",dataType:"json",success:function(e){r.addClass("g-hidden"),t.html(e.page),$(".filter-confirm").find("a").attr("href",e.url),$(".filter-confirm").find("sub").html("全部"+e.num+"条线路"),a();if($(".li-time").length>0){$(".li-time").find("a").attr("data-href",e.url)}if(pageConfig.screen){scrollSwiper01.update();scrollSwiper01.slideTo(0,500,false)}}})}});$(function(){if($(".ss_con_ul").length>0){var dropload=$(".ss_con_ul").dropload({scrollArea:window,domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">我是有底线的~</div>'},loadDownFn:function(me){setTimeout(function(){var total=$("#pageform").find("input[name=total]").val();if(total<18){$("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload();return}$.ajax({type:"post",url:"/list/_gate",data:$("#pageform").serialize(),dataType:"json",success:function(e){var t=e.course;t?($("#jxhdLbUl").append(t),$("#pageform").find("input[name=pn]").val(parseInt($("#pageform").find("input[name=pn]").val())+1),me.resetload()):($("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload())},error:function(xhr,type){me.resetload()}})},500)},threshold:1000})}});
//$(function(){if($("#yk-ss-list-screen").length<=0){return}$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});function a(){$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});$(".filter-more-switch").on("click",function(){$(this).parent(".filter-title").next(".filter-sub-ul").toggleClass("on");if(pageConfig.screen){scrollSwiper01.update()}$(this).next($(".filter-more")).toggleClass("filter-more-up")})}function f(e){var t=$("#yk-ss-list-screen");if(e.hasClass("hj_wc")){return}var n=e.attr("data-href"),r=$("#J-course-navbar-filter-wrap-loader");r.removeClass("g-hidden"),$.ajax({url:n,type:"get",dataType:"json",success:function(e){r.addClass("g-hidden"),t.html(e.page),$(".filter-confirm").find("a").attr("href",e.url),$(".filter-confirm").find("sub").html("全部"+e.num+"条线路"),a();if($(".li-time").length>0){$(".li-time").find("a").attr("data-href",e.url)}if(pageConfig.screen){scrollSwiper01.update();scrollSwiper01.slideTo(0,500,false)}}})}});$(function(){if($(".ss_con_ul").length>0){var dropload=$(".ss_con_ul").dropload({scrollArea:window,domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">我是有底线的~</div>'},loadDownFn:function(me){setTimeout(function(){var total=$("#pageform").find("input[name=total]").val();if(total<18){$("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload();return}$.ajax({type:"post",url:"/list/_gate",data:$("#pageform").serialize(),dataType:"json",success:function(e){var t=e.course;t?($("#jxhdLbUl").append(t),$("#pageform").find("input[name=pn]").val(parseInt($("#pageform").find("input[name=pn]").val())+1),me.resetload()):($("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload())},error:function(xhr,type){me.resetload()}})},500)},threshold:1000})}});
//20180410//$(function(){if($("#yk-ss-list-screen").length<=0){return}$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});function a(){$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});$(".filter-more-switch").on("click",function(){$(this).parent(".filter-title").next(".filter-sub-ul").toggleClass("on");if(pageConfig.screen){scrollSwiper01.update()}$(this).next($(".filter-more")).toggleClass("filter-more-up")})}function f(e){var t=$("#yk-ss-list-screen");if(e.hasClass("hj_wc")){return}var n=e.attr("data-href");var r=$("#J-course-navbar-filter-wrap-loader");r.removeClass("g-hidden"),$.ajax({url:n,type:"get",dataType:"json",success:function(e){r.addClass("g-hidden");if(t.hasClass("advanced-time")){t.html(e.advanced)}else{t.html(e.page)}$(".filter-confirm").find("a").attr("href",e.url),$(".filter-confirm").find("sub").html("全部"+e.num+"条线路"),a();if($(".li-time").length>0){$(".li-time").find("a").attr("data-href",e.url)}if(pageConfig.screen){scrollSwiper01.update();scrollSwiper01.slideTo(0,500,false)}}})}});$(function(){if($(".ss_con_ul").length>0){var dropload=$(".ss_con_ul").dropload({scrollArea:window,domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">我是有底线的~</div>'},loadDownFn:function(me){setTimeout(function(){var total=$("#pageform").find("input[name=total]").val();if(total<18){$("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload();return}$.ajax({type:"post",url:"/list/_gate",data:$("#pageform").serialize(),dataType:"json",success:function(e){var t=e.course;t?($("#jxhdLbUl").append(t),$("#pageform").find("input[name=pn]").val(parseInt($("#pageform").find("input[name=pn]").val())+1),me.resetload()):($("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload())},error:function(xhr,type){me.resetload()}})},500)},threshold:1000})}});
//20180410改
// $(function(){if($("#yk-ss-list-screen").length<=0){return}$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});function a(){$("#J-g-navbar-category-wrap2").find("a").unbind("click").bind("click",function(){f($(this))});$(".filter-more-switch").on("click",function(){$(this).parent(".filter-title").next(".filter-sub-ul").toggleClass("on");if(pageConfig.screen){scrollSwiper01.update()}$(this).next($(".filter-more")).toggleClass("filter-more-up")})}function f(e){var t=$("#yk-ss-list-screen");if(e.hasClass("hj_wc")){return}var n=e.attr("data-href");var r=$("#J-course-navbar-filter-wrap-loader");r.removeClass("g-hidden"),$.ajax({url:n,type:"get",dataType:"json",success:function(e){r.addClass("g-hidden");if(t.hasClass("advanced-time")){t.html(e.advanced)}else{t.html(e.page)}$(".filter-confirm").find("a").attr("data-href",e.url),$(".filter-confirm").find("sub").html("全部"+e.num+"条线路"),a();if($(".li-time").length>0){$(".li-time").find("a").attr("data-href",e.url)}if(pageConfig.screen){scrollSwiper01.update();scrollSwiper01.slideTo(0,500,false)}}})}});$(function(){if($(".ss_con_ul").length>0){var dropload=$(".ss_con_ul").dropload({scrollArea:window,domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">我是有底线的~</div>'},loadDownFn:function(me){setTimeout(function(){var total=$("#pageform").find("input[name=total]").val();if(total<18){$("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload();return}$.ajax({type:"post",url:"/list/_gate",data:$("#pageform").serialize(),dataType:"json",success:function(e){var t=e.course;t?($("#jxhdLbUl").append(t),$("#pageform").find("input[name=pn]").val(parseInt($("#pageform").find("input[name=pn]").val())+1),me.resetload()):($("#pageform").hide(),me.resetload(),me.lock(),me.noData(),me.resetload())},error:function(xhr,type){me.resetload()}})},500)},threshold:1000})}});



//加载课程
$(function() {

    $('#course_ajax ul').find('li').on('click', function() {
        $(this).addClass('current').siblings().removeClass('current'); //改版tab样式   
        $(".xx_wap_course").empty();
        var id = parseInt($(this).find('a').attr("id"));
        $(".but_hyh").attr("type", id);
        $(".but_hyh").attr("data-page", 0);
        $.courseApp.get_course();
        dropload.unlock();
        dropload.noData(false);
        // 重置
        dropload.resetload();
    });
    $('#index_ajex ul').find('li').on('click', function() {
        $(this).addClass('current').siblings().removeClass('current'); //改版tab样式   
        $(".xx_wap_course").empty();
        var id = parseInt($(this).find('a').attr("id"));
        $(".but_hyh").attr("type", id);
        $(".but_hyh").attr("bid", id);
        $(".but_hyh").attr("data-page", 0);
        $.courseApp.get_course();
        dropload.unlock();
        dropload.noData(false);

        // 重置
        dropload.resetload();
    });
    // var dropload = $('.in_bot_tab').dropload({
    //     scrollArea: window,
    //     domDown: {
    //         domClass: 'dropload-down',
    //         domRefresh: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
    //         domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
    //         domNoData: '<div class="dropload-noData"><a id="search" href="https://search.m.xialingying.cc/list">点击查看更多课程</a></div>'
    //     },
    //     threshold: '1000',
    //     loadDownFn: function(me) {
    //         setTimeout(function() {
    //             var page = parseInt($(".but_hyh").attr("data-page")),
    //                 type = parseInt($(".but_hyh").attr("type")),
    //                 bid = parseInt($(".but_hyh").attr("bid")),
    //                 jx = parseInt($(".but_hyh").attr("jingxuan")),
    //                 model = parseInt($(".but_hyh").attr("model"));
    //             var search;
    //             if (!page || !model) {
    //                 return;
    //             }
    //             $.ajax({
    //                 type: 'get',
    //                 url: '/gateway/wap_gate/index.php?model=' + model + '&page=' + page + '&type=' + type + '&bid=' + bid + '&jingxuan=' + jx,
    //                 dataType: 'json',
    //                 cache: false,
    //                 async: false,
    //                 success: function(data) {
    //                     var text = data.data;
    //                     search = data.search;
    //                     if (text.length != 0) {
    //                         var t = 0;
    //                         var html = '';
    //                         $.each(text, function(n, value) {
    //                             //html  += '<li class="brand-item"><a href="'+value.course_path+'"><div class="bot_img"><img src="'+value.course_cover+'"><span class="sp_01">'+value.course_day+' 丨 '+value.start_place+'出发</span><div class="bot_img_d"><span class="bot_o1">'+value.course_price+'</span><span class="bot_o2">预约报名'+value.baoming_num+'人</span></div></div><div class="bot_con"><h3>'+value.s_name+' | '+value.name+'</h3><span>'+value.course_jianjie+'</span><div class="bot_a">'+value.course_zt+'<div class="clear"></div></div></div></a></li>';                            
    //                             var em = '';
    //                             //                                    if(value.grade != 0){
    //                             //                                        em = '<s>推荐</s>'
    //                             //                                    }
    //                             html += '<li class="brand-item"><a href="' + value.course_path + '"><h3>[' + value.s_name + ']' + value.name + '</h3><div class="xly-ssc-img"><img src="' + value.course_covers + '" alt="' + value.name + '">' + em + '</div><div class="xly-ssc-r"><p>招生对象：' + value.zstn + '<strong>￥' + value.course_prices + '<s>/' + value.course_day + '</s></strong></p><div class="ssc_san"><span>活动地点：' + value.start_place + '</span> </div><div class="ssc_biaoq">' + value.course_zt + '<div class="clear"></div></div></div></a> </li>';
    //                             t++;
    //                         })
    //                         $(".xx_wap_course").append(html);
    //                         // 每次数据加载完，必须重置
    //                         me.resetload();
    //                         page++;
    //                     } else {
    //                         //                                me.resetload();
    //                         me.lock();
    //                         me.noData();
    //                         me.resetload();
    //                         $('#search').attr('href', search.path);
    //                         return;
    //                     }
    //                 },
    //                 error: function(xhr, type) {
    //                     //                            alert('Ajax error!');
    //                     // 即使加载出错，也得重置
    //                     me.lock();
    //                     me.noData();
    //                     me.isData = false;
    //                     me.resetload();

    //                     return false;
    //                 }
    //             });
    //             $(".but_hyh").attr("data-page", page);
    //         }, 300);
    //     }
    // });
});
(function($) {
    $.extend({
        courseApp: {
            get_course: function() {
                var page = parseInt($(".but_hyh").attr("data-page")),
                    type = parseInt($(".but_hyh").attr("type")),
                    bid = parseInt($(".but_hyh").attr("bid")),
                    jx = parseInt($(".but_hyh").attr("jingxuan")),
                    model = parseInt($(".but_hyh").attr("model"));
                $.ajax({
                    url: '/gateway/wap_gate/index.php?model=' + model + '&page=' + page + '&type=' + type + '&bid=' + bid + '&jingxuan=' + jx,
                    type: "get",
                    dataType: "json",
                    success: function(data) {
                        var text = data.data;
                        search = data.search;
                        if (text.length != 0) {
                            var t = 0;
                            var html = '';
                            $.each(text, function(n, value) {
                                //html  += '<li class="brand-item"><a href="'+value.course_path+'"><div class="bot_img"><img src="'+value.course_cover+'"><span class="sp_01">'+value.course_day+' 丨 '+value.start_place+'出发</span><div class="bot_img_d"><span class="bot_o1">'+value.course_price+'</span><span class="bot_o2">预约报名'+value.baoming_num+'人</span></div></div><div class="bot_con"><h3>'+value.s_name+' | '+value.name+'</h3><span>'+value.course_jianjie+'</span><div class="bot_a">'+value.course_zt+'<div class="clear"></div></div></div></a></li>';                            
                                var em = '';
                                //                                    if(value.grade != 0){
                                //                                        em = '<s>推荐</s>'
                                //                                    }
                                html += '<li class="brand-item"><a href="' + value.course_path + '"><h3>[' + value.s_name + ']' + value.name + '</h3><div class="xly-ssc-img"><img src="' + value.course_covers + '" alt="' + value.name + '">' + em + '</div><div class="xly-ssc-r"><p>招生对象：' + value.zstn + '<strong>￥' + value.course_prices + '<s>/' + value.course_day + '</s></strong></p><div class="ssc_san"><span>活动地点：' + value.start_place + '</span> </div><div class="ssc_biaoq">' + value.course_zt + '<div class="clear"></div></div></div></a> </li>';
                                t++;
                            })
                            $(".xx_wap_course").append(html);
                            page++;
                            $(".but_hyh").attr("data-page", page);
                        } else {
                            $('#search').attr('href', search.path);
                            return;
                        }
                    }
                });

            },
        }
    });
})(jQuery);