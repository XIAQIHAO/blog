const mongoose = require('mongoose');

//表规则
let userSchema = new mongoose.Schema({
    title:{required:true,type:String},
    date:{required:true,type:String},
    readnum:{type:Number,default:0},
    imges:{required:true,type:Array},
    likenum:{type:Number,default:0},
    desc:{required:true,type:String},
    commentuser:{default:[],type:Array},
    comment:{default:[],type:Array},
    descdate:{default:[],type:Array}
})


//导出表
module.exports = mongoose.model('publish',userSchema);
