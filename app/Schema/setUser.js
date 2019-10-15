const mongoose = require("mongoose");

//建立表规则
let UserSchema = new mongoose.Schema({
    username:{required:true,type:String},
    age:{required:true,type:Number},
    password:{required:true,type:String},
    date:{required:true,type:String}

})

module.exports = mongoose.model("userlist",UserSchema);