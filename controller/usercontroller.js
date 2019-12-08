const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator/filter')

const User = require('../model/usermodel')

exports.checkUser = [
  body('email').isLength({ min: 1 }).trim().withMessage('email require')
    .isEmail()
    .withMessage('email is not valid'),
  body('mobilenumber').isLength({ min: 1 }).trim().withMessage('mobilenumber require')
    .isNumeric()
    .withMessage('mobilenumber contain numbers only'),
  sanitizeBody('email').trim(),
  sanitizeBody('mobilenumber').trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        status: false,
        errors,
      })
    } else {
      const query = [{ email: req.body.email }, { mobilenumber: req.body.mobilenumber }]
      User.findOne({ $or: query }, (err, user) => {
        if (err) {
          res.status(422).json({
            status: false,
            errors,
          })
        } else if (user) {
          res.status(422).json({
            status: false,
            errors,
            message: 'email or mobile number already exsist.',
          })
        } else next();
      });
    }
  },
];


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

  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(422).json({
        status: false,
        errors: error,
      })
    } else {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobilenumber: req.body.mobilenumber,
        password: req.body.password,
      });
      user.save((err, data) => {
        if (err) {
          res.status(422).json({
            status: false,
            mongoerror: error,
          })
        } else {
          res.status(200).json({
            status: true,
            data,
          })
        }
      })
    }
  },
];
