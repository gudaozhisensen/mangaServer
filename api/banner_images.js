var express = require('express');
var app = express();
var fs = require('fs');
var sqlQuery = require('../mysql/connect');
app.use(express.static('public'));
var router = express.Router();
let multer = require('multer');
let host = 'localhost:3000';
//配置上传对象
let upload = multer({dest:"./public/images/banner"})

router.get('/banner', async(req, res, next)=> {
    let strSql = 'SELECT * FROM banner WHERE show_state = 1';
    let result = await sqlQuery(strSql);
    console.log(result);
    res.json({
        banner:result
    })
})

// upload section
router.post('/imagesUpload',upload.single('test1'),async (req,res)=>{
    //将改名后的结果，上传到数据库
    let result = rename(req);
    let strSql = 'insert into banner (id,banner_url,title,show_state) values (?, ?, ?, ?)';
    let arr = [result.id,result.imgUrl,result.id,1];
    await sqlQuery(strSql,arr)
    res.json(result);
  })

  function rename(req){
    //console.log(req.file)
    let oldPath = req.file.destination+"/"+req.file.filename;
    let newPath = req.file.destination+"/"+req.file.filename+req.file.originalname;
    fs.rename(oldPath,newPath,()=>{
        //console.log("改名成功")
    })
    return { 
      state:'ok',
      imgUrl:host+"/images/banner/"+req.file.filename+req.file.originalname,
      id: req.file.size
    }
  }

// upload section



module.exports = router;
