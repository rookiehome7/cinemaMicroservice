/* eslint-env mocha */
const supertest = require('supertest')

describe('Booking Service', () => {
  // const api = supertest('https://192.168.99.119:8080')
  const api = supertest('http://192.168.99.119:3002')
  // const api = supertest('localhost:3000')
  const now = new Date()
  now.setDate(now.getDate() + 1)
  const user = {
    name: 'Cristian',
    lastName: 'Ramirez',
    email: 'cristiano@gmail.com',
    creditCard: {
      number: '4242424242424242',
      cvc: '123',
      exp_month: '12',
      exp_year: '2021',
    },
    membership: '7777888899990000'
  }

  const booking = {
    city: 'Morelia',
    cinema: 'Plaza Morelia',
    movie: {
      title: 'Assasins Creed',
      format: 'IMAX'
    },
    schedule: now.toString(),
    cinemaRoom: 7,
    // cinemaRoom: 1,
    seats: ['45'],
    totalAmount: 71
  }
  it('can make a booking', (done) => {
    api.post('/booking')
      .send({user, booking})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
