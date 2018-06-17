$(function() {
    if (pageConfig && pageConfig.onclick && pageConfig.courseid) {

        setTimeout(function() {
            addonclick();
        }, 6000);

        function addonclick() {
            $.ajax({
                url: '',
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
    }
    //if(pageConfig.onclick&&pageConfig.courseid){$.school.onclick();}
});

$(function() {
    if (pageConfig.lazyload) {
        $("img.x_lazy").lazyload({
            effect: "fadeIn",
            skip_invisible: true,
            threshold: 100,
            failure_limit: 10
        });
        $("img").each(function() {
            var that = $(this);
            var re = /(.+?.(jpg|bmp|png|jepg|gif))/i;
            href = that.attr("data-original");
            if (re.test(href) && !that.hasClass('x_lazy')) {
                that.attr("src", href);
            }
        });
    }

});

//03.07营地内页
$(function() {
    if ($('.exc1').length) {
        $(".exc1 a").touchTouch();
    }
});
//console.log(1);
//03.07添加营地
$(function() {
    if ($('#container').length) {
        var kejian;
        //var kejian = ($(".swiper2 .swiper-slide:eq(0) .xlys-content").height());
        //$(".swiper2 .swiper-slide:eq(0),.swiper2 .swiper-wrapper").height(kejian);

        if ($(".swiper-container").length > 0) {
            function setCurrentSlide(ele, index) {
                $(".swiper1 .swiper-slide").removeClass("selected");
                ele.addClass("selected");
                //swiper1.initialSlide=index;
            }
            var swiper1 = new Swiper('.swiper1', {
                slidesPerView: 5.5,
                paginationClickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                spaceBetween: 0, //slide之间的距离（单位px）。
                freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
                loop: false, //是否可循环
                onTab: function(swiper) {
                    var n = swiper1.clickedIndex;
                }
            });
            swiper1.slides.each(function(index, val) {
                var ele = $(this);
                ele.on("click", function() {
                    kejian = ($(".swiper2 .swiper-slide:eq(" + index + ") .xlys-content").height());
                    setCurrentSlide(ele, index);
                    swiper2.slideTo(index, 300, false);
                    //mySwiper.initialSlide=index;
                    $(".swiper2 .swiper-slide:eq(" + index + ")").height(kejian);
                    $(".swiper2 .swiper-wrapper").height(kejian);
                    //console.log(kejian);
                    //console.log($(".swiper2").height());
                    $(".swiper2 .swiper-slide").scrollTop(0);
                });
            });
            var swiper2 = new Swiper('.swiper2', {
                //freeModeSticky  设置为true 滑动会自动贴合
                direction: 'horizontal', //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
                loop: false,
                autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
                onSlideChangeEnd: function(swiper) { //回调函数，swiper从一个slide过渡到另一个slide结束时执行。
                    var n = swiper.activeIndex;
                    setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
                    swiper1.slideTo(n, 300, false);
                }
            });
        }
    }
});
window.onload = function() {
    $(".swiper1 .swiper-slide").eq(0).trigger("click");
};

//变绿色2018.01.25
$(function() {
    function highLightNav() { //根据window.pageConfig.pagename判断导航高亮
        var navLis = $("#classnav li");
        for (var i = 0; i < navLis.length; i++) {
            var xia = $(navLis[i]).find("a").attr("href");
            var xiaes = $(navLis[i]).find("a").attr("title");
            var shang = window.pageConfig.pageurl;
            var shanges = window.pageConfig.pagename;
            if (xia.indexOf(shang) != -1) {
                $(navLis[i]).find("a").css({ "color": "#81b626", "border-bottom": "2px solid #81b626" })
            }
            if (xiaes == shanges) {
                $(navLis[i]).find("a").css({ "color": "#81b626", "border-bottom": "2px solid #81b626" })
            }
        }
    }

    function highLightNav2() { //根据window.pageConfig.pagename判断导航高亮
        var navLis = $("#classnav2 li");
        var navLisa = $("#classnav2 li a");
        for (var r = 0; r < navLisa.length; r++) {
            var xias = $(navLis).find(navLisa[r]).attr("href");
            if (xias != "" && xias != undefined) {
                var shangs = window.pageConfig.pageurl;
                //console.log(xias);
                if (xias.indexOf(shangs) != -1) {
                    $(navLis).find(navLisa[r]).css({ "color": "#81b626", "border-bottom": "2px solid #81b626" })
                }
            }
        }
    }
    highLightNav(); //根据window.pageConfig.pagename判断导航高亮
    highLightNav2(); //根据window.pageConfig.pagename判断导航高亮

});
//返回顶部
$(function() {
    if ($(".xly-fhdb").length > 0) {
        $(window).scroll(function() {
            var scrt = $(window).scrollTop();
            if (scrt > 400) {
                $(".xly-fhdb").css({ 'display': 'block' });
            } else {
                $(".xly-fhdb").css({ 'display': 'none' });
            }
        });
    }
    if ($("#gotop").length > 0) {
        $("#gotop").unbind("click").bind("click", function() {
            $(".swiper2 .swiper-slide").scrollTop(0);
            $("html,body").stop().animate({
                scrollTop: 0
            }, 400)
        })
    }

});

$(function() {
    if (pageConfig.pagename) {
        if ($('#pagename').length) {
            $('#pagename').html(pageConfig.pagename.substr(0, 6));
        }
    }
    //城市功能选项卡
    $(".he_ul_xcon").switchable({
        panels: ".zx_big_w",
        triggers: $(".he_ul_xz").find('li'),
        effect: 'none',
        triggerType: 'click'
    });
    //头部点击展开按钮
    if ($(".xs_he_w").length) {
        $(".h_nav").click(function() {
            $(".dj_sj_w").toggleClass("active");
        });
    }
    //$(".swiper-no-swiping").css({ 'height': $(window).height()});
    //今日头条滚动
    if ($("#yk-three-rt").length) {
        $('#yk-three-rt').switchable({
            triggers: '&bull;',
            putTriggers: 'insertBefore',
            panels: 'a',
            easing: 'ease-in-out',
            effect: 'scrollUp',
            steps: 1,
            visible: 1, // important
            end2end: true,
            groupSize: [0, 42],
            autoplay: true
        });
    }

    //头部，“城市”点击、滑过显示菜单功能
    if (document.body.clientWidth <= 640) {
        $(".yk-city").on('click', function(e) {
            $(this).find(".yk-city-div").toggleClass("show");
            e.stopPropagation();
        })
        $(document).on('click', function() {
            $(".yk-city-div").removeClass("show");
        })
        $(".yk-city-div").on('click', function(e) {
            e.stopPropagation();
        })
    }
    if (document.body.clientWidth > 640) {
        $(".yk-city").hover(function() {
            $(this).closest("#yk-city").find(".yk-city-div").toggleClass("show");
        }, function() {
            $(this).closest("#yk-city").find(".yk-city-div").toggleClass("show");
        })
    }
    //alert(1);


    //幻灯片开始
    if ($("#yk-one").length > 0) {
        //alert(1);
        $(".yk-one").carousel();
    }


});

//机构课程页，返回顶部
$(function() {
    if ($(".xly-fhdbss").length > 0) {
        $(".swiper-slide").scroll(function() {
            var scrt = $(".feiyong").scrollTop();
            var scrts = $(".go_top").scrollTop();
            var scrtss = $(".go_top_one").scrollTop();
            var scrtsss = $(".filter-container").scrollTop();
            if (scrt > 400 || scrts > 400 || scrtss > 400 || scrtsss > 400) {
                $(".xly-fhdbss").css({ 'display': 'block' });
            } else {
                $(".xly-fhdbss").css({ 'display': 'none' });
            }
        });
    }
    if ($("#gotopss").length > 0) {
        $("#gotopss").unbind("click").bind("click", function() {
            $(".swiper2 .swiper-slide").scrollTop(0);
            $("html,body").stop().animate({
                scrollTop: 0
            }, 400)
        })
    }

});

//点击展开，点击关闭
$(function() {
    var flag = true;
    $(".xs_fl_ann").click(function() {
        var t = $(this);
        t.toggleClass("on");
        var hg_pu_he = $('#pull-nav_con_t').outerHeight(true);
        if (flag) {
            $(this).next('#pull-nav_t').css({ "height": hg_pu_he });
            flag = false;
        } else {
            $(this).next('#pull-nav_t').css({ "height": 0 });
            flag = true;
        }
    });
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if ($("#pull-nav_t").height() != 0) {
            $("#pull-nav_t").css({ "height": 0 });
        }
        flag = true;
    });
    $('#pull-nav_t').click(function(event) { event.stopPropagation(); });
});
//内容、列表页，头部展开关闭功能
$(function() {
    $(".he_an_niu").click(function() {
        $(this).toggleClass("on");
        $(this).next(".he_an_con").toggleClass("on");
        $(this).nextAll(".he_an_con_bj").toggleClass("on");

        var $nacCurr = $(".xly-ss-t-ul li.curr");
        var index = $nacCurr.index();
        var $thisCont = $(".ssCont").find(".ss_c_lia").eq(index);
        if ($thisCont.find(".ss_pull-nav_con_t").length > 0) {
            var thisHeight = $thisCont.find(".ss_pull-nav_con_t")[0].clientHeight;
        }
        $thisCont.animate({ "top": -thisHeight + "px" }, 500);
        $("body").removeClass("filter-shown");
        $("#ss_mark").hide();
        isHtmlScroll(true);
        $nacCurr.removeClass("curr")
    });
    $(".he_an_con_bj").click(function() {
        $(this).prevAll(".he_an_niu").removeClass("on");
        $(this).removeClass("on");
        $(this).prev(".he_an_con").removeClass("on");
    });
});
//优惠信息

(function($) {
    $.fn.tanchu = function(settings) {
        var that = $(this);
        var yhan = that.find(".xlys-yhgd"),
            yhdiv = that.find(".xlys-yhd"),
            yhdivon = 'xlys-yhd-on';
        if (yhan.length > 0) {
            yhan.on("click", function() {
                if (!yhdiv.hasClass(yhdivon)) {
                    yhdiv.addClass(yhdivon);
                    $(this).addClass("xlys-yhgd-on");
                    yhan.find(".xs_dianji_s").addClass("on");
                } else {
                    //alert(0);
                    yhdiv.removeClass(yhdivon);
                    $(this).removeClass("xlys-yhgd-on");
                    yhan.find(".xs_dianji_s").removeClass("on");
                }
            })
        }
        if ($('.xlys-yhd').length) {
            var yyh = $(".xlys-yhd p").height();
            var yyhw = $(".xlys-yhd").height();
            if (yyh < yyhw) {
                //$(".xs_dianji").css({ "display": "none" });
                // $(".xlys-yhd").css({ "height": "auto" })
            }
        }
    }
})(jQuery);
$(function($) {
    $('#tanchu_gn1').tanchu();
    $('#tanchu_gn2').tanchu();
});

//机构列表点击展示
$(function() {
    var m = $("#xlys-kc"),
        l = m.find(".xlys-kc-li"),
        t = m.find(".xlys-kc-t"),
        d = m.find(".xlys-kc-d");
    if (m.length > 0) {
        t.on("click", function() {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
                $(d.get(index)).css({ "display": "none" });
                return;
            }
            var index = t.index($(this));
            $(this).parent().addClass("active").siblings().removeClass("active");
            d.css({ "display": "none" });
            $(d.get(index)).css({ "display": "block" });
            var objslast = $(d.get(index)).offset().top - '50';
            $("html,body").stop().animate({
                scrollTop: objslast
            }, 400);
            return false;
        })
    }
});

