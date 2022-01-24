const User = require("../models/User");

module.exports = (req, res, next) => {
    //// fetch qilamiz yaniy mongoDB ga so'rov yuboramiz
    //// userlarimiz borligini tastiqlaymiz
    //// if qilib agarda userimiz bor bo'lsa request qilamiz
    //// else qilib yokiy rederect qilib qaytarib yuboramiz
    User.findById(req.session.userId, (err, user)=> {
        if(err || !user){
            return res.redirect("/login")
        }
        next();
    })
}