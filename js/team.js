/**
 * Created by fang on 14-6-25.
 */
$(function(){
    var ppt = {
        slideGroup:$(".slide-item"),
        btnGroup:$(".button-item"),
        index:0,
        t:null,//计时器变量
        setTimer:function(){
            var that = this;
            function checkClass(){
                that.index++;
                if(that.index>=3){
                    that.index=0;
                }
                that.slideGroup.removeClass('slideInRight').addClass('slideOutLeft');
                that.slideGroup.eq(that.index).removeClass('slideOutLeft').addClass('slideInRight');
                that.btnGroup.removeClass('now');
                that.btnGroup.eq(that.index).addClass('now');
                that.t = setTimeout(checkClass,2000);
            }
            that.t = setTimeout(checkClass,2000);
        },
        addListener:function(){
          var that = this;

          that.btnGroup.bind('click',function(e){
              clearTimeout(that.t);
              that.index = $(this).index();
              that.slideGroup.removeClass('slideInRight').addClass('slideOutLeft');
              that.slideGroup.eq(that.index).removeClass('slideOutLeft').addClass('slideInRight');
              that.btnGroup.removeClass('now');
              that.btnGroup.eq(that.index).addClass('now');
              that.setTimer();
          });
        },
        init:function(){
            this.setTimer();
            this.addListener();
        }
    }
    ppt.init();
    var Img = {
        wrap:$('#img-wrap'),
        img:$('.slide-item img').eq(0),
        init:function(){
           this.wrap.height(this.img.height());
        }
    }
    Img.init();
})
