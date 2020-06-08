const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
const createError = require('http-errors')

function authentication(req,res,next) {
    try {
        let decodedToken = verifyToken(req.headers.token)

        User.findOne({
            where : {
                id:decodedToken.id
            }
        })
        .then(user=>{
            if(user) {
                req.loggedUser = decodedToken
                return next()
            } else {
                return next(createError(401, { msg:'authentication failed' }))
            }
        })
        .catch(next)
    }
    catch (err) {
        return next(createError(401, { msg:'authentication failed' }))
    }
}



module.exports = authentication