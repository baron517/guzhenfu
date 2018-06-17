/**
 * Created by win7 on 2018/1/09.
 * name：jxt
 */
//alert($('.pull-nav_con_t').height());
//2018.03.05搜索框
//$(function() {
//    $("#inp_search").on("input", ".input", function () {
//        var searchVal = $(this).val();
//        if (searchVal == "") {
//            $(this).siblings(".sousuo_button").val("取消").css({
//                "background-color": "#FFF",
//                "color": "#333",
//                "border": "1px solid #e4e4e4"
//            });
//            $(this).siblings("#clearTxt").css({"display": "none"});
//        } else {
//            $(this).siblings(".sousuo_button").val("搜索").css({
//                "background-color": "#db332f",
//                "color": "#FFF",
//                "border": "1px solid #db332f"
//            });
//            $(this).siblings("#clearTxt").css({"display": "block"});
//        }
//    });
//    $("#clearTxt").click(function () {
//        $(this).css({"display": "none"});
//        $("#keyword").val("");
//        $(".sousuo_button").val("取消").css({"background-color": "#FFF", "color": "#333", "border": "1px solid #e4e4e4"});
//    });
//
//});
//2018.02.27天添加
//手机版日历开始

$(function(){
    $('#firstSelect').on('click',function () {
        $('.mask_calendar').show();
        initCalendarL();
//        var endDate = $('#endDate').val();
//        var NumDate = $('.NumDate').text();
    });
    $('.mask_calendar').on('click',function (e) {
        if(e.target.className == "mask_calendar"){
            $('.calendar').slideUp(200);
            $('.mask_calendar').fadeOut(200);
        }

    });
    if($("#firstSelect").length>0)
    $('#firstSelect').calendarSwitch({
        selectors : {
            sections : ".calendar"
        },
        index :13,      //展示的月份个数
        animateFunction : "slideToggle",        //动画效果
        controlDay:true,//知否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
        daysnumber : "365",     //控制天数
        comeColor : "#a2ca0e",       //开始颜色
        outColor : "#a2ca0e",      //结束颜色
        comeoutColor : "#f1f8d9",        //开始和结束之间的颜色
        callback :function(){//回调函数

            $('.mask_calendar').fadeOut(200);
//            var startDate = $('#startDate').val();  //开始的天数
//            var endDate = $('#endDate').val();      //结束的天数
//            var NumDate = $('.NumDate').text();    //共多少晚
//            console.log(startDate);
//            console.log(endDate);
//            console.log(NumDate);
            //下面做ajax请求
            //show_loading();
            /*$.post("demo.php",{startDate:startDate, endDate:endDate, NumDate:NumDate},function(data){
             if(data.result==1){
             //成功
             } else {
             //失败
             }
             });*/
        }  ,
        comfireBtn:'.comfire'//确定按钮的class或者id

    });
//    var b=new Date();
//    var ye=b.getFullYear();
//    var mo=b.getMonth()+1;
//    mo = mo<10?"0"+mo:mo;
//    var da=b.getDate();
//    da = da<10?"0"+da:da;
//    $('#startDate').val('2018-03-22');
//    b=new Date(b.getTime()+24*3600*1000);
//    var ye=b.getFullYear();
//    var mo=b.getMonth()+1;
//    mo = mo<10?"0"+mo:mo;
//    var da=b.getDate();
//    da = da<10?"0"+da:da;
//    $('#endDate').val(ye+'-'+mo+'-'+da);


            function initCalendarL(){
			var startDate = $("#startDate").val();
			var startYear = startDate.split("-")[0];
			var startMonth = startDate.split("-")[1];
			var startDay = startDate.split("-")[2];
			var endDate = $("#endDate").val();
			var endYear = endDate.split("-")[0];
			var endMonth = endDate.split("-")[1];
			var endDay = endDate.split("-")[2];
			$.each($(".calendar").find("p.ny1"), function(i,con) {
				var CalendarYM = $(con).text();
				if(CalendarYM.indexOf(startMonth) != -1 && CalendarYM.indexOf(startYear) != -1){//开始日期
					var tds = $(con).next().find("td");
					$.each(tds,function(j,con1){
						if(parseInt($(con1).text()) == parseInt(startDay)){
							$(con1).trigger("click");
						}
					});
					var scrollTop = $(".calendar").find("p.ny1").eq(i)[0].offsetTop - 100;
					$(".calendar").scrollTop(scrollTop)
				}
				if(CalendarYM.indexOf(endMonth) != -1 && CalendarYM.indexOf(startYear) != -1){//结束日期
					var tds = $(con).next().find("td");
					$.each(tds,function(j,con1){
						if(parseInt($(con1).text()) == parseInt(endDay)){
							$(con1).trigger("click");
						}
					})
				}
			});
		}
});
//手机版日历结束

