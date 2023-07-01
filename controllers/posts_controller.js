const Post = require('../models/post');
const Comments = require('../models/comment');
const { localsName } = require('ejs');
module.exports.create = (req,res)=>{

    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
    
}

module.exports.destroy = (req,res)=>{

    Post.findById(req.params.id,(err,post)=>{
        if(post.user == req.user.id){
            post.remove();//removing whole collection in db(mongoose)
            Comments.deleteMany({post:req.params.id},(err)=>{
                if(err){console.log(`err in deleting comment ${post._id}`)};
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}