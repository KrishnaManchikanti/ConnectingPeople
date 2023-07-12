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

module.exports.destroy = (req,res)=>{
    
    Comment.findById(req.params.id,(err,comment)=>{
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
                
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}},(err,post)=>{
                if(err){console.log("error in find post")};
                return res.redirect('back');
            });
// Post.findById(postId,(err,post)=>{
//     if(err){console.log("error in find post")};
//     post.comments.pop(req.params.id);
//     post.save();
// }) 
        }else{
            return res.redirect('back');
        }
    });
}