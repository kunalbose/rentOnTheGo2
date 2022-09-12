const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async(req, res)=>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username, password})
        if(user){
            res.send(user)
        }else{
            return res.status(404).json("user does not exist");
        }
    }catch(error){
        return res.status(400).json(error);
    }
})

router.post("/register", async(req, res)=>{
    try{
        const newUser = req.body;
        await User.create(newUser);
        res.send("User registered successfully");
    }catch(error){
        return res.status(400).json(error);
    }
})

module.exports = router;