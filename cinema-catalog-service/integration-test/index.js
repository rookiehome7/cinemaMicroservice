/* eslint-env mocha */
const supertest = require('supertest')

describe('cinema-catalog-service', () => {
  const api = supertest('http://192.168.99.119:3001')
  it('returns schedules for a movie', (done) => {
    api.get('/cinemas/588ac65f2d029a6d15d0b5c8/1')
      .expect(200, done)
  })
})
