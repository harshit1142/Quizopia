const mongoose =require("mongoose");
const bcrypt =require('bcrypt');

const teacherSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true,
        validate:function(){
            return this.password===this.confirmPassword;
        }
    },
    role:{
        type:String,
        default:"Teacher"
    },
    subject:{
        type:"String",
    },
    accepted:{
        type:Boolean,
        default:false
    },
    quiz:[{
        type:mongoose.Schema.ObjectId,
        ref:'quizModel'
    }],
    notice:[{
        type:mongoose.Schema.ObjectId,
        ref:'teacherNotice'
    }] 
})

teacherSchema.pre('save',async function(){
    this.confirmPassword=undefined;
    const salt=await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(this.password,salt);
    this.password=hashPass;
})

const teacherModel=mongoose.model("TeacherModel",teacherSchema);

module.exports=teacherModel;