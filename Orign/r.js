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

model.find().then(res => {
    console.log(res)
    return res}).catch(err=>{
        console.log(err)
         return false});