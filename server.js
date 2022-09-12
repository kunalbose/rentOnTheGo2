const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");
const Cars = require("./models/cars");

app.use(express.json());

app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));

app.get("/", (req, res)=> res.send("Hello World"));

app.listen(port, ()=>console.log(`listening on Port ${port}`));