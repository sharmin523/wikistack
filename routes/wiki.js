const express = require('express')
const layout = require('../views/layout')
const wikipage = require('../views/wikipage')
const { Page } = require("../models");
const addPage = require('../views/addPage')
const router = express.Router();


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
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/', (req, res, next) => {
    res.send(layout())
})

router.get('/add', (req, res, next) => {
    res.status(200).send(addPage())
})

module.exports = router;
