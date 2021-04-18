import './global.css'
import {HandleSession} from './lib/Session.js'
import {profile, token} from './stores'
import App from './App.svelte'

const app = (async function () {
  const [profileData, tokenData] = await HandleSession(0)
  profile.set(profileData || null)
  token.set(tokenData || null)
  return new App({
    target: document.body
  })
})()

export default app
// require('dotenv').config()

// const http = require('http').createServer(app)
// const io = require('socket.io')(http)
// const port = process.env.PORT || 4242

// io.on('connection', (socket) => {
//   console.log('a user connected')

//   socket.on('message', (message) => {
//     console.log('message: ' + message)
//     // io.emit('message', message)
//   })

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

// http.listen(port, () => {
//   console.log('listening on port ', port)
// })

// const { graphql } = require('@octokit/graphql')
// const graphqlWithAuth = graphql.defaults({
//   headers: {
//     authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
//   }
// })

// graphqlWithAuth(`{
//   repository(owner: "cmda-minor-web", name: "real-time-web-2021") {
//     name
//     forkCount
//     forks(first: 44) {
//       totalCount
//       nodes {
//         nameWithOwner
//         issues(first: 100) {
//           edges {
//             node {
//               id
//               author {
//                 login
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   }`)
//   .then(result => {
//     console.log(result)
//   })
//   .catch(error => {
//     console.log('GitHub API Request failed: ', error.request, '\n', error.message)
//   })
