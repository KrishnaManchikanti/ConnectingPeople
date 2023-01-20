
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

}

module.exports.createSession = (req,res)=>{
    
}
