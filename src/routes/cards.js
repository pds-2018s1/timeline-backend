import { Router } from 'express'
import uuid from 'uuid/v4'
import { update, remove } from 'ramda'

const router = Router()

let cards = [
  { id: uuid(), fact: { name: "Independencia de Afganistan", year: "1919" } },
  { id: uuid(), fact: { name: "Independencia de Albania", year: "1912" } },
  { id: uuid(), fact: { name: "Independencia de Algeria", year: "1962" } },
  { id: uuid(), fact: { name: "Independencia de Angola", year: "1975" } },
  { id: uuid(), fact: { name: "Independencia de Anguilla", year: "1967" } },
  { id: uuid(), fact: { name: "Independencia de Antigua y barbuda", year: "1981" } },
  { id: uuid(), fact: { name: "Independencia de Argentina", year: "1816" } }
]

router.get('/', (req, res) => res.json(cards)) //Returns all cards
router.put('/:id', (req, res) => {
  const { id } = req.params
  const card = req.body
  cards = update(cards.findIndex(_ => _.id === id ), card, cards)
  res.send({ status: 'ok' })
})
router.post('/', (req,res) => {
  const card = {
    id: uuid(),
    fact: req.body.fact
  }
  cards = update(-1, card, cards)
  res.send({status: 'ok'})
})
router.delete('/:id', (req, res) => {
  const { id } = req.params
  cards = remove(cards.findIndex(_ => _.id === id ), 1, cards)
  res.send({status: 'ok'})
})

export default router