// Constants (in order of appearance)
const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const MemoryStore = require('MemoryStore')(session)
const routes = require('./routes/index')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

// Hook up ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Hook up a persistent session
app.use(session({
  cookie: { maxAge: 3600000 },
  store: new MemoryStore({ checkPeriod: 3600000 }),
  resave: false,
  saveUninitialized: false,
  secret: 'iLikeMyAppsLikeILikeMyCoffee'
}))

// Serve static files
app.use(express.static(path.resolve('public')))

// Handle request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define the routes
app.use('/', routes)

// If there is no static file or a route generate an error!
app.use((request, respone, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Only show errors in dev
if (app.get('env') === 'development') {
  app.use((err, request, response, next) => {
    response.status(err.status || 500) // 500: Internal Server Error
    response.render('pages/error', { message: err.message, error: err })
  })
}

// Handle socket connetions
io.on('connection', (socket) => {
  console.log('a user connected')
  
  // Make a function to send data
  
  // Update data every tick

  socket.on('login', (data) => {
    console.log('login attempt through socket.io using: ' + data)
  })

  socket.on('message', (message) => {
    console.log('message: ' + message)
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// Fire up the app!
http.listen(port, () => {
  console.log('listening on port ', port)
})
