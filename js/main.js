(function (windoW, Food, Snake) {
  var food = new Food();
  var snake = new Snake();

  document.querySelector(".tip").addEventListener("click",function () {
    this.style.display="none";
    snake.move(food);
  });

  document.addEventListener("keydown",function (e) {
    switch (e.keyCode){
      case 37:
        if(snake.direction!="right"){
          snake.direction = 'left';
        }
        break;
      case 38:
        if(snake.direction!="down") {
          snake.direction = 'up';
        }
        break;
      case 39:
        if(snake.direction!="left") {
          snake.direction = 'right';
        }
        break;
      case 40:
        if(snake.direction!="up") {
          snake.direction = 'down';
        }
        break;
    }
  });


})(window, Food, Snake);


