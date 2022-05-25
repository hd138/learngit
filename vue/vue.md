# 		 vue.js

### 1.vue的初体验

```html
<body>
		<div id="app">
			<h2>{{message}}</h2>
			<h1>{{name}}</h1>
		</div>
		<div></div>
		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
					name: '黄都',
				},
			});
		</script>
	</body>
```

### 2.插值的操作

##### 	1.v-once的使用

我们只能使用一个vue指令

v-once：

1. 该指令后面不需要跟任何表达式

2. 该指令表示元素和组件只渲染一次，不会随着数据的改变而改变

3. 代码如下

4. ```html
   <div id="app">
   			<h2>{{message}}</h2>
   			<h2 v-once>{{message}}</h2>
   		</div>
   		<script src="../../js/vue.js"></script>
   		<script>
   			const app = new Vue({
   				el: '#app',
   				data: {
   					message: '你好啊',
   				},
   			});
   ```

##### 2.v-html

如果我们直接通过{{}}来输出，会将html的代码也一起输出。但是我希望的是按照html格式进行解析，并且显示对应的内容

使用v-html指令就可以解析html代码

```html
<body>
		<div id="app">
			<h2>{{url}}</h2>
			<h2 v-html="url"></h2>
		</div>
		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app',
				data: {
					message: '你好啊',
					url= '<a href:"http://www.baidu.com">百度一下</a>',
				},
			});
		</script>
	</body>
```

##### 3.v-text

和Mustache用法相似：但是用于将数据显示到界面中（但不常用）

```html
	<body>
		<div id="app">
			<h2>{{message}}</h2>
			<h2 v-text="message"></h2>
		</div>
		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app',
				data: {
					message: '你好啊',
				},
			});
		</script>
	</body>
```

##### 4.v-pre

用于跳过这个元素和他的子元素的编译过程，用于显示原本的Mustache语法

比如下面的代码：

第一个h2中会显示编译过后的内容(你好啊)

第二个元素中会直接显示{{message}}

```html
<body>
  <div id="app">
    <h2>{{message}}</h2>
    <h2 v-pre>{{message}}</h2>
  </div>
  <script src="../../js/vue.js"></script>
  <script>
    const app = new Vue({
      el:'#app',
      data:{
        message:'你好啊'
      }
    })
    
  </script>
</body>
```

##### 5.v-cloak

在某种情况下，我们浏览器可能会直接显示出来未编译的Mustache标签

```html
	<body>
		<div id="app">
			<h2 v-cloak>{{message}}</h2>
		</div>
		<script src="../../js/vue.js"></script>
		<script>
			// 在vue解析之前，div中有一个属性v-cloak
			// 在vue解析之后，div中没有这个属性
			setTimeout(function () {
				const app = new Vue({
					el: '#app',
					data: {
						message: '你好啊',
					},
				});
			}, 1000);
		</script>
	</body>
```

### 3.v-bind

除内容需要动态来解决外，某些属性我们也希望动态来绑定

比如动态绑定a元素的href属性，动态绑定img元素的src属性

这个时候，我们就可以用v-bind指令

作用：动态绑定属性

简写： ：

##### 1. 基本使用

1. v-bind用于绑定一个或者多个属性值，或者向另一个组件传递props值

2. 在开发中有很多的属性要动态绑定比如图片链接src，网站链接href，动态绑定一些类或者样式等等

3. 比如通过vue实例中的data绑定元素的src和href 代码如下

   ```html
   <body>
   		<!-- 错误做法 这里不可以使用Mustache语法 -->
   		<!-- <img src="{{imgurl}}" alt=""> -->
   		<!-- 正确做法 使用v-bind语法 -->
   		<div id="app">
   			<img v-bind:src="imgurl" alt="" />
   			<a v-bind:href="srcurl">百度一下</a>
   		</div>
   		<script src="../../js/vue.js"></script>
   		<script>
   			const app = new Vue({
   				el: '#app',
   				data: {
   					message: '你好啊',
   					imgurl: 'https://www.runoob.com/wp-content/uploads/2017/01/vue.png',
   					srcurl: 'http://www.baidu.com',
   				},
   			});
   		</script>
   	</body>
   
   ```

##### 2. v-bind语法糖

1. v-bind有一个对应的语法糖，也就是简写方式在开发中我们通常会用语法糖来写

