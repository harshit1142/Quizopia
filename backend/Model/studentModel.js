const mongoose =require("mongoose");
const bcrypt =require('bcrypt');

const studentSchema= new mongoose.Schema({
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
        default:"Student"
    },
    branch:{
        type:String,
        require:true
    },
    graduationYear:{
        type:Number,
        require:true
    },
    quiz:[{
        type:mongoose.Schema.ObjectId,
        ref:'quizModel'
    }]  
})

studentSchema.pre('save',async function(){
    this.confirmPassword=undefined;
    const salt=await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(this.password,salt);
    this.password=hashPass;
})

const studentModel=mongoose.model("StudentModel",studentSchema);

module.exports=studentModel;