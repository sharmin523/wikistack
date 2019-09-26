const express = require('express')
const layout = require('../views/layout')
const wikipage = require('../views/wikipage')
const { Page } = require("../models");
const addPage = require('../views/addPage')
const router = express.Router();
const main = require('../views/main')


router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
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
    res.send(wikipage(foundPage))
  }
  catch (error) { next(error)}
})

module.exports = router;
