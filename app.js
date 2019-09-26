const express = require('express')
const morgan = require('morgan')
const layout = require('./views/layout')
const { Page, User } = require('./models')

const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})

const PORT = 1337

const init = async () => {
  await Page.sync()
  await User.sync()

  app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`)
  })
}

init()
