# vue面试题

## 路由传参相关面试提

1. 路由传参（对象写法）path是否可以给结合params一起使用
   答案：不能，路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是path这种写法不能与params参数一起使用

2. 如何指定params参数可传可不传？
   比如：配置路由的时候，占位了（params参数），但是路由跳转的时候就不传递路径会出现问题
   答：在配置路由的时候，在占位的后面加上一个问号，params可以传递或者不传递

3. params参数可以传递也可以不传递，但是如果传递是空传，如何解决
   使用undefined解决：params参数可以传递也可以不传递(空的字符串)

4. 路由组件能不能传递props数据？

   答：可以

   1.布尔值写法:params

      props: true,

      2.对象写法:额外的给路由组件传递一些props

      props: {

   ​    a: 1,

   ​    b: 2,

      },

      3.函数写法：可以params参数、query参数，通过props传递给路由组件

      props: $route => {

   ​    return { keyword: $route.params.keyword, k: $route.query.k };

      },
   
   

##  重写push|replace

重写push|replace

第一个参数：告诉原来的push方法，你往哪跳转（传递哪里的参数）

第二个参数：成功的回调

第三个参数：失败的回调

call||apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次

不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组