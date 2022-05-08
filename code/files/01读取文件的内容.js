// 导入fs模块
const fs = require('fs')
// 2 调用fs.readFile() 方法读取文件
//   参数1：读取文件的存放路径
//   参数2：读取文件时候采用的编码格式 utf8
//   参数：回调函数，拿到读取失败和成功的结果 err dataStr
fs.readFile('./1.txt','utf8',function(err,dataStr){
    // 打印失败的结果
    console.log(err);
    // 打印成功的结果 
    console.log('---------');
    console.log(dataStr);
})