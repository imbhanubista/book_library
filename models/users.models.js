// importing mongoose
const mongoose = require('mongoose')

// to create Schema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    age:Number,
    sex:String,
    adddress: String,
    phone: Number,
    password: String,
    photo: String,
    isAdmin : Boolean
})

// to create model
const Users = mongoose.model("Users", userSchema)

// export this Users 
module.exports = Users
