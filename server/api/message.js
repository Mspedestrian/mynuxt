import { Router } from 'express'

const router = Router()

// Mock 消息列表数据
const messageList = [
  { 
    id:1,
    imgUrl:'',
    message:'hello',
    type:0,
    userName:'酸辣粉',
    userId:11,
  },

  { 
    id:2,
    imgUrl:'',
    message:'hello',
    type:1,
    userName:'蒸水蛋',
    userId:12,
  },
  { 
    id:3,
    imgUrl:'',
    message:'hello',
    type:0,
    userName:'酸辣粉',
    userId:11,
  },
  { 
    id:4,
    imgUrl:'',
    message:'长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息',
    type:1,
    userName:'蒸水蛋',
    userId:12,
  },
  { 
    id:3,
    imgUrl:'',
    message:'长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息长信息',
    type:0,
    userName:'酸辣粉',
    userId:11,
  },
  { 
    id:4,
    imgUrl:'',
    message:'border-color 属性设置四条边框的颜色。此属性可设置 1 到 4 种颜色。border-color 属性是一个简写属性，可设置一个元素的所有边框中可见部分的颜色，或者为 4 个边分别设置不同的颜色。请看下面的例子：',
    type:1,
    userName:'蒸水蛋',
    userId:12,
  },
  { 
    id:3,
    imgUrl:'',
    message:'所有浏览器都支持 border-color 属性。',
    type:0,
    userName:'酸辣粉',
    userId:11,
  },
  { 
    id:4,
    imgUrl:'',
    message:'border-color 属性设置四条边框的颜色。此属性可设置 1 到 4 种颜色。border-color 属性是一个简写属性，可设置一个元素的所有边框中可见部分的颜色，或者为 4 个边分别设置不同的颜色。请看下面的例子：',
    type:1,
    userName:'蒸水蛋',
    userId:12,
  },
  { 
    id:3,
    imgUrl:'',
    message:'ggghjjjjnhgghhhhhjjnbhbbbbjnjjnbbnjjjjjjnbvvghhj',
    type:0,
    userName:'酸辣粉',
    userId:11,
  },
]
const resObj = {
  code:null,
  desc:'',
  data:null,
}

/* GET users listing. */
router.get('/message/getMessageList', function (req, res, next) {
  resObj.code="000001";
  resObj.desc="成功";
  resObj.data = [];
  res.json(resObj)
})





export default router
