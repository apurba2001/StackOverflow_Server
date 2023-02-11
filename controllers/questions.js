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

exports.voteQuestion = async (req, res) => {
    const _id = req.params.id
    const { value, userId } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: 'Question unavailable' })
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ message: 'User unavailable' })
    }

    try {
        const question = await questions.findById(_id)

        if (!question) {
            return res.status(404).json({ message: 'Question not found' })
        }

        const upIdx = question.upVote.indexOf(userId)
        const downIdx = question.downVote.indexOf(userId)

        if (value === 'upvote') {
            if (downIdx !== -1) {
                question.downVote.splice(downIdx, 1);
            }
            if (upIdx === -1) {
                question.upVote.push(userId)
            } else {
                question.upVote.splice(upIdx, 1)
            }
        } else if (value === 'downvote') {
            if (upIdx !== -1) {
                question.upVote.splice(upIdx, 1)
            }
            if (downIdx === -1) {
                question.downVote.push(userId)
            } else {
                question.downVote.splice(downIdx, 1)
            }
        }

        await question.save()

        res.status(200).json({ message: 'Successfully voted' })
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while voting' })
    }
}
