var express = require('express');
var app = express();
var fs = require('fs');
var fileControl = require('../public/js/lcfs');
var sqlQuery = require('../mysql/connect');
app.use(express.static('public'));
var router = express.Router();
 
router.post("/:id",async(req,res,next)=>{
    let id = req.params.id;
    //获取开始的1-10的章节
    let sqlStr = 'SELECT * FROM chapter_list WHERE comic = '+id+' ORDER BY id DESC LIMIT 10';
    let sqlStr1 = 'SELECT category_list.category FROM comics LEFT JOIN category_list on comics.itemList = category_list.id WHERE comics.id = '+id;
    let sqlStr2 = 'SELECT category_list.id FROM comics LEFT JOIN category_list on comics.itemList = category_list.id WHERE comics.id = '+id;
    let categoryId = await sqlQuery(sqlStr2);
    let sqlStr3 = 'SELECT comics.id,comics.comicTitle,comics.cover FROM comics WHERE comics.itemList = '+categoryId[0].id+' ORDER BY hotCounts LIMIT 3';
    let sqlStr4 = 'SELECT tab1.id, tab1.comicTitle,tab1.cover,tab2.category FROM comics as tab1 LEFT JOIN category_list as tab2 on tab1.itemList = tab2.id ORDER BY RAND() LIMIT 10';
    //获得当前阅读章节id的顺序的前5和后5
    let sqlStr5 = '((SELECT * FROM chapter_list WHERE id<2354 ORDER BY id DESC LIMIT 5) UNION (SELECT * FROM chapter_list WHERE id>=2354 ORDER BY id ASC LIMIT 5) ) ORDER BY id DESC';
    //顺序获得全部章节
    let sqlStr6 = 'SELECT * FROM chapter_list WHERE comic = '+id+' ORDER BY id DESC';
    //倒叙获得全部章节
    let sqlStr7 = 'SELECT * FROM chapter_list WHERE comic = '+id+' ORDER BY id ASC';
    try { 
        let result = await sqlQuery(sqlStr);
        let category = await sqlQuery(sqlStr1);
        let topRank = await sqlQuery(sqlStr3);
        let rand = await sqlQuery(sqlStr4);
        let DescAllChapter = await sqlQuery(sqlStr6);
        let AscAllChapter = await sqlQuery(sqlStr7);
    res.json({
        state:"ok",
        allChapter:result,
          category: category,
          rankData: topRank,
          randData: rand,
          DescAllChapter: DescAllChapter,
          AscAllChapter: AscAllChapter
    })
    } catch (error) {
        console.log('获取数据失败',error);
		res.send({
			status: 0,
			type: 'ERROR_GET_DATA',
			message: '获取数据失败'
		})
    }
    
});


module.exports = router;