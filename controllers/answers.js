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