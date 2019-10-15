const mongoose = require("mongoose");

//表规则
let UserSchema = new mongoose.Schema({
    title:{type:String,required:true},
    usercomment:{type:String,required:true},
    date:{type:String,default:new Date().toLocaleString()},
    comment:{type:String,required:true}
})

//导出表
module.exports = mongoose.model("discuss",UserSchema);