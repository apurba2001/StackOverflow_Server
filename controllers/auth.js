const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('../models/auth')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) return res.status(404).json({ message: "User already exist" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await users.create({ name, email, password: hashedPassword })
        // const token = await JWT.sign({ email: newUser.email, id: newUser._id }, 'ST@CK0VERFL0W', { expiresIn: '1h' })
        res.status(200).json({ result: newUser })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.login = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await users.findOne({ email })
        if (!user) return res.status(404).json({ message: "User don't exist" })
        const isPasswordSame = await bcrypt.compare(password, user.password)
        if (!isPasswordSame) return res.status(400).json({ message: "Invalid credentials" })
        const token = await JWT.sign({ email: user.email, id: user._id }, 'ST@CK0VERFL0W', { expiresIn: '1h' })
        res.status(200).json({ ...user, token })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}