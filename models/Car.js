const {Schema, model} = require("mongoose");
const carSchema = new Schema({
    name: {type:String, require:true},
    description: {type:String, require:true},
    imageUrl: {type:String, require:true},
    price: {type:Number, require:true}
})
const Car = model("Car", carSchema);

module.exports = Car