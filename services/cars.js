
const fs = require('fs/promises');

// const filePath = './services/data.json'
const Car = require("../models/Car")

// async function read() {
//     try{
//       const file = await fs.readFile(filePath);
//       return JSON.parse(file)
//     } catch (err){
//        console.error('Database read error');
//        console.error(err);
//        process.exit(1)
//     }
// }

// async function write(data) {
//     try {
//         await fs.writeFile(filePath, JSON.stringify(data,null,2))
        
//     } catch (err){
//         console.error('Database write error');
//         console.error(err);
//         process.exit(1)
//      }
// }
  
function carViewModel(car) {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories
    }
    
}

async function getAll(query) {
    let cars = await Car.find({ name: new RegExp(query.search, 'i') });

    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }

    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }

    return cars.map(carViewModel);
    // const data = await read();
    // let cars=  Object.entries(data).map(([id,v])=>Object.assign({},{id},v))
    // if (query.search) {
    //    cars= cars.filter(c=>c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase() ))
    // }
    // if (query.from) {
    //    cars= cars.filter(c=>c.price >= Number(query.from))
    // }
    // if (query.to) {
    //    cars= cars.filter(c=>c.price <= Number(query.to))
    // }
    // return cars
}

async function getById(id) {
    const car = await Car.findById(id);
    if(car){
        return carViewModel(car)
    }else{
        return undefined
    }

    // const data = await read();
    // const car = data[id];
    // if (car) {
    //     return Object.assign({},{id},car)
    // } else{
    //     return undefined;
    // }
}

async function createCar(car) {
    const result = new Car(car);
    await result.save()
    // const cars = await read();
    // let id;
    // do {
    //     id = nextId();
    // } while(cars.hasOwnProperty(id));
    // cars[id]=car
    // await write(cars)
}
// function nextId() {
//     return  'xxxxxxxx-xxxx'.replace(/x/g,()=>(Math.random()*16 | 0).toString(16))
// }

async function deleteById(id) {
   await Car.findByIdAndDelete(id);
   
    
    // const data = await read();
    // if (data.hasOwnProperty(id)) {
    //     delete data[id]
    //     await write(data)
    // } else{
    //     throw new ReferenceError("No such ID in database")
    // }
}
async function updateById(id,car) {
    const existing = await Car.findById(id);
    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl;
    existing.price = car.price;
    
    await existing.save()
    // const data = await read();
    // if (data.hasOwnProperty(id)) {
    //   data[id]=car
    //     await write(data)
    // } else{
    //     throw new ReferenceError("No such ID in database")
    // }
}

async function attachAccessory(carId,accessoryId) {
    const existing = await Car.findById(carId);
    existing.accessories.push(accessoryId)
    await existing.save()
}

module.exports = ()=>(req,res, next)=>{
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessory
    }
    next()
};