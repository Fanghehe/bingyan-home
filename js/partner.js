/**
 * Created by fang on 14-6-9.
 */
$(function(){
    var MemberImg = function(elem,src,json){//
        this.elem = elem;
        this.src = src;
        this.num = 0;
        this.jsonName = json;
        this.jsonData = null;
        this.loadImg = function(){//图片预加载
            var img = new Image();
            img.onload = function(){
                img.onload = null;
            }
            img.src  = 'img/'+this.src;
        };
        this.loadJson = function(){
            var that = this;
            $.getJSON('json/'+that.jsonName,function(data){
                that.jsonData = data;
                that.num = data.length;
                that.insertElem();
                that.setBg();
                arrowHover.resetSqr();//读取完文件之后才能读取DOM
            })
        };
        this.insertElem = function(){
            var that = this;
            var fragment = document.createDocumentFragment();//用文档碎片减少DOM操作
            for(var i=0;i<that.num;i++){
                var div = document.createElement("div");
                var divIn = document.createElement("div");
                var pG = document.createElement("p"),
                    pN = document.createElement("p");
                var index = i+1;
                div.className = "item item"+index;
                divIn.className = "item-hover";
                pG.className = "item-group";
                pN.className = "item-name";
                pG.appendChild(document.createTextNode(that.jsonData[i].group));
                pN.appendChild(document.createTextNode(that.jsonData[i].name));
                divIn.appendChild(pG);
                divIn.appendChild(pN);
                div.appendChild(divIn);
                fragment.appendChild(div);
            }
            that.elem.append(fragment);
        };
        this.setBg = function(){
            var that = this;
            $('div.item').css('background-image',"url('img/"+that.src+"')");
        }
        this.init = function(){
            this.loadImg();
            this.loadJson();
        }
    }
    var img2010 = new MemberImg($('#group-2010'),'p2010.png','2010.json');
    var img2009 = new MemberImg($('#group-2009'),'p2009.png','2009.json');
    var img2011 = new MemberImg($('#group-2011'),'p2011.png','2011.json');
    img2010.init();
    img2009.init();
    img2011.init();


    var arrowHover = { //优化箭头hover,click的效果
        wrap : $('.group-item'),
        arrows : $('.arrow'),
        parPos : null,
        items : [],
        absPos : function(elem){//获取绝对位置
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            while(elem = elem.offsetParent){
                x += elem.offsetLeft;
                y += elem.offsetTop;
            }
            return {"x": x, "y": y};
        },
        resetSqr : function(){//每当用户点击，就重新绑定Hover
            var that = this;
            for(var i = 0,l = that.items.length;i<l;i++){
                that.items[i].unbind();
            }
            that.items.length = 0;//释放内存
            that.wrap.each(function(e){
                //console.log(($(this).attr('show')));
                if(!!Number($(this).attr('show'))){
                    var elem = null;
                    if($(this).find('.item9').length){
                        elem = $(this).find('.item9');
                        that.items.push(elem);
                        var pos9 = that.absPos(elem.get(0));
                        elem.bind('mousemove',function(e){
                            var mx = e.pageX-pos9.x,my = e.pageY-pos9.y;
                            //console.log(pos9.y);
                            if(mx-my<-50){
                                that.arrows.css('zIndex',2);
                            }
                        });
                    }
                    if($(this).find('.item10').length){
                        elem = $(this).find('.item10');
                        that.items.push(elem);
                        var pos11 = that.absPos(elem.get(0));
                        elem.bind('mousemove',function(e){
                            var mx = e.pageX-pos11.x,my = e.pageY-pos11.y;
                            //console.log(mx+my);
                            if(mx+my>150){
                                that.arrows.css('zIndex',2);
                            }
                        });
                    }
                    if($(this).find('.item11').length){
                        elem = $(this).find('.item11');
                        that.items.push(elem);
                        var pos11 = that.absPos(elem.get(0));
                        elem.bind('mousemove',function(e){
                            var mx = e.pageX-pos11.x,my = e.pageY-pos11.y;
                            if(mx+my<50){
                                //console.log(mx+my);
                                that.arrows.css('zIndex',2);
                            }
                        });
                    }

                    if($(this).find('.item12').length){
                        elem = $(this).find('.item12');
                        that.items.push(elem);
                        var pos12 = that.absPos(elem.get(0));
                        elem.bind('mousemove',function(e){
                            var mx = e.pageX-pos12.x,my = e.pageY-pos12.y;
                           // console.log(pos12.y);
                            if(mx-my>50){
                                that.arrows.css('zIndex',2);
                            }
                        });

                    }
                }

            });
            console.log(that.items.length);
            for(var i = 0,len =  that.items.length;i<len;i++){
                that.items[i].bind('mouseleave',function(e){
                   // console.log('leave');
                    that.arrows.css('zIndex',2);
                });
            }

        },
        init : function(){
            var that = this;
//            that.arrows.unbind();
            that.arrows.eq(0).bind('mousemove',function(e){
                var pos = that.absPos(this);
                var mx = e.pageX-pos.x,my = e.pageY-pos.y;
                if(that.items.length >= 3){
                    if((mx-my>50)||(mx+my>150)){//9,11
                        $(this).css('zIndex','0');
                    }
                }else if(that.items.length>=1){
                    if((mx-my>50)){
                        $(this).css('zIndex','0');
                    }
                }

            });
            that.arrows.eq(1).bind('mousemove',function(e){
                var pos = that.absPos(this);
                var mx = e.pageX-pos.x,my = e.pageY-pos.y;
                if(that.items.length >= 4){
                    if((mx-my<-50)||(mx+my<50)){//12、10
                        $(this).css('zIndex','0');
                    }
                }else if(that.items.length>=2){
                   // console.log(mx+my);
                    if(mx+my<50){
                        $(this).css('zIndex','0');
                    }
                }

            });
        }
    };

    var arrow = {//点击的切换效果
      arrow : $('.arrow'),
      index : 2,//从第二张开始
      sqr : $('.group-item'),
      addListener : function(){
        var that = this;
        var len = that.sqr.length;
        this.arrow.bind('click',function(e){
         //  console.log(that.arrow.length);
            //console.log($(this).index());
            if($(this).index()==4){//右箭头
                that.index++;
                if(len-that.index>=0&&that.index>=1){
                    that.sqr.eq(that.index-2).attr('show',0).removeClass('FID').removeClass('FIU').removeClass('FOU').addClass('FOD');
                    setTimeout(function(){
                        that.sqr.eq(that.index-1).attr('show',1).removeClass('FOD').removeClass('FIU').removeClass('FOU').addClass('FID');//index-1实为index-1++=index
                        arrowHover.resetSqr();
                    },300);

                }
            }else if($(this).index()==3){//左箭头
                //console.log('左箭头');
                that.index--;
                if(len-that.index>=0&&that.index>=1){
                    that.sqr.eq(that.index).attr('show',0).removeClass('FID').removeClass('FIU').removeClass('FOD').addClass('FOU');
                    setTimeout(function(){
                        that.sqr.eq(that.index-1).attr('show',1).removeClass('FID').removeClass('FOU').removeClass('FOD').addClass('FIU');
                        arrowHover.resetSqr();
                    },300);
                }
            }
            if(len-that.index>0&&that.index>1){
//                console.log(len-that.index);
                that.arrow.eq(0).html(2007+that.index+'届');
                that.arrow.eq(1).html(2009+that.index+'届');
            }else if(that.index<=1){
                that.index = 1;
                that.arrow.eq(0).html('破蛋而出');
                that.arrow.eq(1).html(2009+that.index+'届');
            }else if(that.index>=len){
//                console.log(2009+that.index);
                that.index = len;
                that.arrow.eq(0).html(2007+that.index+'届');
                that.arrow.eq(1).html('未完待续');
            }
        })
      },
      init : function(){
           this.addListener();
      }
    }
    arrowHover.init();
    arrow.init();
    function addLoadEvent(func){
        var oldload = window.onload;
        if(typeof window.onload != 'function'){
            window.onload =  func;
        }else{
            window.onload = function(){
                oldload();
                func();
            }
        }
    }
})

