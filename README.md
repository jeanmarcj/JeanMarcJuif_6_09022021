# Projet OpenclassRooms So Pekocko

A partir d'un front end fourni, coder une API back-end en fonction du cahier des charges fourni.

With a front-end, code an API to store informations. The data base should use MongoDB. Secure the API.

## What is used for this project :
Node-JS (nodemon)
Express 4.16
Mongo-db : data base
Mongoose : 
Mongoose-unique-validator : Secure to have only one user email adress in the BDD
Bcrypt : To hash the user password in the BDD
Jsonwebtoken : For token authentification
Multer : To download images
Cors : Allow other ip (outside origin)

Security
--------
Helmet package : Helmet helps you secure your Express apps by setting various HTTP headers
CookieSession package : To prevent HTTP session only
Express-rate-limit package : limit each IP to 100 requests max per windowMs
Dotenv npm package : loads environment variables from a .env file into process.env
Xss npm package : filter user input in form to prevent XSS attacks
Maskdata npm package : mask the user email inside the data base
mongo-sanitize : a standalone module that sanitizes inputs against query selector injection attacks. This middleware come from the module. Prevent sql injections

## Lancer le front-end (répertoire front-end)
npm start (lance NG Start)

## Lancer le serveur back-end (Par défaut écoute le port: 3000) :
nodemon server

### TODO:
Option :
password-validator npm package
------------------------------
Obligé l'utilisateur à saisir un mot de pass fort (restrictions)

'use strict';

