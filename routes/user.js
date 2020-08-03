const express = require('express');
const { body, check, validationResult } = require('express-validator');

const User = require('../models').User;

const router = express.Router();

// function checkIsNumber() {
//   return body('phone_number').custom((value) => {
//     if (!value.match(/^[0-9]*$/)) {
//       throw new Error('must be numbers only');
//     }

//     return value;
//   });
// }

function checkIsNumber() {
  return check('phone_number')
    .matches(/^[0-9]*$/)
    .withMessage('Must be numbers only');
}

/**
 * @api {post} /user/login Login User with phone number
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} phone_number Phone number of the User.
 *
 * @apiSuccess {String} success Successful message.
 * @apiSuccess {String} phone_number Phone number of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "It existed",
 *       "phone_number": "60112380554"
 *     }
 *
 * @apiError NotFound The phone number of the User was not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errors": "phone number not existed"
 *     }
 */
router.post('/login', checkIsNumber(), async (req, res) => {
  const { phone_number } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(404).json({ errors: 'phone number not existed' });
    }

    res.json({ success: 'It existed', phone_number: user.phone_number });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
});

module.exports = router;
