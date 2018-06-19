// 引入依赖
var express = require('express');
var utility = require('utility');


var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var async = require('async')
var should = require('should')
var main = require('main')

var cnodeUrl = 'https://cnodejs.org/';
// 建立 express 实例
var app = express();

// app.get('/', function (req, res) {
//     // 从 req.query 中取出我们的 q 参数。
//     // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
//     // 如果分不清什么是 query，什么是 body 的话，那就需要补一下 http 的知识了
//     var q = req.query.q || '123123';
//
//     // 调用 utility.md5 方法，得到 md5 之后的值
//     // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
//     // 我刚入职阿里的时候跟着苏千和朴灵混，所以也混到了不少他们的技术堆栈，仅此而已。
//     // utility 的 github 地址：https://github.com/node-modules/utility
//     // 里面定义了很多常用且比较杂的辅助方法，可以去看看
//     var md5Value = utility.sha1(q);
//
//     res.send(md5Value);
// });

// app.get('/', function (req, res, next) {
//     // 用 superagent 去抓取 https://cnodejs.org/ 的内容
//     superagent.get('https://cnodejs.org/')
//         .end(function (err, sres) {
//             // 常规的错误处理
//             if (err) {
//                 return next(err);
//             }
//             // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
//             // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//             // 剩下就都是 jquery 的内容了
//             var $ = cheerio.load(sres.text);
//             var items = [];
//             $('#topic_list .topic_title').each(function (idx, element) {
//                 var $element = $(element);
//                 items.push({
//                     title: $element.attr('title'),
//                     href: $element.attr('href')
//                 });
//             });
//             $('#topic_list .user_avatar').each(function (idx, element) {
//                 var $element = $(element);
//                 var href = $element.attr('href').split('/')
//                 items[idx]['author'] = href[href.length - 1];
//             });
//
//             res.send(items);
//         });
// });

// superagent.get(cnodeUrl)
//     .end(function (err, res) {
//         if (err) {
//             return console.error(err);
//         }
//         var topicUrls = [];
//         var items = [];
//         var $ = cheerio.load(res.text);
//         $('#topic_list .topic_title').each(function (idx, element) {
//             var $element = $(element);
//             var href = url.resolve(cnodeUrl, $element.attr('href'));
//             items.push({
//                 title: $element.attr('title'),
//                 href: href
//             });
//             topicUrls.push(href);
//         });
//
//         var ep = new eventproxy();
//
//         ep.after('topic_html', topicUrls.length, function (topics) {
//             topics = topics.map(function (topicPair) {
//                 var topicUrl = topicPair[0];
//                 var topicHtml = topicPair[1];
//                 var $ = cheerio.load(topicHtml);
//                 var score = $('.board  .big').eq(0).text().trim().split(':')
//                 return ({
//                     title: $('.topic_full_title').text().trim(),
//                     href: topicUrl,
//                     comment1: $('.reply_content').eq(0).text().trim(),
//                     author:$('.user_name .dark').eq(0).text().trim(),
//                     score1:score[1],
//                 });
//             });
//
//             console.log(topics);
//         });
//
//         // topicUrls.forEach(function (topicUrl, index) {
//         //     superagent.get(topicUrl)
//         //         .end(function (err, res) {
//         //             console.log('fetch ' + topicUrl + ' successful', 'compare:', items[index]["href"]);
//         //             ep.emit('topic_html', [topicUrl, res.text]);
//         //         });
//         // });
//
//         var concurrencyCount = 0;
//         var fetchUrl = function (url, callback) {
//             var delay = parseInt((Math.random() * 10000000) % 2000, 10);
//             concurrencyCount++;
//             console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
//             setTimeout(function () {
//                 concurrencyCount--;
//                 superagent.get(url)
//                     .end(function (err, res) {
//                         ep.emit('topic_html', [url, res.text]);
//                     });
//                 callback(null, url + ' html content');
//             }, delay);
//         };
//
//         async.mapLimit(topicUrls, 5, function (topicUrl, callback) {
//             fetchUrl(topicUrl, callback);
//         }, function (err, result) {
//             console.log('final:');
//             console.log(result);
//         });
//     });
describe('test/main.test.js', function () {
    it('should equal 55 when n === 10', function () {
        main.fibonacci(10).should.equal(55);
    });
});
// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(2000, function () {
    console.log('app is listening at port 2000');
});