function isHtmlScroll(args) { //是否允许页面html滑动，true可滑动，false不可滑动
    if (document.body.clientWidth < 640) {
        var htmlScrollTop = document.documentElement.scrollTop;
        if (args) { //无弹出复层，可滑动
            $("html").css({ "position": "static" });
        } else { //有弹出复层，不可滑动
            $("html").css({ "position": "fixed", "top": htmlScrollTop, "left": "0", "width": "100%" });
        }
    }
}
//机构首页，课程按钮
$(function() {
    if ($('.xs_jg_nkc').length) {
        var height = ($(document).height());
        var heightsss = ($(window).height());
        $("#pull-nav_b").css({ 'bottom': -heightsss });
        $('.xs_jg_nkc').click(function() {
            if ($(".xs_por").css("display") == "none") {
                isHtmlScroll(false);
                $('.xs_por').height(height);
                $('.xs_por').css('display', 'block');
                $('.sjd_tc').animate({ left: "0", bottom: "51px" }, 800);

            } else {
                isHtmlScroll(true);
                $('.sjd_tc').animate({ left: "0", bottom: -heightsss }, 800);
                $('.xs_por').css('display', 'none');
            }
        });
        $('.xs_por').click(function() {
            isHtmlScroll(true);
            $('.xs_por').css('display', 'none');
            $('.sjd_tc').animate({ left: "0", bottom: -heightsss }, 800);
        });
    }
    /*展开闭合结束*/
});

