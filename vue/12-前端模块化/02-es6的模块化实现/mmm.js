// 1. 导入的{}中定义的变量
import { flag, sum } from './aaa.js';

if (flag) {
	console.log('小明是天才，哈哈哈哈');
	console.log(sum(10, 20));
}

// 2. 直接导入export定义的变量
import { num1, age1 } from './aaa.js';
console.log(num1, age1);

// 3. 导入export的function
import { mul, Person } from './aaa.js';

console.log(mul(30, 50));

const p = new Person();
p.run();

// 4. 导入export default中的内容
import addr from './aaa.js';
addr('你好啊');

// 统一全部导入

import * as aaa from './aaa.js';
console.log(aaa.flag);
console.log(aaa.height);
