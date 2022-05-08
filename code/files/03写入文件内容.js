// 导入fs文件系统模块
const fs = require('fs')

// 2.调用fs.writeFile方法，写入文件内容
// 参数1：表示文件存放路径
// 参数2：表示要写入的内容
// 参数3：回调函数
fs.writeFile('./3.txt','ok 123',function(err){
    // 2.1 如果文件写入成功，则err为null
    // 2.2 如果文件写入失败，则err的值等于一个错误对象
    // console.log(err);
    if (err) {
        return console.log('文件写入失败'+err.message);
    }
    console.log('文件写入成功');
})