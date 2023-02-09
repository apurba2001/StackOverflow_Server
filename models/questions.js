const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    questionTitle: { type: String, required: "Question must have a title" },
    questionBody: { type: String, required: "Question must have a body" },
    questionTags: { type: [String], required: 'Question must have tags' },
    upVote: { type: [String], default: [] },
    downVote: { type: [String], default: [] },
    userPosted: { type: String, required: 'Question must have author' },
    userId: { type: String },
    askedOn: { type: Date, default: Date.now },
    answer: [{
        answerBody: String,
        userAnswred: String,
        userId: String,
        answredOn: { type: Date, default: Date.now }
    }]
})

module.exports = new mongoose.model('questions', questionSchema)