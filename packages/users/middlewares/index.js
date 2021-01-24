const Joi = require('@hapi/joi');

const userParams = Joi.object().keys({
  name: Joi.string().min(2).max(24).required(),
});

exports.validateUserBodyRequest = (req, res, next) => {
  try {
    const validate = userParams.validate(req.body);

    if (validate.error) {
      return res.status(422).json({
        success: false,
        message: 'validation error',
        error: validate.error.details,
      });
    }
    return next();
  } catch (error) {}
};
