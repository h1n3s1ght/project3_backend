//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// How to connect to the database either
// via heroku or locally
//===========================
const MONGODB_URL = process.env.MONGODB_URL;

    //Port Set Variable
    //============
const PORT = process.env.PORT;

    //Database connection
    //==============
const db = mongoose.connection;

    //Connect MongoDB
    //==============
mongoose.connect(MONGODB_URI, {
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
db.on('disconnected', () => console.log('mongoDB is  DISconnected'));

//==============================
//========= LISTENER ============
//==============================

app.listen(PORT, () => {
    console.log('Server listening on port |', PORT);
    })

//==============================
//======= MIDDLEWARE ===========
//==============================

    // Body parser middleware: it creates req.body
    //================================
app.use(express.urlencoded({ extended: false }));


//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET ==========
        //========================

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

        //========================
        //===== Update / PUT ========
        //========================

        //=========================
        //===== Destroy / DELETE ======
        //=========================
