const express = require("express");
//ocnst res = require("express/lib/response");
//const res = require("express/lib/response");
//var path = require("path");
var app =express();
// 引入body-parser模块，用来处理post请求参数
const bodyPaser = require("body-parser");
// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}))
app.use(bodyPaser.json());

app.listen(3080,()=>{
    console.log('Hello server!')
});
//app.use("/",express.static(path.join(process.cwd(),"www_root")));
const stuController = require(process.cwd()+'/constroller/stu')
//#添加数据
app.post('/stu',stuController.create)
//#学生列表
app.get('/stu',stuController.index)

app.get("/",function(req,res){
    console.log(req.query)
    res.send("Hello get!");
});
// var fs=require("fs");
// app.put("/upload",function(req,res){
//     //打开文件
//     var fd =fs.openSync("./upload/999.mp3","w");
//     req.on("data",function(data){
//         //把数据写入到文件中
//         fs.write(fd,data,0,data.length,function(){});

//     });
//      req.on("end",function(){
//          res.send("uploadSuccess");
//          fs.close(fd,function(){});
//      });
// });