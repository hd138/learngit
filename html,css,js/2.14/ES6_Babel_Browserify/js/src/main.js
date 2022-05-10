//引入其他的模块

//语法import xxx from '路径'

import $ from 'jquery'

import {foo,bar} from './module1';
import {fun,fun2} from './module2';
// console.log(module1,module2);
import module3 from './module3';


$('body').css('background','green');
foo();
fun();
fun2();
module3.foo();