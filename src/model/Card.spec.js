import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'
import './Card'

const { ObjectId } = mongoose.Types

const mockgoose = new Mockgoose(mongoose)

const Card = mongoose.model('Card')

describe('Model - Card', () => {

    beforeAll(async () => {
      await mockgoose.prepareStorage()
      await mongoose.connect('mongodb://example.com/TestingDB')
    })
    afterEach(async () => {
      mockgoose.helper.reset()
    })


    describe('save()', () => {

        it('debe requerir year', async () => {
          try {
            await new Card({name:'Independencia de  Bolivia'}).save()
            throw new Error('Tendria que haber fallado')
          } catch (err) {
            expect(err.message)
              .toEqual('Card validation failed: year: Path `year` is required.')
          }
        })
    
        it('debe guardar el grupo "General" por defecto', async () => {
          const saved = await new Card({ name: 'Quilmes A  CLub', year: '1887' }).save()
          const group = saved["group"]
          expect(group).toEqual("General")
          expect(await Card.count()).toEqual(1)
        })
      })
    describe('delete()', () =>{
        it('debe eliminar el elemento indicado por el id', async() => {
            const saved = await new Card({ name: 'Quilmes A  CLub', year: '1887' }).save()
            expect(await Card.count()).toEqual(1)
            const card = await Card.findById(saved["_id"])
            await card.remove()
            expect(await Card.count()).toEqual(0)
        })
    })

})