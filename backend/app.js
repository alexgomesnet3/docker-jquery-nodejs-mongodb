const express = require('express')
const restful = require('node-restful')
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()


// Config Database Mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// Mapeamento ODM
const Client = restful.model('Client', {
  name: { type: String, required: true}
})

// Config Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({
  new: true,
  runValidators: true
})

// Config API Routes
Client.register(app, '/clients')

// Start Server
app.listen(3000)