const mongoose = require('mongoose')

// lets make a function to connect our app with database

const connectMe = ()=>{
    let userData = process.env.DB_URL
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