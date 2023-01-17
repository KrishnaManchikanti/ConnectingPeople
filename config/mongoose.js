const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const db = mongoose.connect('mongodb://127.0.0.1:27017/codeial',(err)=>{
    if(err){
        console.log(`err in connecting db ${err}`);
        return;
    }
    console.log(`successfully connected to db :: MongoDB`);
});

module.exports = db;