2. 简写方式如下

   ```html
   <div id="app">
       <a :href="link">官网</a>
       <img :src="logo">
   </div>
   ```


##### 3. 改变类

代码如下

```html
	<body>
		<div id="app">
			<!-- <h2 class="active">{{message}}</h2> -->
			<!-- <h2 :class="active">{{message}}</h2> -->

			<!-- <h2 v-bind:class="{key1: value1,key2: value2}">{{message}}</h2> -->
			<!-- <h2 v-bind:class="{类名1: true,类名2: boolean}">{{message}}</h2> -->
			<h2 :class="{active: isActive , line:isline}">{{message}}</h2>
			<button v-on:click="btnClick">按钮</button>
		</div>
		<script src="../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app',
				data: {
					message: '你好啊',
					isActive: true,
					isline: true,
				},
				methods: {
					btnClick: function () {
                        // 取反
						this.isActive = !this.isActive;
					},
				},
			});
			console.log(app);
		</script>
	</body>
```

4.改变style

代码如下

```html
	<body>
		<div id="app">
			<!-- <h2 :style="{key(属性名):value(属性值)}">{{message}}</h2> -->
			<!-- 50px必须加上单引号，否则是当一个变量去解析 -->
			<!-- <h2 :style="{fontSize:'50px'}">{{message}}</h2> -->
			<h2 :style="{fontSize:fz+'px',backgroundColor:colors}">{{message}}</h2>
			<h2 :style="getStyles()">{{message}}</h2>
		</div>
		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
					name: '黄都',
					fz: 100,
					colors: 'red',
				},
				methods: {
					getStyles: function () {
						return { fontSize: this.fz + 'px', backgroundColor: this.colors };
					},
				},
			});
		</script>
	</body>
```

### 4.计算属性

##### 1.计算属性的基本使用

```html
	<body>
		<div id="app">
			<h2>{{firstName+''+lastName}}</h2>
			<h2>{{firstName}} {{lastName}}</h2>
			<h2>{{getFullName()}}</h2>    
      <h2>{{fullName}}</h2>
		</div>
		<div></div>
		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					firstName: 'lebron',
					lastName: 'janes',
				},
        // computed: 计算属性
        computed:{
          fullName:function(){
            return this.firstName+''+this.lastName
          }
        },
				methods: {
					getFullName() {
						return this.firstName + '' + this.lastName;
					},
				},
			});
		</script>
	</body>
```

##### 2. 计算属性的复杂操作

```html
	<body>
		<div id="app">
			<h2>总价格：{{totalPrice}}</h2>
		</div>

		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					books: [
						{ id: 110, name: 'Unix编程艺术', price: 119 },
						{ id: 111, name: '代码大全', price: 121 },
						{ id: 112, name: '深入理解计算机原理', price: 129 },
						{ id: 113, name: '现代操作系统', price: 99 },
					],
				},
				computed: {
					totalPrice: function () {
						let result = 0; 
						for (let i = 0; i < this.books.length; i++) {
							result += this.books[i].price;
						}
						return result;
					},
				},
			});
		</script>
	</body>
```



##### 3.计算属性的setter和getter

每一个计算属性都包含一个getter和setter

```html
	<body>
		<div id="app">
			<h2>{{fullName}}</h2>
		</div>
		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					firstName: 'kobe',
					lastName: 'Bryant',
				},
				computed: {
					// fullName:function(){
					//   return this.firstName+''+this.lastName
					// }
					// name:'coderwhy'
					fullName: {
						// 计算属性一般是没有set方法，只读属性
						// set: function () {},
						set: function (newValue) {
							console.log('----', newValue);
							const names = newValue.split(' ');
							this.firstName = names[0];
							this.lastName = names[1];
						},
						get: function () {
							return this.firstName + ' ' + this.lastName;
						},
					},
					// fullName: function () {
					// 	return this.firstName + ' ' + this.lastName;
					// },
				},
			});
		</script>
	</body>
```

在某些情况下，你也可以用setter方法（不常用）

### 5.v-on

##### 1. v-on介绍

1. 作用：绑定事件监听器
2. 缩写：@
3. 预期：Function | Inline Statement | Object
4. 参数：event

##### 2. v-on 基础