//机构页，立即报名按钮
$(function() {
    if ($('.xs_jg_nkcss').length) {
        var height = ($(document).height());
        var heightov = ($(window).height());
        $("#pull-nav_b").css({ 'bottom': -heightov });
        $(".filter-container").css({ 'height': heightov - 45 + "px" });
        $('.xs_jg_nkcss').click(function() {
            if ($(".xs_por").css("display") == "none") {
                $('.xs_por').height(height);
                $('.xs_por').css('display', 'block');
                setTimeout(function() {
                    $(".xs_he_ser").addClass("on");
                }, 850);

                $('.sjd_tc').animate({ left: "0", top: "0" }, 800);
            } else {
                $('.sjd_tc').animate({ left: "0", bottom: -height }, 800);
                $('.xs_por').css('display', 'none');
            }
        });
        $('.he_fanhui').click(function() {
            $(".xs_he_ser").removeClass("on");
            $('.xs_por').css('display', 'none');
            $('.sjd_tc').animate({ left: "0", bottom: -height, top: height }, 800);
        });
        $('.he_cha').click(function() {
            $(".xs_he_ser").removeClass("on");
            $('.xs_por').css('display', 'none');
            $('.sjd_tc').animate({ left: "0", bottom: -height, top: height }, 800);
        });
    }

    /*展开闭合结束*/
});

