// 'use strict'
// const Docker = require('dockerode')

// const discoverRoutes = (container) => {
//   return new Promise((resolve, reject) => {
//     // here we retrieve our dockerSettings
//     const dockerSettings = container.resolve('dockerSettings')
  
//     // we instatiate our docker object, that will communicate with our docker-machine
//     const docker = new Docker(dockerSettings)
  
//     // function to avoid registering our database route and api route 
//     const avoidContainers = (name) => {
//       if (/mongo/.test(name) || /api/.test(name)) {
//         return false
//       }
//       return true
//     }
    
//     // here we register our routes in our ES6 proxy object
//     const addRoute = (routes, details) => {
//       routes[details.Id] = {
//         id: details.Id,
//         name: details.Names[0].split('').splice(1).join(''),
//         route: details.Labels.apiRoute,
//         target: getUpstreamUrl(details)
//       }
//     }
    
//     // we generate the container url to be proxy
//     const getUpstreamUrl = (containerDetails) => {
//       const {PublicPort} = containerDetails.Ports[0]
//       return `http://${dockerSettings.host}:${PublicPort}`
//     }
    
//     // here we list the our running containers
//     docker.listContainers((err, containers) => {
//       if (err) {
//         reject(new Error('an error occured listing containers, err: ' + err))
//       }

//       const routes = new Proxy({}, {
//         get (target, key) {
//           console.log(`Get properties from -> "${key}" container`)
//           return Reflect.get(target, key)
//         },
//         set (target, key, value) {
//           console.log('Setting properties', key, value)
//           return Reflect.set(target, key, value)
//         }
//       })

//       containers.forEach((containerInfo) => {
//         if (avoidContainers(containerInfo.Names[0])) {
//           addRoute(routes, containerInfo)
//         }
//       })
     
//       // and finally we resolve our routes
//       resolve(routes)
//     })
//   })
// }

// module.exports = Object.assign({}, {discoverRoutes})
'use strict'
const Docker = require('dockerode')

const discoverRoutes = (container) => {
  return new Promise((resolve, reject) => {
    const dockerSettings = container.resolve('dockerSettings')

    const docker = new Docker(dockerSettings)

    const getUpstreamUrl = (serviceDetails) => {
      const {PublishedPort} = serviceDetails.Endpoint.Spec.Ports[0]
      return `http://${dockerSettings.host}:${PublishedPort}`
    }

    const addRoute = (routes, details) => {
      routes[details.Spec.Name] = {
        id: details.ID,
        route: details.Spec.Labels.apiRoute,
        target: getUpstreamUrl(details)
      }
    }

    docker.listServices((err, services) => {
      if (err) {
        reject(new Error('an error occured listing containers, err: ' + err))
      }

      const routes = new Proxy({}, {
        get (target, key) {
          console.log(`Get properties from -> "${key}" container`)
          return Reflect.get(target, key)
        },
        set (target, key, value) {
          console.log('Setting properties', key, value)
          return Reflect.set(target, key, value)
        }
      })

      services.forEach((service) => {
        addRoute(routes, service)
      })

      resolve(routes)
    })
  })
}

module.exports = Object.assign({}, {discoverRoutes})
