const express = require('express');
const port = 8000;
const app = express();

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,(err)=>{
    if(err){console.log(`err in server${err}`);return;}
    console.log(`successfully connected to server at ${port}`);
})