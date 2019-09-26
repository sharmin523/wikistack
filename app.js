const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const { Page, User } = require('./models')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
  res.send(layout('/n'))
})

const PORT = 1337

const init = async () => {
  await Page.sync({force: true})
  await User.sync({force: true})

  app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`)
  })
}

init()

// ensure database connection is working:
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })
