const Joi = require('joi');

const createcatrgory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()

    })
}

module.exports = {
    createcatrgory
}