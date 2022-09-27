# 组件的基本使用

### Vue中使用组件的三大步骤：

​    一、定义组件(创建组件)
​    二、注册组件
​    三、使用组件(写组件标签)

##### 一、如何定义一个组件？

​    使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
​    区别如下：
​        1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
​        2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
​    备注：使用template可以配置组件结构。

##### 二、如何注册组件？

​    1.局部注册：靠new Vue的时候传入components选项 Vue.extend({}) 或者直接写选项对象{}，在components中会调用extend
​    2.全局注册：靠Vue.component('组件名',组件)

##### 三、编写组件标签：

<school></school>

```html
<!-- 准备好一个容器-->
        <div id="root">
            <hello></hello>
            <hr>
            <h1>{{msg}}</h1>
            <hr>
            <!-- 第三步：编写组件标签 -->
            <school></school>
            <hr>
            <!-- 第三步：编写组件标签 -->
            <student></student>
        </div>

        <div id="root2">
            <hello></hello>
        </div>
    </body>

    <script type="text/javascript">
        Vue.config.productionTip = false

        //第一步：创建school组件
        const school = Vue.extend({
            template:`
                <div class="demo">
                    <h2>学校名称：{{schoolName}}</h2>
                    <h2>学校地址：{{address}}</h2>
                    <button @click="showName">点我提示学校名</button>    
                </div>
            `,
            // el:'#root', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
            data(){
                return {
                    schoolName:'尚硅谷',
                    address:'北京昌平'
                }
            },
            methods: {
                showName(){
                    alert(this.schoolName)
                }
            },
        })

        //第一步：创建student组件
        const student = Vue.extend({
            template:`
                <div>
                    <h2>学生姓名：{{studentName}}</h2>
                    <h2>学生年龄：{{age}}</h2>
                </div>
            `,
            data(){
                return {
                    studentName:'张三',
                    age:18
                }
            }
        })
        
        //第一步：创建hello组件
        const hello = Vue.extend({
            template:`
                <div>    
                    <h2>你好啊！{{name}}</h2>
                </div>
            `,
            data(){
                return {
                    name:'Tom'
                }
            }
        })
        
        //第二步：全局注册组件
        Vue.component('hello',hello)

        //创建vm
        new Vue({
            el:'#root',
            data:{
                msg:'你好啊！'
            },
            //第二步：注册组件（局部注册）
            components:{
                school,
                student
            }
        })

        new Vue({
            el:'#root2',
        })
    </script>
```

##### 注意点

几个注意点：
    1.关于组件名:
        一个单词组成：
            第一种写法(首字母小写)：school
            第二种写法(首字母大写)：School
    多个单词组成：
        第一种写法(kebab-case命名)：my-school
        第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
    备注：
        (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
        (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

​	2.关于组件标签:

     	第一种写法：<school></school>
        第二种写法：<school/>
        备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

​	3.一个简写方式：

    	const school = Vue.extend(options) 可简写为：const school = options

### 组件的嵌套

```html
<body>
        <!-- 准备好一个容器-->
        <div id="root">
            
        </div>
    </body>

    <script type="text/javascript">
        Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

        //定义student组件
        const student = Vue.extend({
            name:'student',
            template:`
                <div>
                    <h2>学生姓名：{{name}}</h2>    
                    <h2>学生年龄：{{age}}</h2>    
                </div>
            `,
            data(){
                return {
                    name:'尚硅谷',
                    age:18
                }
            }
        })
        
        //定义school组件
        const school = Vue.extend({
            name:'school',
            template:`
                <div>
                    <h2>学校名称：{{name}}</h2>    
                    <h2>学校地址：{{address}}</h2>    
                    <student></student>
                </div>
            `,
            data(){
                return {
                    name:'尚硅谷',
                    address:'北京'
                }
            },
            //注册组件（局部）
            components:{
                student
            }
        })

        //定义hello组件
        const hello = Vue.extend({
            template:`<h1>{{msg}}</h1>`,
            data(){
                return {
                    msg:'欢迎来到尚硅谷学习！'
                }
            }
        })
        
        //定义app组件
        const app = Vue.extend({
            template:`
                <div>    
                    <hello></hello>
                    <school></school>
                </div>
            `,
            components:{
                school,
                hello
            }
        })

        //创建vm
        new Vue({
            template:'<app></app>',
            el:'#root',
            //注册组件（局部）
            components:{app}
        })
    </script>
```

##### VueComponent构造函数

关于VueComponent：
    1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend调用生成的。

2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
即Vue帮我们执行的：new VueComponent(options)。

3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

4.关于this指向：
    (1).组件配置中：
        data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
    (2).new Vue(options)配置中：
        data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
    Vue的实例对象，以后简称vm。

### 单文件组件

 非单文件组件
    通过Vue.extend去注册组件，在new Vue中的components配置，直接在html中使用<school>
    不易复用，现在将功能模块拆分
    单文件组件
      

```
  vue文件 1.webpack解析  2.脚手架
        |-main.js  注册app组件 挂载app 使用template 注册app 配置template（<app/>） 不用在html中写<App/>
        |-App.vue   app中引入components中组件 注册 school和student
        |-index.html 引入main.js 和 Vue
        |-components |-student 
                    有template script export default const student = Vue.extend({})  可简写为 export default{}
                    |-school
```

### props属性

prop接受的值实在data赋值之前

```js
    //简单声明接收
    // props:['name','age','sex'] 

    //接收的同时对数据进行类型限制
    /* props:{
        name:String,
        age:Number,
        sex:String
    } */

    //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
    props:{
        name:{
            type:String, //name的类型是字符串
            required:true, //name是必要的
        },
        age:{
            type:Number,
            default:99 //默认值
        },
        sex:{
            type:String,
            required:true
        }
    }
```

### 动画和过度

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用`<transition>`包裹要过度的元素，并配置name属性：

      ```xml
      <transition name="hello">
          <h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

```js
<transition-group name="hello" appear>
            <h1 v-show="!isShow" key="1">你好啊！</h1>
            <h1 v-show="isShow" key="2">尚硅谷！</h1>
</transition-group>
```

使用animate动画库

```js
<transition-group 
            appear
            name="animate__animated animate__bounce" 
            enter-active-class="animate__swing"
            leave-active-class="animate__backOutUp"
        >
            <h1 v-show="!isShow" key="1">你好啊！</h1>
            <h1 v-show="isShow" key="2">尚硅谷！</h1>
</transition-group>
```

# vuex

#### 1.概念

 在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

#### 2.何时使用？

 多个组件需要共享数据时

#### 3.搭建vuex环境

1. 创建文件：`src/store/index.js`

   ```javascript
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state
   })
   ```

2. 在`main.js`中创建vm时传入`store`配置项

   ```javascript
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
       el:'#app',
       render: h => h(App),
       store
   })
   ```

#### 4.基本使用

1. 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

   ```javascript
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
       jia(context,value){
           // console.log('actions中的jia被调用了',miniStore,value)
           context.commit('JIA',value)
       },
   }
   
   const mutations = {
       //执行加
       JIA(state,value){
           // console.log('mutations中的JIA被调用了',state,value)
           state.sum += value
       }
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state,
   })
   ```

2. 组件中读取vuex中的数据：`$store.state.sum`

3. 组件中修改vuex中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`

   > 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接编写`commit`

#### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在`store.js`中追加`getters`配置

   ```javascript
   ......
   
   const getters = {
       bigSum(state){
           return state.sum * 10
       }
   }
   
   //创建并暴露store
   export default new Vuex.Store({
       ......
       getters
   })
   ```

3. 组件中读取数据：`$store.getters.bigSum`

#### 6.四个map方法的使用

1. **mapState方法：**用于帮助我们映射`state`中的数据为计算属性

   ```javascript
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. **mapGetters方法：**用于帮助我们映射`getters`中的数据为计算属性

   ```javascript
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. **mapActions方法：**用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

   ```javascript
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. **mapMutations方法：**用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数，传参写在事件后@click=xxx(data)

   ```javascript
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

#### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改`store.js`

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```javascript
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   //对象写法
   ...mapState('countAbout',{sum:'sum'),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```javascript
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   //对象写法
   ```

5. 开启命名空间后，组件中调用dispatch

   ```javascript
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ...mapActions('user',['addCash'])
   ```

6. 开启命名空间后，组件中调用commit

   ```javascript
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ...mapMutations('user',['addCash'])
   ```

# vue-router

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。

2. 前端路由：key是路径，value是组件

   

#### 1.基本使用

1. 安装vue-router，命令：`npm i vue-router`

2. 应用插件：`Vue.use(VueRouter)`

3. 编写router配置项:

   ```javascript
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
       routes:[
           {
               path:'/about',
               component:About
           },
           {
               path:'/home',
               component:Home
           }
       ]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```routeros
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```apache
   <router-view></router-view>
   ```

#### 2.几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的`$router`属性获取到。

#### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```javascript
   routes:[
       {
           path:'/about',
           component:About,
       },
       {
           path:'/home',
           component:Home,
           children:[ //通过children配置子级路由
               {
                   path:'news', //此处一定不要写：/news
                   component:News
               },
               {
                   path:'message',//此处一定不要写：/message
                   component:Message
               }
           ]
       }
   ]
   ```

2. 跳转（要写完整路径）：

   ```xml
   <router-link to="/home/news">News</router-link>
   ```

#### 4.路由的query参数

1. 传递参数

   ```dust
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
                   
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
       :to="{
           path:'/home/message/detail',
           query:{
              id:666,
               title:'你好'
           }
       }"
   >跳转</router-link>
   ```

2. 接收参数：

   ```javascript
   $route.query.id
   $route.query.title
   ```

#### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```javascript
      {
          path:'/demo',
          component:Demo,
          children:[
              {
                  path:'test',
                  component:Test,
                  children:[
                      {
                            name:'hello' //给路由命名
                          path:'welcome',
                          component:Hello,
                      }
                  ]
              }
          ]
      }
      ```

   2. 简化跳转：

      ```dust
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
          :to="{
              name:'hello',
              query:{
                 id:666,
                  title:'你好'
              }
          }"
      >跳转</router-link>
      ```

#### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```javascript
   {
       path:'/home',
       component:Home,
       children:[
           {
               path:'news',
               component:News
           },
           {
               component:Message,
               children:[
                   {
                       name:'xiangqing',
                       path:'detail/:id/:title', //使用占位符声明接收params参数
                       component:Detail
                   }
               ]
           }
       ]
   }
   ```

2. 传递参数

   ```dust
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
                   
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
       :to="{
           name:'xiangqing',
           params:{
              id:666,
               title:'你好'
           }
       }"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```javascript
   $route.params.id
   $route.params.title
   ```

#### 7.路由的props配置***

 作用：让路由组件更方便的收到参数

```javascript
{
    name:'xiangqing',
    path:'detail/:id',
    component:Detail,

    //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
    // props:{a:900} 不用props接受会放在$attrs中

    //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
    // props:true
    
    //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
    props(route){
        return {
            id:route.query.id,
            title:route.query.title
        }
    }
}
```

#### 8.`<router-link>`的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
3. 如何开启`replace`模式：`<router-link replace .......>News</router-link>`

#### 9.编程式路由导航

1. 作用：不借助`<router-link> `实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```javascript
   //$router的两个API
   this.$router.push({
       name:'xiangqing',
           params:{
               id:xxx,
               title:xxx
           }
   })
   
   this.$router.replace({
       name:'xiangqing',
           params:{
               id:xxx,
               title:xxx
           }
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

#### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```stata
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

#### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. `activated`路由组件被激活时触发。
   2. `deactivated`路由组件失活时触发。

#### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```javascript
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
       console.log('beforeEach',to,from)
       if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
           if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
               next() //放行
           }else{
               alert('暂无权限查看')
               // next({name:'guanyu'})
           }
       }else{
           next() //放行
       }
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
       console.log('afterEach',to,from)
       if(to.meta.title){ 
           document.title = to.meta.title //修改网页的title
       }else{
           document.title = 'vue_test'
       }
   })
   ```

4. 独享守卫:

   ```javascript
   beforeEnter(to,from,next){
       console.log('beforeEnter',to,from)
       if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
           if(localStorage.getItem('school') === 'atguigu'){
               next()
           }else{
               alert('暂无权限查看')
               // next({name:'guanyu'})
           }
       }else{
           next()
       }
   }
   ```

5. 组件内守卫：

   ```javascript
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

