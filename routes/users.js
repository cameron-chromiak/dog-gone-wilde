//USER ROUTE

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const router = express.Router()

// Load User Model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
  res.render('users/login')
})
router.get('/register', (req, res) => {

  res.render('users/register')
})
//login
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/users/browse',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/browse', (req, res, next)=>{
  console.log('browse')
  res.render('browse', {user: req.user})
})

//register form post
router.post('/register', (req, res) => {
  let errors = []
  if (req.body.password != req.body.password2) {
    errors.push({
      text: "Passwords do not match"
    })
  }
  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      email: req.body.email,
    })
  } else {
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          console.log('xxx');
          errors.push({text: "User taken"})
          res.render('users/register', {errors: errors})
        } else {
          const newUser = new User({
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
})


module.exports = router
