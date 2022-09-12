const express = require("express");
const router = express.Router();
const Cars = require("../models/cars");

router.get("/getallcars", async (req, res)=>{
    // const car = {
    //     name: "Maruti Celerio",
    //     image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Celerio/8681/1644832526599/front-left-side-47.jpg?tr=w-456",
    //     rentPerHour: 890,
    //     fuelType: "petrol",
    //     capacity: 5
    // };
    // await Cars.create(car, (err, resp)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log(resp, "this is response after creating");
    // })
    const response = await Cars.find();
    // console.log(response, "this is after finding");
    res.send(response);
})

router.post("/addcar", async(req, res)=>{
    try{
        const newcar = new Cars(req.body)
        await newcar.save()
        res.send("Car added Successfully")
    }catch(error){
        console.log(error);
        return res.status(400).json(error)
    }
})

router.post("/edit", async(req, res)=>{
    try{
        const car = await Cars.findOne({_id: req.body._id});
        car.name = req.body.name
        car.image = req.body.image
        car.fuelType = req.body.fuelType
        car.rentPerHour = req.body.rentPerHour
        car.capacity = req.body.capacity
        await car.save()
        res.send("Car edited successfully");
    }catch(error){
        console.log(error);
        return res.status(400).send(error)
    }
})

router.post("/deletecar", async(req, res)=>{
    try{
        await Cars.findOneAndDelete({_id: req.body.carid});
        res.send("Car deleted successfully");
    }catch(error){
        console.log(error);
        return res.status(400).send(error)
    }
})

module.exports = router;