$(function() {
//移动端日历
//    var calendar = new lCalendar();
//    calendar.init({
//        'trigger': '.demo1',
//        'type': 'date'
//    });
//    var calendar = new lCalendar();
//    calendar.init({
//        'trigger': '.demo',
//        'type': 'date'
//    });

//搜索条，清除历史记录.0205
    if($(".colligate-history").length) {
        $(".pingchu").click(function () {
            $(this).parents(".colligate-history").css({'display': 'none'});
        });
    }
});


$(function() {
    $(".xly-ss-t-ul li").click(function(){

        $(".he_an_niu").removeClass("on");
        $(".he_an_niu").next(".he_an_con").removeClass("on");
        $(".he_an_niu").nextAll(".he_an_con_bj").removeClass("on");

        if(!$(this).find(".se_main1_t1_a").hasClass("xs_ccf")){
            var $nacCurr = $(".xly-ss-t-ul li.curr");
            var index = $nacCurr.index();
            var $thisCont = $(".ssCont").find(".ss_c_lia").eq(index);
            if($thisCont.find(".ss_pull-nav_con_t").length > 0){
                var thisHeight = $thisCont.find(".ss_pull-nav_con_t")[0].clientHeight;
            }
            $thisCont.animate({"top":-thisHeight+"px"},500);
            $("body").removeClass("filter-shown");
            $("#ss_mark").hide();
            isHtmlScroll(true);
            $(this).toggleClass("curr").siblings().removeClass("curr");
            return
        }

        if ($(".xly-ss-t-ul").length > 0) {
            $(this).toggleClass("curr").siblings().removeClass("curr");
        }

        if($(".he_xly-bj").length > 0){
            var index = $(this).index();
            var $thisCont = $(".ssCont").find(".ss_c_lia").eq(index);
            if($thisCont.find(".ss_pull-nav_con_t").length > 0){
                var thisHeight = $thisCont.find(".ss_pull-nav_con_t")[0].clientHeight;
            }
            if($(this).hasClass("curr")){
                $("#ss_mark").show();
                $("body").addClass("filter-shown");
                $thisCont.css({"top":-thisHeight}).show().animate({"top":"85px"},500);
                $thisCont.siblings().css({"top":"-9999px"})
                isHtmlScroll(false);
            }else{
                $("#ss_mark").hide();
                $("body").removeClass("filter-shown");
                $thisCont.animate({"top":-thisHeight+"px"},500);
                isHtmlScroll(true);
            }

        }
    });
    $(".ss_mark").on("click", function () {
        isHtmlScroll(true);
        var $nacCurr = $(".xly-ss-t-ul li.curr");
        var index = $nacCurr.index();
        var $thisCont = $(".ssCont").find(".ss_c_lia").eq(index);
        if($thisCont.find(".ss_pull-nav_con_t").length > 0){
            var thisHeight = $thisCont.find(".ss_pull-nav_con_t")[0].clientHeight;
        }
        $thisCont.animate({"top":-thisHeight+"px"},500);
        $("body").removeClass("filter-shown");
        $("#ss_mark").hide();
        $nacCurr.removeClass("curr")
    });
    $(".ssCont").on("click",".filter-sub-ul>li",function(){//点击筛选分类将当前选项高亮文字移入箭头处
        //console.log(this);
        $(this).addClass("selected").siblings().removeClass("selected");
        var selectedTxt = $(this).find("span").text();
        if(selectedTxt =="不限"){
            selectedTxt = "";
        }
        $(this).parents(".filter-sub-ul").parent().find(".filter-title i").text(selectedTxt);
        if($(this).parents("li").find(".datePanel").length > 0){
            $(this).parents("li").find(".datePanel input").val("")
        }
        if($(this).parents(".scroll01").length > 0){
            $(this).parents(".swiper-wrapper").css({"transform":"translate3d(0px, "+(-$(this).parents(".item")[0].offsetTop)+"px, 0px)"});//滑动到当前分类高度
        }
    });
    $(".ssCont").on("click",".ss_paixu01 li",function(){//点击筛选分类将当前选项高亮文字移入箭头处
        var thisTxt = $(this).text();
        var $nacCurr = $(".xly-ss-t-ul li.curr");
        $nacCurr.find(".se_main1_t1_a").html("<div class = 'lix_d'><s>"+thisTxt+"<b></b></s></div>");
        var index = $nacCurr.index();
        var $thisCont = $(".ssCont").find(".ss_c_lia").eq(index);
        if($thisCont.find(".ss_pull-nav_con_t").length > 0){
            var thisHeight = $thisCont.find(".ss_pull-nav_con_t")[0].clientHeight;
        }
        $thisCont.animate({"top":-thisHeight+"px"},500);
        $("body").removeClass("filter-shown");
        $("#ss_mark").hide();
        isHtmlScroll(true);
        $nacCurr.removeClass("curr");

        if(!$(this).hasClass("selected")){
            $nacCurr.addClass("selected");//给当前总分类加高亮class
        }else{
            $nacCurr.removeClass("selected");//点击默认分类去掉当前总分类加高亮class
        }
    }); 
    $(".ssCont").on("click",".filter-reset",function(){//点击分类重置按钮

        var yixuanfenlei = $(this).parents(".filter-panel").find(".filter-ul li .filter-title i");
        for(var i = 0; i< yixuanfenlei.length; i++){
            $(yixuanfenlei[i]).text("");
        }
        var lis = $(".filter-ul").find("li");

        for(var j =0; j<lis.length;j++){
            $(lis[j]).find(".filter-sub-ul li").removeClass("selected").eq(0).addClass("selected");
        }

        $(".filter-ul").find(".datePanel input").val("")

    });
    $(".ssCont").on("click",".filter-confirm",function(){//点击分类确认按钮
        var $nacCurr = $(".xly-ss-t-ul li.curr");
        var yixuanparent = $(this).parents(".filter-panel");
        var yixuanfenlei = $(this).parents(".filter-panel").find(".filter-ul li .filter-title i");
        var index = $nacCurr.index();
        var $thisCont = $(".ssCont").find(".ss_c_lia").eq(index);
        if($thisCont.find(".ss_pull-nav_con_t").length > 0){
            var thisHeight = $thisCont.find(".ss_pull-nav_con_t")[0].clientHeight;
        }
        $thisCont.animate({"top":-thisHeight+"px"},500);
        $("body").removeClass("filter-shown");
        $("#ss_mark").hide();
        isHtmlScroll(true);
        for(var i = 0; i< yixuanfenlei.length; i++){
            if($(yixuanfenlei[i]).text() != "" || yixuanparent.find(".demo1").val() != "" || yixuanparent.find(".demo").val() != ""){
                $nacCurr.addClass("selected");//已选中分类增加高亮
                $nacCurr.removeClass("curr");
                return
            }else{
                $nacCurr.removeClass("selected");
                $nacCurr.removeClass("curr");
            }
        }

    });
//    $(".filter-more").on("click",function(){
//        $(this).parent(".filter-title").next(".filter-sub-ul").toggleClass("on");
//        $(this).toggleClass("filter-more-up");
//        scrollSwiper01.update();
//        //scrollSwiper02.update();
//    });
    $(".filter-more-switch").on("click",function(){
        $(this).parent(".filter-title").next(".filter-sub-ul").toggleClass("on");
        if(pageConfig.screen){
            scrollSwiper01.update();
            //scrollSwiper02.update();
        }
        $(this).next($(".filter-more")).toggleClass("filter-more-up");            
    });


//    $(".demo1").on("input",function(e){
//        e.preventDefault()
//        $(this).blur()
//
//        var nowDate = new Date();
//        var selectDate = new Date($(this).val());
//        nowDateDay = nowDate - nowDate.getHours()*60*60*1000 -nowDate.getMinutes()*60*1000 -nowDate.getSeconds()*1000;
//        selectDateDay = selectDate - selectDate.getHours()*60*60*1000 -selectDate.getMinutes()*60*1000 -selectDate.getSeconds()*1000;
//        if(parseInt(selectDateDay/1000) < parseInt(nowDateDay/1000)){//如果选择日期小于当前日期
//            msg("您输入的日期不能小于当前日期")
//            $(this).val("");
//            return
//        }else if(new Date($(".demo1").val()) > new Date($(".demo").val())){
//            msg("开始日期不能大于结束日期")
//            $(this).val("");
//            return
//        }
//
//        $(this).parents("li").find(".filter-sub-ul li").eq(0).addClass("selected").siblings().removeClass("selected");
//        if($(".demo").val() == ""){
//            $(this).parents("li").find(".filter-title i").html($(this).val()+"~不限")
//        }else{
//            $(this).parents("li").find(".filter-title i").html($(this).val()+"~"+$(".demo").val())
//        }
//    })
//    $(".demo").on("input",function(e){
//        e.preventDefault()
//        $(this).blur()
//        var nowDate = new Date();
//        var selectDate = new Date($(this).val());
//        nowDateDay = nowDate - nowDate.getHours()*60*60*1000 -nowDate.getMinutes()*60*1000 -nowDate.getSeconds()*1000;
//        selectDateDay = selectDate - selectDate.getHours()*60*60*1000 -selectDate.getMinutes()*60*1000 -selectDate.getSeconds()*1000;
//        if(parseInt(selectDateDay/1000) < parseInt(nowDateDay/1000)){//如果选择日期小于当前日期
//            msg("您输入的日期不能小于当前日期")
//            $(this).val("");
//            return
//        }else if(new Date($(".demo1").val()) > new Date($(".demo").val())){
//            msg("结束日期不能小于开始日期")
//            $(this).val("");
//            return
//        }
//        $(this).parents("li").find(".filter-sub-ul li").eq(0).addClass("selected").siblings().removeClass("selected");
//        if($(".demo1").val() == ""){
//            $(this).parents("li").find(".filter-title i").html("不限~"+$(this).val())
//        }else{
//            $(this).parents("li").find(".filter-title i").html($(".demo1").val()+"~"+$(this).val())
//        }
//    })

});
//0131滑动bug解决办法
var scrollSwiper01;
var scrollSwiper02;
//var scrollSwiper03;
$(function(){
    //内容滚动
    scrollSwiper01 = new Swiper('.scroll01', {
        slidesOffsetBefore:0,
        slidesOffsetAfter:20,
        direction: 'vertical',
        freeMode: true,
        slidesPerView: 'auto',
        mousewheel: {
            releaseOnEdges: true
        }
    });

    //内容滚动
    scrollSwiper02 = new Swiper('.scroll02', {
        slidesOffsetBefore:0,
        slidesOffsetAfter:20,
        direction: 'vertical',
        freeMode: true,
        slidesPerView: 'auto',
        mousewheel: {
            releaseOnEdges: true
        }
    });
    //内容滚动
    //scrollSwiper03 = new Swiper('.scroll03', {
    //    slidesOffsetBefore:45,
    //    slidesOffsetAfter:20,
    //    direction: 'vertical',
    //    freeMode: true,
    //    slidesPerView: 'auto',
    //    mousewheel: {
    //        releaseOnEdges: true
    //    }
    //})

});

