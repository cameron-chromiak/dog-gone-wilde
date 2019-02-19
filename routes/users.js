//USER ROUTE

const express = require('express');
const router = express.Router()

//so you can use this route in other files


router.get('users/login', (req, res)=>{
  res.render('login')
})
router.get('users/register', (req, res)=>{
  res.render('/register')
})


module.exports = router