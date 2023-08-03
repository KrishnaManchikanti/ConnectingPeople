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
        },options: {
            sort: { createdAt: -1 } // Sort comments by 'createdAt' in descending order
        }
    })

    let user = await User.find({});

    return res.render('home',{
        title:"Home",
        posts:posts.reverse(),
        all_users:user
    });

}