1. 这里我们用一个监听按钮的点击事件，来简单看看v-on的使用

2. 代码如下

3. ```html
   	<body>
   		<div id="app">
   			<h2>{{counter}}</h2>
   			<!-- <button v-on:click="counter++">+</button>
         <button v-on:click="counter--">-</button> -->
   			<!-- <button v-on:click="increment">+</button>
   			<button v-on:click="decrement">-</button> -->
   			<!-- 简写  语法糖 -->
   			<button @click="increment">+</button>
   			<button @click="decrement">-</button>
   		</div>
   		<div></div>
   		<script src="../../js/vue.js"></script>
   		<script>
   			const app = new Vue({
   				el: '#app', // 用于挂载要管理的元素
   				data: {
   					//定义数据
   					counter: 0,
   				},
   				methods: {
   					increment() {
   						this.counter++;
   					},
   					decrement() {
   						this.counter--;
   					},
   				},
   			});
   		</script>
   	</body>
   ```

   

##### 3. v-on参数

1. 当通过methods中定义方法，以供@click调用时需要注意参数问题

2. 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加，但是注意：如果方法本身中有一个参数，那么会默认将原生事件的event参数传递进去

3. 情况二：如果需要同时传入某个参数，同时需要event时，可以通过$event传入事件

   ```html
   	<body>
   		<div id="app">
   			<!-- 1.事件调用的方法没有参数 -->
   			<button @click="btn1Click()">按钮1</button>
   			<button @click="btn1Click">按钮1</button>
   
   			<!-- 2.在事件定义时， 写方法时省略了小括号，但是方法本身时需要一个参数的 这个时候
         vue会默认将浏览器生产的event事件对象作为参数传入到方法中 -->
   			<!-- <button @click="btn2Click(123)">按钮2</button>
         <button @click="btn2Click()">按钮2</button> -->
         <button @click="btn2Click">按钮2</button>
   
         <!-- 3.方法定义时我们需要event对象 但同时又需要其他参数 -->
         <!-- 在调用方法，如何手动的获取带浏览器参数的event对象：$event -->
   			<button @click="btn3Click(123,$event)">按钮3</button>
   		</div>
   		<div></div>
   		<script src="../../js/vue.js"></script>
   		<script>
   			const app = new Vue({
   				el: '#app', // 用于挂载要管理的元素
   				data: {
   					//定义数据
   				},
   				methods: {
   					btn1Click() {
   						console.log('btn1Click');
   					},
   					btn2Click(event) {
   						console.log('--------', event);
   					},
             btn3Click(abc,event) {
   						console.log('--------',abc ,event);
   					},
   				},
   			});
         // 如果函数需要参数，但是没有传入，那么函数的形参为undefined
         // function abc(name){
         //   console.log(name);
         // }
   		</script>
   	</body>
   ```

##### v-on修饰符

1. 在某些情况下，我们拿到event的目的可能是进行一些事件处理

2. vue提供了修饰符来帮助我们方便的处理一些事情：

   - .stop - 调用event.stopPropagation()

   - .prevent - 调用event.preventDefault()

   - .{keyCode|keyAlias}-只当事件是从特定键触发时才触发回调。

     ```html
     <!DOCTYPE html>
     <html lang="en">
     	<head>
     		<meta charset="UTF-8" />
     		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
     		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
     		<title>Document</title>
     	</head>
     	<body>
     		<div id="app">
     			<!-- 1. .stop修饰符的使用 -->
     			<div @click="divClick">
     				aaa
     				<button @click.stop="btnClick">按钮</button>
     			</div>
     
     			<!-- 2. .prevent修饰符的使用 -->
     			<form action="baidu">
     				<input type="submit" value="提交" @click.prevent="submitClick" />
     			</form>
     		</div>
     
     		<!-- 3. 监听某个按键键帽的修饰符 -->
     		<input type="text" @keyup="keyup" />
         <!-- 回车 -->
     		<input type="text" @keyup.enter="keyup" />
     		<script src="../../js/vue.js"></script>
     		<script>
     			const app = new Vue({
     				el: '#app', // 用于挂载要管理的元素
     				data: {
     					//定义数据
     				},
     				methods: {
     					btnClick() {
     						console.log('btnClick');
     					},
     					divClick() {
     						console.log('divClick');
     					},
     					submitClick() {
     						console.log('submitClick');
     					},
     					keyup() {
     						console.log('keyup');
     					},
     				},
     			});
     		</script>
     	</body>
     </html>
     
     ```

     

   - .native - 监听组件根元素的原生事件。

   - .once - 只触发一次回调 

