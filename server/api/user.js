var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser())
//登录
let userList = [{
    userId:1,
    userName:'user1',
    nickName:'灯花',
    password:'user1',
    imgUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4111874431,464745319&fm=27&gp=0.jpg',
},{
    userId:2,
    userName:'user2',
    nickName:'蒸水蛋',
    password:'user2',
    imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527158996602&di=e076032521ec56c86d62c947d3448e0b&imgtype=0&src=http%3A%2F%2Fi5.xiachufang.com%2Fimage%2F600%2Fe234f180e03711e4b0bce0db5512b208.jpg',
},{
    userId:3,
    userName:'user3',
    nickName:'过桥米线',
    password:'user3',
    imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527159040332&di=ee6fb0ee82c7abb3a11ceadf2a9d7d9b&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2Fcaef76094b36acaf5515513875d98d1000e99c79.jpg',
},]
router.post('/signup',function(req, res) {
    // console.log(req.body)
    // let obj = {
    //     code:'000001',
    //     desc:'success',
    //     data:''
    // }
    let reObj = null;
    let obj = userList.find((value,index)=>{
        return value.userName == req.body.userName && value.password == req.body.password;
    })
    if(obj){
        reObj = {
            code:'000001',
            desc:'success',
            data:obj.userId,
        }
    }
    else {
        reObj = {
            code:'100001',
            desc:'用户名密码不匹配',
            data:'用户名密码不匹配',
        }
    }


    res.json(reObj);
})
router.get('/user/userList',function(req, res) {
    // console.log(req.body)
    let obj = {
        code:'000001',
        desc:'success',
        data:userList
    }
    res.json(obj);
})
router.get('/user/getUserById',function(req, res) {
    // console.log(req.body)
    console.log(req.cookies.userId);
    if(!req.cookies||!req.cookies.userId) {
        res.json({
            code:'100000',
            desc:'用户未登录',
            data:'用户未登录',

        });
    }
    let reObj = null;
    let obj = userList.find((value,index)=>{
        return value.userId == req.cookies.userId
    })
    if(obj){
        reObj = {
            code:'000001',
            desc:'success',
            data:obj,
        }
    }
    else {
        reObj = {
            code:'100001',
            desc:'用户名密码不匹配',
            data:'用户名密码不匹配',
        }
    }
    res.json(reObj);
})

module.exports = router;