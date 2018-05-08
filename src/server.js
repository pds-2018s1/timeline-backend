import express from 'express'
import morgan from 'morgan' 
import cards from './routes/cards'
import bodyParser from 'body-parser'

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/cards', cards) 

export default app