//图片滑动
$(function() {
    if ($("#excellent_lu").length) {
        new IScroll(".excellenss", {
            scrollX: !0,
            scrollY: !1,
            click: !0,
            eventPassthrough: !0
        });
    }
    if ($("#excellent_cen").length) {
        // new IScroll(".excellen", {
        //     scrollX: !0,
        //     scrollY: !1,
        //     click: !0,
        //     eventPassthrough: !0
        // });

        $('.excellent_culss').switchable({
            putTriggers: 'appendTo',
            panels: 'li',
            initIndex: 0,
            effect: 'scrollleft',
            easing: 'cubic-bezier(.455, .04, .515, .955)',
            end2end: true,
            loop: false,
            autoplay: true,
            interval: 2,
            api: true,
            steps: 4,
            visible: 1
        })
    }
});
//开营时间点击展开开始
$(function() {

    //	var xingchengScroll = new IScroll('#xingchengContent');
    //	var baomingScroll = new IScroll('#pull-nav_con_b');

    isAddKaiyingDiv(); //判断页面底部是否添加撑起的像素高度
    if ($("#filter_menu_con").length > 0) {
        //alert(1);
        $(".filter_menu_ces .filter-container").css({ 'height': $(window).height() - 44 });
        var $filterBtn = $("#filterBtn"),
            $filterMenu = $(".filter-wrapper"),
            $filterBack = $("#searchBackBtn"),
            canTouch = "ontouchstart" in window,
            click = canTouch ? "tap" : "click",
            cateId = $('#hidEncryptFCateID').val(),
            filterTitle = '',
            cateTitle = '',
            isAndroid = (navigator.userAgent).match(/android/i);
        $filterBtn.on('click', function() {
            setTimeout(function() {
                addAnimation($filterMenu, "moveToLeft");
            }, 450);
        });
        $filterBack.on('click', function() {
            location.href = "/category/?hideNav=1";
        });
        $(".filter_menu_con").on('click', ".filter-item-wrapper", function(e) {

            $(e.target).closest(".filter-item").siblings('.filter-item').removeClass("filter-expend");
            $(e.target).closest(".filter-item").toggleClass("filter-expend");
            filterTitle = $(this).find('.filter-item-title').text();
            cateTitle = $('#hidEncryptFCateID').attr('data-title');
            //ht.sendCustomEvent("xkzx_cp_catefilter",{"cateName":cateTitle,"cateId":cateId,"parentName":filterTitle,"filterId":"","filterName":""});
            isAddKaiyingDiv(); //判断页面底部是否添加撑起的像素高度
        }).on('click', ".filter-detail-item", function(e) {
            filterEvent(e);
        }).on('click', ".filter-reset", function() {
            var $filterContent = $(".filter-content");
            $filterContent.find(".filter-item").removeClass("filter-expend");
            $filterContent.find(".filter-check-more").html("全部");
            $filterContent.find(".filter-detail").attr("data-selected", "全部");
            $filterContent.find(".filter-detail-text").removeClass("filter-checked");

        });

    }
});

