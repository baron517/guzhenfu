//window.pageConfig=window.pageConfig||{}

$(function() {

    if (pageConfig.ismobile) {
        try {
            if (document.getElementById("bdmark") != null) {
                return
            }
            var urlhash = window.location.hash;
            if (!urlhash.match("fromapp")) {
                if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
                    var murl = 'http://m.xialingying.cc' + window.location.pathname;
                    location.replace(murl);
                }
            }
        } catch (err) {}
    }



    if (pageConfig.lazyload) {
        $("img").lazyload({ effect: "fadeIn", skip_invisible: false, threshold: 100, failure_limit: 10 });
    } else {
        $("img").each(function() {
            var that = $(this);
            var re = /(.+?.(jpg|bmp|png|jepg|gif))/i;
            href = that.attr("data-original");
            if (re.test(href)) {
                that.attr("src", href);
            }

        });
    }
    if (pageConfig.screen) { $.school.screen(); }
    if (pageConfig.allcourse) { $.school.allcourse(); }
    if (pageConfig.yuyue) { $.course.yuyue(); }
    if (pageConfig.onclick && pageConfig.courseid) { $.school.onclick(); }
    if ($('#fixedMenu').length) { $('#fixedMenu').FixedMenu({ 'top': '1' }); }
    if ($('#fixedMenu1').length) { $('#fixedMenu1').FixedMenu({ 'top': '50' }); }

    $.xly.buynum();
    $.xly.user();
    $.school.reserve();
    // $.xly.leyu();
    $.xly.coursehistory();
    //if(pageConfig.rightpanel){$.xly.rightpanel();}
    // if (pageConfig.hello && $('.hd_one').length) { $('.hd_one>.auto').append('<div class="hd_hello">您好，欢迎来到' + pageConfig.hello + '夏令营！</div>') };
    // if (pageConfig.hello && $('.xx_hd_one').length) { $("#jigou_hy").text('您好，欢迎来到' + pageConfig.hello + '夏令营！请登录') };
    $.xly.baiduframe();
    if (pageConfig.reserveHuodong) { $.school.reserveHuodong(); };
});

/*幻灯片*/


$(function() {
    if ($("#js_hdpt").length > 0) {
        $('#js_hdpt').switchable({
            triggers: $('#js_hdpd').find('li'),
            effect: 'fade',
            autoplay: true,
            onSwitch: function(event, currentIndex) {
                var api = this,
                    cfg = api.config;
                new $.switchable.Anim(
                    $('#mask'), { top: 1 + 84 * currentIndex },
                    cfg.duration,
                    cfg.easing
                ).run();
            }
        })
    }
});
/*幻灯片*/
/*click增加样式*/
/*微分享 图片左右滑动*/
$(function() {
    /*轮播焦点图banner*/
    $('#slide1').switchable({
        putTriggers: 'insertAfter',
        panels: 'a',
        //initIndex: 0, // display the last panel
        effect: 'scrollleft', // taking effect when autoplay == true
        easing: 'cubic-bezier(.455, .03, .515, .955)', // equal to 'easeInOutQuad'
        //end2end: true, // if set to true, loop == true
        //loop: false, // not taking effect, because end2end == true
        autoplay: true,
        interval: 2
    });

    /*点击左右箭头滚动*/

    if ($("#slide_zt").length > 0) {
        $('#slide_zt').switchable({
            putTriggers: 'insertBefore',
            panels: 'li',
            effect: 'scrollleft',
            easing: 'ease-in-out',
            end2end: true,
            loop: false,
            prev: '#prev_x',
            next: $('#next_x'),
            autoplay: false,
            interval: 1,
            steps: 1,
            visible: 1
        });
    }

});


/*tab当前页切换*/
$(function() {
    $("#jg_tab a").hover(function() {
        $(this).addClass('current').siblings().removeClass('current');
        $("#jg_info li").css('display', 'none');
        $("#jg_info li").eq($(this).index()).css('display', 'block');
    })

});


