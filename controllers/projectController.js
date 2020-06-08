const { User, UserProject, Todo, Project } = require('../models/')
const createError = require('http-errors')

class ProjectController {

    static findAll(req, res, next) {
        UserProject.findAll({
            where: {
                userId: req.loggedUser.id
            },
            include: [
                {
                    model: Project
                }
            ]
        })
        .then(data => {
            if(data) {
                return res.status(200).json({ projects: data })
            } else {
                return next(createError(404, { msg:'Project not found' }))
            }
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        UserProject.findOne({
            where: {
                projectId: req.params.id
            },
            attributes: {
                exclude: [
                    'createdAt', 'updatedAt'
                ]
            },
            include: [
                {
                    model: Project,
                    attributes: {
                        exclude: [
                            'createdAt', 'updatedAt'
                        ]
                    },
                    include: [
                        {
                            model: Todo,
                            attributes: {
                                exclude: [
                                    'createdAt', 'updatedAt'
                                ]
                            }
                        },
                        {
                            model: User,
                            attributes: {
                                exclude: [
                                    'password', 'createdAt', 'updatedAt'
                                ]
                            }
                        }
                    ]
                }
            ]
        })
            .then(data => {
                if (!data) {
                    return next(createError(404, { msg:'Project not found' }))
                }

                return res.status(200).json({ project: data })
            })
            .catch(next);
    }

    static create(req,res,next) {
        return Project.create({
            name: req.body.name
        })
        .then(data => {
            return UserProject.create({
                userId: req.loggedUser.id,
                projectId: data.id
            })

        })
        .then(data => {     
            return res.status(201).json({ project: data })
        })
        .catch(next)
    }

    static inviteMember (req, res, next) {
        let { email } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if(!data) {
                    return res.status(404).json({ msg: 'Email nof found' })
                } else {
                    return UserProject.create({
                        userId: data.id,
                        projectId: req.params.id
                    })
                }
            })
            .then(data => {     
                return res.status(200).json({ msg: 'user invited to project' })
            })
            .catch(next)
    }

    

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
module.exports = ProjectController