const express = require("express");
const empModel = require("../model/emp.model");
const empRouter = express.Router()


empRouter.post("/employees",async(req,res)=>{
    
    try {
        const newUser = new empModel(req.body);
        await newUser.save();
         res.send("employee added successfully")
    } catch (error) {
        res.sendStatus(400).send(error.message)
    }
})



empRouter.get("/employees",async(req,res)=>{
    
    try {
        const newUser = await empModel.find();
         res.send(newUser)
    } catch (error) {
        res.sendStatus(400).send(error.message)
    }
})




module.exports = empRouter