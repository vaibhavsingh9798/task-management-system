const mongoose = require('mongoose');

async function connectToDB(){
  
    try{
   await mongoose.connect(process.env.MONGO_URI)
   console.log('DB connected')
    }catch(err){
        console.error('db conection error',err)
        process.exit(1);
    }
    
}

module.exports = connectToDB ;