const express = require('express')

const { askQuestion, getQuestions, deleteQuestion, voteQuestion } = require('../controllers/questions')
const auth = require('../middlewares/auth')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.post('/ask', auth, askQuestion)
router.get('/get', getQuestions)
router.delete('/delete/:id',auth, deleteQuestion)
router.patch('/vote/:id', auth, voteQuestion)

module.exports = router