function isAddKaiyingDiv() { //判断页面底部是否添加撑起的像素高度
    var contHeight = $("#filter-content").height(); //列表内容总高度
    var dClientHeiht = document.documentElement.clientHeight; //视窗高度
    var navHeight = $(".xs_jg_kc_he").height(); //顶部导航高度
    var bottomNavHeight = $(".yk-daohang").height(); //底部导航高度

    if ((contHeight + navHeight + bottomNavHeight) > dClientHeiht) {
        $(".item_kaiyingshijian").find(".kc_db_bottom").show().removeClass("displaynone");
    } else {
        $(".item_kaiyingshijian").find(".kc_db_bottom").hide();
    }
}
//课程也总体切换功能
$(function() {
    if (pageConfig.coursepage) {
        var kejian = ($(window).height());
        $(".swiper-no-swiping").css({ 'height': kejian - 44 + "px" });
        if ($(".swiper-container").length > 0) {
            function setCurrentSlide(ele, index) {
                $(".swiper1 .swiper-slide").removeClass("selected");
                ele.addClass("selected");
                //swiper1.initialSlide=index;
            }

            var swiper1 = new Swiper('.swiper1', {
                slidesPerView: 5.5,
                paginationClickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                spaceBetween: 0, //slide之间的距离（单位px）。
                freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
                loop: false, //是否可循环
                onTab: function(swiper) {
                    var n = swiper1.clickedIndex;
                }
            });
            swiper1.slides.each(function(index, val) {
                var ele = $(this);
                ele.on("click", function() {
                    setCurrentSlide(ele, index);
                    swiper2.slideTo(index, 300, false);
                    //mySwiper.initialSlide=index;
                    $(".swiper2 .swiper-slide").scrollTop(0);
                });
            });
            var swiper2 = new Swiper('.swiper2', {


                //freeModeSticky  设置为true 滑动会自动贴合
                direction: 'horizontal', //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
                loop: false,
                autoHeight: false, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
                onSlideChangeEnd: function(swiper) { //回调函数，swiper从一个slide过渡到另一个slide结束时执行。
                    var n = swiper.activeIndex;
                    setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
                    swiper1.slideTo(n, 300, false);
                }
            });
        }
    }




});
//分类页功能
$(function() {
    $(".sortleft ul li").click(function() {
        if ($(this).hasClass("fenlei_has3")) {
            var thisindex = $(this).index();
            // console.log(thisindex)
            // $(".sortrightdiv").eq(thisindex+1).hide();
            $(this).parents(".classright").find(".sortmid").addClass("active_not3");
        } else {
            $(this).parents(".classright").find(".sortmid").removeClass("active_not3");
        }
        var index = $(".sortleft ul li").index(this);
        $(".sortright").hide();
        $(".sortleft ul li").removeClass("online");
        $(this).addClass("online");
        $(".sortmid .sortmiddle").hide();
        $(".sortmid .sortmiddle").eq(index).show();
        //默认选择第一项
        $(".sortmid .sortmiddle li").removeClass("online");
        $(".sortmid .sortmiddle").eq(index).find("li:first").addClass("online");
        $(".sortright").hide();
        $(".sortrightdiv").eq(index).show().siblings(".sortrightdiv").hide();
        $(".sortrightdiv").eq(index).find(".sortright:first").show();
    });

    //2017-4-27 行政区参数和定位参数不再使用url传值
    var qu = $.cookie('qu');
    if ($.trim(qu) != "") {
        $(".sortright a").each(function() {
            $(this).attr("href", $(this).attr("href") + "?k=qu_" + qu);
        });
    }
});
$(function() {
    $(".sortmiddle ul li").click(function() {
        var index = $(this).index();
        $(".sortmiddle ul li").removeClass("online");
        $(this).addClass("online");
        $(".sortright").hide();
        $(".sortrightdiv:visible .sortright").eq(index).show();

    });

    //城市切换
    $(document).on("click", ".logoMiddle", function() {
        var redirect = $("#hdnRedirect").val();
        if (!redirect || redirect == undefined || redirect == "") {
            redirect = "0";
        }
        var cityename = $("#locations").attr("data-cityename");
        //        window.location.href = "/location/?city=" + cityename + "&redirect=" + redirect;
    });

    var building = $.cookie('building');
    var location = $.cookie("location");
    if (!building || building == "" || !location || location == "") {
        //relocation();
    }
    //2016-12-29 引入查询位置，使用查询位置赋值
    if ($.cookie("s_building") && $.cookie("s_building") != $("#locations").text()) {
        //2017-1-9 需要判断城市是否一致，不一致则需要将定位信息清空，如切换城市，则之前的定位信息需要丢弃
        var city = "bj";
        if (city != $.cookie("s_cityename")) {
            //            $.cookie('s_location', "", { expires: -1, domain: 'jiaoyubao.cn', path: '/' });
            //            $.cookie('s_building', "", { expires: -1, domain: 'jiaoyubao.cn', path: '/' });
            //            $.cookie('s_cityname', "", { expires: -1, domain: 'jiaoyubao.cn', path: '/' });
            //            $.cookie('s_cityename', "", { expires: -1, domain: 'jiaoyubao.cn', path: '/' });
        } else {
            $("#locations").text($.cookie("s_building"));
        }
    }
});
$(function() {
    //根据参数定位
    var t = $.cookie('edu_t');
    if ($.trim(t) != "") {
        //遍历一级类别
        var o = $(".sortleft li:contains(" + t + ")");
        if (o && o.length > 0) {
            $(o).trigger("click");
        } else {
            //遍历二级类别
            o = $(".sortmiddle li:contains(" + t + ")");
            if (o && o.length > 0) {
                //一级选中
                var i = $(o).parents(".sortmiddle").index();
                $(".sortleft li").eq(i).trigger("click");
                $(o).trigger("click");
            }
        }
    }

});

