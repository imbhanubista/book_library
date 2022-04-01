const {
  userValidator,
  genderVerify,
} = require("../../helpers/validator.helper");
//  user model import
const Users = require("../../models/users.models");

// import mailMe
const {mailMe} = require('../../helpers/mail.helper')
// to hide the original password using bcrypt package
const bcrypt = require("bcrypt");
const { signUpSuccessful, fileUploaded, validGender, fileUploadederr, emailTaken } = require("../../responses/common");

// to create user signup
exports.createUsers = async (req, res) => {
  // let name = req.body.name
  // let email = req.body.email
  // let age = req.body.age
  // let sex = req.body.sex
  // let address = req.body.address
  // let phone = req.body.phone
  // let password = req.body.password

  let { name, email, age, sex, address, phone, password } = req.body;
  console.log(req.body);
  // to validate using joi
  let userValidate = userValidator.validate({
    name,
    email,
    age,
    sex,
    address,
    phone,
    password,
  });
  // console.log(userValidate)
  if (userValidate.error) {
    res.json({
      type: "error",
      msg: userValidate.error.details[0].message,
    });
  } else if (!req.files || !req.files.profile) {
    res.json({
      type: "error",
      msg: fileUploadederr,
    });
  } else if (!genderVerify.includes(sex.toLowerCase())) {
    res.json({
      type: "error",
      msg: validGender,
    });
  } else {
    // for file
    let file = req.files.profile;
    let path = "/images/profiles/" + file.name;

    // file.mv(path,(err)=>{})

    file.mv("public"+path, async (err) => {
      if (err) {
        res.json({
          type: "error",
          msg: fileUploadederr,
        });
      }
      
      else {
        try {
          // hashing password
          let hashingPassword = await bcrypt.hash(password, 10);
          // user can't registered when the email already exist
          let isExistEmail = await Users.findOne({ email });
          if (isExistEmail !== null) {
            res.json({
              type: "error",
              msg: emailTaken,
            });
          } 
          else {
              mailMe(email, "Sign In Successfully", "Thanks for being a member"+ Math.random())
            let db = await new Users({
              name,
              email,
              age,
              sex,
              address,
              phone,
              password: hashingPassword,
            }).save();
            res.json({
              type: "success",
              msg: signUpSuccessful,
              data: {
                name: db.name,
                email: db.email,
                address: db.address,
                sex: db.sex,
                phone: db.phone,
                photo: path,
              },
            });
          }
        } catch (err) {
          res.json({
            type: "error",
            msg: err.message,
          });
        }
      }
    });
  }
};
