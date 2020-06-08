const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const createError = require('http-errors')

class UserController {
    static register (req, res, next) {
        let { email, password } = req.body
        User.create({
            email,
            password
        })
            .then(data => {
                let payload = {
                    email: data.email,
                    id: data.id
                }
                return res.status(201).json({
                    data: {
                        email: data.email,
                        id: data.id,
                        token: generateToken(payload)
                    }
                })
            })
            .catch(next)
    }

    static login (req, res, next) {
        let { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if(data && comparePassword(password, data.password)) {
                    let payload = {
                        email: data.email,
                        id: data.id
                    }
                    return res.status(200).json({
                        data: {
                            email: data.email,
                            id: data.id,
                            token: generateToken(payload)
                        }
                    })
                } else {    
                    return next(createError(400, { name:'invalidEmailPassword', msg:'invalid email or password' }))
                }
            })
            .catch(next)
    }
}

module.exports = UserController