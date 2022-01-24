const Post = require("../models/Post.js")

module.exports = async(req, res) => {
    const post = await Post.findById(req.params.id).populate("author", "username");
    res.render("post",{post})
}