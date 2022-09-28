# `Ajex`

### 1 客户端与服务器

##### 1.1 服务器

- 上网过程中，负责存放和对外提供资源的电脑叫做服务器

##### 1.2 客户端

- 上网过程中负责获取和消费资源的电脑，叫做客户端

### 2 URL地址

##### 2.1 URL地址的概念

1. URL(全称时`UniformResourceLocator`)中文叫统一资源定位符，用于标识互联网上每个资源的唯一存放位置，浏览器只有通过URL地址，才能正确得资源的存放位置，从而成功的访问到对应资源

##### 2.2 URL地址的组成部分

- URL地址一般由三部分组成
  1. 客户端与服务器之间的通信协议
  2. 存有该资源的服务器名称
  3. 资源在服务器上具体的存放位置

### 3 服务器对外提供了哪些资源

##### 3.1 数据也是资源

1. 页面中的数据，也是服务器对外提供的一种资源，例如股票数据，各行业排行榜数据等

##### 3.2 网页中如何请求数据

1. 数据，也是服务器对外提供的一种资源只要时资源，必然要通过请求--处理--响应的方式进行获取

2. 如果需要在网页中请求服务器上的资源，则需要用到 `XMLHttpRequest`对象

3. `XMLHttpRequest`（简称`xhr`）时浏览器提供的`js`成员，通过它，可以请求到服务器上的数据资源

4. 最简单的用法 

   ```js
   var xhrObj=new XHLHttpRequest()
   ```

##### 3.3 资源的请求方式

1. 客户端请求服务器时，请求的方式有很多种，最常见的俩种请求方式分别为get和post请求
   1. get请求通常用于获取服务器资源（向服务器要资源）
      - 例如：根据URL地址，从服务器获取HTML文件、`css`文件、`js`文件、图片文件、数据资源等等
   2. post请求通常用于服务器提交数据（往服务器发送资源）
      - 例如：登录时向服务器提交的登录信息、注册时向服务器提交的注册信息、添加用户时向服务器提交的用户信息等各种数据提交操作

### 4 了解Ajax

##### 4.1 什么是Ajax

- Ajax的全称是Asynchronous `Javascript` And XML（异步javascript和XML）
  - 通俗的理解：在网页中利用`XMLHttpRequest`对象和服务器进行数据交互的方式就是Ajax

##### 4.2 为什么要学Ajax

1. 之前所学的结束，只能把页面做的更美观或者添加一些动画效果但是，Ajax能让我们轻松实现网页与服务器之间的数据交互

##### 4.3 Ajax的典型应用场景

1. 用户名检测：注册用户时，通过Ajax的形式，动态检测用户名是否被占用
2. 搜索提示：当输入搜索关键字，通过Ajax的形式动态加载搜索提示框
3. 数据的分页显示：当点击页码值的时候，通过Ajax的形式，根据页码值动态刷新表格的数据
4. 数据的增删改查：数据的添加，删除，修改，查询操作，都要通过Ajax的形式，来实现数据的交互 

### 5. 了解`jQuery`中的Ajax

1. 浏览器中提供的`XMLHttpRequest`用法比较复杂，所以`jQuery`对`XMLHttpRequest`进行了封装，提供了一系列Ajax相关的函数，极大降低了Ajax的使用难度

2. `jQuery`中发起Ajax请求最常用的三种方法如下：

   ```js
   1. $.get()
   2. $.post()
   3. $.ajax()
   ```

##### 5.1 $.get()函数的语法

1. `jQuery`中$.get()函数的功能单一，专门用来发起get请求，从而将服务器上的资源请求到客户端进行使用

2. $.get()函数的语法如下：

   ```js
   $.get(url,[data],[callback])
   ```

3. 三个参数各自代表的含义如下：

   |  参数名  | 参数类型 | 是否必选 |           说明           |
   | :------: | :------: | :------: | :----------------------: |
   |  `url`   |  string  |    是    |     要请求的资源地址     |
   |   data   |  object  |    否    | 请求资源期间要携带的参数 |
   | callback | function |    否    |   请求成功时的回调函数   |

##### 5.2 $.get()发起不带参数的请求

1. 使用$.get()函数发起不带参数的请求时，直接提供请求的URL地址和请求成功后的回调函数即可，示例代码如下

   ```
   $.get('http://www.liulongbin.top:3006/api/getbooks',function(res){
   	console.log(res) //这里的res时服务器返回的数据
   })
   ```

