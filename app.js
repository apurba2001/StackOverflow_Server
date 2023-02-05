const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/users')

const app = express()
app.use(cors())

app.use('/user', userRoutes)

module.exports = app
