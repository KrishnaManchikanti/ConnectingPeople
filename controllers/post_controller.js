const Post = require('../models/post');

module.exports.create = (req,res)=>{
    if(req.isAuthenticated()){
        Post.create({
            content:req.body.content,
            user:req.user._id // u can use session.passport.user
        })
       res.redirect('/');
    }else{
        res.redirect('/users/sign-in');
    }
}