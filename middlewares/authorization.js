const { Todo } = require('../models')


function authorization(req,res,next) {
    let { id } = req.params
    Todo.findOne({ 
        where: { id } 
    })
    .then(result=>{
        if(result && result.userId == req.loggedUser.id) {
            return next()
        } else {
            return next(createError(401, { msg:'not authorized' }))
        }
    })
    .catch(next)
}



module.exports = authorization