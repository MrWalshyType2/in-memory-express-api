const User = require('../model/user');

module.exports = {
    create: function(request, response, next) {
        if (!request.body) return next({ statusCode: 400, message: 'Body cannot be empty' });
        response.status(201).json(User.save(new User(request.body.username, request.body.email, request.body.age)));
    },
    read: function(request, response, next) {
        response.status(200).json(User.findAll());
    },
    readById: function(request, response, next) {
        response.status(200).json(User.find(request.params.id));
    },
    update: function(request, response, next) {
        const updates = request.body;
        if (!updates || !updates.id) return next({ statusCode: 400, message: 'Body cannot be empty and id must be specified' });

        response.status(200).json(User.save({ 
            id: updates.id,
            email: updates.email,
            age: updates.age
        }));
    },
    delete: function(request, response, next) {
        User.delete(request.params.id);
        response.status(200).send(`User with id ${request.params.id} deleted`);
    }
}