const Posts = require('../models/post');
const User = require('../models/user');
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

        User.find({},function(err,user){
            return res.render('home',{
                title:"Home",
                posts:posts.reverse(),
                all_users:user
            });
        });
    });
}