//导入模型
const {
    createModel,
    listModel,
}=require(process.cwd()+'/models/stu')
//定义处理方法
const create=async(req,res)=>{
//res.send("this is stu create")
//接收数据
let postData =req.body
console.log(postData)
//过滤（写接口一定要过滤）

//操作数据库
let rs=await createModel(postData)
//判断返回
if (rs){
    res.send({
    meta:{
        state:200,
        msg:"添加成功"
    },data:null})
}
else    {
    res.send({
        meta:{
            state:500,
            msg:"添加失败"
        },data:null})
}
}

//列表
const index=async (req,res)=>{
   // res.send("this is stu create")
   //接收data
let getData=req.query
console.log(getData)
   //过滤（重要step）
//JSON.stringify(Data)!=='{}'  判断Data是否为空


   let limit=parseInt(getData.pagesize)
   let skip=(parseInt(getData.pageno)-1)*limit
   //获取data
let data=await listModel(skip,limit)
   //响应data
   res.send({
    meta:{
        state:200,
        msg:"find suc"
    },data:data})
}

//导出成员
module.exports = {
    create,
    index,
}