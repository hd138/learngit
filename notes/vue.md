# 		vue.js

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