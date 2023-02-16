const JWT = require('jsonwebtoken')

const auth = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = JWT.verify(token, 'ST@CK0VERFL0W')
        req.userId = decodedToken?.id
        next()
    }catch(e){
        console.log(e)
    }
}

module.exports = auth