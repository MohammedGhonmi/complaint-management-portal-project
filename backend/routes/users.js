const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()

// CRUD api's related to authorization and authentication 
router.post('/isauth', userController.isAuth)
router.post('/token', userController.getToken)
router.post('/login', userController.login);
router.post('/register', userController.register)

module.exports = router