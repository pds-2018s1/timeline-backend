import request from 'supertest'
import app from '../server'
describe('API', () => {
  it('requesting /api gives a status ok', () => {
    return request(app)
        .get('/api/')
        .expect(200, { status: 'ok' })
  })
})