const mongoose = require('mongoose')


const forgotSchema = mongoose.Schema({
    email: String,
    code : String
})

const ForgotPassword = mongoose.model("ForgotPassword", forgotSchema)

module.exports = ForgotPassword;