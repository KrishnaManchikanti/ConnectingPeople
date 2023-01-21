const User = require('../models/user');
module.exports.profile = (req,res)=>{
    return res.render('users_profile',{
        title:"User"
    });
}

module.exports.signIn = (req,res)=>{
    return res.render('users_sign_in',{
        title:"signIn"
    });
}
module.exports.signUp = (req,res)=>{
    return res.render('users_sign_up',{
        title:"signIn"
    });
}

module.exports.create = (req,res)=>{
    console.log(req.body);
    if(req.body.password!==req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('err in finding user in signup');return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('err in Creating user in signup');return;}
                return res.redirect('/users/sign-in');
            });
        }else{
            console.log("user a;ready exits");
            return res.redirect('/users/sign-in');
        }
    });
}

module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}
