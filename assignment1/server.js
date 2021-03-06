const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { requireAuth, checkUser } = require('./middlewares/middleware');
const Routes = require('./Routes/accountRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// view engine
app.set('view engine', 'ejs'); 

// database connection
const port = app.listen(process.env.PORT || 3000)
const dbURI = 'mongodb+srv://mohamedmohesn1:1234567890@cluster0.8qxrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true , useFindAndModify:false})
  .then((result) => "hi")
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('Home'));
app.get('/allProduct', requireAuth, (req, res) => res.render('allProduct', {
  products : [{
    "name": "blueshirt",
    "price" : "180$",
    "img" : "blueShirt.jpg",
    "desc" : "ay 7aga"
  },
  {
      "name": "blackshirt",
    "price" : "160$",
    "img" : "blackshirt.jpg",
    "desc" : "ay 7aga"
  },
  {
      "name": "T-shirts",
    "price" : "120$",
    "img" : "T-shirts-5.jpg",
    "desc" : "ay 7aga"
  },
  {
      "name": "shoes",
    "price" : "240$",
    "img" : "shoes.jpg",
    "desc" : "ay 7aga"
  },
  {
      "name": "pant",
    "price" : "300$",
    "img" : "pant.jpg",
    "desc" : "ay 7aga"
  },
  {
      "name": "shirts",
    "price" : "620$",
    "img" : "shirt.jpg",
    "desc" : "ay 7aga"
  }
  ]}));
  app.get('/update', requireAuth, (req, res) => res.render('update'));
  app.get('/Account', requireAuth, (req, res) => res.render('account'));
app.use(Routes);