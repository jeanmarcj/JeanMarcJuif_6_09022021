const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

// Security
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const rateLimit = require('express-rate-limit');

// Routing
const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

// Init app
const app = express();

// Set-Up the db connect string via .env file
// The .env file is not publish on gitHub
const testEnvFile = dotenv;
if (testEnvFile.error) {
  throw new Error('.env file is missing in this project !');
}
const DB_CONNECT_STRING = process.env.DB_URL;


// Middleware rate-limit.
// For API server, rate-limiter applied to all requests.
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helmet helps to secure the Express apps by setting various HTTP headers.
app.use(helmet());

/**
 * Mongo DB connection
 */
mongoose.connect(DB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('Connected to you DB via MongoDB Atlas !'))
.catch(() => console.log('The connection to DB via MongoDB Atlas failed !'));

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