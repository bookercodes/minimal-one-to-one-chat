const { verify } = require('jsonwebtoken')

const middleware = {}

middleware.ensureAuthenticated = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      try {
        const { sub } = verify(authorization, process.env.KEY)
        req.userId = sub
        next()
      } catch (err) {
        console.error('err', err)
        res.sendStatus(401)
      }
    }
  } catch (err) {
    next(err)
  }
}

middleware.handleError = (err, req, res, next) => {
  console.error('err', err)
  res.status(500).json({ err })
  next()
}

module.exports = middleware
