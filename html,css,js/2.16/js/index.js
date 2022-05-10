window.addEventListener("load",function(){
    // alert(11);
    let slider=document.querySelector(".slider");
    let arrowLeft=document.querySelector(".arrow-left");
    let arrowRight=document.querySelector(".arrow-right");
    let sliderWidth=slider.offsetWidth;

    //1,鼠标经过，左右按钮显示，鼠标离开，左右按钮隐藏
    slider.addEventListener("mouseover",function(){
        arrowLeft.style.display= "block";
        arrowRight.style.display= "block";
        clearInterval(timer);
    })
    slider.addEventListener("mouseout",function(){
        arrowLeft.style.display= "none";
        arrowRight.style.display= "none";
        timer=setInterval(function () {
            arrowRight.click();
        },1000);
    })

    //2，动态生成小圆圈
    let ul=document.querySelector("ul");
    let imgs=ul.children;
    let ol=document.querySelector(".circle");
    for(let i=0;i<imgs.length;i++)
    {
        let li=document.createElement("li");
        li.setAttribute("index",i); //记录当前小圆圈的索引号，通过自定义属性来做
        ol.appendChild(li);
        //3，小圆圈的排他思想，我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener("click",function () {
            for(let j=0;j<ol.children.length;j++){
                ol.children[j].className="";
            }
            this.className = "current";
            //4，点击小圆圈，移动图片，当然移动的是 ul ，ul 的移动距离=小圆圈的索引号乘以图片的宽度，注意是负值
            let index=this.getAttribute("index");//当我们点击了某个小 li ,就拿到当前小 li 的索引号
            //let sliderWidth=slider.offsetWidth; 下面右侧按钮点击事件也用到这个值，所以把它放到最上面
            num=index; //当我们点击了某个小圆圈，就要把这个小圆圈的索引号给 num
            circle=index; //当我们点击了某个小圆圈，就要把这个小圆圈的索引号给circle
            animate(ul,-index*sliderWidth);
        })
    }
    ol.children[0].className="current";

}) 