$(function () {
  // 当我们点击了小li 此时不需要执行 页面滚动事件里面的li 的背景选择添加current
  // 节流阀 互斥锁
  let flag = true;
  // 显示隐藏电梯导航
  let toolTop = $(".floor").offset().top;
  toggleTool();
  function toggleTool() {
    if ($(document).scrollTop() >= toolTop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }
  }
  $(window).scroll(function () {
    toggleTool();
    // 页面滚动到某个内容区域，左侧电梯导航小li相应的删除添加current类名
    if (flag) {
      $(".floor .w").each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          // console.log(i);
          $(".fixedtool li")
            .eq(i)
            .addClass("current")
            .siblings()
            .removeClass("current");
        }
      });
    }
  });
  //  点击电梯导航页面可以滚动到相应的内容区域
  $(".fixedtool li").click(function () {
    flag = false;
    console.log($(this).index());
    // 当我们每次点击小li 就需要计算页面要去往的位置
    // 选出对应索引号的内容区的盒子 计算他的 .offset().top值
    let current = $(".floor .w").eq($(this).index()).offset().top;
    // 页面动画滚动效果
    $("body,html")
      .stop()
      .animate(
        {
          scrollTop: current,
        },
        function () {
          flag = true;
        }
      );
    // 点击之后让当前的小li添加current类名  其他的移除
    $(this).addClass("current").siblings().removeClass("current");
  });
});
