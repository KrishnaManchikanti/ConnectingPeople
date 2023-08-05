const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profileUpdate = async (req,res)=>{
    
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uplodedAvatar (req, res, function(error){
                if(error){console.log(`err in multer`,error);}

                user.name = req.body.name;
                user.email = req.body.email;

                // Assuming user.avatar contains the relative path of the existing avatar
                if (req.file) {
                    if (user.avatar) {
                    // Constructing the full path of the existing avatar
                    const existingAvatarPath = path.join(__dirname, '..', user.avatar);
                    // Checking if the file exists before attempting to delete it
                        if (fs.existsSync(existingAvatarPath)) {
                            try {
                            // If the file exists, delete it
                                fs.unlinkSync(existingAvatarPath);
                                console.log('Existing avatar deleted successfully!');
                            } catch (err) {
                                console.error('Error deleting existing avatar:', err);
                            }
                        } else {
                            console.log('Existing avatar does not exist.');
                        }
                    }
                    // Update the user.avatar with the new path
                    user.avatar = User.avatarPath + '/' + req.file.filename;
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