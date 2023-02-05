const express = require('express')
const { signup, login } = require('../controllers/auth')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.post('/signup', signup)

router.post('/login', login)

module.exports = router