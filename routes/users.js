/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser')

const multer = require('multer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const userController = require('../controller/usercontroller');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/users')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  },
})

const upload = multer({ storage: storage })

router.post('/adduser', userController.createUser)
router.post('/updateuser', upload.single('image'), userController.updateUser)

module.exports = router;
