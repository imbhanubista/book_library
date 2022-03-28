
// joi validator
const joi = require('joi')

 const userValidator = joi.object({
    name : joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().lowercase().required(),
    age:joi.number().required(),
    sex:joi.string().required(),
    address: joi.string().required(),
    phone: joi.number().required(),
    password: joi.string().alphanum().required()
 })

 const genderVerify = [
     "male",
     "female",
     "other"
 ]

 const logValidator = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().lowercase().required(),
    password: joi.string().alphanum().required()
     
 })

 const updatePassValidator = joi.object({
     password: joi.string().alphanum().min(5).max(15).required(),
     cpassword: joi.string().alphanum().min(5).max(15).required()

 })

 const addBookVerify = joi.object({
     bname: joi.string().required(),
     author: joi.string().required(),
     edition: joi.string().alphanum().required(),
     publication: joi.string().required(),
     category: joi.string().required()
 })

 module.exports = {
     userValidator,
     genderVerify ,
     logValidator ,
     updatePassValidator ,
     addBookVerify
 }