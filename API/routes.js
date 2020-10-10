'use strict'

const Jenosize = require('./jenosize')
const Joi = require('joi')

let routes = []

routes.push({
    method: 'POST',
    path: '/jenosize/game24',
    options: {
        validate: {
            payload: Joi.object({
                numbers: Joi.array().items(Joi.number().integer().min(1).max(9)).min(4).max(4).required()
            })
        }
    },
    handler: Jenosize.judgePoint24Handler
})

routes.push({
    method: 'POST',
    path: '/jenosize/restaurant/search',
    options: {
        validate: {
            payload: Joi.object({
                input: Joi.string().required()
            })
        }
    },
    handler: Jenosize.searchRestaurant
})

module.exports = routes