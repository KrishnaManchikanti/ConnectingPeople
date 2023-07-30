const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req,res)=>{
    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user:req.user._id,
                post:req.body.post
            });
            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment Created');
            res.redirect('/');
        }
    } catch (error) {
        console.log('Error',error);
    }
}

module.exports.destroy = async (req,res)=>{
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});//post.comments.pop(req.params.id);  
            req.flash('success', 'Comment Deleted');
        };
        return res.redirect('back');
    } catch (error) {
        console.log("error in find post",error);
    }
}