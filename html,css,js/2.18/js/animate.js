function animate(obj, target,callback) {
    //   console.log(callback); callback=function(){}调用的时候callback()
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      let step = (target - obj.offsetLeft) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.offsetLeft == target) {
        clearInterval(obj.timer);
        //回调函数写到定时器结束里面
        // if (callback) {
        //     // 调用函数
        //     callback();
        // }
        callback && callback();
      }
      obj.style.left = obj.offsetLeft + step + "px";
    }, 15);
  }