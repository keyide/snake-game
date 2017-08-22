//获得随机数
(function (window) {
  var util={
    getRandom:function (min,max) {  //获取min-max间的随机数
      return Math.floor(Math.random()*(max-min)+min);
    }

  };

  window.util=util;
})(window);


