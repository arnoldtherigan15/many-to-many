const { User, Todo, Project } = require('../models/')

class TodoController {

    // static findAll(req,res,next) {
    //     Todo.findAll({
    //         where: {
    //             projectId: req.params.projectId
    //         },
    //         include: [
    //             {
    //                 model: User
    //             },
    //             {
    //                 model: Project
    //             }
    //         ]
    //     })
    //     .then(data => {
    //         if(data) {
    //             return res.status(200).json({ todos: data })
    //         } else {
    //             return next(createError(404, { msg:'Todo not found' }))
    //         }
    //     })
    //     .catch(next)
    // }

    static create(req,res,next) {
        Todo.create({
            title: req.body.title,
            status: false,
            userId: req.loggedUser.id,
            projectId: req.params.projectId
        })
        .then(data => {
            return res.status(201).json({
                todo: data
            })
        })
        .catch(next);
    }

    // static findOne(req,res) {
    //     Task.findByPk(req.params.id)
    //         .then((task) => {
    //         if (!task) {
    //             return res.status(404).json({ message: 'Task Not Found' });
    //         }

    //         return res.status(200).json(task);
    //         })
    //         .catch((error) => {
    //         return res.status(400).json(error)
    //         });
    // }

    // static update(req,res) {
    //     Task.findByPk(req.params.id)
    //         .then((task) => {
    //         if (!task) {
    //             return res.status(404).json({ message: 'Task Not Found' });
    //         }

    //         task.update({
    //             ...task, //spread out existing task
    //             ...req.body //spread out body - the differences in the body will over ride the task returned from DB.
    //         })
    //         .then((updatedTask) => {
    //             return res.status(200).json(updatedTask)
    //         })
    //         .catch((error) => {
    //             return res.status(400).json(error)
    //         });
    //         })
    //         .catch((error) => {
    //         return res.status(400).json(error)
    //         });
    // }

    // static destroy(req,res) {
    //     Task.findByPk(req.params.id)
    //         .then((task) => {
    //         if (!task) {
    //             return res.status(400).json({ message: 'Task Not Found' });
    //         }
            
    //         task.destroy()
    //             .then((task) => {
    //             return res.status(200).json(task)
    //             })
    //             .catch((error) => {
    //             return res.status(400).json(error)
    //             });
    //         })
    //         .catch((error) => {
    //         return res.status(400).json(error)
    //         });
    // }


}
module.exports = TodoController

