var express = require("express");
const res = require("express/lib/response");
var path = require("path");
var app =express();
app.listen(6080);
app.use("/",express.static(path.join(process.cwd(),"www_root")));
app.get("/uploadData",function(req,res){
    console.log(req.query)
    res.send("BYCWUnityWebRequest!");
});
var fs=require("fs");
app.put("/upload",function(req,res){
    //打开文件
    var fd =fs.openSync("./upload/999.mp3","w");
    req.on("data",function(data){
        //把数据写入到文件中
        fs.write(fd,data,0,data.length,function(){});

    });
     req.on("end",function(){
         res.send("uploadSuccess");
         fs.close(fd,function(){});
     });
});