/* eslint-env mocha */
const supertest = require('supertest')

describe('Notification Service', () => {
  // const api = supertest('http://192.168.99.119:3004')
  const api = supertest('localhost:3000')
  const payload = {
    city: 'Morelia',
    userType: 'loyal',
    totalAmount: 71,
    cinema: {
      name: 'Plaza Morelia',
      room: '1',
      seats: '53, 54'
    },
    movie: {
      title: 'Assasins Creed',
      format: 'IMAX',
      schedule: new Date()
    },
    orderId: '1aa90cx',
    description: 'some description',
    user: {
      name: 'Takdanai Jirawanichkul',
      email: 'rookiehome7@gmail.com'
    }
  }

  it('can send a notification via email', (done) => {
    api.post('/notification/sendEmail')
      .send({payload})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