##### 5.3 $.get()发起带参数的请求

1. 使用$.get()函数发起带参数的请求时，示例代码如下

   ```
   $.get('http://www.liulongbin.top:3006/api/getbooks',{id:1},function(res){
   	console.log(res) //这里的res时服务器返回的数据
   })
   ```

##### 5.4 $.post()函数的语法

1. `jquery`中$.post()函数功能单一，专门用来发起post请求，从而向服务器提交数据

2. $.post()函数的语法如下：

   ```
   $.post(url,[data],[callback])
   ```

3. 三个参数各自代表的含义如下：

|  参数名  | 参数类型 | 是否必选 |           说明           |
| :------: | :------: | :------: | :----------------------: |
|  `url`   |  string  |    是    |      提交数据的地址      |
|   data   |  object  |    否    |       要提交的数据       |
| callback | function |    否    | 数据提交成功时的回调函数 |

##### 5.5 $.post()向服务器提交数据

1. 使用$.post()向服务器提交数据的示例代码如下：

   ```js
   $("#btn").on('click',function () {
               $.post(
                   'http://www.liulongbin.top:3006/api/getbooks', //请求URL地址
                   {bookname:'水浒传',author:'施耐庵',publisher:'上海图书出版社'},  //提交的数据
                   function (res) { //回调函数
                       console.log(res);
                   }
                   )
             })
   ```

##### 5.6 `$.ajxa()`函数的语法

1. 相当于$.get(),$.post()函数，`jQuery`中提供的`$.ajax()`函数，是一个功能比较综合的函数，他也许我们对Ajax请求进行更详细的配置

2. `$.ajax()`函数的基本语法如下：

   ```js
   $.ajax({
   	type:'', // 请求的方式 例如GET或POST
       url:'', // 请求的URL地址
       data:{}, // 这次请求要携带的数据
       success:function(res){} //请求成功的回调函数
   })
   ```

##### 5.7 使用`$.ajax()`发起get请求

1. 使用`$.ajax()`发起GET请求时只需要将type属性的值设置为‘GET’即可：

   ```js
                  $.ajax({
                      type:'GET',
                      url:'http://www.liulongbin.top:3006/api/getbooks',
                      data:{
                          id:1
                      },
                      success:function(res){
                          console.log(res);
                      }
                  })
   
   ```


##### 5.8 使用`$.ajax()`发起post请求

1. 使用`$.ajax()`发起GET请求时只需要将type属性的值设置为‘POST’即可：

   ```JS
   				$.ajax({
                       type:'PSST',
                       url:'http://www.liulongbin.top:3006/api/getbooks',
                       data:{
                           bookname:'史记',
                           author:'司马迁',
                           publisher:'上海图书出版社'
                       },
                       success:function(res){
                           console.log(res);
                       }
                   })
   ```

   

### 6. 接口

##### 6.1 接口的概念

1. 使用Ajax请求数据时，被请求的URL地址，就叫做数据接口（简称接口）。同时，每个接口必须有请求方式。

##### 6.2 接口测试工具

1. 未来验证接口能否被正常访问，我们需要使用接口测试工具，来对数据接口进行检测
2. 好处：接口测试工具能让我们在不写任何代码的情况下，对接口进行调用和调试

##### 6.3 接口文档

1. 什么是接口文档
   1. 接口文档，顾名思义就是接口的说明文档，它是我们调用接口的依据。好的接口文档包含了对接口的URL，参数以及输出内容的说明，我们参照接口文档就能方便的知道接口的作用，以及接口如何进行调用
2. 接口文档的组成部分
   1. 接口文档可以包含很多信息，也可以按需进行精简，不过，一个合格的接口文档，应该包含以下6项内容，从而为接口的调用提依据：
      1. 接口名称：用来标识各个接口的简单说明，如登录接口，获取图书列表接口等
      2. 接口URL：接口的调用地址
      3. 调用方式：接口的调用方式，如GET或POST
      4. 参数格式：接口需要传递的参数每个参数必须包含参数名称，参数类型，是否必选，参数说明这4项内容
      5. 响应格式：接口的返回值的详细描述，一般包含数据名称，数据类型，说明3项内容
      6. 返回示例（可选）：通过对象的形式，列举服务器返回数据的结构

# form表单的基本使用

### 1.0 什么是表单

1. 表单在页面中主要负责数据采集功能。HTML中的<form>标签，就是用于采集用户输入的信息，并通过<form>标签的提交操作，把采集到的信息提交到服务器端进行处理

