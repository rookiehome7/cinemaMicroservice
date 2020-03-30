// 'use strict'
// const express = require('express')
// const proxy = require('http-proxy-middleware')
// const spdy = require('spdy')
// const morgan = require('morgan')
// const helmet = require('helmet')
// const cors = require('cors')
// const status = require('http-status')

// const start = (container) => {
//   return new Promise((resolve, reject) => {
//     const {port, ssl} = container.resolve('serverSettings')
//     const routes = container.resolve('routes')

//     if (!routes) {
//       reject(new Error('The server must be started with routes discovered'))
//     }
//     if (!port) {
//       reject(new Error('The server must be started with an available port'))
//     }

//     const app = express()
//     app.use(morgan('dev'))
//     app.use(bodyparser.json())
//     app.use(cors())
//     app.use(helmet())
//     app.use((err, req, res, next) => {
//       reject(new Error('Bad Gateway!, err:' + err))
//       res.status(status.BAD_GATEWAY).send('url not found!')
//       next()
//     })

//     for (let id of Reflect.ownKeys(routes)) {
//       const {route, target} = routes[id]
//       app.use(route, proxy({
//         target,
//         changeOrigin: true,
//         logLevel: 'debug'
//       }))
//     }

//     if (process.env.NODE === 'test') {
//       const server = app.listen(port, () => resolve(server))
//     } else {
//       const server = spdy.createServer(ssl, app)
//         .listen(port, () => resolve(server))
//     }
//   })
// }

// module.exports = Object.assign({}, {start})


// 'use strict'
// const express = require('express')
// const proxy = require('http-proxy-middleware')
// const spdy = require('spdy')
// const morgan = require('morgan')
// const helmet = require('helmet')
// const cors = require('cors')
// const status = require('http-status')
// const bodyparser = require('body-parser')

// const start = (container) => {
//   return new Promise((resolve, reject) => {
//     const {port, ssl} = container.resolve('serverSettings')
//     const routes = container.resolve('routes')

//     if (!routes) {
//       reject(new Error('The server must be started with routes discovered'))
//     }
//     if (!port) {
//       reject(new Error('The server must be started with an available port'))
//     }

//     const app = express()
//     app.use(morgan('dev'))
//     app.use(bodyparser.json())
//     app.use(cors())
//     app.use(helmet())
//     app.use((err, req, res, next) => {
//       reject(new Error('Bad Gateway!, err:' + err))
//       res.status(status.BAD_GATEWAY).send('url not found!')
//       next()
//     })

//     for (let id of Reflect.ownKeys(routes)) {
//       const {route, target} = routes[id]
//       app.use(route, proxy({
//         target,
//         changeOrigin: true,
//         logLevel: 'debug'
//       }))
//     }

//     if (process.env.NODE === 'test') {
//       const server = app.listen(port, () => resolve(server))
//     } else {
//       const server = spdy.createServer(ssl, app)
//         .listen(port, () => resolve(server))
//     }
//   })
// }

// module.exports = Object.assign({}, {start})

'use strict'
const express = require('express')
const proxy = require('http-proxy-middleware')
const spdy = require('spdy')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const {port, ssl} = container.resolve('serverSettings')
    
    const routes = container.resolve('routes')

    if (!routes) {
      reject(new Error('The server must be started with routes discovered'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()

    for (let id of Reflect.ownKeys(routes)) {
      const {route, target} = routes[id]
      app.use(route, proxy({
        target,
        changeOrigin: true,
        logLevel: 'debug'
      }))
    }

    if (process.env.NODE === 'test') {
      const server = app.listen(port, () => resolve(server))
    } else {
      const server = spdy.createServer(ssl, app)
        .listen(port, () => resolve(server))
    }
  })
}

module.exports = Object.assign({}, {start})
