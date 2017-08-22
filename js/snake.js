(function (window,util) {
  var that;
  var map=document.querySelector(".map");

  function Snake(options) {   //蛇的数据
    that=this;
    options=options||{};
    that.width=options.width||20;
    that.height=options.height||20;
    that.direction='right';
    that.dirTopBar=0;
    that.dirLeftBar=1;
    that.number=0;
    that.bodyArr=[
      {
        top:2,
        left:3,
        backgroundColor:'deeppink',
        element: document.createElement('div')
      },
      {
        top:2,
        left:2,
        backgroundColor:'hotpink',
        element: document.createElement('div')
      },
      {
        top:2,
        left:1,
        backgroundColor:'hotpink',
        element: document.createElement('div')
      },
      {
        top:2,
        left:0,
        backgroundColor:'hotpink',
        element: document.createElement('div')
      }
    ];

    that.init();
    document.querySelector(".number").innerHTML=that.number;
  }

  Snake.prototype.init=function () {
    that.bodyArr.forEach(function (item,index) {
      var div=item.element;
      if(index==that.bodyArr.length-1){
        div.style.border="5px solid transparent";
        div.style.backgroundClip="content-box";
      }else if(index==that.bodyArr.length-2){
        div.style.border="3px solid transparent";
        div.style.backgroundClip="content-box";
      }else if(index==that.bodyArr.length-3){
        div.style.border="1px solid transparent";
        div.style.backgroundClip="content-box";
      }
      div.style.width=that.width+'px';
      div.style.height=that.height+'px';
      div.style.boxSizing="border-box";
      div.style.top=item.top*that.height+"px";
      div.style.left=item.left*that.width+"px";
      div.style.backgroundColor=item.backgroundColor;
      div.style.borderRadius="50%";
      div.style.position="absolute";
      map.appendChild(div);
    });
  };

  Snake.prototype.move=function (food) {
    var emp=function () {
      for(var i=that.bodyArr.length-1;i>0;i--){      //让蛇身动起来
        that.bodyArr[i].top=that.bodyArr[i-1].top;
        that.bodyArr[i].left=that.bodyArr[i-1].left;
        that.bodyArr[i].element.style.top=that.bodyArr[i].top*that.height+"px";
        that.bodyArr[i].element.style.left=that.bodyArr[i].left*that.width+"px";
      }

      var head=that.bodyArr[0];
      switch (that.direction){    //蛇头根据方向移动
        case 'left':
          head.left-=1;
          head.element.style.left=head.left*that.width+"px";
          that.dirTopBar= 0;
          that.dirLeftBar= -1;
          break;
        case 'right':
          head.left+=1;
          head.element.style.left=head.left*that.width+"px";
          that.dirTopBar= 0;
          that.dirLeftBar= 1;
          break;
        case 'up':
          head.top-=1;
          head.element.style.top=head.top*that.height+"px";
          that.dirTopBar= -1;
          that.dirLeftBar= 0;
          break;
        case 'down':
          head.top+=1;
          head.element.style.top=head.top*that.height+"px";
          that.dirTopBar= 1;
          that.dirLeftBar= 0;
          break;
      }

      var headTop=head.top*that.height;
      var headLeft=head.left*that.width;
      if(headTop==food.top&&headLeft==food.left){  //如果蛇吃到食物
        food.render();
        that.bodyArr.unshift({
          //top:head.top+that.dirTopBar,
          //left:head.left+that.dirLeftBar,
          top:head.top,
          left:head.left,
          backgroundColor:food.backgroundColor,
          element: document.createElement('div')
        });

        that.init();
        that.number++;
        document.querySelector(".number").innerHTML=that.number;

        clearInterval(timer);
        var time=300-that.number*20;
        if(time<10){
          time=10;
        }
        console.log(time);
        timer=setInterval(emp,time);
      }

      if(headTop<0||headTop>=map.offsetHeight||headLeft<0||headLeft>=map.offsetWidth){  //蛇碰到墙壁，游戏结束
        clearInterval(timer);
        that.over();
      }

      /*if (that.direction === 'right' && (head.left + 1) * that.width >= 800) {
        clearInterval(timer);
        return setTimeout(function () {
          that.over();
        },100);
      } else if (that.direction === 'left' && (head.left - 1) * that.width < 0) {
        clearInterval(timer);
        return setTimeout(function () {
          that.over();
        },100);
      } else if (that.direction === 'up' && (head.top - 1) * that.height < 0) {
        clearInterval(timer);
        return setTimeout(function () {
          that.over();
        },100);
      } else if (that.direction === 'down' && (head.top + 1) * that.width >= 600) {
        clearInterval(timer);
        return setTimeout(function () {
          that.over();
        },100);
      }*/

      that.bodyArr.forEach(function (item,i) {    //蛇碰到自己，游戏结束
        if(i>1){
          if(headTop==item.top*that.height&&headLeft==item.left*that.width){
            clearInterval(timer);
            that.over();
          }
        }
      })

    };

    var timer=setInterval(emp,300);

    Snake.prototype.over=function () {
      if(that.number>15){
        alert('能吃到 '+that.number+' 个的大神，请接收我的膜拜');
      }else if(that.number==15){
        alert('你真牛逼，能吃到 '+that.number+' 个');
      }else if(that.number>12){
        alert('切，你只吃到了'+that.number+'个,游戏名字叫“挑战15个”');
      }else {
        alert('唉，你这才吃到了'+that.number+'个,离15个差远了');
      }

      window.location.reload();//重新加载页面
    }

  };

  window.Snake=Snake;
})(window,util);