### 6.v-show

1. v-show的用法和v-if非常相似，也用于决定一个元素是否渲染
2. v-if和v-show对比
3. v-if和v-show都可以决定一个元素是否渲染，
   -   v-if当条件按为false时，压根不会有对于的元素在Dom中
   - v-show当条件为false时仅仅是将元素的display属性设置为none而已

- 开发中当需要在显示和隐藏之前切片很频繁，使用v-show

- 当只有一次切换时，通过使用v-if

  ```html
  <body>
  		<div id="app">
  			<!-- v-if:当条件为false时，包含v-if指令的元素，根本不会存在dom中 -->
  			<h2 v-if="isShow" id="aaa">{{message}}</h2>
  			<!-- v-show:当条件为false时，v-show只是给我们的元素添加一个行内样式：diaplay:none -->
  			<h2 v-show="isShow" id="bbb">{{message}}</h2>
  		</div>
  		<div></div>
  		<script src="../../js/vue.js"></script>
  		<script>
  			const app = new Vue({
  				el: '#app', // 用于挂载要管理的元素
  				data: {
  					//定义数据
  					message: '你好啊！',
  					isShow: true,
  				},
  			});
  		</script>
  	</body>
  ```

  

### 7.v-for遍历数组

1. 当我们有一组数组需要进行渲染时，可以用v-for来完成

   1. v-for的语法类似于JavaScript的for循环

   2. 格式：item in items

   3. ```html
      	<body>
      		<div id="app">
            <!-- 在遍历的过程中，没有 使用索引值（下标值） -->
            <ul>
              <li v-for="item in names">{{item}}</li>
            </ul>
      
            <!-- 在遍历的过程中，获取索引值 -->
            <ul>
              <li v-for="(item,index) in names">
                {{index+1}}.{{item}}
              </li>
            </ul>
      		</div>
      		<div></div>
      		<script src="../../js/vue.js"></script>
      		<script>
      			const app = new Vue({
      				el: '#app', // 用于挂载要管理的元素
      				data: {
      					//定义数据
                n               ames:['张三','李四','王五','小明']
      				},
      			});
      		</script>
      	</body>
      ```

      

2. 如果在遍历的过程中不需要使用索引值

   1. v-for=v-for="item in names"
   2. 依次从names取出item，并且在元素的内容中，我们可以使用Mustache语法，来使用item

3. 如果在遍历的过程中要使用索引值

   1. v-for="(item,index) in names"
   2. index就是索引值                                                                                                                                                                

### 8.检测数组更新

- 因为Vue是响应式的，所以当数据发生变化时，Vue会自动检测数据的变化，视图会发生对应的更新

- vue中包含了一组观察数组编译的方法，使用它们改变数组也会触发视图的更新

  - push()

  - pop()

  - shift()

  - unshift()

  - splice()

  - sort()

  - reverse()

    ```html
    <body>
    		<div id="app">
    			<ul>
    				<li v-for="item in letters">{{item}}</li>
    			</ul>
    			<button @click="btnClick">按钮</button>
    		</div>
    		<script src="../../js/vue.js"></script>
    		<script>
    			const app = new Vue({
    				el: '#app', // 用于挂载要管理的元素
    				data: {
    					letters: ['a', 'b', 'c', 'd'],
    				},
    				methods: {
    					btnClick() {
    						// 1.push方法 在最后添加一个元素
    						// this.letters.push('aaa')
    						// this.letters.push('aaa','bbb','ccc')
    
    						// 2 pop() 删除数组中的最后一个元素
    						// this.letters.pop()
    
    						// 3.shift() 删除数组中的第一个元素
    						// this.letters.shift()
    
    						// 4.unshift() 在我们最前面添加元素
    						// this.letters.unshift('aaa','bbb','ccc')
    
    						// 5.splice() 删除元素/插入元素/替换元素
    						// 删除元素：第二个参数传入你要删除几个元素如果没有传就删除后面所有元素
    						// 替换元素：第二参数，表示我们要替换几个元素，后面是用于替换前面的元素
    						// 插入元素：第二个参数，传入0，后面跟上要插入的元素
    						// splice(start)
    						// this.letters.splice(1,1)
    						// this.letters.splice(1,3,'m','n','l')
    						// this.letters,splice(1,0,'x','y','z')
    
    						// 6. sort() 排序
    						// this.letters.sort()
    
    						// 7. reverse() 到序
    						// this.letters.reverse()
    
    						// set(要修改的对象，索引值，修改后的值)
    						Vue.set(this.letters, 0, 'bbb');
    					},
    				},
    			});
    		</script>
    	</body>
    ```

    

