const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/Notepad";


const connectToMongo =()=>{
    mongoose.connect(mongoURI).then(()=>console.log("Connected to mongo Successfully")).catch((error)=>console.log(error.message))
}

module.exports = connectToMongo;