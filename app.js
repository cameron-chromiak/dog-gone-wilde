const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express()

//connect to mongoose
mongoose.connect('mongodb://localhost/dogs', {
  useNewUrlParser: true
}).then(() => console.log('Mongo connected!'))
.catch(err => console.log(err))



//set static
app.use(express.static('public'));

//load Image model
require('./models/Image')
const Image = mongoose.model('image')

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  res.render('index')
})
app.get('/about', (req, res) =>{
  res.render('about')
})
app.get('/browse', (req, res)=>{
  res.render('browse')
})

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//detect if user is logged in thne display menu items
// app.use(function (req, res, next){
//   res.locals.user = req.user || null
//   next()
// })

//load routes
const users = require('./routes/users')
const images = require('./routes/images')
//use routes
app.use('/users', users)
app.use('/images', images)

//Passport
require('./config/passport')(passport)

const port = 4000

app.listen(port, () =>{
  console.log(`Running on port ${port}`);
})
