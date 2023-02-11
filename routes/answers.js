const express = require('express')
const { postAnswer, deleteAnswer } = require('../controllers/answers')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.patch('/post/:id', postAnswer)
router.patch('/delete/:id', deleteAnswer)

module.exports = router