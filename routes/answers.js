const express = require('express')

const { postAnswer, deleteAnswer } = require('../controllers/answers')
const auth = require('../middlewares/auth')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.patch('/post/:id', auth, postAnswer)
router.patch('/delete/:id',auth, deleteAnswer)

module.exports = router