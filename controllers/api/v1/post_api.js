const Post = require('../../../models/post');
const Comments = require('../../../models/comment');
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

            post.remove();//removing whole collection in db(mongoose)
            await Comments.deleteMany({post:req.params.id});
           
        return res.status(200).json({
            message:"Post deleted Succ"
        })
    } catch (error) {
        return res.status(400).json({
            message:"Post deleted unSucc"
        })
    }
}