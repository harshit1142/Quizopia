const mongoose =require("mongoose");
const bcrypt =require('bcrypt');

const quizSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    question:{
        type:Array
    }
})

// quizSchema.pre('save',async function(){
//     this.confirmPassword=undefined;
//     const salt=await bcrypt.genSalt(10);
//     const hashPass=await bcrypt.hash(this.password,salt);
//     this.password=hashPass;
// })

const quizModel=mongoose.model("quizModel",quizSchema);

module.exports=quizModel;