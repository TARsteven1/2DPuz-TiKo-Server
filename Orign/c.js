const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/school');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('succ');
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
const insertObj = new model({
    id:21,
    no:"QF21",
    unmame:"神龙教21",
    sex:"男",
    age:21,
    school:"小学",
    remark:"有点小钱"

})

insertObj.save()
.then(res =>{
    console.log(res)
    return res
})
.catch(err =>{
    console.log('false'+err)
    return false
})
// model.find().then(res => {
//     console.log(res)
//     return res}).catch(err=>{
//         console.log(err)
//          return false});