const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/users')
const questionsRoutes = require('./routes/questions')
const answerRoutes = require('./routes/answers')
const app = express()
app.use(cors())

app.use('/user', userRoutes)
app.use('/questions', questionsRoutes)
app.use('/answer', answerRoutes)

module.exports = app
