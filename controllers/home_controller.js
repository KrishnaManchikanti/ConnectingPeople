const Posts = require('../models/post');

module.exports.home = (req,res)=>{
    console.log('Cookies: ', req.cookies)
    //populating the user of each post


    Posts.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec((err,posts)=>{
        if(err){console.log("err in fetching posts",err);return;}
        return res.render('home',{
            title:"Home",
            posts:posts.reverse()
        });
    });
}