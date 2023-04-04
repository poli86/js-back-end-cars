const express = require("express");
const hbs = require("express-handlebars");

const initDB = require("./models")

const carsService = require("./services/cars")
const accessoryService = require("./services/accessory")

const { about } = require("./controllers/about");
const  create  = require("./controllers/create");
const { details } = require("./controllers/details");
const{home} = require("./controllers/home");
const { notFound } = require("./controllers/notFound");
const  deleteCar = require("./controllers/delete");
const editCar = require("./controllers/edit");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");

start()

async function start(){
    await initDB()

    const app= express();

    app.engine('hbs',hbs.create({extname: '.hbs'}).engine);
    app.set('view engine','hbs')

    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'))
    app.use(carsService())
    app.use(accessoryService())

    app.get('/',home)
    app.get('/about',about)
    app.get('/details/:id',details)
    app.get('/create',create.get)
    app.post('/create',create.post)
    app.route("/delete/:id").get(deleteCar.get).post(deleteCar.post)
    app.route("/edit/:id").get(editCar.get).post(editCar.post)
    app.route("/accessory").get(accessory.get).post(accessory.post)
    app.route("/attach/:id").get(attach.get).post(attach.post)

    app.all('*',notFound)

    app.listen(3001,()=>console.log("Server started"));
}
