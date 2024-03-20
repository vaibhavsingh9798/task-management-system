
const express = require('express');
const {sigin,signup} = require('../controllers/user')
const router = express.Router();

router.post('/signup',signup)

router.post('/login',sigin)

module.exports = router ;