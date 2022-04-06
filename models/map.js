const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/map');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('succ');
});

const model = db.model('map',{
    Name:String,
    Map:String,
    NiceCount:Number,
    UpTime: Number,
    Author:String,
    HOT:Number,
    IMEI:Number


}
);
//定义处理方法
const createModel=postData=>{
    const insertObj = new model(postData)
    return insertObj.save()
    .then(res =>{
        console.log(res)
        return res
    })
    .catch(err =>{
        console.log('false'+err)
        return false
    })
    }
/**
 * @api {get} /stu 接口测试
 * @apiName Add
 * @apiGroup Stu
 *
 * @apiParam {Number} pageno 当前页.
 * @apiParam {Number} pagesize 每页显示条数.
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 */
    const listModel=(skip,limit)=>{
        
        return model.find().skip(skip).limit(limit)
        .then(res =>{
            console.log(res)
            return res
        })
        .catch(err =>{
            console.log('find false'+err)
            return []
        })
        }
    // db.createUser({
    //     "user":"admin",
    //     "pwd":"123456",
    //     "roles":[{
    //         role:"root",
    //         db:"admin"
    //     }]
    // })
    //导出成员
    module.exports = {
        createModel,
        listModel,
    }