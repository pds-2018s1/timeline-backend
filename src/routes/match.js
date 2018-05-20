import { Router } from 'express'
import uuid from 'uuid/v4'
import { update, remove } from 'ramda'
import mongoose from 'mongoose'
const router = Router()

const Match = mongoose.model('Match') 

router.get('/', async(req, res) => res.send(await Match.find({}))) //Returns all matches
router.get('/:id', async(req, res) => res.send(await Match.findById(req.params.id))) 

router.post('/', async (req,res) => {
    const match = req.body
    const data = await Match.create([match])
    res.send({status: 'ok', data})
  })

//agregar un jugador a la partida
router.put('/:id', async(req, res) => {
    const match = await Match.findById(req.params.id)
    
    match.players.push(req.body.player)
    
    await match.save()
    res.send({ status: 'ok' })
})

router.delete('/:id', async (req, res) => {
    const match = await Match.findById(req.params.id)
    await match.remove()
    res.send({status: 'ok'})
  })



  export default router