let fs = require('fs');
var readline = require('readline');
function fsRead(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,{flag:'r',encoding:"utf-8"},function(err,data){
            if(err){
                //console.log(err)
                //失败执行的内容
                reject(err)

            }else{
                console.log(data)
                //成功执行的内容
                resolve(data)
            }
            //console.log(456)
        })
    })
}


function fsWrite(path,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,{flag:"a",encoding:"utf-8"},function(err){
            if(err){
                //console.log("写入内容出错")
                reject(err)
            }else{
                resolve(err)
                // console.log("写入内容成功")
            }
        })
    })
}
function writeStream(path,data,options){
    return new Promise(function(resolve,reject){
        let WriteStream = fs.createWriteStream(path);
        WriteStream.write(data,options);
        writerStream.end();
        writerStream.on('finish', function() {
            console.log("写入完成。");
        });
    })
}

function fsDir(path){
    return new Promise(function(resolve,reject){
        fs.mkdir(path,function(err){
            if(err){
                reject(err)
            }else{
                resolve("成功创建目录")
            }
        })
    })
}
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        let arrItem = eval(line);
        arrItem = JSON.parse(arrItem);
        arr.push(arrItem);
        
    });
    objReadline.on('close',function () {
        callback(arr);
    });
}

module.exports = {fsRead,fsWrite,fsDir,writeStream,readFileToArr}