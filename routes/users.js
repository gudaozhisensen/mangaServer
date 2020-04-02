var express = require('express');
var router = express.Router();
var sqlQuery = require('../mysql/connect')

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  let sqlStr = "select * from comics where itemList =31";
  let result = await sqlQuery(sqlStr);
  res.json({
    state:"ok",
    type:"热血",
    all:Array(result)
  })
});

module.exports = router;
