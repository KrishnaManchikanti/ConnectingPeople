const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post,(err, post)=>{
        if(post){
            Comment.create({
                content: req.body.content,
                user:req.user._id,
                post:req.body.post
            }, function(err, comment){
                if(err){console.log("err in creating comment",err);return;}
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
   
}