const express = require("express");
const hbs = require("express-handlebars");

const carsService = require("./services/cars")

const { about } = require("./controllers/about.js");
const { create } = require("./controllers/create.js");
const { details } = require("./controllers/details.js");
const{home} = require("./controllers/home.js");
const { notFound } = require("./controllers/notFound.js");


const app= express();

app.engine('hbs',hbs.create({extname: '.hbs'}).engine);
app.set('view engine','hbs')

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'))
app.use(carsService())

app.get('/',home)
app.get('/about',about)
app.get('/details/:id',details)
app.get('/create',create)
app.all('*',notFound)

app.listen(3001,()=>console.log("Server started"));
