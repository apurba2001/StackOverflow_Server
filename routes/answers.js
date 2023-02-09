const express = require('express')
const { postAnswer } = require('../controllers/answers')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.patch('/post/:id', postAnswer)

module.exports = router