### 1.2表单的组成部分

1. 表单由三个基本部分组成

   1. 表单标签

   2. 表单域：包含了文本框，密码框，隐藏域，多行文本框，复选框，单选框，下拉选择框，和文件上传框等。

   3. 表单按钮

      ```html
      <form>
          <input type="text" name="email_or_mobile" />
          <input type="password" name="password"/>
          <input type="checkbox" name="remember_me" checked />
          <button type="submit">
              提交
          </button>
      </form>
      ```

### 1.3 form标签的属性

1. form标签用来采集数据，form标签的属性则是用来规定如何把采集到的数据发送到服务器

   |   属性    |                              值                              |                   描述                   |
   | :-------: | :----------------------------------------------------------: | :--------------------------------------: |
   |  action   |                           URL地址                            |   规定当提交表单时，向何处发送表单数据   |
   |  method   |                         get或者post                          | 规定以何种方式把表单数据提交到action URL |
   | `enctype` | application/x-`www`-form-`urencoded multipart`/form-data text/plain |  规定在发送表单数据之前如何对其进行编码  |
   |  target   |        _blank   _self   _parent   _top   `framename`         |         规定在何处打开action URL         |

##### 1. action

1. action属性用来规定当提交表单时，向何处发送表单数据。
2. action属性的值应该时后端提供的一个URL地址，这个URL地址专门负责接收表单提交过来的数据
3. 当form表单在未指定action属性值的情况下，action的默认值为当前页面的URL地址
4. 注意：当提交表单之后，页面会立即跳转到action属性指定额URL地址

##### 2. target

1. target属性用来规定在何处打开action URL

2. 它的可选值有五个，默认情况下，target的值_self，表示在相同框架中打开action URL

   |     值      |            描述            |
   | :---------: | :------------------------: |
   |   _blank    |        在新窗口打开        |
   |    _self    |  默认。在相同的框架中打开  |
   |   _parent   | 在父框架集中打开。(很少用) |
   |    _top     | 在整个窗口中打开。(很少用) |
   | `framename` | 在指定框架中打开。(很少用) |

##### 3. method

1. method属性用来规定以何种方式把表单数据提交到action URL
2. 它的可选值有俩个分别是get和post
3. 默认情况下method的值为get，表示通过URL地址的形式，把表单数据提交到action URL
4. 注意：
   1. get方式适合用来提交少量的，简单的数据
   2. post方法适合用来提交大量的，复杂的，或包含文件上传的数据
   3. 在实际开发中，form表单的post提交方式用的最多很少用get。例如登录，注册，添加数据等表单操作，都需要使用post方式来提交表单

##### `4.enctype`

1. `enctype`属性用来规定在发送表单数据之前如何对数据进行编码

2. 它的可选值有三个，默认情况下，`enctype`的值为application/x-`www`-form-`urlencoded`表示在发送之前编码所有字符

   |                  值                   |                            描述                            |
   | :-----------------------------------: | :--------------------------------------------------------: |
   | application/x-`www`-form-`urlencoded` |                在发送前编码所有字符（默认）                |
   |         `multipart`/form-data         | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值 |
   |              text/plain               |       空格转换为'+'加号，但不对特殊字符编码(很少用)        |

   注意：在涉及到文件上传的操作时，必须将`enctype`的值设置为`multipart`/form-data，如果表单的提交不涉及到文件上传操作，则直接将`enctype`的值设置为application/x-`www`-form-`urlencoded`  即可 

### 表单的同步提交及缺点

1. 缺点：

   1. form表单同步提交后整个页面会发生跳转，跳转到action URL所指向的地址，用户体验很差
   2. form表单同步提交后页面之前的状态和数据会丢失

2. 如何解决表单提交的缺点

   1. 如果使用表单提交数据，则会导致以下俩个问题：
      1. 页面会发生跳转
      2. 页面之前的状态和数据会丢失
   2. 解决方案：表单只负责采集数据，Ajax负责将数据提交到服务器


### 模板引擎的基本概念

##### 模板引擎的好处

1. 减少了字符串的拼接操作
2. 使代码结构更清晰
3. 使代码更易于阅读与维护

### `XMLHttpRequest`的基本使用

##### 什么是`XMLHttpRequset`	

1. 简称`xhr` 是浏览器提供的JavaScript对象，通过它， 可以请求服务器上的数据资源，之前所学的`jQuery`中的Ajax函数就是基于`xhr`对象封装出来的

