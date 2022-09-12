const mongoose = require("mongoose");

function connectDb(){
    mongoose.connect('mongodb+srv://KUNal_Bose47:8N2ug3xjFC4y1zjh@blogdb.p6xqv.mongodb.net/?retryWrites=true&w=majority', {
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