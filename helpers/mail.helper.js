// to send the maile
const nodemailer = require("nodemailer")

const mailMe =(to,subject,text)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let mailOption = {
        from :process.env.EMAIL ,
        to,
        subject,
        text
    }
    transporter.sendMail(mailOption, (err,info)=>{
        if(err){
            console.log(err.message );
        }
        else{
            console.log("Mail Sent successfully");
        }
    })
}

module.exports={
    mailMe
}