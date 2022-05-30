let name = '小明';
let age = 18;
let flag = true;

function sum(num1, num2) {
	return num1 + num2;
}

if (flag) {
	console.log(sum(10, 20));
}

// 1. 导出方式1
export {name, flag, sum };

// 2. 导出方式2
export let num1 =1000
export let age1 = 1.88

// 3.导出函数/类
export function mul (num1 , num2){
  return num1 + num2
}

export class Person {
  run(){
    console.log('在奔跑');
  }
}

// 4.export default
// const address= '武汉市'

// export default address

export default function(arg){
  console.log(arg);
}