/*floattab*/
(function($) {
    $.fn.floattab = function(options) {
        var conTop = $(".coursestart").offset().top - 120;
        $(window).scroll(function() {
            var scrt = $(window).scrollTop();
            if (scrt > conTop) {
                setTab();
            } else {
                $("#js_cdhul li:first").addClass("on").siblings().removeClass("on");
            }
        });
        var arr = [],
            classname = $(".courselist");
        for (var i = 0; i < classname.length; i++) {
            arr.push(parseInt(classname.eq(i).offset().top - 120));
        }
        $("#js_cdhul li").bind("click", function() {
            var _th = $(this);
            _th.blur();
            var index = $(this).index();
            var hh = arr[index];

            $('html,body').stop().animate({
                scrollTop: hh + 'px'
            }, 400)
        });

        function setTab() {
            var Objs = $(".courselist");
            var textSt = $(window).scrollTop();
            var objslast = $(".courseend").offset().top - 120;
            for (var i = Objs.length - 1; i >= 0; i--) {
                if (textSt >= $(Objs[i]).offset().top - 120 && textSt < objslast) {
                    $("#js_cdhul li").eq(i).addClass("on").siblings().removeClass("on");
                    return;
                } else {
                    if (textSt > objslast) {
                        $("#js_cdhul li.last").addClass("on").siblings().removeClass("on");
                    } else {
                        $("#js_cdhul li").removeClass("on");
                    }
                }
            }
        }
    }
})(jQuery);

function js_cdhul() {
    if ($("#js_cdhul").length > 0) {
        $("#js_cdhul").floattab();

    }

};

function myChart() {
    window.myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
        responsive: true
    });
};
if (pageConfig.courseid) {
    window.onload = function() {
        js_cdhul();
        if ($('#canvas').length) {
            myChart();
        }

    };
}




/**
 * course pic
 * @returns {undefined}
 */
$(function() {


    $(".course-pic-div").switchable({
        triggerType: 'click',
        panelse: '.course-pic-list',
        triggers: $('#btncon').find('div'),
        effect: 'none'
    });

    if ($('#course-pic1').length > 0 && $('#course-pic1').find("li").length > 0) {
        $('#course-pic1').switchable({
            triggers: $('#course-pic-triggers1').find('li'),
            effect: 'fade',
            autoplay: true,
            api: true
        }).play();

    };

    if ($('#course-pic2').length > 0 && $('#course-pic2').find("li").length > 0) {
        $('#course-pic2').switchable({
            triggerType: 'click',
            triggers: $('#course-pic-triggers2').find('li'),
            effect: 'none',
            autoplay: false,
            api: false,

        });

    };






});


(function($) {
    $.extend({
        course: {
            yuyue: function() {
                var page = $("#sc-yuyue");
                if (!page.length) {
                    return false;
                }

                page.find(".yuyue").unbind('click').bind("click", function() {

                    $(this).addClass('current').siblings().removeClass('current');

                });

                page.find('.sc-baoming').on('click', function() {
                    var time = page.find('.current');
                    if (!time.length) {
                        return false;
                    }
                    var ids = parseInt(time.attr('id')),
                        title = time.attr('title');
                    var coursetable = $("#course-table");
                    if (!coursetable.length) {
                        return false;
                    }
                    var html = '<table width="100%" cellspacing="1" class="course-table">';

                    html += coursetable.find('tr').eq(0).prop("outerHTML");;
                    var i = 0;
                    coursetable.find('tr.time').each(function() {

                        var idx = this.id;
                        if (idx == ids) {
                            var con = $(this).prop("outerHTML");
                            html += con.replace('u=', 'fast=1&u=');
                            i++;
                        }

                    })

                    html += '</table>';

                    if (!i) {
                        alert('已报满，请联系客服！');
                        return;
                    }


                    var prompt = '<div class="mem_app_black_box1 auto-block" id="sc-yuyue-time"><div class="mem_app_black_box"> </div><div class="sc-yuyue"><div class="sc-yuyue-t"><strong>选择合适课程预约</strong><i class="close"></i></div<div class="sc-yuyue-c"><div class="sc-yuyue-ct">' + title + '</div><div class="course_time">' + html + '</div></div></div></div>';

                    $("body").append(prompt);


                    $(".close").on('click', function() {
                        $("#sc-yuyue-time").remove();
                    });
                });
            }
        }
    })
})(jQuery);


