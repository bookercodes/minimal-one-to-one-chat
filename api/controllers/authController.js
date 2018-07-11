const database = require('../database.js')
const { sign } = require('jsonwebtoken')
const Chatkit = require('@pusher/chatkit-server').default

const controller = {}

controller.authenticate = (req, res, next) => {
  try {
    const { user } = req.body
    const authenticated = database.authenticate(user)
    if (authenticated) {
      const token = sign({ sub: user.username }, process.env.KEY)
      res.status(200).json({
        access_token: token
      })
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
}

controller.sendChatkitToken = (req, res, next) => {
  try {
    const chatkit = new Chatkit({
      instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
      key: process.env.KEY
    })
    if (req.query.user_id !== req.userId) {
      res.sendStatus(401)
    } else {
      const { status, body } = chatkit.authenticate({
        userId: req.query.user_id
      })
      res.status(status).send(body)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = controller