### 



### 9.表单绑定v-model

- 表单控件在实际开发中是非常常见的。特别是对于用户信息的提交需要大量的表单
- Vue中使用v-model指令来实现表单匀速的数据的双向绑定
- 案例

```html
	<body>
		<div id="app">
      <!-- <input type="text" v-model="message"> -->
      <!-- <input type="text" :value="message" @input="valueChange"> -->
      <input type="text" :value="message" @input="message= this.message=$event.target.value">
      {{message}}
		</div>

		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
				},
        methods: {
          valueChange(event){
            this.message=event.target.value
          }
        }
			});
		</script>
	</body>
```

##### v-model原理

- v-model其实是一个语法糖。他的背后本质上是包含俩个操作：

  - v-bind绑一个value属性
  - v-on指令给当前元素绑定input时间

- 也就是说

  - ```html
      	<input type="text" v-model="message">
    等同于
          <input type="text" :value="message" @input="message= this.message=$event.target.value">
    ```

  

##### v-model:radio

当存在多个单选框时

```html
	<body>
		<div id="app">
			<label for="male">
				<input type="radio" id="male" value="男" v-model="sex"/>男
			</label>
      <label for="female">
				<input type="radio" id="female" value="女" v-model="sex"/>女
			</label>
      <h2>你选择的性别是：{{sex}}</h2>
		</div>

		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
          sex:'男',
				},
			});
		</script>
	</body>
```



##### v-model:checkbox

- 复选框分为俩种情况：单个勾选框和多个勾选框
- 单个勾选框：
  - v-model即为布尔值
  - 此时input的value并不影响v-model的值
- 多个复选框：
  - 当是多个复选框时，因为可以选中多个，所以对应的data中的属性是一个数组
  - 当选中某一个时，就会将input的value添加到数组中

- ```html
  <body>
  		<div id="app">
        <!-- 1.checkbox单选框 -->
       <!-- <label for="agree">
         <input type="checkbox" id="agree" v-model="isAgree">同意协议
       </label>
       <h2>你选择的是：{{isAgree}}</h2>
       <button :disabled="!isAgree">下一步</button> -->
  
       <!-- 2.checkbox多选框 -->
  
         <input type="checkbox" value="篮球" v-model="hobbies">篮球
         <input type="checkbox" value="足球" v-model="hobbies">足球
         <input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
         <input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
  <h2>你的爱好是{{hobbies}}</h2>
         
  		</div>
  
  		<script src="../../js/vue.js"></script>
  		<script>
  			const app = new Vue({
  				el: '#app', // 用于挂载要管理的元素
  				data: {
  					//定义数据
  					message: '你好啊！',
            isAgree:false,//单选框
            hobbies:[],//多选框
  				},
  			});
  		</script>
  	</body>
  ```

  

  

##### v-model:select

- 和checkbox一样，select也分为单选和多选俩种情况

- 单选：只选择一个值

  - v-model绑定的是一个值

  - 当我们选中option中的一个时，会将它对应的value赋值到mySelect中

    ```html
    <body>
    		<div id="app">
    			<!-- 选择一个 -->
    			<select name="abc" v-model="fruit">
    				<option value="苹果">苹果</option>
    				<option value="香蕉">香蕉</option>
    				<option value="榴莲">榴莲</option>
    				<option value="葡萄">葡萄</option>
    			</select>
    			<h2>你选择的是：{{fruit}}</h2>
    
    			<!-- 选择多个 -->
    			<select name="abc" v-model="fruits" multiple>
    				<option value="苹果">苹果</option>
    				<option value="香蕉">香蕉</option>
    				<option value="榴莲">榴莲</option>
    				<option value="葡萄">葡萄</option>
    			</select>
    			<h2>你选择的是：{{fruits}}</h2>
    		</div>
    
    		<script src="../../js/vue.js"></script>
    		<script>
    			const app = new Vue({
    				el: '#app', // 用于挂载要管理的元素
    				data: {
    					//定义数据
    					message: '你好啊！',
    					fruit: '香蕉',
    					fruits: '',
    				},
    			});
    		</script>
    	</body>
    ```

    