///*! layer mobile-v2.0 弹层组件移动版 */
//; !function (a) { "use strict"; var b = document, c = "querySelectorAll", d = "getElementsByClassName", e = function (a) { return b[c](a) }, f = { type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: "scale" }, g = { extend: function (a) { var b = JSON.parse(JSON.stringify(f)); for (var c in a) b[c] = a[c]; return b }, timer: {}, end: {} }; g.touch = function (a, b) { a.addEventListener("click", function (a) { b.call(this, a) }, !1) }; var h = 0, i = ["layui-m-layer"], j = function (a) { var b = this; b.config = g.extend(a), b.view() }; j.prototype.view = function () { var a = this, c = a.config, f = b.createElement("div"); a.id = f.id = i[0] + h, f.setAttribute("class", i[0] + " " + i[0] + (c.type || 0)), f.setAttribute("index", h); var g = function () { var a = "object" == typeof c.title; return c.title ? '<h3 style="' + (a ? c.title[1] : "") + '">' + (a ? c.title[0] : c.title) + "</h3>" : "" }(), j = function () { "string" == typeof c.btn && (c.btn = [c.btn]); var a, b = (c.btn || []).length; return 0 !== b && c.btn ? (a = '<span yes type="1">' + c.btn[0] + "</span>", 2 === b && (a = '<span no type="0">' + c.btn[1] + "</span>" + a), '<div class="layui-m-layerbtn">' + a + "</div>") : "" }(); if (c.fixed || (c.top = c.hasOwnProperty("top") ? c.top : 100, c.style = c.style || "", c.style += " top:" + (b.body.scrollTop + c.top) + "px"), 2 === c.type && (c.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (c.content || "") + "</p>"), c.skin && (c.anim = "up"), "msg" === c.skin && (c.shade = !1), f.innerHTML = (c.shade ? "<div " + ("string" == typeof c.shade ? 'style="' + c.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (c.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (c.skin ? "layui-m-layer-" + c.skin + " " : "") + (c.className ? c.className : "") + " " + (c.anim ? "layui-m-anim-" + c.anim : "") + '" ' + (c.style ? 'style="' + c.style + '"' : "") + ">" + g + '<div class="layui-m-layercont">' + c.content + "</div>" + j + "</div></div></div>", !c.type || 2 === c.type) { var k = b[d](i[0] + c.type), l = k.length; l >= 1 && layer.close(k[0].getAttribute("index")) } document.body.appendChild(f); var m = a.elem = e("#" + a.id)[0]; c.success && c.success(m), a.index = h++, a.action(c, m) }, j.prototype.action = function (a, b) { var c = this; a.time && (g.timer[c.index] = setTimeout(function () { layer.close(c.index) }, 1e3 * a.time)); var e = function () { var b = this.getAttribute("type"); 0 == b ? (a.no && a.no(), layer.close(c.index)) : a.yes ? a.yes(c.index) : layer.close(c.index) }; if (a.btn) for (var f = b[d]("layui-m-layerbtn")[0].children, h = f.length, i = 0; h > i; i++) g.touch(f[i], e); if (a.shade && a.shadeClose) { var j = b[d]("layui-m-layershade")[0]; g.touch(j, function () { layer.close(c.index, a.end) }) } a.end && (g.end[c.index] = a.end) }, a.layer = { v: "2.0", index: h, open: function (a) { var b = new j(a || {}); return b.index }, close: function (a) { var c = e("#" + i[0] + a)[0]; c && (c.innerHTML = "", b.body.removeChild(c), clearTimeout(g.timer[a]), delete g.timer[a], "function" == typeof g.end[a] && g.end[a](), delete g.end[a]) }, closeAll: function () { for (var a = b[d](i[0]), c = 0, e = a.length; e > c; c++) layer.close(0 | a[0].getAttribute("index")) } }, "function" == typeof define ? define(function () { return layer }) : function () { var a = document.scripts, c = a[a.length - 1], d = c.src, e = d.substring(0, d.lastIndexOf("/") + 1); c.getAttribute("merge") || document.head.appendChild(function () { var a = b.createElement("link"); return a.href = e + "xin_con.css", a.type = "text/css", a.rel = "styleSheet", a.id = "layermcss", a }()) }() }(window);
//
//function msg(str) {
//    layer.open({
//        content: str,
//        skin: 'msg',
//        time: 2 //2秒后自动关闭
//    });
//}



//搜索页面返回箭头20180301
$(function() {
    $("#gobacknow").on("click", function() {
        document.referrer === "" ? window.location.href = "/" : window.history.go(-1)
    })
});
