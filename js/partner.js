/**
 * Created by fang on 14-6-9.
 */
$(function(){
//    var MemberImg = function(elem,src,json){//采用本地存贮的方式，但是不方便维护
//        this.elem = elem;
//        this.src = src;
//        this.num = 0;
//        this.jsonName = json;
//        this.jsonData = null;
//        this.loadImg = function(){//图片预加载
//            var img = new Image();
//            img.onload = function(){
//                img.onload = null;
//            }
//            img.src  = 'img/'+this.src;
//        };
//        this.loadJson = function(){
//            var that = this;
//            $.getJSON('json/'+that.jsonName,function(data){
//                that.jsonData = data;
//                that.num = data.length;
//                that.insertElem();
//                that.setBg();
//                arrowHover.resetSqr();//读取完文件之后才能读取DOM
//            })
//        };
//        this.insertElem = function(){
//            var that = this;
//            var fragment = document.createDocumentFragment();//用文档碎片减少DOM操作
//            for(var i=0;i<that.num;i++){
//                var div = document.createElement("div");
//                var divIn = document.createElement("div");
//                var pG = document.createElement("p"),
//                    pN = document.createElement("p");
//                var index = i+1;
//                div.className = "item item"+index;
//                divIn.className = "item-hover";
//                pG.className = "item-group";
//                pN.className = "item-name";
//                pG.appendChild(document.createTextNode(that.jsonData[i].group));
//                pN.appendChild(document.createTextNode(that.jsonData[i].name));
//                divIn.appendChild(pG);
//                divIn.appendChild(pN);
//                div.appendChild(divIn);
//                fragment.appendChild(div);
//            }
//            that.elem.append(fragment);
//        };
//        this.setBg = function(){
//            var that = this;
//            $('div.item').css('background-image',"url('img/"+that.src+"')");
//        }
//        this.init = function(){
//            this.loadImg();
//            this.loadJson();
//        }
//    }
//    var img2010 = new MemberImg($('#group-2010'),'p2010.png','2010.json');
//    var img2009 = new MemberImg($('#group-2009'),'p2009.png','2009.json');
//    var img2011 = new MemberImg($('#group-2011'),'p2011.png','2011.json');
//    img2010.init();
//    img2009.init();
//    img2011.init();


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
                    if($(this).find('.item2').length){
                        elem = $(this).find('.item2');
                        that.items.push(elem);
                        var pos11 = that.absPos(elem.get(0));
                        elem.bind('mousemove',function(e){
                            var mx = e.pageX-pos11.x,my = e.pageY-pos11.y;
                            if(mx+my>450){
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

                    if($(this).find('.item8').length){
                        elem = $(this).find('.item8');
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
    arrowHover.resetSqr();
    var arrow = {//点击的切换效果
        arrow : $('.arrow'),
        sqr : $('.group-item'),//一共有多少届
        len : $('.group-item').length,
        index : 0,//从第几张开始
        itemArr : new Array(this.len),//存放所有的item的集合
        TIME_INTERVAL:50,
        ANIMATE_TIME_INTERVAL:250,
        setStart : function(){
            var that = this;
            this.sqr.each(function(e){
                if($(this).attr('show')=='1'){
                    that.index = $(this).index();
                }
                var childLen = $(this).find('.item').length;
                if(!childLen){
                    $(this).html('暂无照片╮(╯▽╰)╭。。。');
                }
            })
            if(that.index>0){
                that.arrow.eq(0).html(that.index-1+1999+'届');
            }else{
                that.arrow.eq(0).html('破蛋而出');
            }
            if(that.index<that.len-1){
                that.arrow.eq(1).html(that.index+1+1999+'届');
            }else{
                that.arrow.eq(1).html('未完待续');
            }

        },
//        addListener : function(){
//            var that = this;
//            this.arrow.bind('click',function(e){
//                if($(this).hasClass('arrow_r')){//右箭头
//                    if(that.index<that.len-1){//确保不是最后一张
//                        that.sqr.eq(that.index).attr('show',0).removeClass('FID').removeClass('FIU').removeClass('FOU').addClass('FOD');
//                        setTimeout(function(){
//                            that.sqr.eq(that.index).attr('show',1).removeClass('FOD').removeClass('FIU').removeClass('FOU').addClass('FID');
//                            arrowHover.resetSqr();
//                        },300);
//                        that.index++;
//                    }
//                }else if($(this).hasClass('arrow_l')){//左箭头
//                    if(that.index>0){//确保不是第一张
//                        that.sqr.eq(that.index).attr('show',0).removeClass('FID').removeClass('FIU').removeClass('FOD').addClass('FOU');
//                        setTimeout(function(){
//                            that.sqr.eq(that.index).attr('show',1).removeClass('FID').removeClass('FOU').removeClass('FOD').addClass('FIU');
//                            arrowHover.resetSqr();
//                        },300);
//                        that.index--;
//                    }
//                }
//                if(that.index>0){
//                    that.arrow.eq(0).html(that.index-1+1999+'届');
//                }else{
//                    that.arrow.eq(0).html('破蛋而出');
//                }
//                if(that.index<that.len-1){
//                    that.arrow.eq(1).html(that.index+1+1999+'届');
//                }else{
//                    that.arrow.eq(1).html('未完待续');
//                }
//            })
//        },
        setAngle:function(){
            var self = this;
            this.sqr.each(function(){
                var _childs = $(this).find('.item');
                _childs.addClass('flip');
                if($(this).attr('show')==0){
                    _childs.addClass('out-right');
                }
                $(this).addClass('viewport-flip');
            })
        },
        //把所有的item存到对应的数组里面
        getAllLists:function(){
          var self = this;
          for(var i=0;i<self.len;i++){
              self.itemArr[i] = [];
              var arr1 = [],arr2 = [],arr3 = [],arr4 = [],arr5 = [];
              arr1.push(self.sqr.eq(i).find('.item9'));
              arr1.push(self.sqr.eq(i).find('.item11'));
              arr2.push(self.sqr.eq(i).find('.item15'));
              arr2.push(self.sqr.eq(i).find('.item16'));
              arr2.push(self.sqr.eq(i).find('.item13'));
              arr2.push(self.sqr.eq(i).find('.item5'));
              arr3.push(self.sqr.eq(i).find('.item17'));
              arr3.push(self.sqr.eq(i).find('.item7'));
              arr3.push(self.sqr.eq(i).find('.item6'));
              arr3.push(self.sqr.eq(i).find('.item10'));
              arr3.push(self.sqr.eq(i).find('.item12'));
              arr3.push(self.sqr.eq(i).find('.item4'));
              arr4.push(self.sqr.eq(i).find('.item14'));
              arr4.push(self.sqr.eq(i).find('.item18'));
              arr4.push(self.sqr.eq(i).find('.item1'));
              arr4.push(self.sqr.eq(i).find('.item3'));
              arr5.push(self.sqr.eq(i).find('.item2'));
              arr5.push(self.sqr.eq(i).find('.item8'));
              self.itemArr[i].push(arr1);
              self.itemArr[i].push(arr2);
              self.itemArr[i].push(arr3);
              self.itemArr[i].push(arr4);
              self.itemArr[i].push(arr5);
          }
        },
        goRight:function(){
            var self = this;
            var _currentGroup = this.itemArr[self.index],
                _nextGroup = this.itemArr[self.index+1];
            self.sqr.eq(self.index+1).css('z-index',0).show();
            self.index++;//切换到下一层
            var moveRight = function(index,callback){
                for(var i = 0;i<_currentGroup[index].length;i++){
                    _currentGroup[index][i].removeClass('in-right').removeClass('in-left').addClass('out-right');
                }
                var callFunc = null;
                if(arguments.length==2){
                    callFunc= callback;
                }
                setTimeout(function(){
                    self.sqr.eq(self.index).attr('show',1);
                    for(var t = 0;t<_nextGroup[index].length;t++){
                        _nextGroup[index][t].removeClass('out-right').removeClass('out-left').addClass('in-left');
                    }
                    if(!!callFunc){
                        callFunc()
                    }

                },self.ANIMATE_TIME_INTERVAL)
            };
            setTimeout(function(){
                self.sqr.eq(self.index).attr('show',1)
                moveRight(4);
            },0);
            setTimeout(function(){
                moveRight(3);
            },self.TIME_INTERVAL);
            setTimeout(function(){
                moveRight(2);
            },2*self.TIME_INTERVAL);
            setTimeout(function(){
                moveRight(1);
            },3*self.TIME_INTERVAL);
            setTimeout(function(){
                moveRight(0,function(){self.sqr.eq(self.index-1).attr('show',0).hide()});
                self.sqr.eq(self.index).css('z-index',1)
                arrowHover.resetSqr();
            },4*self.TIME_INTERVAL);
        },
        goLeft:function(){
            var self = this;
            var _currentGroup = this.itemArr[self.index],
                _nextGroup = this.itemArr[self.index-1];
            self.sqr.eq(self.index-1).show();
            self.index--;//切换到下一层
            var moveRight = function(index,callback){
                for(var i = 0;i<_currentGroup[index].length;i++){
                    _currentGroup[index][i].removeClass('in-right').removeClass('in-left').addClass('out-left')
                }
                var callFunc = null;
                if(arguments.length==2){
                    callFunc = callback;
                }
                setTimeout(function(){
                    self.sqr.eq(self.index).attr('show',1);
                    for(var t = 0;t<_nextGroup[index].length;t++){
                        _nextGroup[index][t].removeClass('out-right').removeClass('out-left').addClass('in-right');
                    }
                    if(!!callFunc){
                        callFunc()
                    }
                },self.ANIMATE_TIME_INTERVAL)
            };
            setTimeout(function(){
                self.sqr.eq(self.index).attr('show',1)
                moveRight(0);
            },0);
            setTimeout(function(){
                moveRight(1);
            },self.TIME_INTERVAL);
            setTimeout(function(){
                moveRight(2);
            },2*self.TIME_INTERVAL);
            setTimeout(function(){
                moveRight(3);
            },3*self.TIME_INTERVAL);
            setTimeout(function(){
                moveRight(4,function(){self.sqr.eq(self.index+1).attr('show',0).hide()});
                arrowHover.resetSqr();
            },4*self.TIME_INTERVAL);
        },
        addListener : function(){
            var that = this;
            this.arrow.bind('click',function(e){
                if($(this).hasClass('arrow_r')){//右箭头
                    if(that.index<that.len-1){//确保不是最后一张
                        that.goRight();
                    }
                }else if($(this).hasClass('arrow_l')){//左箭头
                    if(that.index>0){//确保不是第一张
                        that.goLeft();
                    }
                }
                if(that.index>0){
                    that.arrow.eq(0).html(that.index-1+1999+'届');
                }else{
                    that.arrow.eq(0).html('破蛋而出');
                }
                if(that.index<that.len-1){
                    that.arrow.eq(1).html(that.index+1+1999+'届');
                }else{
                    that.arrow.eq(1).html('未完待续');
                }
            })
        },
        init : function(){
            this.setStart();
            this.setAngle();
            this.getAllLists();
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


