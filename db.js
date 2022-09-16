const mongoose = require("mongoose");

function connectDb(){
    mongoose.connect('YOUR_MONGO_URL', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    const connection = mongoose.connection;
    connection.on("connected", ()=>{
        console.log("MongoDb connection Successful");
    })
    connection.on("error", ()=>{
        console.log("MongoDb connection failed");
    })
}

connectDb()

module.exports = mongoose;
