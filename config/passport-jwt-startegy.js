var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;// Extract JWT from Authorization header

const User = require('../models/user');
var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // The JWT payload contains user information after successful verification
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            console.log('err in finding user in jwt',err);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));



module.exports = passport;