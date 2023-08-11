const User = require('../../../models/user');
const jsonWebToken = require('jsonwebtoken');

module.exports.createSession = async (req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"InValid User"
            })
        }

        return res.status(200).json({
            message:"json token created succ",
            data:{
                token: jsonWebToken.sign(user.toJSON(), 'codeial',{expiresIn: '1000000'})
            }
        })
    } catch (error) {
        console.log('***************',error);
        return res.status(500).json({
            message:"Internalserver error"
        })
    }
    

}
