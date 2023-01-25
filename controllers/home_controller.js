const Posts = require('../models/post');

module.exports.home = (req,res)=>{
    console.log('Cookies: ', req.cookies)
    //populating the user of each post
    Posts.find({}).populate('user').exec((err,posts)=>{
        if(err){console.log("err in fetching posts",err);return;}
        return res.render('home',{
            title:"Home",
            Posts:posts
        });
    });
}