var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

// GET View Index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// RESET PASSWORD
router.get('/password-reset/:token', userController.checkTokenReset);
router.put('/password-reset/:token', userController.resetPassword);

// VERIFY EMAIL
router.get('/verify-email/:token', userController.verifyEmail);

// UPLOAD RESI
router.post('/upload', userController.uploadResi);
router.post('/upload2', userController.uploadResi2);

module.exports = router;