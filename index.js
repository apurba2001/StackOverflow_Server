require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT ?? 5000
const DB_URI = process.env.DB_URI

mongoose.set('strictQuery', false)
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(app.listen(PORT, () => console.log(`CONNECTED WITH DATABASE & APP IS LISTENING ON PORT ~ ${PORT}`)))
    .catch((err) => console.error(err.message))