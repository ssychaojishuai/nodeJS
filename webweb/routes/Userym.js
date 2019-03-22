//引入express框架
var express =require('express');
//创建一个路由器
var router =express.Router();
//引入service模块
var getserver=require("../service/serveraa");
//新增
router.post('/Add',function (req,res,next) {
    var data =[req.body.myname];
    console.log(data);
    getserver.userAdd(data,function (rdata) {
        res.send({status:0});
    })
});

//查询
router.post('/find',function (req,res,next) {
    var data =[req.body.myname];
    getserver.userFind(data,function (rdata) {
        res.send({status:rdata});
    })
});
//删除
router.post('/delete',function (req,res,next) {
    var data=[req.body.myname];
    getserver.userDelete(data,function (rdata) {
        res.send({status:rdata});
    })
});
//修改
router.post('/update',function (req,res,next) {
    var data=[req.body.myname, req.body.id];
    getserver.userUpdate(data,function (rdata) {
        res.send({status:rdata});
    })
});
    module.exports = router;