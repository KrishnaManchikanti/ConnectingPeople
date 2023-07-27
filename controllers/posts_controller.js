const Post = require('../models/post');
const Comments = require('../models/comment');
const { localsName } = require('ejs');
module.exports.create = async (req,res)=>{
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');

    } catch (error) {
        console.log(Error,error);
    }
}

module.exports.destroy = async (req,res)=>{
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();//removing whole collection in db(mongoose)
            await Comments.deleteMany({post:req.params.id});
        }
        return res.redirect('back');
    } catch (error) {
        console.log('Error',error);
    }
}