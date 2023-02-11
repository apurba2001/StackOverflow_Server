const express = require('express')

const { askQuestion, getQuestions, deleteQuestion, voteQuestion } = require('../controllers/questions')

const router = express.Router()

router.use(express.json({ limit: '30mb', extended: true }))
router.use(express.urlencoded({ limit: '30mb', extended: true }))

router.post('/ask', askQuestion)
router.get('/get', getQuestions)
router.delete('/delete/:id', deleteQuestion)
router.patch('/vote/:id', voteQuestion)

module.exports = router