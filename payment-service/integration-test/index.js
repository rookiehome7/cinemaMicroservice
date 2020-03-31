/* eslint-env mocha */
const supertest = require('supertest')

describe('Payment Servie', () => {
  // const api = supertest('https://192.168.99.119:8080')
  const api = supertest('http://192.168.99.119:3003')
  // const api = supertest('localhost:3001')
  const testPayment = {
    userName: 'Cristian Ramirez',
    currency: 'mxn',
    number: '4242424242424242',
    cvc: '123',
    exp_month: '12',
    exp_year: '2021',
    amount: 71,
    description: `
      Tickect(s) for movie "Assasins Creed",
      with seat(s) 47, 48
      at time 8 / feb / 17`
  }

  it('can make a paymentOrder', (done) => {
    api.post('/payment/makePurchase')
      .send({paymentOrder: testPayment})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
