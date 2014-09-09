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
                $('.team-words-wrap').removeClass('slideInRight').addClass('slideOutRight');
                that.slideGroup.eq(that.index).removeClass('slideOutLeft').addClass('slideInRight');
                setTimeout(function(){
                    $('.team-words-wrap').eq(that.index).removeClass('slideOutRight').addClass('slideInRight');
                },500);
                setTimeout(function(){
                    $('.team-words-wrap').eq(that.index).addClass('slideOutRight').removeClass('slideInRight');
                },7500);
                that.btnGroup.removeClass('now');
                that.btnGroup.eq(that.index).addClass('now');
                that.t = setTimeout(checkClass,8000);
            }
            that.t = setTimeout(checkClass,8000);
        },
        addListener:function(){
          var that = this;
          that.btnGroup.bind('click',function(e){
              clearTimeout(that.t);
              that.index = $(this).index();
              $('.team-words-wrap').removeClass('slideInRight').addClass('slideOutRight');
              that.t = setTimeout(function(){
                  that.slideGroup.removeClass('slideInRight').addClass('slideOutLeft');
                  that.slideGroup.eq(that.index-1).removeClass('slideOutLeft').addClass('slideInRight');
                  setTimeout(function(){
                      $('.team-words-wrap').eq(that.index-1).removeClass('slideOutRight').addClass('slideInRight');
                  },500);
                  that.btnGroup.removeClass('now');
                  that.btnGroup.eq(that.index-1).addClass('now');
                  that.setTimer();
              },500);

          });
        },
        init:function(){
            setTimeout(function(){
                $('.team-words-wrap').eq(0).removeClass('slideOutRight').addClass('slideInRight');

            },500);
            setTimeout(function(){
                $('.team-words-wrap').eq(0).addClass('slideOutRight').removeClass('slideInRight');
            },7500);
            this.setTimer();
            this.addListener();
        }
    }
    ppt.init();
    var Img = {
        wrap:$('#img-wrap'),
        img:$('.slide-item img').eq(0),
        init:function(){
           this.addListener();
           this.wrap.height(this.img.height());
        },
        addListener:function(){
            var that = this;
            $(window).resize(function(){
                that.wrap.height(that.img.height());
            })
        }
    }
    Img.init();
})
