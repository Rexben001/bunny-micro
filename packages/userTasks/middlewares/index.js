const Joi = require('@hapi/joi');

const userTaskParams = Joi.object().keys({
  description: Joi.string().min(2).required(),
  state: Joi.string().min(4).max(5).required(),
  user_id: Joi.string().min(24).max(24).alphanum().required(),
});

exports.validateUserTaskBodyRequest = (req, res, next) => {
  try {
    const validate = userTaskParams.validate(req.body);

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
