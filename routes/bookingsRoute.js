const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/cars");
const stripe = require("stripe")("sk_test_51Lgwr4SCUQGDmdZ1Mj2D9GQ9dHyzSN1yBFk2h9NX7JB9uIVEbWngcJTEX5dr1OGJsDtSACcdew55MXNsZEVX9lwc00dqE1mUfp");
const { v4: uuidv4 } = require('uuid');

router.post("/bookcar", async (req, res)=>{
    const {token} = req.body;
    console.log(req.body);
    try{
        // const customer = await stripe.customers.create({
        //     email: token.email,
        //     source: token.id
        // });
        // console.log("control is here");
        // const payment = await stripe.charges.create({
        //     amount: req.body.totalAmount * 100,
        //     currency: "INR",
        //     customer: customer.id,
        //     receipt_email: token.email
        // },  {
        //     idempotencyKey: uuidv4()
        // });
        // console.log(payment, "this is payment");
        // console.log(req.body, "this is body");
            req.body.transactionId = uuidv4();
            const newBooking = new Booking(req.body);
            await newBooking.save();
            const car = await Car.findOne({_id: req.body.car})
            car.bookedTimeSlots.push(req.body.bookedTimeSlot)
            await car.save();
            res.send("your booking is successful");
             
        }catch(error){
        console.log(error);
        return res.status(400).json(error)
    }
});

router.get("/getallbookings", async(req, res)=>{
    try{
        const bookings = await Booking.find().populate('cars');
        res.send(bookings);
    }catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
})

module.exports = router;