/* eslint-disable import/order */
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator/filter')

const User = require('../model/usermodel')
const common = require('../common/common')

// const authy = require('authy')('RP0WD70gkxi9ykVi4oheuPYT77Jg6MQd');

// const text = require('textbelt');

exports.createUser = [
  body('firstName').isLength({ min: 1 }).trim().withMessage('firstName require')
    .isAlpha()
    .withMessage('firstName contain aplhapetic only'),
  body('lastName').isLength({ min: 1 }).trim().withMessage('lastName require')
    .isAlpha()
    .withMessage('lastName contain aplhapetic only'),
  body('email').isLength({ min: 1 }).trim().withMessage('email require')
    .isEmail()
    .withMessage('email is not valid'),
  body('mobilenumber').isLength({ min: 1 }).trim().withMessage('mobilenumber require')
    .isNumeric()
    .withMessage('mobilenumber contain numbers only'),
  body('password').isLength({ min: 5, max: 8 }).trim().withMessage('password min contain 5 letters and max contain 8 letters'),

  sanitizeBody('firstName').trim(),
  sanitizeBody('lastName').trim(),
  sanitizeBody('email').trim(),
  sanitizeBody('mobilenumber').trim(),
  sanitizeBody('password').trim(),

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      common.validationError(res, error, 422)
    } else {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        password: req.body.password,
      });
      try {
        const data = await user.save()
        common.sendSuccessResponse(res, data)
      } catch (err) {
        common.sendFailureResponse(res, err, 422)
      }
    }
  },
];