$(function() {
    $.publicapp.mobilegoBack();
});



(function($) {
    // $.fn.xcx_ann = function(settings) {
    //     var htmles = '<div class="xcx_tc"><div class="xcx_ann" id="xcx_ann"><i class="iconfont">&#xe644;</i><span class="xcx_ann_span">收起</span><span class="xcx_ann_sp">快速导航</span><div class="clear"></div></div><ul class="xcx_ul_t"><li><a href="https://m.xialingying.cc/"><i class="iconfont">&#xe608;</i><span>首页</span></a></li><li><a href="https://m.xialingying.cc/city/"><i class="iconfont">&#xe650;</i><span>城市</span></a></li><li><a href="https://search.m.xialingying.cc/list/advanced"><i class="iconfont">&#xe603;</i><span>搜索</span></a></li><li><a href="https://user.m.xialingying.cc/"><i class="iconfont">&#xe63b;</i><span>我的</span></a></li><div class="clear"></div></ul></div><div class="ks_dang_mb"></div>';
    //     $('body').append(htmles);
    //     $("#xcx_ann").click(function() {
    //         $(this).parents(".xcx_tc").toggleClass("xcx_tces");
    //         $(".ks_dang_mb").toggleClass("on");
    //     });
    //     $(".ks_dang_mb").click(function() {
    //         $(this).removeClass("on");
    //         $(".xcx_tc").removeClass("xcx_tces");
    //     });
    // };
})(jQuery);
$(function() {
    $("#J-g-header-cate2").click(function() {
        $(".xcx_tc").toggleClass("none");
        $(".ks_dang_mb").toggleClass("none");
    });
    $(".ss_mark").click(function() {
        $(".xcx_tc").toggleClass("none");
        $(".ks_dang_mb").toggleClass("none");
    });

});

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) { return arrEntities[t]; });
}

// var urlString = "http://xly.pro.youzewang.com/index.php?";
// var imgHead = "http://xly.pro.youzewang.com/data/upload/";

//var urlString = "http://47.98.42.175/index.php?";
//var imgHead = "http://47.98.42.175/data/upload/";

setTimeout(function(){
    if(IsPc()){
        $('.xs_jg_bnav').hide();
    }
}, 1000);

 var urlString = "http://www.jdnjsd.com/index.php?";
 var imgHead = "http://www.jdnjsd.com/data/upload/";

$('.login').click(function() {
    var token = localStorage.getItem("token");
    if (token) {
        var phone = localStorage.getItem("u_phone");
        if (phone) {
            window.location.href = "orderList.html?u_phone=" + phone;
        }

    } else {
        window.location.href = "login.html";
    }
})

function setTypeContent() {
    $.getJSON(urlString + "g=Api&m=CommonApi&a=getTypeList",
        function(data) {
            var html = "";

            data.reduce(function(pre, item, index) {

                html += ' <li><a href="index.html?&type=' +
                    item.name + '">' + item.name + '</a></li>';

                return item;
            }, 0);

            $(".pull-links").append(html);

        });
}

function IsPc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    
    return flag;
}