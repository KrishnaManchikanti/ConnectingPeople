const User = require('../models/user');

module.exports.profileUpdate = async (req,res)=>{
    let user = await User.findById(req.params.id);
    if(req.user.id == req.params.id){
        try{
            User.uplodedAvatar (req, res, function(error){
                if(error){console.log(`err in multer`,error);}
                if(req.file){
                    console.log(req.body.avatar);
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile Updated');
                return res.redirect('back');
            });
        }catch(error){
            req.flash('error',error);
            return res.redirect('back');
        }
    }
}

module.exports.profile = (req,res)=>{
    User.findById(req.params.id,(err, user)=>{
        return res.render('users_profile',{
            title:"User",
            profile_user:user
        });
    })
}

module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('users_sign_in',{
        title:"signIn"
    });
}
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('users_sign_up',{
        title:"signUp"
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
                req.flash('success', 'User Created');
                return res.redirect('/users/sign-in');
            });
        }else{
            console.log("user a;ready exits");
            req.flash('error', 'User Already Exists');
            return res.redirect('/users/sign-in');
        }
    });
}

module.exports.createSession = (req,res)=>{
    req.flash('success', 'Logged In');//to send req.flash data to res we used middleware
// we are not able to access this flash msg in our template, so we have created a customMware
    return res.redirect('/');
}

module.exports.destroySession = (req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out');
        res.redirect('/');
      });
}