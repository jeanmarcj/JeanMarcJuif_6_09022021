const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Mongo DB connection
 */
mongoose.connect('',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('Connexion à MongoDB Atlas réussie !'))
.catch(() => console.log('La Connexion à MongoDB Atlas a échouée !'));

/**
 * CROS Security middleware
 */
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
  

  module.exports = app;