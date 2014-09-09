jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },

        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        }
    });
$(function(){
   workSlide = {
       slideWrap : $('#slide_wrap'),
       slideItem : $('li.slide_item'),
       winW : $('body').width(),
       macW : $('div.mac').width(),
       itemMR : 160,//item的右边距
       left : 0,//父容器left值
       setLength : function(){//设置富容器的宽度
           var len = this.slideItem.length,
               w = this.macW*len+this.itemMR*(len-1);
           this.slideItem.eq(len-1).css('margin-right',0);
           this.slideWrap.css('width',w);
       },
       setPos :function(){//设置父容器的初始位置
           this.left = this.winW/2-this.macW/2;
           this.slideWrap.css('left',this.left);
       },
       addListener : function(){   //绑定点击事件
           //nextT解决连续点击的问题
           var t = null,nextT = true;
           var  that = this;
           var _throttle = function(fn,delay,context){
               clearTimeout(nextT);
               nextT = setTimeout(function(){
                   fn.call(context);
               },delay)
           };
           this.slideItem.bind('mouseenter',function(e){
               clearTimeout(t);
               var index = $(this).index(),
                   dis = index*(that.macW+that.itemMR);
               // that.slideWrap.css('left',that.left-dis);
               var thatIn = $(this);
                   t = setTimeout(function(){
                       // console.log(that.left+' '+dis)
                       that.slideWrap.animate({left:that.left-dis},600,'easeOutCubic',function(){
                           that.slideItem.removeClass('light');
                           thatIn.addClass('light');
                       })
                   },500);

           });
       },
       init:function(){
           this.setLength();
           this.setPos();
           this.addListener();
       }
   }
    workSlide.init();
})