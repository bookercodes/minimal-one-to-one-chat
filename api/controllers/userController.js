const database = require('../database.js')
const Chatkit = require('@pusher/chatkit-server').default

const controller = {}

controller.handleGet = (req, res, next) => {
  try {
    const users = database
      .getAllUsernames()
      .filter(user => user !== req.userId)
    res.json(users)
  } catch (err) {
    next(err)
  }
}

controller.createUser = async (req, res, next) => {
  try {
    const chatkit = new Chatkit({
      instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
      key: process.env.KEY
    })
    const { user } = req.body
    database.createUser(user)
    await chatkit.createUser({
      id: user.username,
      name: user.username
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
}

module.exports = controller
