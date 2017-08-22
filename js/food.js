(function (window,util) {
  var map=document.querySelector(".map");

  function Food(options) {  //定义食物数据
    options=options||{};
    this.width=options.width||20;
    this.height=options.height||20;
    this.backgroundColor="deeppink";
    this.top=0;
    this.left=0;
    this.element=document.createElement("div");

    this.init();
  }

  Food.prototype.init=function () {   //生成食物盒子
    var div=this.element;
    div.style.width=this.width+'px';
    div.style.height=this.height+'px';
    div.style.position='absolute';
    div.style.borderRadius='50%';

    this.render();
    map.appendChild(div);
  };

  Food.prototype.render=function () {   //随机食物位置和颜色
    var div=this.element;
    var that=this;
    setTimeout(function () {
      that.top=util.getRandom(0,map.offsetHeight/that.height)*that.height;
      that.left=util.getRandom(0,map.offsetWidth/that.width)*that.width;
      that.backgroundColor="rgb("+util.getRandom(50,256)+","+util.getRandom(50,256)+","+util.getRandom(50,256)+")";
      div.style.top=that.top+'px';
      div.style.left=that.left+'px';
      div.style.backgroundColor=that.backgroundColor;
    },10);
  };


  window.Food=Food;
})(window,util);



