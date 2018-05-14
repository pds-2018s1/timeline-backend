import { Router } from 'express'
import uuid from 'uuid/v4'
import { update, remove } from 'ramda'
import mongoose from 'mongoose'
const router = Router()

const Card = mongoose.model('Card') 

let cards = [
  { id: uuid(), fact: { name: "Independencia de Afganistan", year: "1919" } },
  { id: uuid(), fact: { name: "Independencia de Albania", year: "1912" } },
  { id: uuid(), fact: { name: "Independencia de Algeria", year: "1962" } },
  { id: uuid(), fact: { name: "Independencia de Angola", year: "1975" } },
  { id: uuid(), fact: { name: "Independencia de Anguilla", year: "1967" } },
  { id: uuid(), fact: { name: "Independencia de Antigua y barbuda", year: "1981" } },
  { id: uuid(), fact: { name: "Independencia de Argentina", year: "1816" } }
]

router.get('/', async(req, res) => res.send(await Card.find({}))) //Returns all cards

//ojo: acá se actualiza todo lo que se envía y se pisan valores.
router.put('/:id', async(req, res) => {
  const card = await Card.findById(req.params.id)
  card.name = req.body.name
  card.year = req.body.year
  card.image = req.body.image
  card.group = req.body.group

  await card.save()
  res.send({ status: 'ok' })
})
router.post('/', async (req,res) => {
  const card = req.body
  const data = await Card.create([card])
  res.send({status: 'ok', data})
})
router.delete('/:id', async (req, res) => {
  const card = await Card.findById(req.params.id)
  await card.remove()
  res.send({status: 'ok'})
})

export default router