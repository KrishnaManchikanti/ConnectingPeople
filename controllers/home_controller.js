const Posts = require('../models/post');
const User = require('../models/user');
module.exports.home = async (req,res)=>{
    console.log('Cookies: ', req.cookies)
    //populating the user of each post

    let posts = await Posts.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })

    let user = await User.find({});

    return res.render('home',{
        title:"Home",
        posts:posts.reverse(),
        all_users:user
    });

}