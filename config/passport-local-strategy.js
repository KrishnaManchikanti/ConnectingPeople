var passport = require('passport');
var LocalStrategy = require('passport-local');

const User = require('../models/user');
// https://www.passportjs.org/howtos/password/ refer this 
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function verify(email, password, cb) {
        User.findOne({email:email}, function(err,user){
            if (err) { return cb(err); }
            if (!user || user.password!=password) { return cb(null, false, { message: 'Incorrect username or password.' }); }

            return cb(null, user);
        });
    }
));


// -------- Serializer & deserializer done by session-cookies---------  
// https://www.passportjs.org/concepts/authentication/sessions/ refer this 
//serializing user to decide which key is to kept in cookies
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  //deserialize user from the keyin the coookies
passport.deserializeUser(function(id, cb) {
    User.findById(id,(err,user)=>{
        if(err){console.log(err); return cb(err);}

        return cb(null,user);
    })
});

//checking user is Authenticated
passport.checkAuthentication = (req,res,next)=>{
    // isAuthenticated is an in-built function provided by passport
    if(req.isAuthenticated()){ 
        return next(); // if valid user, then request pass to controller action
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        //for every request passport send user data in req.user
        res.locals.user = req.user; // Storing user data in locals for views(ejs) 
    }
    return next();
}


// ****NOTE*****
// checkAuthentication & setAuthenticatedUser func's created for Authentication purpose
// (To view profile page only when user logged in) 
module.exports = passport;