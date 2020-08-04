const express = require('express');
const { check, validationResult } = require('express-validator');

const User = require('../models').User;

const router = express.Router();

/**
 * @api {post} /user/login Login User with phone number
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} phone_number Phone number of the User.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "phone_number": "+60112380554"
 *     }
 *
 * @apiSuccess {String} success Successful message.
 * @apiSuccess {String} phone_number Phone number of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "It existed",
 *       "phone_number": "+60112380554"
 *     }
 *
 * @apiError BadRequest Must be a valid phone number.
 *
 * @apiErrorExample {json} Error-Response (400 - Bad Request):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errors": [
 *          {
 *            "value": "1111",
 *            "msg": "Must be valid phone number",
 *            "param": "phone_number",
 *            "location": "body"
 *          }
 *       ]
 *     }
 *
 * @apiError NotFound The phone number of the User was not found.
 *
 * @apiErrorExample {json} Error-Response (404 - Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errors": "phone number not existed"
 *     }
 */
router.post('/login', checkIsMobilePhone(), async (req, res) => {
  const { phone_number } = req.body;

  // Check the validation request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the user's phone number in database.
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(404).json({ errors: 'phone number not existed' });
    }

    res.json({ success: 'It existed', phone_number: user.phone_number });
  } catch (err) {
    const errorMessage =
      process.env.NODE_ENV === 'production'
        ? '500 Internal Server Error'
        : err.message;

    res.status(500).json({ errors: errorMessage });
  }
});

function checkIsMobilePhone() {
  return check('phone_number')
    .isMobilePhone(['ms-MY', 'en-SG'], { strictMode: true })
    .withMessage('Must be valid phone number');
}

module.exports = router;
