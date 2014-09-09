/**
 * Created by fang on 14-6-3.
     */
$(function(){
    var wW = $(window).width();//获取屏幕宽和高
    var wH = $(window).height();
//    var bH = $('body').height(),dH = $('div.index_down').height();//获取body高度
    //$('#index_wrap').height(dH);//撑开页面高度，让动画更加流畅
//    $('html').height(bH+dH);
//    $('body').height(bH);
    $(window).resize(function(){
        wW = $(window).width();//获取屏幕宽和高
        wH = $(window).height();
        indexBg.resize();
        indexBg1.resize();
        indexBg2.resize();
        indexBg3.resize();
        indexBg4.resize();
        indexBg5.resize();
    });
    var BG = function(elem,w,h){//判断屏幕的长宽比缩放背景使撑满屏幕
        this.elem = elem;
        this.w = w;
        this.h = h;
        this.resize();
    }
    BG.prototype = {
        resize:function(){
            wW/wH<this.w/this.h? this.elem.css("background-size", "auto 100%"):this.elem.css("background-size", "100% auto");
        }
    }
    var indexBg = new BG($('body'),1500,912);
    var indexBg1 = new BG($('.bg1'),1100,461);
    var indexBg2 = new BG($('.bg2'),1200,720);
    var indexBg3 = new BG($('.bg3'),1300,674);
    var indexBg4 = new BG($('.bg4'),1300,863);
    var indexBg5 = new BG($('.bg5'),1288,638);
    var indexImg = function(elem,src,circle){
        this.elem = elem;
        this.src = src;
        this.circle = circle;
        this.circleCover = this.circle.prev('.circle_cover');
        this.name = this.circle.prevAll('.name');
        this.blackWrap = this.circle.prevAll('.circle_cover_black');
        this.loadImg = function(){//图片预加载
            var img = new Image();
            var that = this;
            img.onload = function(){
                console.log('url:('+that.src+')');
                that.elem.css('background-image',"url("+that.src+")");
                img.onload = null;
            }
            img.src = this.src;
        };
        this.bind = function(){
            var that = this;
            this.circle.bind('mouseenter',function(e){
                clearTimeout(t);
                that.circleCover.addClass('hover').removeClass('leave');
                that.name.hide();
                that.blackWrap.hide();
                console.log(that.blackWrap.length);
                if(firstTriger){
                    firstTriger = false;
                    that.elem.fadeIn(600);
                    return
                }
                t = setTimeout(function(){
                    that.elem.fadeIn(600);
                },600);
            });
            this.circle.bind('mouseleave',function(e){
                clearTimeout(t);
                clearTimeout(trigerT);
                trigerT = setTimeout(function(){
                    firstTriger = true;
                },300);
                that.circleCover.removeClass('hover').addClass('leave');
                that.name.show();
                that.blackWrap.show();
                that.elem.fadeOut(300);
            })
        };
        this.init = function(){
            this.loadImg();
            this.bind();
        }
    }
    //t用于函数节流
    var t = null;
    var trigerT = null;
    var firstTriger = true;
    var ib1 = new indexImg($('div.bg1'),'img/team_dim.jpg',$('.cc1'));
    var ib2 = new indexImg($('div.bg2'),'img/group_dim.jpg',$('.cc2'));
    var ib3 = new indexImg($('div.bg3'),'img/pro_dim.jpg',$('.cc3'));
    var ib4 = new indexImg($('div.bg4'),'img/partner_dim.jpg',$('.cc4'));
    var ib5 = new indexImg($('div.bg5'),'img/recruit.jpg',$('.cc5'));
//
//
//
    var indexDown = {   //首页下拉
        downBtn : $('#slide_down'),
        downCtx : $('.index_down').eq(0),
        logo : $('.w_logo').eq(0),
        circle : $('#circle_group'),
        arrow : $('.arrow').eq(0),
        flag : false,
        init : function(){
            var that = this;
            this.downBtn.bind('click',function(e){
                if(!that.flag){
                    that.downCtx.addClass('up');
                    if(that.downCtx.hasClass('down')){
                        that.downCtx.removeClass('down');
                    }
                    that.logo.fadeOut(200);
                    that.circle.fadeOut(200);
//                    that.arrow.fadeOut(200);
//                    setTimeout(function(){
//                        $('body').css('overflow','visible')
//                    },500)

                }else{
                    that.downCtx.removeClass('up');
                    that.downCtx.addClass('down');
                    that.logo.fadeIn(200);
                    that.circle.fadeIn(200);
                    that.arrow.fadeIn(200);
                    $('body').scrollTop(0);
//                    setTimeout(function(){
//                        $('body').css('overflow','hidden')
//                    },500)
                }
                that.flag = !that.flag;

            })
        }
    }
    indexDown.init();
    $('body').scrollTop(0);
    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }
    addLoadEvent(function(){ib1.init()});
    addLoadEvent(function(){ib2.init()});
    addLoadEvent(function(){ib3.init()});
    addLoadEvent(function(){ib4.init()});
    addLoadEvent(function(){ib5.init()});
})
