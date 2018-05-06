import express from 'express'
import morgan from 'morgan' 
import api from './routes/api'

const app = express()
app.use(morgan('dev'))
app.use('/api', api)

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

export default app