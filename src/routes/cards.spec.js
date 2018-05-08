import request from 'supertest'
import app from '../server'
describe('Cards endpoints', () => {

  it('requesting /cards gives a list of cards', () => {
    return request(app)
        .get('/cards')
        .expect(function(res, err) {
          const cards = res.body
          expect(cards).toBeDefined()
          const aCard = cards[0]
          expect(aCard.id).toBeDefined()
          expect(aCard.fact).toBeDefined()
          expect(aCard.fact.name).toBeDefined()
          expect(aCard.fact.year).toBeDefined()
        })
  })

  it('posting a new card gets it added to the list', () => {
    return request(app)
      .post('/cards')
      .set('Content-Type', 'application/json')
      .send({ fact: {name: 'my new card' , year: '2018'} })
      .expect(200, {status: 'ok'})
  })

  //TODO ver como hacer bien setups para obtener la lista de cartas
  //y usar esa info para estos test
  it('deletes a card')
  it('updates a cards')


})