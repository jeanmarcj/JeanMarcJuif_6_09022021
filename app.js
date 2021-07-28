const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Security
const helmet = require('helmet');
const cookieSession = require('cookie-session');

// Routing
const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

// Init app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helmet helps to secure the Express apps by setting various HTTP headers.
app.use(helmet());

/**
 * Mongo DB connection
 */
mongoose.connect('mongodb+srv://sopekockoUser:ormesson94490@cluster0.bneic.mongodb.net/sopekockoDB?retryWrites=true&w=majority',
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

/**
 * Set cookies for http only
 */
 app.use(cookieSession({
   name: 'sopekocko',
   secret: 'sessionS3cur3',
   cookie: {
     secure: true,
     httpOnly: true,
     domain: "http://localhost:3000" 
   },
   maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
  

module.exports = app;