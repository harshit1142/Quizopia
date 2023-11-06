const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path: '../.env'});

 function DB(){
    try {
        mongoose.connect(process.env.MONGO_PROD_URI)
        .then((conn)=>{console.log("Database Connected");})
        .catch((err)=>{console.log("error"+err);});
    } catch (error) {
      console.log(error);
    }
}

module.exports=DB;
