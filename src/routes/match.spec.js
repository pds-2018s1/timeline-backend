import request from 'supertest'
import start from '../server'
import { Mockgoose } from 'mockgoose'
import mongoose from 'mongoose'

const mockgoose = new Mockgoose(mongoose)

describe('Matches endpoints', () => {

  let app;

  beforeEach(() => {
    app = start();
  })

  beforeAll(async () => {
    process.env.MONGO_URL = 'mongodb://example.com/TestingDB'
    await mockgoose.prepareStorage()
    await mongoose.connect('mongodb://example.com/TestingDB')
  })
  afterEach(async () => {
    mockgoose.helper.reset()
  })

  it('requesting /match gives a list of matches', async () => {
    await request(app)
      .post('/match')
      .send({
        timeline: [],
        deck: [],
        players: [{ name: 'Juan' }],
        size: 2,
        name: 'Primer partida'
      })

    await request(app)
      .post('/match')
      .send({
        timeline: [],
        deck: [],
        players: [{ name: 'Pepe' }],
        size: 2,
        name: 'Segunda partida'
      })

    await request(app)
      .get('/match')
      .expect(200)
      .expect(res => expect(res.body).toHaveLength(2))
  })

  it('posting a new match gets it saved', async () => {
    await request(app)
      .post('/match')
      .send({
        timeline: [],
        deck: [],
        players: [{ name: 'José' }],
        size: 2,
        name: 'Una partida'
      })
      .expect(200)
      .expect(res =>
        expect(res.body).toEqual({
          status: 'ok',
          data: [
            {
              __v: 0,
              _id: expect.any(String),
              name: 'Una partida',
              size: 2,
              deck: [],
              players: [{ name: 'José' }],
              timeline: []
            }
          ]
        })
      )
  })
  it('deletes a match', async () => {
    const response = await request(app)
      .post('/match')
      .send({
        timeline: [],
        deck: [],
        players: [{ name: 'María' }, { name: 'Pablo' }],
        size: 2,
        name: 'Tercera partida'
      })
    const id = response.body['data'][0]['_id']
    await request(app)
      .delete('/match/' + id)
      .expect(200)
  })

  it('adds a new player to a match', async () => {
    const response = await request(app)
      .post('/match')
      .send({
        timeline: [],
        deck: [],
        players: [{ name: 'José' }],
        size: 2,
        name: 'Una partida'
      })
    const id = response.body['data'][0]['_id']
    await request(app)
      .put('/match/' + id)
      .send({ player: { name: 'Jorge' } })
      .expect(200)

    await request(app)
      .get('/match/' + id)
      .expect(200)
      .expect(res =>
        expect(res.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          timeline: [],
          deck: [],
          players: [{ name: 'José' }, { name: 'Jorge' }],
          size: 2,
          name: 'Una partida'
        })
      )
  })
})
