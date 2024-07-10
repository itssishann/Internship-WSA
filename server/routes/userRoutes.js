const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authMiddleware} = require('../middlewares/authMiddleware');

router.post("/signup", userController.signup);
router.post("/login",userController.userLogin);
router.post("/logout", authMiddleware,userController.userLogout);

module.exports = router;
