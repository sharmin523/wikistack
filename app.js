const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const { db } = require('./models')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
  res.send(layout('/n'))
})

const PORT = 1337

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`)
})

// ensure database connection is working:
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })
