import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'
import './Match'

const mockgoose = new Mockgoose(mongoose)

const Match = mongoose.model('Match')

describe('Model - Match', () => {
  beforeAll(async () => {
    process.env.MONGO_URL = 'mongodb://example.com/TestingDB'
    await mockgoose.prepareStorage()
    await mongoose.connect('mongodb://example.com/TestingDB')
  })
  afterEach(async () => {
    mockgoose.helper.reset()
  })


  describe('save()', async () => {
    it('debe requerir size', async () => {
      try {
        await new Match({
          name: 'nueva partida',
          timeline: [],
          players: [],
          deck: []
        }).save()
        throw new Error('Tendría que haber fallado')
      } catch (err) {
        expect(err.message).toEqual(
          'Match validation failed: size: Path `size` is required.'
        )
      }

    })
  })
  describe('delete()', async () => {
    it('debe eliminar el elemento indicado por el id', async () => {
      const saved = await new Match({
        name: 'nueva partida',
        timeline: [],
        players: [],
        deck: [],
        size: 2
      }).save()
      expect(await Match.count()).toEqual(1)
      await Match.deleteOne({ _id: saved['_id'] })
      expect(await Match.count()).toEqual(0)
    })
  })

  describe('update()', async () => {
    it('debe actualizar correctamente un valor', async () => {
      const saved = await new Match({
        name: 'nueva partida',
        timeline: [],
        players: [],
        deck: [],
        size: 2
      }).save()
      saved.name = 'otra partida'
      await saved.save()

      const r_saved = await Match.findById(saved['_id'])
      expect(r_saved.name).toEqual('otra partida')
    })
  })
})
