//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require("morgan");

    // Use .env file info and set Port at 4000
    //===========================
const { PORT = 4000 , MONGODB_URL} = process.env;

    //Database connection
    //==============
const db = mongoose.connection;

    //Connect MongoDB
    //==============
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//==============================
//======= ERROR LOGGER =========
//==============================

    // Database Connection Error/Success
    // Define callback functions for various events
    //=================================

db.on('error', (err) => console.log(err.message + ' is mongoDB NOT running?'));
db.on('connected', () => console.log('mongoDB is connected'));
db.on('disconnected', () => console.log('mongoDB is disconnected'));

//================================
//==========  MODELS  =============
//================================

const ListSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    item: [{
            title: String,
            importance: String,
            timeToComplete: String,
            due: String,
            status: String,
   }]
});

const List = mongoose.model("List", ListSchema);

//==============================
//======= MIDDLEWARE ===========
//==============================

    // Body parser middleware: it creates req.body
    //================================
app.use(express.urlencoded({ extended: false }));

    // Use Cors Middleware to work with React
    //===============================
app.use(cors());

    // Use Morgan Middleware for logging
    //===============================
app.use(morgan("dev"));

    // Use Express JSON Middleware for parsing body
    //===================================
app.use(express.json());


//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET =========
        //========================
app.get("/", (req,res) => {
   res.redirect("/Landing");
})

app.get("/Landing", async (req, res) => {
    try{
        res.json(await List.find({}));
    } catch(error) {
        res.status(400).json(error);
    }
});

        //========================
        //===== New / GET ==========
        //========================

        //========================
        //===== Show / GET ==========
        //========================

        //========================
        //===== Edit / GET ===========
        //========================

        //========================
        //===== Create / POST =======
        //========================
app.post("/TaskList/:_id", async (req, res) => {
    try {
        res.json(await List.create(req.body))
        res.json(await List.findById(req.body._id))
    } catch(error) {
        res.status(400).json(error);
    }
})

        //========================
        //===== Update / PUT ========
        //========================
app.put("/TaskList/:_id", async (req, res) => {
    try {
        res.json( await List.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch(error){
        res.status(400).json(error);
    }
})


        //=========================
        //===== Destroy / DELETE ======
        //=========================
 app.put("/", async (req, res) => {
    try {
         res.json(await List.findByIdAndRemove(req.params.id))
      } catch(error) {
          res.status(400).json(error);
      }
    })


//==============================
//========= LISTENER ============
//==============================

app.listen(PORT, () => {
    console.log('Server listening on port |', PORT);
    });