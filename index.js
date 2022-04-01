const express = require('express')
const app = express()
// for .env file
require('dotenv').config()
// to define the port
const port = process.env.PORT || 6000
const cors = require('cors')
app.use(cors())
// helmet for security purpose
const helmet = require('helmet')
app.use(helmet())

// to compress response
var compress = require('compression')
app.use(compress())

// jwt token
// const jwt = require('jsonwebtoken')
// let secretToken = "ABCD1234@@##!!!@"
// var token = jwt.sign({ email: 'hello@world.com', user_id : "123" }, secretToken);
// console.log(token)
// let data = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQHdvcmxkLmNvbSIsInVzZXJfaWQiOiIxMjMiLCJpYXQiOjE2NDgzNzMxMTV9.s_Kkgnr_yK2oStvXPK-jqLWfBglriHwswLRrBZN-ISY",secretToken)
// console.log(data)



// for form-raw data 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// for fileUpload 
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// database connector import 
const {connectMe} = require('./helpers/connection')
connectMe()

// public folder
app.use(express.static("public"))


// importing user router
const router = require('./routes/users.routes')
app.use(router)

// importing books router
const bookRouter = require('./routes/books.routes')
app.use(bookRouter)



// to listen the app on server
app.listen(port, (err)=>{
    if(err){
        console.log(`Oops ! Something wrong on port ${port}`);
    }
    else{
        console.log(`Happy Coding Mr/Mrs on port ${port}`);
    }
})