$(function() {

    if ($("#slide_z").length > 0) {
        $('#slide_z').switchable({
            putTriggers: 'insertBefore',
            panels: 'li',
            effect: 'scrollup',
            easing: 'ease-in-out',
            end2end: true,
            loop: false,
            prev: $('#prev_xz'),
            next: $('#next_xz'),
            autoplay: false,
            interval: 1,
            steps: 1,
            visible: 2
        });
    }


});


(function($) {
    $.extend({
        school: {
            screen: function() {
                var form = $("#screen-form");
                form.find("a").on("click", function() {
                    var ides = this.id,
                        name = ides.split("_")[0],
                        value = ides.split("_")[1];
                    if (name == "sort") {
                        if (value == "3") {
                            $(this).attr("id", "sort_4");
                            $(this).find("b").attr("class", "u");
                        } else if (value == "4") {
                            $(this).attr("id", "sort_3");
                            $(this).find("b").attr("class", "d");
                        } else if (value == "5") {
                            $(this).attr("id", "sort_6");
                            $(this).find("b").attr("class", "u");
                        } else if (value == "6") {
                            $(this).attr("id", "sort_5");
                            $(this).find("b").attr("class", "d");
                        } else if (value == "0") {
                            location.reload();
                        } else {
                            $(".se_price").attr("id", "sort_3");
                            $(".se_time").attr("id", "sort_5");
                        }
                        $(this).parent().parent().find("li").removeClass("current");
                        $(this).parent().addClass("current");
                    }
                    if (name == "category") {
                        if (form.find("input[name=plus]").val() != '1') {
                            form.find("input[name=place]").val("");
                            $(".place").html("全部");
                        }

                        var text = $(this).text();
                        if (text == '全部') {
                            $(".category").html(text);
                        } else {
                            $(".category").html("<font color=#ff0000>" + text + "</font>");
                        }

                    }
                    if (name == "place") {
                        if (form.find("input[name=plus]").val() != '1') {
                            form.find("input[name=category]").val("");
                            $(".category").html("全部主题");
                        }

                        var text = $(this).text();
                        if (text == '全部') {
                            $(".place").html(text);
                        } else {
                            $(".place").html("<font color=#ff0000>" + text + "</font>");
                        }


                    }
                    if (name == "target") {
                        var text = $(this).text().split("(")[0];
                        if (text == '全部') {
                            $(".target").html(text);
                        } else {
                            $(".target").html("<font color=#ff0000>" + text + "</font>");
                        }

                    }

                    form.find("input[name=" + name + "]").val(value);
                    $.ajax({
                        url: "/d/gate/index.php",
                        data: form.serialize(),
                        timeout: 3000,
                        type: "post",
                        dataType: "json",
                        success: function(data) {
                            if (data.error) {
                                alert(data.error["msg"]);
                                return false;
                            }
                            var status = data.status;
                            if (status != "ok") {
                                alert(status);
                            } else {
                                $.school.pagees(data.data);
                            }
                        }
                    })
                });
            },
            pagees: function(data) {
                if (!data) {
                    return;
                }
                var page = $(".course_list");
                var result = "";
                for (key in data) {
                    var select = "";
                    if (data[key][23]) {
                        for (k in data[key][23]) {
                            select += "<option>第" + data[key][23][k][8] + "期：" + data[key][23][k][3] + "--" + data[key][23][k][4] + "</option>";
                        }
                    }
                    if (select) {
                        select = "<select>" + select + "</select>";
                    }
                    result += "<div class=\"co1_a solid\"><a class=\"co1_a_l\" href=" + data[key][24] + " target=\"_blank\" title=" + data[key][1] + "><img src=" + data[key][18] + " width=\"168\" height=\"168\" alt=" + data[key][1] + "/></a><div class=\"co1_a_r_s\"><div class=\"co1_a_r1\"><div class=\"co1_a_r1_l\"><div class=\"co1_a_r1_l1\"><a href=" + data[key][24] + " target=\"_blank\" title=" + data[key][1] + ">" + data[key][1] + "</a></div><div class=\"co1_a_r1_l2\">" + data[key][12] + "</div><div class=\"co1_a_r1_l3\"><p>品牌学校：" + data[key][25] + " </p><p><span>适合对象：" + data[key][26] + "</span><span>活动地点：" + data[key][27] + "</span><span>营期：" + data[key][28] + "</span></p></div></div><div class=\"co1_a_r1_r\"><div class=\"co1_a_r1_t\">" + data[key][11] + "元<span>/" + data[key][28] + "</span></div><a class=\"co1_a_r1_b\" href=" + data[key][24] + " target=\"_blank\" title=" + data[key][1] + ">查看详情</a></div></div><div class=\"co1_a_r2\">" + select + "<a class=\"co1_gz\" href=" + data[key][24] + " target=\"_blank\" title=\"\">关注该营</a><a class=\"co1_zx\" href=" + data[key][24] + " target=\"_blank\" title=\"\"><span></span>在线咨询</a></div></div></div>";
                }

                page.html(result);

            },
            allcourse: function() {
                $('.jg_nav1_menu').bind({
                    mouseenter: function(g) {
                        var id = this.id;
                        if (!id) {
                            return;
                        }
                        m = setTimeout(function() {
                            if ($('.jg1_menu').length) {
                                $('.jg1_menu').show();
                                return false;
                            }
                            course(id);
                        }, 200);
                    },
                    mouseleave: function() {
                        clearTimeout(m);
                        if ($('.jg1_menu').length) {
                            $('.jg1_menu').hide();
                        }
                    }
                });

                function course(id) {
                    $.ajax({
                        url: '/d/gate/index.php',
                        data: { 'model': '2', 'schoolid': id },
                        timeout: 3000,
                        type: 'post',
                        dataType: 'json',
                        success: function(data) {
                            if (data.error) {
                                alert(data.error["msg"]);
                                return false;
                            }
                            var status = data.status;
                            if (status != "ok") {
                                alert(status);
                            } else {
                                $('.jg_nav1_menu').append(data.data);
                            }

                        }
                    })
                }

            },
            onclick: function() {
                setTimeout(function() {
                    addonclick();
                }, 6000);

                function addonclick() {
                    $.ajax({
                        url: '/d/gate/index.php',
                        data: { 'model': '4', 'id': pageConfig.courseid },
                        timeout: 300,
                        type: 'post',
                        dataType: 'json',
                        success: function(data) {
                            if (data.error) {
                                return false;
                            }
                            var status = data.status;
                            if (status != "ok") {

                            } else {

                            }
                        }
                    })
                }
            },
            reserve: function() {
                if (!$('#reserve').length || !pageConfig.schoolid) {
                    return false;
                }
                var form = $('#reserve');
                form.find('.jg1_btn').on('click', function() {
                    var name = form.find('input[name=name]'),
                        phone = form.find('input[name=phone]'),
                        remark = form.find('select[name=remark]');
                    if (!name.val()) {
                        alert('请输入姓名');
                        name.focus();
                        return false;
                    } else {
                        var reg = /^([A-Za-z]|[\u4E00-\u9FA5])+$/;
                        if (!name.val().match(reg)) {
                            alert('您好，请输入正确的姓名');
                            name.focus();
                            return false;
                        }
                        if (name.val().length > 50 || name.val().length < 2) {
                            alert('您好，请输入正确的姓名');
                            name.focus();
                            return false;
                        }
                    }
                    if (!phone.val()) {
                        alert('请输入手机号');
                        phone.focus();
                        return false;
                    } else {
                        var reg = /^1[3-9]\d{9}$/;
                        if (!phone.val().match(reg)) {
                            alert('您好，请输入正确的手机号');
                            phone.focus();
                            return false;
                        }
                    }

                    $.ajax({
                        url: '/d/gate/index.php',
                        data: { 'model': '5', 'schoolid': pageConfig.schoolid, 'name': name.val(), 'phone': phone.val(), 'remark': remark.val() },
                        type: 'post',
                        dataType: 'json',
                        success: function(data) {
                            if (data.error) {
                                alert(data.error["msg"]);
                                return false;
                            }
                            var status = data.status;
                            if (status != "ok") {
                                alert(status);
                            } else {
                                alert('恭喜您提交成功');
                                name.val('');
                                phone.val('');
                            }

                        }
                    })



                })
            },
            reserveHuodong: function() {
                if (!$('#reserve').length || !pageConfig.courseid) {
                    return false;
                }
                var form = $('#reserve');
                form.find('.hd_submit2').on('click', function() {
                    var name = form.find('input[name=name]'),
                        phone = form.find('input[name=phone]');
                    if (!name.val()) {
                        alert('请输入姓名');
                        name.focus();
                        return false;
                    } else {
                        var reg = /^([A-Za-z]|[\u4E00-\u9FA5])+$/;
                        if (!name.val().match(reg)) {
                            alert('您好，请输入正确的姓名');
                            name.focus();
                            return false;
                        }
                        if (name.val().length > 50 || name.val().length < 2) {
                            alert('您好，请输入正确的姓名');
                            name.focus();
                            return false;
                        }
                    }
                    if (!phone.val()) {
                        alert('请输入手机号');
                        phone.focus();
                        return false;
                    } else {
                        var reg = /^1[3-9]\d{9}$/;
                        if (!phone.val().match(reg)) {
                            alert('您好，请输入正确的手机号');
                            phone.focus();
                            return false;
                        }
                    }

                    $.ajax({
                        url: '/d/gate/index.php',
                        data: { 'model': '5', 'courseid': pageConfig.courseid, 'name': name.val(), 'phone': phone.val() },
                        type: 'post',
                        dataType: 'json',
                        success: function(data) {
                            if (data.error) {
                                alert(data.error["msg"]);
                                return false;
                            }
                            var status = data.status;
                            if (status != "ok") {
                                alert(status);
                            } else {
                                alert('恭喜您提交成功');
                                name.val('');
                                phone.val('');
                            }

                        }
                    })



                })
            }
        }
    })
})(jQuery);

