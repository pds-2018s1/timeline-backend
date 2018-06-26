import request from 'supertest'
import start from '../server'
import { Mockgoose } from 'mockgoose'
import mongoose from 'mongoose'

const mockgoose = new Mockgoose(mongoose)

describe('Cards endpoints', () => {

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

  it('requesting /cards gives a list of cards', async () => {
    await request(app)
    .post('/cards')
    .send({ name: 'my new card' , year: '2018' })

    await request(app)
    .post('/cards')
    .send({ name: 'my other new card' , year: '2019' })

    await request(app).get('/cards').expect(200)
    .expect (res => 
      expect(res.body).toHaveLength(2)
    )
  })

  it('posting a new card gets it saved', async () => {
    
    await request(app)
      .post('/cards')
      .send({ name: 'my new card' , year: '2018' })
      .expect(200)
      .expect (res => 
        expect(res.body).toEqual({
          status: 'ok',
          data: [{
            __v: 0,
            _id: expect.any(String),
            name: 'my new card',
            group: expect.any(String),
            image: expect.any(String),
            year: 2018
          }]
        })
      )
  })

  //TODO ver como hacer bien setups para obtener la lista de cartas
  //y usar esa info para estos test
  it('deletes a card', async () =>{
    //saves a card
    const response = await request(app)
    .post('/cards')
    .send({ name: 'my new card' , year: '2018' })
    const id = response.body["data"][0]["_id"]
    await request(app).delete('/cards/'+id).expect(200)
   })

  it('updates a cards', async () => {
    const response = await request(app)
    .post('/cards')
    .send({ name: 'my new card' , year: '2018' })
    const id = response.body["data"][0]["_id"]
    await request(app).put('/cards/'+id).send({name: "other name to my new card", year: '2018'})
    .expect(200)
    
    await request(app).get('/cards/'+id)
    .expect(200)
    .expect (res => 
      expect(res.body).toEqual({
       
          __v: expect.any(Number),
          _id: id,
          name: 'other name to my new card',
          group: expect.any(String),
          image: expect.any(String),
          year: 2018
        
      })
    )


  })


})