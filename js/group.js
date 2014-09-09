/**
 * Created by fyh on 14-8-28.
 */
$(function(){
    var wW = $(window).width();//获取屏幕宽和高
    var wH = $(window).height()-100;
//    var W_TO_H = 1200/700;

    var BG = function(elem,w,h){//判断屏幕的长宽比缩放背景使撑满屏幕
        this.elem = elem;
        this.w = w;
        this.h = h;
        this.resize();
    }
    BG.prototype = {
        resize:function(){
            var self = this;
            if(wW/wH<this.w/this.h){
                //背景高度超出
                $('.group-wrap').css({"height": "100%","width":""});
                this.elem.css({"height": "100%","width":"auto"});
            }else{
                //背景宽度超出
                $('.group-wrap').css({"height": "","width":"100%"});
                this.elem.css({"width":"100%","height":"auto"});
            }
            $('.group-item').each(function(){
//                console.log(self.elem.height());
//                console.log($(this).attr('J_top'));
//                console.log(self.elem.height()*$(this).attr('J_top'));
                $(this).css('top',self.elem.height()*$(this).attr('J_top'));
                $(this).css('left',self.elem.width()*$(this).attr('J_left'));
            })
        }
    }


    $('.group-wrap').on('click','.group-item',function(e){
        $('.group-item').addClass('release').removeClass('active').find('.words').fadeOut(500);
        $(this).addClass('active').removeClass('release').find('.words').fadeIn(500);
    });
    window.onload = function(){
        $(window).resize(function(){
            wH = $(window).height()-100;
            wW = $(window).width();//获取屏幕宽和高
            bodyBg.resize();
        });
        var bodyBg = new BG($('.group-bg'),1200,720);
    }
})