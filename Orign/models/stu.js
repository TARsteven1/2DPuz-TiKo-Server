const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin888@localhost:27017/map?authSource=admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB Contected !');
});

const model = db.model('stu',{
    id:Number,
    no:String,
    unmame:String,
    sex: String,
    age:Number,
    school:String,
    remark:String


}
);
const modelt = db.model('mapt',{
    MapName:String,
    // Map:[{
    //     type: Number
    // }],
    Map:String,
    NiceCount:Number,
    UpTime:Number,
    Author:String,
    HOT:Number,
    IMEI:Number,
    RecallID:String
}
);
/**
 * @api {post} /stu 存入数据库接口
 * @apiName 存入数据库接口
 * @apiGroup Stu
 *
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 * 
 * @apiBody {String} MapName  地图名称.
 * @apiBody {String} Map  地图结构.
 * @apiBody {Number} NiceCount  获赞数.
 * @apiBody {Number} UpTime  发布时间.
 * @apiBody {String} Author  地图作者.
 * @apiBody {Number} HOT  地图热度.
 * @apiBody {Number} IMEI  玩家设备IEMI码（暂未使用）.
 * @apiBody {String} RecallID  数据库_id（主键）.
 */
//定义处理方法
const createModel=postData=>{
    const insertObj = new modelt(postData)
    return insertObj.save()
    .then(res =>{
       // console.log(res)
        return res
    })
    .catch(err =>{
        console.log('false'+err)
        return false
    })
    }
    const listModelCount=()=>{
        
        return modelt.find().count()
        .then(res =>{
            console.log(res)
            return res
        })
        .catch(err =>{
            console.log('find false'+err)
            return []
        })
        }
/**
 * @api {get} /stu 分页批量查找接口
 * @apiName FindByskip&limit
 * @apiGroup Stu
 *
 * @apiParam {Number} pageno 当前页.
 * @apiParam {Number} pagesize 每页显示条数.
 * @apiParam {String} mode 查找模式.
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 */
    const listModel=(skip,limit,mode)=>{
        if  (mode==1){
        return modelt.find().sort({NiceCount: -1 }).skip(skip).limit(limit)
        .then(res =>{
            console.log(res)
            return res
        })
        .catch(err =>{
            console.log('find false'+err)
            return []
        })
    }
    else
    {
        return modelt.find().skip(skip).limit(limit)
        .then(res =>{
            console.log(res)
            return res
        })
        .catch(err =>{
            console.log('find false'+err)
            return []
        })
    }
        }
 /**
 * @api {get} /stug 单一项查找接口
 * @apiName FindOneByID
 * @apiGroup Stug
 *
 * @apiParam {String} id 查找目标_id.
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 */       

        const FindOneModel=(id)=>{
        
           // return modelt.findOne({"MapName":ObjectId("624672534b684aee606ed1aa")})
            return modelt.findOne({"_id":id})
            .then(res =>{
                console.log(res)
                return res
            })
            .catch(err =>{
                console.log('findone false'+err)
                return []
            })
            }
/**
 * @api {get} /stup 地图获赞接口
 * @apiName NiceCountPlus
 * @apiGroup Stup
 *
 * @apiParam {String} id 获赞目标_id.
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 */
            const FindOneUpdate=(id)=>{
        
                // return modelt.findOne({"MapName":ObjectId("624672534b684aee606ed1aa")})
                 return modelt.findOneAndUpdate({"_id":id},  { $inc: { "NiceCount" : 1 } })
                 .then(res =>{
                     console.log(res)
                     return res
                 })
                 .catch(err =>{
                     console.log('update false'+err)
                     return []
                 })
                 }

         /**
 * @api {get} /stun 获赞后回调接口
 * @apiName NiceCountPlusCallBark
 * @apiGroup Stun
 *
 * @apiParam {String} id 获赞目标_id.
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 */        
        const FindOneModelBackNiceCount=(id)=>{
        
            // return modelt.findOne({"MapName":ObjectId("624672534b684aee606ed1aa")})
             return modelt.findOne({"_id":id})
             .then(res =>{
                 console.log(res)
                 return res
             })
             .catch(err =>{
                 console.log('findone false'+err)
                 return []
             })
             }
             /**
 * @api {get} /stum 按作者名找回地图接口
 * @apiName FindByAuthor
 * @apiGroup Stum
 *
 * @apiParam {String} author 要找回地图的署名作者.
 *
 * @apiSuccess {String} meta 状态码&提示信息.
 * @apiSuccess {String} data  数据.
 */
             const FindBackMyMaps=(author)=>{
        
                // return modelt.findOne({"MapName":ObjectId("624672534b684aee606ed1aa")})
                 return modelt.find({"Author":author})
                 .then(res =>{
                     console.log(res)
                     return res
                 })
                 .catch(err =>{
                     console.log('findone false'+err)
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
        FindOneModel,
        listModelCount,
        FindOneUpdate,
        FindOneModelBackNiceCount,
        FindBackMyMaps,
    }