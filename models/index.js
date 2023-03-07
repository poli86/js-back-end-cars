 const mongoose = require("mongoose");

 const Car = require("./Car");

 const connectionString = "mongodb://localhost:27017/carbicle"

 async function init() {
    try {
        await mongoose.connect(connectionString,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log("Database connect");
    //   await Car.create({
    //             "name": "Toyota Avensis",
    //             "description": "lorem ipsum lorem ipsum",
    //             "imageUrl": "11642697845129757_i2.jpg",
    //             "price": 3000
    //     });

        mongoose.connection.on("error", (err) =>{
            console.error("Database Error");
            console.log(err);
        })
    } catch (err) {
        console.error("Error connection to database");
        process.exit(1)
    }
 }

 module.exports = init