const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        discount: Joi.number().required(),
        brand:Joi.string().required(),
        stock_quantity: Joi.number().required(),
        image:{url:Joi.string().required(),
               filename:Joi.string().required()},
        category: Joi.string().required(),
        sub_cat: Joi.string().required(),

    }).required(),
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
})