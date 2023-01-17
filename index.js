const express = require('express');
const port = 8000;
const app = express();

//using Layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//using middleware to use router
app.use('/',require('./routes'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,(err)=>{
    if(err){console.log(`err in server${err}`);return;}
    console.log(`successfully connected to server at ${port}`);
})