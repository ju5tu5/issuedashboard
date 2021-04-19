const express = require('express')
const router = express.Router()

router.post('/', (request, response, next) => {
  const { username, password } = request.body || null
  console.log('Attempting login with credentials: ', username, password)

  if (username === 'foo' && password === 'bar') {
    request.session.loggedIn = true
    console.log(request.session)
  }
  next()
})

router.all('/', (request, response) => {
  if (request.session.loggedIn) {
    response.render('pages/home')
  } else {
    response.redirect('/login')
  }
})

router.get('/login', (request, response) => {
  console.log('loggedIn: ', request.session.loggedIn)
  response.render('pages/login')
})

module.exports = router
