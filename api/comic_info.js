var express = require('express');
var app = express();
var fs = require('fs');
var sqlQuery = require('../mysql/connect');
app.use(express.static('public'));
var router = express.Router();


router.get("/hot",async(req,res,next)=>{
    let sqlStr = 'SELECT * from comics ORDER BY hotCounts DESC LIMIT 10 ';
    let result = await sqlQuery(sqlStr);
    res.json({
        state:"ok",
        hot:result
    })
});

router.get('/hotComics',async(req,res,next)=>{
    var time = new Date();
    var year = time.getFullYear();
    var mouth = time.getMonth()+1;
    var date = time.getDate();
    var timeStr = year+"-0"+mouth+"-0"+date+" 00:00";
    let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')";
    try {
        let result = await sqlQuery(sqlStr);

        res.json({
            state:"ok",
            hotComics:result
        })
    } catch (error) {
        console.log('获取图片失败');
		res.send({
			status: 0,
			type: 'ERROR_GET_DATA',
			message: '获取数据失败'
		})
    }
   
});

router.get("/fav/:id",async(req,res,next)=>{
    // let sqlStr = 'SELECT * FROM favorite_comic as t1 LEFT JOIN comics as t2 ON t1.comic_id = t2.id WHERE user_id = '+id;
    let sqlStr = 'SELECT * FROM favorite_comic as t1 LEFT JOIN comics as t2 ON t1.comic_id = t2.id WHERE user_id = "1"';
    let result = await sqlQuery(sqlStr);
    res.json({
        state:"ok",
        fav:result
    })
});

router.post("/details/:id",async(req,res,next)=>{
    let id = req.params.id;
    let sqlStr = 'SELECT * FROM comics as tab1 LEFT JOIN title_list as tab2 on tab1.title = tab2.id  LEFT JOIN category_list as tab3 on tab1.itemList = tab3.id WHERE tab1.id = '+id ;
    let result = await sqlQuery(sqlStr);
    res.json({
        state: "ok",
        detail:result
    })
})

    router.get('/hotComics/:id',async(req,res,next)=>{
        try {
            //格式化当前时间function
            Date.prototype.format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) 
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 4) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    
                return fmt;
            }

            dateId = req.params.id;

            if (dateId == 0) {
                var date = new Date();
                date.setDate(date.getDate());
                var newDate = date.format("yyyy-MM-dd");
                var timeStr = newDate +" 00:00";
                let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                let dairyUpdate = await sqlQuery(sqlStr);

                res.json({
                    state:"ok",
                    comicResult:dairyUpdate
                });
            }else if(dateId == 1){
                    var date = new Date();
                    date.setDate(date.getDate()-1);
                    var newDate = date.format("yyyy-MM-dd");

                    var timeStr = newDate +" 00:00";
                    console.log(timeStr);
                    let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                    let dairyUpdate = await sqlQuery(sqlStr);

                    res.json({
                        state:"ok",
                        comicResult:dairyUpdate
                    });
               
                
            }else if(dateId == 2){
                var date = new Date();
                date.setDate(date.getDate()-2);
                var newDate = date.format("yyyy-MM-dd");
                var timeStr = newDate +" 00:00";
                console.log(timeStr);
                let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                let dairyUpdate = await sqlQuery(sqlStr);

                res.json({
                    state:"ok",
                    comicResult:dairyUpdate
                });
            }else if(dateId == 3){
                var date = new Date();
                date.setDate(date.getDate()-3);
                var newDate = date.format("yyyy-MM-dd");
                var timeStr = newDate +" 00:00";
                console.log(timeStr);
                let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                let dairyUpdate = await sqlQuery(sqlStr);

                res.json({
                    state:"ok",
                    comicResult:dairyUpdate
                });
            }else if(dateId == 4){
                var date = new Date();
                date.setDate(date.getDate()-4);
                var newDate = date.format("yyyy-MM-dd");
                var timeStr = newDate +" 00:00";
                console.log(timeStr);
                let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                let dairyUpdate = await sqlQuery(sqlStr);

                res.json({
                    state:"ok",
                    comicResult:dairyUpdate
                });
            }else if(dateId == 5){
                var date = new Date();
                date.setDate(date.getDate()-5);
                var newDate = date.format("yyyy-MM-dd");
                var timeStr = newDate +" 00:00";
                console.log(timeStr);
                let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                let dairyUpdate = await sqlQuery(sqlStr);

                res.json({
                    state:"ok",
                    comicResult:dairyUpdate
                });
            }else if(dateId == 6){
                var date = new Date();
                date.setDate(date.getDate()-6);
                var newDate = date.format("yyyy-MM-dd");
                var timeStr = newDate +" 00:00";
                console.log(timeStr);
                let sqlStr = "select tab1.id as comic_id, tab1.author,tab1.comicTitle , tab1.authorUrl, tab1.stateInfo, tab1.rate, tab1.brief, tab1.cover, tab1.endChapter, tab1.AllChapter, tab1.hotCounts, tab1.secondBanner,tab1.Popularity,tab2.category FROM comics as tab1 LEFT JOIN category_list AS tab2 on tab1.itemList = tab2.id where UNIX_TIMESTAMP(updateDate) = UNIX_TIMESTAMP('"+timeStr+"')"; 
                let dairyUpdate = await sqlQuery(sqlStr);

                res.json({
                    state:"ok",
                    comicResult:dairyUpdate
                });
            }
            
  
            
        } catch (error) {
            console.log(error);
            res.send({
                status: 0,
                type: 'ERROR_GET_DATA',
                message: '获取数据失败'
            })
        }


    
        // let options = {
        //     state: "ok",
        //     result: Array.from(result)
        // }
        // res.json(options);
    })
module.exports = router;8