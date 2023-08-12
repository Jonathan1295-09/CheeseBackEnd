//dependencies//
require("dotenv").config();
const {PORT = 8000, CHEESEDATA_URL} = process.env
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const morgan = require("morgan")

// DataBase Connection //
mongoose.connect(CHEESEDATA_URL)

// Models //
const cheeseSchema = new mongoose.Schema ({
    name:String,
    img: String,
    country: String
})

const Cheese = mongoose.model("Cheese", cheeseSchema)

// connection //
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error))

//middleware//
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//Routes//

///Index
    app.get("/cheese", async(req,res) => {
        try{
            const cheese = await Cheese.find({})
            res.json(cheese)
        }catch(error){
            res.status(400).json({error})
        }
    });
//Create
    app.post("/cheese", async(req,res) => {
        try{
            const cheese = await Cheese.create(req.body)
            res.json(cheese)
        }catch(error){
            res.status(400).json({error})
        }
    });
//update
    app.put("/cheese/:id", async (req,res) => {
        try{
            const cheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(cheese)
        }catch(error){
            res.status(400).json({error})
        }
    });
//Delete
    app.delete("/cheese/:id", async (req,res) => {
        try{
            const cheese = await Cheese.findByIdAndDelete(req.params.id)
            res.status(204).json(cheese)
        }catch(eror){
            res.status(400).json({error})
        }
    })


app.listen(PORT, () => console.log(`Listing on port ${PORT} `))