import express from 'express'
import morgan from 'morgan' 

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import './model/Card'

mongoose.connect('mongodb://localhost:27017/timeline')
import cards from './routes/cards'


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/cards', cards) 

export default app