const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');


// Load Image Model
require('../models/Image');
const Image = mongoose.model('image');

router.post('/add', (req, res)=>{//images/add
  // const newImage ={
  //   link: data,
  //   date: Date.now()
  // }
  // new Image(newImage).save().then(image =>{
  //   res.redirect('/browse')
  // })
})

module.exports = router
