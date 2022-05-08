const fs = require('fs')

// 出现路径拼接错误的 是因为提供了./或../开头的相对路径
// 如果要解决这个问题，可以直接提供一个完整的文件存放就行
// fs.readFile('./1.txt','utf8',function(err,dataStr){
//     if (err) {
//       return console.log('读取文件失败'+err.message);
//     }
//     console.log('读取文件成功'+dataStr);
// })


// 移植性非常差 不利于维护
// fs.readFile('C:\\Users\\笙\\Desktop\\桌面文件\\node\\code\\files\\1.txt','utf8',function(err,dataStr){
//     if (err) {
//       return console.log('读取文件失败'+err.message);
//     }
//     console.log('读取文件成功'+dataStr);
// })

// __dirname 表示当前文件夹所处的目录
console.log(__dirname);

fs.readFile(__dirname+'/1.txt','utf8',function(err,dataStr){
    if (err) {
      return console.log('读取文件失败'+err.message);
    }
    console.log('读取文件成功'+dataStr);
})