//var d = $.cache.get('buy');
// $.cache.set('buy', my, 600 * 1000);

if (pageConfig.page9) {
    $(function() {
        if ($(".g_tab_w").length) {
            $(".g_tab_c").switchable({
                panels: '.g_tab_con',
                triggers: $(".g_tab_head").find('li'),
                effect: 'none',
                triggerType: 'mouse',
                slide: true
            })
        }
        if ($(".g_new_le").length) {
            $(".g_now_ricon").switchable({
                panels: '.g_new_lecon',
                triggers: $(".g_new_lehe").find('li'),
                effect: 'none',
                triggerType: 'mouse',
                slide: true
            })
        }
        //    if($(".g_env_bj").length) {
        //        $(".g_env_con").switchable({
        //            panels: '.g_env_cul',
        //            triggers: $(".g_env_he").find('li'),
        //            effect: 'none',
        //            triggerType: 'click',
        //            slide: true
        //        })
        //    }
        if ($(".g_favorable_w").length) {

            $(".g_ann").click(function() {
                $(this).siblings(".g_fa_ri").toggleClass("up");
                if ($(this).hasClass('g_ann_on')) {
                    $(this).removeClass('g_ann_on');
                } else {
                    $(this).addClass('g_ann_on');
                }
            })

        }
    })
}

