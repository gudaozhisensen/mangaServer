var fs = require('fs');
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

function fsReadImg (path,res,req){
    fs.readFile(path,'binary',function(err,file,req){
        if(err){
            console.log(err);
            return ;
        }else{
            
            res.write(file,'binary');
            res.end();
        }
    });
}
module.exports = { fsRead,fsReadImg };