#### 13.路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

```javascript
index.html :html的入口文件
    引入css文件
    引入index.js   此时的src指向实例化Vue的js文件
    <script type='module' src='js/index.js'></script>
css：
    style.css
js:
index.js
定义实例化的Vue  使用render模板去替换el挂载的DOM节点 
导入root文件，指向components中的root
render:(h){return h(root)}
    
components:
    root.js：定义render的返回值
    先导入页面需要的组件 和数据（如果需要则要导入事件总线）
    {
        template：`
        <div id="app">//如果css中定义了app的样式，id=app需要加上
            <todo-list></todo-list>
            <done-list></done-list>
        </div>
        `,
        components:{
            "todo-list":todolist,
            "done-list":donelist
        }
        
    }
    todolist.js
    donelist.js
    先导入事件总线中需要的数据
    定义组件的功能：获取数据使用computed计算属性  定义的方法 需要去触发总线中的方法 eventBus.$emit("事件总线中的方法"，传入的参数)
store
    store.js
    先定义需要的数据，在eventBus上注册子组件需要的方法 this.$on("事件总线中的方法"，this.eventBus中的方法)
```

# vue-animate-number插件（从0动态滚动到指定数字）

#### 1.vue-animate-number插件（从0动态滚动到指定数字）

```
npm install vue-animate-number 
```

#### 2.在main.js中引入

```js
import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)
```

在对应的组件中使用

```html
	<div class="middle_leftCont" v-for="(item,index) in middle_leftArr" :key="index">
     	<div class="middle_leftText">
     		<p class="middle_leftTit">{{item.name}}</p>
     		<p class="middle_leftNum">
     		<animate-number from="0" :to="item.num" duration="2000"></animate-number>
      		</p>
     	</div>
 	 </div>
```



```js
data: function() {
    return {
      middle_leftArr: [
        {
          name: "企业数量",
          num: 0     //  例如：初始值是 0 ，请求接口成功后数值是： 5
        },
        {
          name: "瓶颈企业",
          num: 205
        },
          name: "产品数量",
          num: 18335
        },
        {
          name: "订单数量",
          num: 348
        }
      ],
    };
  },
```

4、 如果数据是动态获取，也就是在请求接口成功后,会重新赋值，改变数组中的某个数值。（ 例如：企业数量初始值是 0 ，请求接口成功后数值是：  5）。但是新的数据页面不会渲染，还是那拿最初始的值去渲染，这并不是我们想要的结果。

解决方法：

```html
// 添加一个key值 等于item.num

<animate-number from="0" :to="item.num" :key="item.num" duration="2000"></animate-number>
```