##### 使用xhr发起GET请求

1. 步骤

   1. 创建xhr对象

   2. 调用xhr.open()函数

   3. 调用xhr.send()函数

   4. 监听xhr.onreadystatechange事件

      ```js
      // 1. 创建XHR对象
      var xhr = new XMLHttpRequest()
      // 2. 使用open函数，指定 请求方式 与 URL地址
      xhr.open('GET','http://www.liulongbin.top:3006/api/getbooks')
      // 3. 使用send函数，发起Ajax请求
      xhr.send()
      // 4. 监听onreadystatechange
      xhr.onreadystatechange= function () {
          // 4.1 监听 xhr 对象的请求状态 readyState；与服务器响应的状态 status
          if(xhr.readyState === 4 && xhr.status === 200) {
              // 4.2 打印服务器响应回来的数据
              console.log(xhr.responseText)
          }
      }
      ```

##### 了解`xhr`对象的`readyState`属性

1. `XMLHttpRequest`对象的`readyState`属性，用来表示当前Ajax请求所处的状态，每个Ajax请求必然处于以下状态中的一个

   |  值  |       状态       |                        描述                        |
   | :--: | :--------------: | :------------------------------------------------: |
   |  0   |      UNSENT      |   `XMLHttpRequest`对象已被创建，但未调用open方法   |
   |  1   |      OPENED      |                  open方法已被调用                  |
   |  2   | HEADERS_RECEIVED |        send方法已被调用，响应头也已经被接收        |
   |  3   |     LOADING      |   数据接收中，此时response属性中已经包含部分数据   |
   |  4   |       DONE       | Ajax请求完成，这意味着数据传输已经彻底完成或者失败 |

##### 使用xhr发起带参数的GET请求

1. 使用xhr对象发起带GET的请求时，值需要在调用xhr.open期间，为URL地址指定参数即可：

   ```
   xhr.open('GET','http://www.liulongbin:3006/api/getbooks?id=1')
   ```

##### 查询字符串

##### 1. 什么是查询字符串

1. 定义：查询字符串(URL参数)是指在末尾加上用于向服务器发送信息的字符串

2. 格式：将英文的?放在URL末尾，然后在加上参数=值，想加上多个参数的话，使用&符号进行分隔。以这个形式，可以将想要发送的服务器的数据添加到URL中

   ```html
   // 不带参数的URL地址
   http://www.liulongbin.top:3006/api/getbooks
   // 带一个参数的URL地址
   http://www.liulongbin.top:3006/api/getbooks?id=1
   // 带多个参数的URL地址
   http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
   ```

##### 2. GET请求携带参数的本质

1. 无论使用$.`ajax`()，还是$.get()，又或者是直接使用xhr对象发起GET请求。当需要携带参数的时候，本质上，都是直接将参数以查询字符串的形式，追加到URL地址的后面，发送到服务器的

   ```js
   $.get('url',(name:'zx',age:20),function(){})
   // 等价于
   $.get('url?name=zx&age=20'function(){})
   
   $.ajax({
       method:'GET',url:'url',data:{name:'zx',age:20},succes:function(){}
   })
   // 等价于
   $.ajax({
       method:'GET',url:'url?name=zx&age=20',succes:function(){}
   })
   ```

### URL编码与解码

##### 1. 什么是URL编码

1. URL地址中。只允许出现英文相关的字母，标点符号，因此，在URL地址中不允许出现中文字符。如果URL中需要包含



### 使用xhr发起POST请求

1. 步骤：

   1. 创建xhr对象

   2. 调用xhr.open()函数

   3. 设置Content-Type属性（固定写法）

   4. 调用xhr.send()函数，同时指定发送的数据

   5. 监听xhr.onreadystatechange事件

      ```js
       <script>
              // 创建xhr对象
              var xhr = new XMLHttpRequest();
              // 调用open函数
              xhr.open('POST','http://www.liulongbin.top:3006/api/addbook')
              // 设置Content-Type属性
              xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
              // 调用send函数
              xhr.send('bookname=水浒传&author=施耐庵&publisher=上海图书出版社')
              // 监听事件
              xhr.onreadystatechange=function () {
                  if (xhr.setRequestHeader === 4 && xhr.status=== 200) {
                      console.log(xhr.responseText);
                  }
              }
          </script>
      ```

      

​                                      

​       