##### 修饰符

- lazy修饰符：
  - 默认情况下，v-model默认是在input事件中同步输入框的数据的
  - 也就是说，一旦有数据发生改变对应的data中的数据就会自动发生改变
  - lazy修饰符可以让数据在失去焦点或者回车时才会更新

- number修饰符：
  - 默认情况下，在输入框中无论我们输入的h是字母还是数字，都会被当做字符串类型进行处理
  - 但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字来处理
  - number修饰符可以让在输入框中输入的内容自动转换为数字类型

- trim修饰符
  - 如果输入的内容首尾有很多空格，通常我们希望将其去除
  - trim修饰符可以过滤内容左右俩边的空格

```html
	<body>
		<div id="app">
      <!-- 1. 修饰符:lazy -->
      <input type="text" v-model.lazy="message">
      <h2>{{message}}</h2>

      <!-- 2. 修饰符:number -->
      <input type="number" v-model.number="age">
      <h2>{{age}}-{{typeof(age)}}</h2>

      <!-- 3. 修饰符:trim -->
      <input type="text" v-model.trim="name">
      <h2>你输入的名字是:{{name}}</h2>
		</div>

		<script src="../../js/vue.js"></script>
		<script>
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
          age:0,
          name:''
				},
			});
		</script>
	</body>
```





## 10.组件

##### 1.注册组件的基本步骤

1. 组件的使用分成三个步骤：
   1. 创建组件构造器
   2. 注册组件
   3. 使用组件![zujianbuz](C:\Users\Administrator.DESKTOP-6R6A7OJ\Desktop\zujianbuz.png)

```html
<body>
		<div id="app">
			<!-- 3. 使用组件 -->
			<my-cpn></my-cpn>
			<my-cpn></my-cpn>
			<my-cpn></my-cpn>
			<my-cpn></my-cpn>
			<my-cpn></my-cpn>
		</div>
		<div></div>
		<script src="../../js/vue.js"></script>
		<script>
			// 1.创建组件构造器对象
			const cpnC = Vue.extend({
				template: `
        <div>
          <h2>我是标题</h2>  
          <p>我是内容，哈哈哈哈哈</p>
          <p>我是内容，吼吼吼吼吼</p>
        </div>`,
			});

			// 2. 注册组件
			Vue.component('my-cpn', cpnC);

			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
				},
			});
		</script>
	</body>
```

##### 2. 注册组件步骤解析

1. Vue.extend():
   1. 调用Vue.extend()创建的是一个组件构造器
   2. 通常在创建组件构造器是，传入template代表我们自定义组件的模板
   3. 该模板就是在使用到组件的地方，要显示的HTML代码
   4. 事实上这种写法在Vue2.x的文档中已经看不到了
2. Vue.component():
   1. 调用Vue.component()是将刚才的组件构造器注册为一个组件，并且给它起一个组件的标签名称
   2. 使用需要传递俩个参数：1.注册组件的标签名 2.组件构造器
3. 组件必须挂载在某个Vue实例下，否则它不会生效

##### 3.全局组件和局部组件

- 当我们通过调用Vue.component()注册组件时，组件的注册是全局的
  - 这意味着该组件可以在任意Vue实例下使用
- 如果我们注册的组件是挂载在某个实例中，那么就是一个局部组件





##### 4.父组件和子组件

- 在前面我们看到了组件树：
  - 组件和组件之间存在层级关系
  - 而其中一种非常重要的关系就是父子组件的关系
- 代码如下

