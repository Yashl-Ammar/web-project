const AdminUser = require("../Models/AdminUser");
const jwt = require("jsonwebtoken");

let login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let filter = {username: username};

    AdminUser.findOne(filter)
      .then((user) => {
        if (user.password === password) {
            
          let token = jwt.sign(
            {
              Email: user.email,
              _id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "3h" }
          );
  
          res.status(200).json({
            Success: true,
            user,
            token,
            Message: "user logged in successfully",
          });
        } else {
          res.status(400).json({ Success: false, Message: "user credentials incorrect" });
        }
      })
      .catch((err) => {
        res.status(400).json({ Success: false, Message: "user credentials incorrect",err:err });
    });
};


module.exports = {
    login,
}