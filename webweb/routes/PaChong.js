var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https')    // https
var cheerio = require('cheerio');

//数据库操作
var db = require("../dao/database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '简单nodejs爬虫' });
});

router.get('/getJobs', function(req, res, next) { 

    var url = 'https://v.qq.com/';
    https.get(url, function(res) {
        var html = '';
        // 获取页面数据
        res.on('data', function(data) {
            html += data;
        });

        // 数据获取结束
        res.on('end', function() {
            // 通过过滤页面信息获取实际需求信息
            var slideListData = filterSlideList(html);
            //数据入库
            db.query("INSERT into video(video_href, video_name, video_img) VALUES ?", [slideListData], function(rdata){
    			return;
            })
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    });

    res.send("数据已经入库");

});

//添加数据到二维数组中
function addArrtData(arr, data){
    return arr.push(data)
}

/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        //获取腾讯所有的链接视频--视频的父元素
        var slideList_list_item  = $(".list_item ");

        //数据存储
        var slideListData = [];
        slideList_list_item.each(function(item) {
            var that = $(this);
            //获取视频的图片地址--为图片添加链接地址
            var _video_img = "http://" +  that.find(".figure_pic").attr("src");

            //获取视频的链接地址属性
            var _video_href = that.find(".figure_title").attr("href");

            //获取视频的title属性
            var _video_name = that.find(".figure_title").attr("title");
            slideListData.push([_video_href, _video_name, _video_img]);
        });
        // 返回数据
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}

module.exports = router;