$(function() {
    $(".hd_li4 a").hover(function() {
        $(this).find(".hd_sjweixin").css({ "display": "block" });
    });
    //手机版滑过显示，点击任何地方关闭事件
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if (target.closest(".hd_sjweixin").length == 0) {
            $(".hd_sjweixin").hide();
        }
    });
});

$(function() {
    setTimeout(function() { $(".htj_img").hide(); }, 5000);
    $(".htj_sjb").hover(function() {
        $(this).find(".htj_img").css({ "display": "block" });
    });

    //手机版滑过显示，点击任何地方关闭事件
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if (target.closest(".htj_img").length == 0) {
            $(".htj_img").hide();
        }
    });
});
//2018.05.08改
//$(function() {
//    if(!$("#htj_img").is(":hidden")){
//        setTimeout(function(){$(".htj_img").hide();},5000);
//    }
//    $(".htj_sjb").hover(function () {
//        $(this).find(".htj_img").show();
//    },function(){
//        setTimeout(function(){$(".htj_img").hide();},6000);
//    });
//
//
//    //手机版滑过显示，点击任何地方关闭事件
//    $(document).bind("click", function (e) {
//        var target = $(e.target);
//        if (target.closest(".htj_img").length == 0) {
//            $(".htj_img").hide();
//        }
//    });
//
//});
if (pageConfig.style2018) {

    //行程安排导航
    //    $(function () {
    //        var h=$(window).height();
    //        var oTop = $(".xianshi").offset().top;
    //        var sTop = 0;
    //        var tTop=$(".quxiao").parents(".courselist").offset().top;
    //        var dTop = $("#ddd").offset().top;
    //        var dHeight = $("#ddd").height();
    //        var zHeight = $(".xianshi .zuo_nav").height();
    //        $(window).scroll(function () {
    //            var sTop = $(this).scrollTop();
    //            if (sTop > oTop) {
    //                $(".xianshi").addClass("search_t").removeClass("search_d");
    //            }else{
    //                $(".xianshi").removeClass("search_t");
    //            }
    //            if (sTop > dTop + dHeight - zHeight - 100) {
    //                $(".xianshi").closest(".courselist").css("position","relative");
    //                $(".xianshi").addClass("search_d");
    //            }
    //        });
    //    });


    $(function() {
        if (pageConfig.courseinfo) {
            if ($('.zuo_nav').length) {
                var gaodu = $('.zuo_nav').outerHeight(true);
                var pingmu = $(window).height();
                if (gaodu > pingmu) {
                    var h = $(window).height();
                    var oTop = $(".xianshi").offset().top;
                    var sTop = 0;
                    var tTop = $(".quxiao").parents(".courselist").offset().top;
                    $("#zuo_nav").css({ "position": "absolute" }).parent().css({ "position": "relative" });
                    $(window).scroll(function() {
                        var sTop = $(this).scrollTop();
                        var ddd = $("#ddd");
                        var subHeight; //导航到底部后 距离模块最上方的高度
                        subHeight = (sTop - document.getElementById("ddd").offsetTop + window.innerHeight - document.getElementById("zuo_nav").offsetHeight);
                        if (sTop + 58 < document.getElementById("ddd").offsetTop) {
                            $("#zuo_nav").css({ "position": "absolute", "top": "0" })
                        }
                        if (sTop + 58 > document.getElementById("ddd").offsetTop && sTop + window.innerHeight < (document.getElementById("ddd").offsetHeight + document.getElementById("ddd").offsetTop)) {
                            $("#zuo_nav").css({ "position": "fixed", "top": "58px" })
                        }
                        if (subHeight >= document.getElementById("ddd").offsetHeight - document.getElementById("zuo_nav").offsetHeight) {
                            $("#zuo_nav").css({
                                "position": "absolute",
                                "top": document.getElementById("ddd").offsetHeight - document.getElementById("zuo_nav").offsetHeight
                            })
                        }
                    })
                } else {
                    $(window).scroll(function() {
                        var navTop = $(".zuo_nav").offset().top;
                        var navHeight = $(".zuo_nav").outerHeight(true);
                        var docTop = $("#ddd").offset().top;
                        var docHeight = $("#ddd").outerHeight(true);
                        var buttomTop = docHeight + docTop - navHeight - 60 * 2;
                        var scrTop = $(document).scrollTop();
                        if (scrTop > docTop - 60 && scrTop < buttomTop) {
                            $(".xianshi").addClass("search_t").removeClass("search_d");
                        } else if (scrTop > buttomTop) {
                            $(".xianshi").closest(".courselist").css("position", "relative");
                            $(".xianshi").removeClass("search_t").addClass("search_d");
                        } else {
                            $(".xianshi").closest(".courselist").css("position", "relative");
                            $(".xianshi").removeClass("search_t").removeClass("search_d");
                        }
                    });
                }
            }
        }




    });
    $(function() {

        if ($('.fl_l').length && $('.xc_an_w').length) {


            //设置标杆
            var _line = parseInt($(window).height() / 3);
            $(window).scroll(function() {
                //if ($(window).scrollTop()>730) {
                //}else{
                //};
                $('.fl_l li').eq(0).addClass('active');
                //滚动到标杆位置,左侧导航加active
                $('.xc_an_w .s1').each(function() {
                    var _target = parseInt($(this).offset().top - $(window).scrollTop() - _line);
                    var _i = $(this).index();
                    if (_target <= 0) {
                        $('.fl_l li').removeClass('active');
                        $('.fl_l li').eq(_i).addClass('active');
                    }
                    //如果到达页面底部，给左侧导航最后一个加active
                    else if ($(document).height() == $(window).scrollTop() + $(window).height()) {
                        $('.fl_l li').removeClass('active');
                        $('.fl_l li').eq($('.xc_an_w .s1').length - 1).addClass('active');
                    }
                });
            });
            $('.fl_l li').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
                var _i = $(this).index();
                $('body, html').animate({ scrollTop: $('.xc_an_w .s1').eq(_i).offset().top - _line }, 500);
            });


        }


    });

    //滑过小图显示大图
    $(function() {

        if ($('.hoverBig').length) {
            $(".hoverBig img").on("mouseenter", function() {
                var e = $(this).attr("src");
                $(this).next(".ImgShow").html('<img src="' + e + '" />'), $(this).next(".ImgShow").css("display", "inline-block"), 2 == $(this).parent().index() && $(this).next(".ImgShow").css("left", "-317px");
                var t = $(this).offset().top - $(window).scrollTop();
                $(this).next(".ImgShow").css(t >= 410 ? {
                    bottom: "175px",
                    top: "auto"
                } : {
                    bottom: "auto",
                    top: "175px"
                })
            }).on("mouseout", function() {
                $(this).next(".ImgShow").css("display", "none")
            })

        }
    });




}

$(function() {
    //关系广告
    $(".xx_kxw_po_s").click(function() {
        $(this).closest('.xx_xx_kxw_gg').hide();
    });
    //手机小图标显示二维码
    $(".xx_hd_li4 a").hover(function() {
        $(this).find(".xx_hd_sjweixin").css({ "display": "block" });
    });
    //手机版滑过显示，点击任何地方关闭事件
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if (target.closest(".xx_hd_sjweixin").length == 0) {
            $(".xx_hd_sjweixin").hide();
        }
    });
});

$(function() {
    //头部城市公共选项卡
    if ($('#y_city_con').length) {
        $("#y_city_con").switchable({
            panels: ".y_city_cma",
            triggers: $(".y_city_he").find('li'),
            effect: 'none',
            triggerType: 'mouse'
        });
    }

})