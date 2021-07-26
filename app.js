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
mongoose.connect('mongodb+srv://sopekockoUser:ormesson94490@cluster0.bneic.mongodb.net/sopekockoDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('Connexion à MongoDB Atlas réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

/**
 * CROS Security middleware
 */
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200/");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-type, Accept, X-Custom-Header, Origin, X-Requested-With, Authorization, Content");
//   if (req.method === "OPTIONS") {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//   } else {
//     res.header('Access-Control-Allow-Origin', '*');
//   }
//   next();
// });

//  app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

//   app.get('/', (req, res, next) => {
//     console.log('Requête reçue !');
//     res.send('<h1>En travaux</h1>');
//     next();
// });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
  

  module.exports = app;