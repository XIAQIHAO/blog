const mongoose = require("mongoose")

//建立表规则
const UserSchema = new mongoose.Schema({
    desces:{required:true,type:String},
    imgUrl:{required:true,type:String},
    username:{required:true,type:String},
    date:{required:true,type:String}
})

module.exports = mongoose.model("customer",UserSchema);