```html
	<body>
		<div id="app">

			<cpn2></cpn2>
		</div>
		<div></div>
		<script src="../../js/vue.js"></script>
		<script>
			// 1.创建第一个组件构造器(子组件)
			const cpnC1 = Vue.extend({
				template: `
        <div>
          <h2>我是标题1</h2>
          <p>我是内容，哈哈哈哈</p>  
        </div>`,
			});

			// 1.创建第二个组件构造器(父组件)
			const cpnC2 = Vue.extend({
				template: `
        <div>
          <h2>我是标题2</h2>
          <p>我是内容，呵呵呵呵</p>  
          <cpn1></cpn1>
        </div>`,
        components: {
          cpn1:cpnC1
        }
			});

      // root组件（根组件）
			const app = new Vue({
				el: '#app', // 用于挂载要管理的元素
				data: {
					//定义数据
					message: '你好啊！',
					name: '黄都',
				},
				components: {
					// cpn1: cpnC1,
					cpn2: cpnC2,
				},
			});
		</script>
	</body>
```



- 父子组件错误的用法：以子标签的形式在Vue实例中使用
  - 因为当子组件注册到父组件的components时，Vue会编译好父组件的模块
    - 该模块的内容已经决定了父组件将要渲染的HTML相当于父组件中已经有了子组件中的内容了
    - <cpn1></cpn1>是只能在父组件中被识别的
    - 类似这种用法，<cpn1></cpn1>是会被浏览器忽略的

##### 5.注册组件语法糖

- 在上面注册组件的方式，可能会有些繁琐

  - Vue为了简化这个过程，提供了注册的语法糖。
  - 主要省去了调用Vue.extend()的步骤，而是可以直接使用一个对象来代替

