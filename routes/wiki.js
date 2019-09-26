const express = require('express')
const layout = require('../views/layout')
const wikipage = require('../views/wikipage')
const { Page, User } = require("../models");
const addPage = require('../views/addPage')
const router = express.Router();
const main = require('../views/main')


router.post('/', async (req, res, next) => {

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const [user, wasCreated] = await User.findOrCreate({
        where: { email: req.body.email, name: req.body.author }
    })

    const page = await Page.create(req.body)

    page.setAuthor(user)

    res.redirect(`/wiki/${page.slug}`);

  } catch (error) { next(error) }
});

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll()
  //pages: array of page objects
  // pages[i].dataValues.title , .slug , etc
  res.send(main(pages))
})

router.get('/add', (req, res, next) => {
    res.status(200).send(addPage())
})

router.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: { slug: req.params.slug }
    })

    const author = await User.findOne({
        where: {id: foundPage.authorId}
    })

    res.send(wikipage(foundPage, author))
  }
  catch (error) { next(error)}
})

module.exports = router;
