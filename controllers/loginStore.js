const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (req, res) => {
  const { password, email } = req.body;

  User.findOne({ email }, async (err, user) => {
    if (err) {
      console.log(Object.keys(err.errors).map(key => err.errors[key].message));
    } else if (user) {
      const validPsssword = await bcrypt.compare(password, user.password);

      if (validPsssword) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      return res.redirect("/login");
    }
  });
};
