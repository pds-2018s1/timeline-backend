import { Router } from 'express'
import mongoose from 'mongoose'
const router = Router()

const Card = mongoose.model('Card')

router.get('/', async (req, res) => res.send(await Card.find({}))) //Returns all cards

router.get('/:id', async (req, res) =>
  res.send(await Card.findById(req.params.id))
)

//ojo: acá se actualiza todo lo que se envía y se pisan valores.
router.put('/:id', async (req, res) => {
  const card = await Card.findById(req.params.id)
  card.name = req.body.name
  card.year = req.body.year
  card.image = req.body.image
  card.group = req.body.group

  await card.save()
  res.send({ status: 'ok' })
})
router.post('/', async (req, res) => {
  const card = req.body
  const data = await Card.create([card])
  res.send({ status: 'ok', data })
})

//servicio para guardar una lista de cartas -- sin comportamiento asociado en la aplicación
router.post('/list', async (req, res) => {
  const cards = req.body
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index]
    await Card.create([card])
  }
  res.send({ status: 'ok' })
})

router.delete('/:id', async (req, res) => {
  const card = await Card.findById(req.params.id)
  await card.remove()
  res.send({ status: 'ok' })
})

export default router
