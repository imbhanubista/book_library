const mongoose = require('mongoose')

// lets make a function to connect our app with database

const connectMe = ()=>{
    let userData = "mongodb://localhost:27017/school_data"
    // lets connet database
    mongoose.connect(userData,(err,success)=>{
        if(err){
            console.log("Something went wrong");
        }
        else{
            console.log("Database Working fine!!!");
        }
    })
}

module.exports={
    connectMe
}