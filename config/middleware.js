//req.flash is an inbuilt func, so when ur template req flash.success 
//it triggers customWware then req.flash value will get from ur controller 
module.exports.setflash = (req,res,next)=>{
    res.locals.flash = {
        'success' : req.flash('success'),
        'error': req.flash('error')
    }
    next();
}