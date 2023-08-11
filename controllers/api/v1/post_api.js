const Post = require('../../../models/post');
const Comments = require('../../../models/comment');
const User = require('../../../models/user');
module.exports.index = async function(req,res){
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        },options: {
            sort: { createdAt: -1 } // Sort comments by 'createdAt' in descending order
        }
    })
    return res.status(200).json({
        message:"List of Posts",
        post:posts
    })
}

module.exports.destroy = async (req,res)=>{
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();//removing whole collection in db(mongoose)
            await Comments.deleteMany({post:req.params.id});
 
            return res.status(200).json({
                message:"Post deleted Succ"
            })

        }else{
            return res.status(401).json({
                message:"UnAuthorized"
            })
        }
    }catch(error) {
        console.log("*****error",error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}