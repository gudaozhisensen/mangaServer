let mysql = require('mysql');

let options = {
    connectionLimit: 10, 
    host:"localhost",
    port:"3306",//可选，默认式3306
    user:"root",
    password:"root",
    database:"manga"
}

//建立连接池
let con = mysql.createPool(options);



//建立连接
con.getConnection((err)=>{
    //如果建立连接失败
    if(err){
        console.log(err);
        setTimeout('mysql.createPool(options)',2000);
    }else{
        console.log('数据库连接成功')
    }
})

con.on('error',err=>{
    console.log('Re-connecting lost connection: ');
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        mysql.createPool(options);
    } else {
        throw err;
    }

})

function sqlQuery(strSql,arr){
    return new Promise(function(resolve,reject){
        con.query(strSql,arr,(err,results)=>{
            if(err){
                console.log(err);[]
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery;