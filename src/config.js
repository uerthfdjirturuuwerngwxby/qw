const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");

connect.then(()=>{
    console.log("database connected sucessfully");
})
.catch(()=>{
    console.log("database cannot be connected");
});
const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    a:{
        type:String,
        require:true
    }

});

const collection =new mongoose.model("users",LoginSchema);

module.exports=collection;