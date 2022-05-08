//  1.导入fs模块
const fs = require('fs')

// 2.调用fs.readFile()读取文件内容
fs.readFile('./成绩.txt','utf8',function(err,dataStr){
    // 3. 判断是否读取成功
    if(err) {
        return console.log('读取文件失败'+err.message);

    }
    // console.log('读取文件成功'+dataStr);

    // 4.1 先把成绩的数据按照空格进行分割
    const arrOld = dataStr.split(' ')
    // 4.2 循环分割后的数组对每一项数据进行字符串的替换操作
    const arrNew=[]
    arrOld.forEach(item=>{
        arrNew.push(item.replace('=','：'))
    })
    // 4.3吧新数组中的每一项 进行合并，得到一个新的字符集
    // console.log(arrNew);
    const newStr = arrNew.join('\r\n')
    console.log(newStr);

    // 5. 调用fs.writeFile() 方法 吧处理完毕的数据，写入到新文件中
    fs.writeFile('./成绩-ok.txt',newStr,function(err){
        if (err) {
          return console.log('成绩写入失败'+err.message);
        }
        console.log('成绩写入成功');
    })
})