- 语法糖注册组件的代码

  ```html
  	<body>
  		<div id="app">
  			<cpn1></cpn1>
  			<cpn2></cpn2>
  		</div>
  		<script src="../../js/vue.js"></script>
  		<script>
  			// 1. 全局组件注册的语法糖
  			// 1. 创建组件构造器
  			// const cpn1 = Vue.extend({
  			//   template: `
  			//   <div>
  			//     <h2>我是标题1</h2>
  			//     <p>我是内容，哈哈哈哈</p>
  			//   </div>`,
  			// })
  
  			// 2.注册组件 语法糖
  			Vue.component('cpn1', {
  				template: `
  			  <div>
  			    <h2>我是标题1</h2>
  			    <p>我是内容，哈哈哈哈</p>
  			  </div>`,
  			});
  
  			const app = new Vue({
  				el: '#app', // 用于挂载要管理的元素
  				data: {
  					//定义数据
  					message: '你好啊！',
  				},
  				components: {
  					// 注册局部组件的语法糖
  					cpn2: {
  						template: `
                    <div>
                      <h2>我是标题2</h2>
                      <p>我是内容，呵呵呵呵</p>  
                    </div>`,
  					},
  				},
  			});
  		</script>
  	</body>
  ```

  

##### 6.模板的分离写法

- Vue提供了俩种方案来定义HTML模板内容

  - 使用<script>标签

  - 使用<template>标签

  - ```html
    <body>
    		<div id="app">
    			<cpn></cpn>
    			<cpn></cpn>
    			<cpn></cpn>
    			<cpn></cpn>
    		</div>
    		<!-- 1.script标签， 注意：类型必须是text/x-template-->
    		<!-- <script type="text/x-template" id="cpn">
    			<div>
    			  <h2>我是标题</h2>
    			  <p>我是内容</p>
    			</div>
    		</script> -->
    
    		<!-- 2. template标签 -->
    		<template id="cpn">
    			<div>
    				<h2>我是标题</h2>
    				<p>我是内容,hhhhh</p>
    			</div>
    		</template>
    
    		<script src="../../js/vue.js"></script>
    		<script>
    			// 注册一个全局组件
    			Vue.component('cpn', {
    				template: '#cpn',
    			});
    
    			const app = new Vue({
    				el: '#app', // 用于挂载要管理的元素
    				data: {
    					//定义数据
    					message: '你好啊！',
    				},
    			});
    		</script>
    	</body>
    ```

    

##### 7.组件中data为什么必须是函数

- **“*vue中data必须是函数是为了保证组件的独立性和可复用性*,data是一个函数,组件实例化的时候这个函数将会被调用,返回一个对象,计算机会给这个对象分配一个内存地址,你实例化几次,就分配几个内存地址,他们的地址都不一样,所以每个组件中的数据不会相互干扰,改变其中一个组件的状态,其它组件不变。”**

##### 8. 父子组件的通信

- 子组件是不能引起父组件或者Vue实例的数据的
- 在开发中，往往一些数据确实需要从上层传递到下层
  - 比如在一个页面中，我们从服务器请求到了很多的数据
  - 其中一部分数据，并非是文我们整个页面的大组件来展示的，而是需要下面的子组件来展示
  - 这个时候并不会让子组件再次发送一个网络请求，而是直接让大组件（父组件）将数据传递给小组件（子组件）
- 有俩种方法来进行父子组件之间的通信
  - 通过props向子组件传递数据
  - 通过事件向父组件发送信息

![1652948210251](C:\Users\Administrator.DESKTOP-6R6A7OJ\Desktop\1652948210251.png)

###### 1.props基本用法

- 在组件中，使用选项props来声明需要从父级接收到的数据

- props的值有两种方式：

  - 方式一：字符串数组，数组中的字符串就是传递时的名称
  - 方式二：对象，对象可以设置传递时的类型，可以设置默认值等

  代码：

  ```html
  <body>
  		<div id="app">
  			<!-- 一定要用v-bind -->
  			<cpn :cmovies="movies" :cmessage="message"></cpn>
  		</div>
  
  		<!-- template标签 -->
  		<template id="cpn">
  			<div>
  				<ul>
  					<li v-for="item, in cmovies">{{item}}</li>
  				</ul>
  				<!-- <p>{{cmovies}}</p> -->
  				<h2>{{cmessage}}</h2>
  			</div>
  		</template>
  
  		<script src="../../js/vue.js"></script>
  		<script>
  			// 父传子 props
  			const cpn = {
  				template: '#cpn',
  				props: ['cmovies', 'cmessage'],
  				data() {
  					return {};
  				},
  				methods: {},
  			};
  
  			const app = new Vue({
  				el: '#app', // 用于挂载要管理的元素
  				data: {
  					//定义数据
  					message: '你好啊！',
  					movies: ['海王', '海贼王', '海尔兄弟'],
  				},
  				components: {
  					// 'cpn':cpn
  					cpn,
  				},
  			});
  		</script>
  	</body>
  ```

  

###### 2.props数据验证

- 数组之外，我们也可以使用对象，当需要对props进行类型等验证时，就需要对象写法了
- 验证支持以下数据类型
  - String
  - Nunber
  - Boolean
  - Array
  - Object
  - Date
  - Function
  - Symbol
- 当我们有自定义构造函数时，验证也支持自定义的类型

##### 9.子传父

- props用于父组件向子组件传递数据，还有一种是子组件传递到父组件中

- 我们需要用自定义事件来完成

  - 当子组件向父组件传递数据时，就要用到自定义事件
  - v-on不仅仅可以用于监听DOM事件，也可以用于组件之间的自定义事件

- 流程

  - 在子组件中，通过$emit()来触发事件

  - 在父组件中通过v-on来监听子组件事件

  - ```html
    	<body>
    		<!-- 父组件模板 -->
    		<div id="app">
    			<cpn @item-click="cpnClick"></cpn>
    		</div>
    
    		<!-- 子组件模板 -->
    		<template id="cpn">
    			<div>
    				<button v-for="item in categories" @click="btnClick(item)">{{item.name}}</button>
    			</div>
    		</template>
    		<script src="../../js/vue.js"></script>
    		<script>
    			// 子组件
    			const cpn = {
    				template: '#cpn',
    				data() {
    					return {
    						categories: [
    							{ id: 'aaa', name: '热门推荐' },
    							{ id: 'bbb', name: '手机数码' },
    							{ id: 'ccc', name: '家用家电' },
    							{ id: 'ddd', name: '电脑办公' },
    						],
    					};
    				},
    				methods: {
    					btnClick(item) {
    						// 发射事件:自定义事件
    						this.$emit('item-click', item);
    					},
    				},
    			};
    			// 父组件
    			const app = new Vue({
    				el: '#app', // 用于挂载要管理的元素
    				data: {
    					//定义数据
    					message: '你好啊！',
    					name: '黄都',
    				},
    				components: {
    					cpn,
    				},
    				methods: {
    					cpnClick(item) {
    						console.log('cpnClick', item);
    					},
    				},
    			});
    		</script>
    	</body>
    ```

    