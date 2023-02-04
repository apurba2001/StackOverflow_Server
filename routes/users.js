const express = require('express')
const { signUp, logIn } = require('../controllers/auth')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.post('/signup', signUp)

router.post('/login', logIn)

module.exports = router