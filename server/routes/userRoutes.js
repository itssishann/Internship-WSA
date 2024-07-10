const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post("/signup", userController.signup);
router.post("/login", userController.userLogin);
// router.get("/logout", userController.userLogout);

module.exports = router;
