const questions = require('../models/questions')
const mongoose = require('mongoose')

exports.askQuestion = async (req, res) => {
    const postQuestion = new questions({ ...req.body })
    try {
        await postQuestion.save()
        res.status(200).json({ message: 'posted a question successfully' })
    } catch (err) {
        res.status(409).json({ message: "couldn't post a new question" })
    }
}

exports.getQuestions = async (req, res) => {
    try {
        const questionList = await questions.find().sort({ _id: -1 })
        res.status(200).json(questionList)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

exports.deleteQuestion = async (req, res) => {
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json('question unavailable')
    }

    try {
        await questions.findByIdAndRemove(_id)
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}