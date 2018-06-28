import express from 'express'
import morgan from 'morgan' 

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import './model/Card'
import './model/Match'
import cards from './routes/cards'
import match from './routes/match'


const start = () => {
    //mongoose.connect('mongodb://localhost:27017/timeline')
    //mongoose.connect('mongodb://timeline_user:pdsUser@ds125680.mlab.com:25680/timeline')
    
    if (!process.env.MONGO_URL) {
        throw new Error('No mongo url configured, set MONGO_URL env var');
      }
    mongoose.connect(process.env.MONGO_URL)

    const app = express()
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
       res.setHeader('Access-Control-Allow-Origin', '*')

        // Request methods you wish to allow
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        )

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true)

        // Pass to next layer of middleware
        next()
    });

    app.use('/cards', cards) 
    app.use('/match', match) 
    return app
}
export default start
