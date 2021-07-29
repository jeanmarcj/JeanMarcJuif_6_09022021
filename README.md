# Projet OpenclassRooms So Pekocko

A partir d'un front end fourni, coder une API back-end en fonction du cahier des charges fourni. 

## Technologies utilisées :
Node-JS (nodemon)
Express 4.16
Mongo-db : moteur de base de donnée
Mongoose : 
Mongoose-unique-validator : Secure to have only one user email adress in the BDD
Bcrypt : To hash the user password in the BDD
Jsonwebtoken : For token authentification
Multer : To download images
cors : Allow other ip (outside origin)
Security
--------
helmet package : Helmet helps you secure your Express apps by setting various HTTP headers.
cookieSession package : for HTTP session only
express-rate-limit package : limit each IP to 100 requests max per windowMs

## Lancer le front-end (répertoir front-end)
npm start (lance NG Start)

## Lancer le serveur back-end (Par défaut écoute le port: 3000) :
nodemon server



### TODO:

dotenv npm package
------------------
dotenv = require("dotenv").config();
Masquer l'URL de la bdd via dotenv.
const URL_PATH = process.env.db;
et mongoose.connect(URL_PATH),...

password-validator npm package
------------------------------
Obligé l'utilisateur à saisir un mot de pass fort (restrictions)
password-validator : restrictions sur le mot de passe

maskdata npm package
--------------------
Masquer une donnée en BDD (email)

xss npm package
---------------
xss : xss is a module used to filter input from users to prevent XSS attacks

