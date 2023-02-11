const mongoose = require('mongoose')
const questions = require('../models/questions')

exports.postAnswer = async (req, res) => {

    const { id: _id } = req.params
    const { answerBody, userAnswred, userId } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json('question unavailable')
    }

    try {
        const updatedQuestion = await questions.findByIdAndUpdate(_id, {
            $addToSet:
            {
                'answer':
                    [{ answerBody, userAnswred, userId }]
            }
        })
        res.status(200).json(updatedQuestion)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteAnswer = async (req, res) => {
    const _id = req.params.id
    const { answerId } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json('question unavailable')
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).json('answer unavailable')
    }

    try {
        await questions.updateOne({ _id }, { $pull: { 'answer': { _id: answerId } } })
        res.status(200).json({ message: 'successfully deleted'})
    } catch (err) {
        res.status(405).json(err)
    }
}