const express = require('express');
const port = 8000;
const app = express();

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

//session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//flash
var flash = require('connect-flash');
var customMware = require('./config/middleware');
//cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//using Layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//acquiring db
const db = require('./config/mongoose');

//Telling layouts to move style-tag into the head & script-tag at the bottom
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

//Using static files
app.use(express.static('assets'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:"Codieal",
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:(1000 * 60 * 100)
     },
     store: new MongoStore({ mongoUrl: 'mongodb://127.0.0.1:27017/codeial', autoRemove:'disabled' },
     (err)=>{ console.log(err||'connected to mongo-store');return;})
  }));

//   https://www.npmjs.com/package/passport refer this 
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//flash
app.use(flash());
app.use(customMware.setflash);
//using middleware to use router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){console.log(`err in server${err}`);return;}
    console.log(`successfully connected to server at ${port}`);
})