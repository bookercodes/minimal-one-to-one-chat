const express = require('express')
const { json } = require('body-parser')
const userController = require('./controllers/userController')
const authenticationController = require('./controllers/authController')
const cors = require('cors')
const { ensureAuthenticated, handleError } = require('./middleware')
require('dotenv').config()

const app = express()
app.use(json())
app.use(cors())

app
  .route('/users')
  .get(ensureAuthenticated, userController.handleGet)
  .post(userController.createUser)

app.post('/token', authenticationController.authenticate)
app.post(
  '/chatkit-token',
  ensureAuthenticated,
  authenticationController.sendChatkitToken
)

app.use(handleError)

const server = app.listen(8080, error => {
  if (error) {
    console.error(error)
  } else {
    console.log(`Running on port ${server.address().port}`)
  }
})
