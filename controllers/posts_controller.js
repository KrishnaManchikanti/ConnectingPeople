const Post = require('../models/post');
const Comments = require('../models/comment');
const { localsName } = require('ejs');
module.exports.create = async (req,res)=>{
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            await post.populate('user', '-password');
            return res.status(200).json({
                data:{
                    post: post,
                },
                message: "Post Created",
            })
        }

        req.flash('success', 'Post Created');
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
            console.log(req.xhr);
            if(req.xhr){
                return res.status(200).json({ 
                    data:{
                        post_id: req.params.id,
                    },
                    message: "Post Found",
                })
            }
            req.flash('success', 'Post Removed');
        }

        return res.redirect('back');
    } catch (error) {
        console.log('Error',error);
    }
}