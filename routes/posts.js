const express = require('express');
const router = express.Router();

const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);
//using params we are sending id of the post 
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);


module.exports = router;